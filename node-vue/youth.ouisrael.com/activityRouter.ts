import { Prisma, Activity } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import { arrayToXlsx } from '~/server/helpers/excel'
import { z } from 'zod'
import { permissionMiddleware } from '../permissionHandler'
import { middleware, publicProcedure, router } from '../trpc'
import moment from 'moment'

const zodActivityFields = {
  subject: z.string().optional(),
  description: z.string().optional(),
  startDate: z.date().nullable().optional(),
  endDate: z.date().nullable().optional(),
  numOfHours: z.number().optional(),
  manager_permission: z.boolean().optional(),
  approving_manager_id: z.number().nullable().optional(),
  preparation_hours_needed: z.boolean().optional(),
  preparationHours: z.number().nullable().optional(),
  type_id: z.number(),
  guide_id: z.number().nullable().optional(),
  group_id: z.number().nullable().optional(),
  includes_transportation: z.boolean().optional(),
  transportation_amount: z.number().nullable().optional(),
  event_id: z.number().nullable().optional(),
}

export default router({
  fetchList: publicProcedure
    .query(async ({ ctx }) => {
      const { prisma } = ctx
      const where: Prisma.ActivityWhereInput = {}

      const records = await prisma.activity.findMany({
        where,
        include: {
          attendance: {
            select: {
              id: true,
            }
          },
          type: {
            select: {
              name: true
            }
          }
        }
      })

      return { records }
    }),

  fetchMinimalList: publicProcedure
    .query(async ({ ctx }) => {
      const { prisma } = ctx
      const where: Prisma.ActivityWhereInput = {}

      const records = await prisma.activity.findMany({ where, select: { id: true, subject: true, is_active: true } })
      const total = await prisma.activity.count({ where })

      return { records: records.map(item => ({ ...item, name: item.subject })), total }
    }),

  fetchById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx
      const record = await prisma.activity.findFirstOrThrow({ where: input })
      const activityAttendance = await prisma.activityAttendance.findMany({ where: { activity_id: record.id } })

      return { record, activityAttendance }
    }),

  create: publicProcedure
    .use(permissionMiddleware('activity.editCreate')) // admin, guide and chapter manager can create/update activities
    .input(z.object({
      activity: z.object({
        ...zodActivityFields,
      }),
      activityAttendance: z.array(z.object({
        person_id: z.number(),
      }))
    }))
    .use(middleware(opts => { // checks if user can create this activity
      const { ctx, input } = opts
      const isGuide = ctx.staff?.role === 'guide'
      // @ts-ignore
      if (isGuide && input.activity.group_id !== ctx.staff.group_id) {
        throw new TRPCError({ code: 'FORBIDDEN', message: 'Permission issue: Guide staff can only create activity with their groups' })
      }
      return opts.next()
    }))
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx

      const created = await prisma.activity.create({ data: input.activity })
      const activityAttendance = await prisma.activityAttendance.createMany({
        data: input.activityAttendance.map(item => ({ ...item, activity_id: created.id }))
      })

      return { created, activityAttendance }
    }),

  update: publicProcedure
    .use(permissionMiddleware('activity.editCreate')) // admin, guide and chapter manager can create/update activities
    .input(z.object({
      activity: z.object({
        id: z.number(),
        ...zodActivityFields,
      }),
      activityAttendance: z.array(z.object({
        person_id: z.number(),
      }))
    }))
    .use(middleware(opts => { // checks if user can create this activity
      const { ctx, input } = opts
      const isGuide = ctx.staff?.role === 'guide'
      // @ts-ignore
      if (isGuide && input.activity.group_id !== ctx.staff.group_id) {
        throw new TRPCError({ code: 'FORBIDDEN', message: 'Permission issue: Guide staff can only create activity with their groups' })
      }

      return opts.next()
    }))
    .mutation(async ({ ctx, input }) => {
      const updated = await ctx.prisma.activity.update({
        where: { id: input.activity.id },
        data: input.activity,
      })

      await ctx.prisma.activityAttendance.deleteMany({ where: { activity_id: updated.id } })
      await ctx.prisma.activityAttendance.createMany({
        data: input.activityAttendance.map(item => ({ ...item, activity_id: updated.id }))
      })

      const activityAttendance = await ctx.prisma.activityAttendance.findMany({ where: { activity_id: updated.id } })

      return { updated, activityAttendance }
    }),

  batchConfirm: publicProcedure
    .use(permissionMiddleware('activity.confirm'))
    .input(z.object({
      ids: z.array(z.number()),
      confirmed: z.boolean(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx
      await prisma.activity.updateMany({
        where: { id: { in: input.ids } },
        data: { confirmed: input.confirmed }
      })
    }),

  remove: publicProcedure
    .use(permissionMiddleware('activity.remove'))
    .input(z.object({
      id: z.number(),
    }))
    .mutation(async ({ ctx, input: { id } }) => {
      await ctx.prisma.activity.update({
        where: { id },
        data: { is_active: false },
      })

      return { success: true }
    }),

  exportXlsx: publicProcedure
    .input(z.object({
      IDs: z.array(z.number())
    }))
    .query(async ({ ctx, input }) => {
      const activities = await ctx.prisma.activity.findMany({
        where: { id: { in: input.IDs } },
        include: { type: true, guide: true, group: true }
      })

      const formatted = activities.map(item => ({
        ...item,
        type: item.type?.name,
        guide: item.guide ? `${item.guide.first_name} ${item.guide.last_name}` : '',
        group: item.group?.name,
      }))

      const buffer = await arrayToXlsx(formatted, [
        { title: 'ID', key: 'id' },
        { title: 'Subject', key: 'subject' },
        { title: 'Description', key: 'description' },
        { title: 'Start Date', key: 'startDate' },
        { title: 'End Date', key: 'endDate' },
        { title: 'Num Of Hours', key: 'numOfHours' },
        { title: 'Manager Permission', key: 'manager_permission' },
        { title: 'Preparation hours needed', key: 'preparation_hours_needed' },
        { title: 'Preparation Hours', key: 'preparationHours' },
        { title: 'type', key: 'type_id' },
        { title: 'guide', key: 'guide_id' },
        { title: 'group', key: 'group_id' },
        { title: 'Includes Transportation', key: 'includes_transportation' },
        { title: 'Transportation Amount', key: 'transportation_amount' },
        { title: 'confirmed', key: 'confirmed' },
      ])

      return {
        base64: buffer.toString('base64')
      }
    }),

  fetchAttendance: publicProcedure
    .query(async ({ ctx }) => {
      const records = await ctx.prisma.activityAttendance.findMany({})
      return { records }
    }),

  fetchMergedActivities: publicProcedure
    .input(z.object({
      id: z.number()
    }))
    .query(async ({ ctx, input }) => {
      const activity = await ctx.prisma.activity.findFirstOrThrow({ where: { id: input.id } })

      let duplicates: Activity[] = []

      const startOfDay = activity.startDate ? moment(activity.startDate).startOf('day') : null
      const endOfDay = activity.endDate ? moment(activity.endDate).endOf('day') : null

      if (startOfDay && endOfDay) {
        duplicates = await ctx.prisma.activity.findMany({
          where: {
            id: { not: activity.id },
            subject: activity.subject,
            type_id: activity.type_id,
            group_id: activity.group_id,
            startDate: { gt: startOfDay.toDate() },
            endDate: { lt: endOfDay.toDate() },
          }
        })
      }

      return { duplicates }
    })
})

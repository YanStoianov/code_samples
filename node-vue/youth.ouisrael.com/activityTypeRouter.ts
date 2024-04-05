import { guard } from '../guards'
import { publicProcedure, router } from '../trpc'
import z from 'zod'

export default router({
  fetchList: publicProcedure
    .query(async ({ ctx }) => {
      guard(ctx).admin()
      const { prisma } = ctx

      const records = await prisma.activityType.findMany()
      const total = await prisma.activityType.count()

      return { records, total }
    }),

  create: publicProcedure
    .input(z.object({
      name: z.string()
    }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.staff) throw 'Only staff can call this endpoint'

      const staffId = ctx.staff.id

      const created = await ctx.prisma.activityType.create({
        data: {
          name: input.name,
          added_by_staff_id: staffId
        }
      })

      return { created }
    })
})

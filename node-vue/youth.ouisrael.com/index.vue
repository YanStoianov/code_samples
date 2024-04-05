<template>
  <UniversalHeader>
    <div class="flex">
      <div>
        <h3>
          סניפים
        </h3>
      </div>

      <div class="actions">
        <NuxtLink v-if="permissions.canEditCreateChapter" to="/chapter/create" class="btn black">
          חדש
          <span class="icon">+</span>
        </NuxtLink>

        <NuxtLink class="btn black" @click.prevent="downloadExcel()">
          ייצא לקובץ
          <Icon name="pages" width="12px" height="12px" fill="#fff" />
        </NuxtLink>
      </div>
    </div>
  </UniversalHeader>

  <block-loader :loading="loading">
    <div class="filters">
      <Icon name="filter" width="14px" height="14px" stroke="#333" fill="#f7f7fc" />

      <FormRow>
        <FormCol label="מחוז" style="max-width: 180px">
          <district-select v-model="districtFilter" no-label />
        </FormCol>

        <FormCol label="עיר" style="max-width:180px">
          <city-select v-model="cityFilter" no-label />
        </FormCol>

        <FormCol label="&nbsp;" style="padding-top:12px;max-width: 100px">
          <label class="checkbox-label"><input v-model="isActiveFilter" type="checkbox" />Is Active Status</label>
        </FormCol>

        <FormCol>
          <span class="clear" @click="clearFilters()">נקה חיפוש</span>
        </FormCol>
      </FormRow>
    </div>

    <grid :data-items="sortedDataItems" :columns="columns" sortable :sort="sort" @sortchange="sortChangeHandler($event)">
      <template #created-at="{ props }">
        <td>
          {{ defaultDateFormat((props.dataItem as Chapter).created_date) }}
        </td>
      </template>

      <template #city="{ props }">
        <td>
          {{
            (props.dataItem as Chapter).city_id
            ? cityStore.minimalList.find(item => item.id === (props.dataItem as Chapter).city_id)?.name || 'Not found'
            : 'לא נבחר'
          }}
        </td>
      </template>

      <template #district="{ props }">
        <td>
          {{
            (props.dataItem as Chapter).district_id
            ? districtStore.minimalList.find(item => item.id === (props.dataItem as Chapter).district_id)?.name || 'Not found'
            : 'לא נבחר'
          }}
        </td>
      </template>

      <template #link="{ props }">
        <td>
          <NuxtLink v-if="permissions.canEditCreateChapter" :to="'/chapter/' + (props.dataItem as Chapter).id" class="link">
            {{ props.dataItem.name }}
          </NuxtLink>

          <span v-else>
            {{ props.dataItem.name }}
          </span>
        </td>
      </template>

      <template #remove="{ props }">
        <td>
          <!-- TODO: add handleremove -->
          <span theme-color="tertiary" class="remove" @click.prevent="handleremove(props.dataItem as Chapter)">
            <Icon name="trash" stroke="red" width="14px" height="14px" />
          </span>
        </td>
      </template>

      <template #all-person-count="{ props }">
        <td>
          {{ (props.dataItem as ChapterWithPerson).allPerson.length }}
        </td>
      </template>

      <template #paid-person-count="{ props }">
        <td>
          {{ (props.dataItem as ChapterWithPerson).paidPerson.length }}
        </td>
      </template>

    </grid>
  </block-loader>
</template>

<script lang="ts" setup>
import { Chapter, Person } from '.prisma/client'
import { Grid, GridColumnProps } from '@progress/kendo-vue-grid'
import { defaultDateFormat } from '~/utils'
import FormRow from '~/components/forms/FormRow.vue'
import FormCol from '~/components/forms/FormCol.vue'
import { useGridSort, usePermissions } from '~/hooks'
import { downloadBase64 } from '~/helpers/files'
import DistrictSelect from '~/components/inputs/DistrictSelect.vue'
import CitySelect from '~/components/inputs/CitySelect.vue'
import { useCityStore, useDistrictStore } from '~/store'
import { usePagePermissionsChecker } from '~/hooks/permissionsChecker'

usePagePermissionsChecker()

const { $client } = useNuxtApp()
const { permissions } = usePermissions()

const districtStore = useDistrictStore()
const cityStore = useCityStore()

type ChapterWithPerson = Awaited<ReturnType<typeof $client.chapter.fetchList.query>>['records'][0] & { allPerson: Person[], paidPerson: Person[] }

const loading = ref<boolean>(false)
const chapters = ref<ChapterWithPerson[]>([])
const total = ref<number>(0)

const columns = computed<GridColumnProps[]>(() => [
  { title: 'שם', field: 'name', cell: 'link' },
  { title: 'מחוז', field: 'district', cell: 'district' },
  { title: 'עיר', field: 'city', cell: 'city' },
  { title: 'מספר חניכים', cell: 'all-person-count' },
  { title: 'מספר חברים', cell: 'paid-person-count' },
  { title: 'הסר', cell: 'remove', hidden: !permissions.value.canRemoveChapter },
])

const fetchChapterList = async () => {
  const promise = $client.chapter.fetchList.query()
  wrapPromiseLoading(promise, loading)

  const res = await promise

  chapters.value = res.records.map(chapter => ({
    ...chapter,
    allPerson: res.allPerson.filter(item => item.chapter_id === chapter.id),
    paidPerson: res.paidPerson.filter(item => item.chapter_id === chapter.id),
  }))

  total.value = res.total
}

const isActiveFilter = ref(true)
const clearFilters = () => {
  cityFilter.value = null
  districtFilter.value = null
  isActiveFilter.value = true
}

const cityFilter = ref<number | null>(null)
const districtFilter = ref<number | null>(null)

const filteredChapters = computed(() => {
  return chapters.value
    .filter(item => districtFilter.value === null ? true : item.district_id === districtFilter.value)
    .filter(item => cityFilter.value === null ? true : item.city_id === cityFilter.value)
    .filter(item => !isActiveFilter.value || item.is_active)
})
const { sortedDataItems, sort, sortChangeHandler } = useGridSort(filteredChapters)

const downloadExcel = async () => {
  const res = await $client.chapter.exportXlsx.query({ IDs: chapters.value.map(item => item.id) })
  downloadBase64(res.base64, 'Chapters.xlsx')
}

const handleremove = async (chapter: Chapter) => {
  if (window.confirm('Remove chapter ' + chapter.name + '?')) {
    const promise = $client.chapter.remove.mutate({ id: chapter.id })
    wrapPromiseLoading(promise, loading)
    await promise
    await fetchChapterList()
  }
}

onMounted(async () => {
  await fetchChapterList()
  await districtStore.fetchMinimalList()
  await cityStore.fetchMinimalList()
})
</script>

<style lang="scss" scoped>
.flex {
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  min-width: 100%;

  >div {
    flex-grow: 0;
  }
}
.link {
  color: #266bbc
}
.filters {
  padding: 15px 10px 15px;
  display: flex;
  align-items: flex-end;
  background: white;
  border: 1px solid #ddd;
  border-bottom: none;

  .icon {
    margin-left: 10px;
    margin-bottom: 12px;
  }
}

.clear {
  color: var(--colorBlue);
  font-size: .7rem;
  text-decoration: underline;
  cursor: pointer;
  position: relative;
  top: 30px;
}
.remove {
  cursor: pointer
}
</style>

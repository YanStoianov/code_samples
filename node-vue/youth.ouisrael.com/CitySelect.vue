<template>
  <block-loader class="padding-0-important" :loading="cityStore.minimalListLoading">
    <drop-down-list :label="label" :data-items="cityStore.minimalList" v-model="cityModel" text-field="name" value-field="id" @blur.native="$emit('blur-native')" />
  </block-loader>
</template>

<script lang="ts" setup>
import BlockLoader from '~~/components/BlockLoader.vue'
import { DropDownList } from '@progress/kendo-vue-dropdowns'
import { useCityStore } from '~~/store'

type ModelValue = number | null

interface Props {
  modelValue: ModelValue
  noLabel?: boolean
  fetchOptions?: boolean
  label?: string
}

const label = computed(() => {
  if (props.label) return props.label
  if (!props.noLabel)
    return 'עיר'
})

interface Emits {
  (e: 'update:modelValue', payload: ModelValue): void
  (e: 'blur-native'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const cityStore = useCityStore()

const cityModel = computed<{ id: number, name: string } | null>({
  get: () => cityStore.minimalList.find(item => item.id === (props.modelValue as number)) || null,
  set: (newValue) => emit('update:modelValue', newValue?.id || null)
})

onMounted(async () => {
  if (props.fetchOptions) {
    await cityStore.fetchMinimalList()
  }
})
</script>
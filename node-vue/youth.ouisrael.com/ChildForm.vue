<template>
  <div class="content">
    <ChildFormHeader :child="child" @profile-attachment-created="setProfileAttachment($event)" />

    <nav>
      <span :class="{ active: tab === 'ChildInfo' }" @click="tab = 'ChildInfo'">
        פרטי הילד
      </span>

      <span :class="{ active: tab === 'Membership' }" @click="tab = 'Membership'">
        חברות
      </span>

      <span :class="{ active: tab === 'EmergencyContacts' }" @click="tab = 'EmergencyContacts'">
        אנשי קשר חרום
      </span>

      <span :class="{ active: tab === 'UpcomingEvents' }" @click="tab = 'UpcomingEvents'">
        ארועי קרובים
      </span>

      <span :class="{ active: tab === 'EventsHistory' }" @click="tab = 'EventsHistory'">
        היסטוריית אירועים
      </span>
    </nav>
  </div>

  <div v-if="tab === 'ChildInfo'" class="panel-wrapper">
    <div class="info">
      <FormRow class="twothirds">
        <FormCol label="שם פרטי">
          <Input autocomplete="off" v-model="child.first_name" @blur.native="v$.child.first_name.$touch()" />
          <error :errors="v$.child.first_name.$errors" />
        </FormCol>

        <FormCol label="שם משפחה">
          <Input autocomplete="off" v-model="child.last_name" @blur.native="v$.child.last_name.$touch()" />
          <error :errors="v$.child.last_name.$errors" />
        </FormCol>
      </FormRow>

      <!-- parent sees this input field if they have more that one family assigned -->
      <!-- otherwise family_id is set automatically -->

      <FormRow class="twothirds" v-if="showFamilySelect">
        <FormCol label="Select Family">
          <family-select v-model="child.family_id" @blur-native="v$.child.family_id.$touch()" />
          <error :errors="v$.child.family_id.$errors" />
        </FormCol>
      </FormRow>
      <hr>

      <FormRow class="twothirds">
        <FormCol label="מחוז">
          <district-select no-label fetch-options v-model="child.district_id" />
        </FormCol>

        <FormCol label="עיר">
          <city-select no-label fetch-options v-model="child.city_id" />
        </FormCol>
      </FormRow>

      <FormRow size="twothirds">
        <FormCol label="קבוצה">
          <group-select no-label fetch-options v-model="child.group_id" />
        </FormCol>

        <FormCol label="סניף">
          <chapter-select no-label fetch-options v-model="child.chapter_id" />
        </FormCol>
      </FormRow>

      <FormRow class="twothirds">
        <FormCol label="בית ספר">
          <school-select no-label fetch-options v-model="child.school_id" />
        </FormCol>

        <FormCol label="כיתה">
          <Input type="number" v-model.number="(child.grade as number)" autocomplete="off" />
        </FormCol>
      </FormRow>
      <hr>

      <FormRow>
        <FormCol label="מין" flex="2">
          <gender-select no-label v-model="child.gender" />
        </FormCol>

        <FormCol label="תאריך לידה" flex="3">
          <VueDatePicker v-model="child.birthdate" label="Birthdate" />
        </FormCol>

        <FormCol label="תעודת זהות" flex="3">
          <Input v-model.number="(child.tz_number as number)" autocomplete="off" />
        </FormCol>
      </FormRow>

      <FormRow class="twothirds">
        <FormCol label="איך הגעת אלינו">
          <immigration-method-select v-model="child.how_did_you_get_here" />
        </FormCol>
      </FormRow>

      <hr>

      <template v-if="child.healthInfo">
        <FormRow class="twothirds" label="אלרגיות">
          <FormCol>
            <allergies-multi-select v-model="child.healthInfo.allergies" no-label />
          </FormCol>
        </FormRow>

        <FormRow v-if="child.healthInfo.allergies.includes('Other')">
          <FormCol label="ציין את האלרגיות האחרות">
            <Textarea v-model="child.healthInfo.other_allergies" />
          </FormCol>
        </FormRow>

        <FormRow>
          <FormCol label="בעיות מזון נוספות">
            <Textarea v-model="child.healthInfo.problem" />
          </FormCol>
        </FormRow>

        <FormRow>
          <FormCol label="תרופות">
            <Textarea v-model="child.healthInfo.medications" />
          </FormCol>
        </FormRow>
      </template>
    </div>
  </div>

  <div v-if="tab === 'Membership'" class="panel-wrapper">
    <child-membership v-if="child.id" :person-id="child.id" />
  </div>

  <div v-if="tab === 'EmergencyContacts'" class="panel-wrapper">
    TODO: Emergency Contacts fields
  </div>

  <div v-if="tab === 'UpcomingEvents'" class="panel-wrapper">
    TODO: Upcoming Events fields
  </div>

  <div v-if="tab === 'EventsHistory'" class="panel-wrapper">
    TODO: Events History fields
  </div>

  <div class="buttons" v-if="tab === 'ChildInfo'">
    <button @click="submit()">
      {{ props.createMode ? 'Create new child' : 'Save changes' }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import { Input } from '@progress/kendo-vue-inputs'
import VueDatePicker from '@vuepic/vue-datepicker'
import FormCol from '~/components/forms/FormCol.vue'
import FormRow from '~/components/forms/FormRow.vue'
import ChildFormHeader, { ProfileAttachmentCreatedEvent as _ProfileAttachmentCreatedEvent } from './ChildFormHeader.vue'
import AllergiesMultiSelect from '~~/components/inputs/AllergiesMultiselect.vue'
import ChapterSelect from '~/components/inputs/ChapterSelect.vue'
import CitySelect from '~/components/inputs/CitySelect.vue'
import DistrictSelect from '~/components/inputs/DistrictSelect.vue'
import FamilySelect from '~/components/inputs/FamilySelect.vue'
import GenderSelect from '~/components/inputs/GenderSelect.vue'
import GroupSelect from '~/components/inputs/GroupSelect.vue'
import ImmigrationMethodSelect from '~/components/inputs/ImmigrationMethodSelect.vue'
import SchoolSelect from '~/components/inputs/SchoolAutocomplete.vue'
import Textarea from '~/components/inputs/Textarea.vue'
import { Button } from '@progress/kendo-vue-buttons'
import { useFamilyStore } from '~/store'
import useVuelidate from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'
import Error from '~/components/InputError.vue'
import '@vuepic/vue-datepicker/dist/main.css'
import { usePermissions } from '~/hooks'
import ChildMembership from './ChildMembership.vue'

const familyStore = useFamilyStore()
const permissions = usePermissions()

export type ProfileAttachmentCreatedEvent = _ProfileAttachmentCreatedEvent

export interface SubmitCreateChildEvent {
  child: ChildData
}

export interface SubmitEditChildEvent {
  child: ChildData
}

type ApiChildData = Awaited<ReturnType<typeof nuxtApp.$client.person.fetchParentRelatedList.query>>['children'][0]

export interface ChildData {
  first_name: ApiChildData['first_name']
  last_name: ApiChildData['last_name']
  district_id: ApiChildData['district_id']
  city_id: ApiChildData['city_id']
  group_id: ApiChildData['group_id']
  chapter_id: ApiChildData['chapter_id']
  school_id: ApiChildData['school_id']
  grade: ApiChildData['grade']
  gender: ApiChildData['gender']
  birthdate: ApiChildData['birthdate']
  tz_number: ApiChildData['tz_number']
  how_did_you_get_here: ApiChildData['how_did_you_get_here']
  profile_picture_attachment_id: ApiChildData['profile_picture_attachment_id']
  family_id: ApiChildData['family_id']

  healthInfo: HealthInfo | null
  profile_picture_attachment: ProfilePictureAttachment | null

  // TODO: add other fields when needed
}

interface HealthInfo {
  allergies: NonNullable<ApiChildData['healthInfo']>['allergies']
  other_allergies: NonNullable<ApiChildData['healthInfo']>['other_allergies']
  problem: NonNullable<ApiChildData['healthInfo']>['problem']
  medications: NonNullable<ApiChildData['healthInfo']>['medications']
}

interface ProfilePictureAttachment {
  name: NonNullable<ApiChildData['profile_picture_attachment']>['name']
  readUrl: NonNullable<ApiChildData['profile_picture_attachment']>['readUrl']
  s3key: NonNullable<ApiChildData['profile_picture_attachment']>['s3key']
}

interface Props {
  child?: ApiChildData
  createMode?: boolean
}

interface Emits {
  (e: 'profile-attachment-created', payload: ProfileAttachmentCreatedEvent): void
  (e: 'submit-create', payload: SubmitCreateChildEvent): void
  (e: 'submit-update', payload: SubmitEditChildEvent): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const nuxtApp = useNuxtApp()

const child = ref<ChildData>({
  first_name: '',
  last_name: '',
  district_id: null,
  city_id: null,
  group_id: null,
  chapter_id: null,
  school_id: null,
  grade: null,
  gender: null,
  birthdate: null,
  tz_number: null,
  how_did_you_get_here: null,
  profile_picture_attachment_id: null,
  family_id: null, // TODO: add input for this field

  healthInfo: {
    allergies: [],
    other_allergies: null,
    problem: '',
    medications: '',
  },

  profile_picture_attachment: null,
})

watch(() => props.child, () => {
  if (props.child)
    child.value = props.child
})

const route = useRoute()
const router = useRouter()

type TabOption = 'ChildInfo' | 'Membership' | 'EmergencyContacts' | 'UpcomingEvents' | 'EventsHistory'
const tabOptions: TabOption[] = ['ChildInfo', 'Membership', 'EmergencyContacts', 'UpcomingEvents', 'EventsHistory']
const tab = computed<TabOption>({
  get: () => tabOptions[tabOptions.indexOf(route.query.tab as TabOption)] || 'ChildInfo',
  set: (newValue) => newValue === 'ChildInfo'
    ? router.push({ query: {} })
    : router.push({ query: { tab: newValue } })
})

const setProfileAttachment = (data: ProfileAttachmentCreatedEvent) => {
  if (props.createMode)
    child.value.profile_picture_attachment_id = data.attachment.id

  else
    emit('profile-attachment-created', data)
}

const rules = {
  child: {
    first_name: { required: helpers.withMessage('First name is required', required) },
    last_name: { required: helpers.withMessage('Last name is required', required) },
    family_id: { required: helpers.withMessage('Family is required to select', required) },
  }
}

const state = computed(() => ({
  child: child.value
}))

const v$ = useVuelidate(rules, state)

const submit = () => {
  v$.value.$touch()

  if (v$.value.$errors.length) {
    return nuxtApp.$n.notify({
      type: 'warn',
      title: 'Fix validation issues to submit this form',
      text: v$.value.$errors.map(item => item.$message).join(',\n'),
    })
  }

  if (props.createMode)
    emit('submit-create', { child: child.value })

  else
    emit('submit-update', { child: child.value })
}

const showFamilySelect = computed(() => {
  // family select is shown only when creating child if parent has many families

  if (!props.createMode)
    return false

  if (familyStore.minimalList.length !== 2)
    return false

  return true
})

onMounted(async () => {
  if (props.child)
    child.value = props.child

  await familyStore.fetchParentRelatedMinimalList()

  if (props.createMode && familyStore.minimalList.length === 1) {
    child.value.family_id = familyStore.minimalList[0].id
  }
})
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  margin-bottom: 20px;
  border-bottom: 2px solid #efefef;

  span {
    font-size: 14px;
    color: #666;
    cursor: pointer;
    margin-bottom: -2px;
    padding: 10px 20px;
    border-bottom: 2px solid transparent;

    &.active {
      font-weight: 600;
      color: #072544;
      border-bottom-color: #072544;
    }
  }
}

.buttons {
  margin-top: 20px;
}
</style>

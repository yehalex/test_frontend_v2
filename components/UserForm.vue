<template>
  <div class="user-form">
    <h3>{{ isEditing ? $t('editUser') : $t('createUser') }}</h3>

    <form @submit.prevent="handleSubmit" class="form">
      <ETextField v-model="formData.name" :label="$t('name')" />

      <ETextField v-model="ageString" :label="$t('age')" type="number" />

      <div class="form-actions">
        <EBtn
          type="submit"
          :text="isEditing ? $t('editUser') : $t('createUser')"
          :color="isEditing ? 'warn' : 'success'"
        />
        <EBtn type="button" :text="$t('cancel')" color="warn" @click="handleCancel" />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { User } from '@/types/user'

const { t } = useI18n()

interface Props {
  user?: User | null
  isEditing?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isEditing: false,
})

const emit = defineEmits<{
  (e: 'submit', user: Omit<User, 'id'>): void
  (e: 'cancel'): void
}>()

const formData = ref({
  name: '',
  age: 0,
})

const ageString = computed({
  get: () => formData.value.age.toString(),
  set: (value: string) => {
    formData.value.age = parseInt(value) || 0
  },
})

const sanitizeString = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '')
    .replace(/['"]/g, '')
    .replace(/[;\\]/g, '')
    .substring(0, 50)
}

const sanitizeNumber = (input: string): number => {
  const cleaned = input.replace(/[^0-9-]/g, '')
  const parsed = parseInt(cleaned, 10)

  if (isNaN(parsed) || parsed < 0) {
    return 0
  }

  return Math.min(parsed, 120)
}

const validateName = (name: string): { isValid: boolean; error?: string } => {
  const sanitized = sanitizeString(name)

  if (!sanitized) {
    return { isValid: false, error: t('validation.nameRequired') }
  }

  if (sanitized.length < 2) {
    return { isValid: false, error: t('validation.nameTooShort') }
  }

  if (sanitized.length > 30) {
    return { isValid: false, error: t('validation.nameTooLong') }
  }

  if (!/^[a-zA-Z\s\-']+$/.test(sanitized)) {
    return { isValid: false, error: t('validation.nameInvalid') }
  }

  return { isValid: true }
}

const validateAge = (age: number): { isValid: boolean; error?: string } => {
  if (age <= 0) {
    return { isValid: false, error: t('validation.ageRequired') }
  }

  if (age < 1 || age > 120) {
    return { isValid: false, error: t('validation.ageInvalid') }
  }

  if (!Number.isInteger(age)) {
    return { isValid: false, error: t('validation.ageMustBeInteger') }
  }

  return { isValid: true }
}

watch(
  () => props.user,
  (newUser) => {
    if (newUser) {
      formData.value = {
        name: sanitizeString(newUser.name),
        age: sanitizeNumber(newUser.age.toString()),
      }
    } else {
      resetForm()
    }
  }
)

onMounted(() => {
  if (props.user) {
    formData.value = {
      name: sanitizeString(props.user.name),
      age: sanitizeNumber(props.user.age.toString()),
    }
  }
})

const resetForm = () => {
  formData.value = {
    name: '',
    age: 0,
  }
}

const handleSubmit = () => {
  const sanitizedName = sanitizeString(formData.value.name)
  const sanitizedAge = sanitizeNumber(formData.value.age.toString())

  formData.value.name = sanitizedName
  formData.value.age = sanitizedAge

  const nameValidation = validateName(sanitizedName)
  if (!nameValidation.isValid) {
    alert(nameValidation.error)
    return
  }

  const ageValidation = validateAge(sanitizedAge)
  if (!ageValidation.isValid) {
    alert(ageValidation.error)
    return
  }

  emit('submit', {
    name: sanitizedName,
    age: sanitizedAge,
  })

  if (!props.isEditing) {
    resetForm()
  }
}

const handleCancel = () => {
  resetForm()
  emit('cancel')
}

const handleEditClick = () => {
  if (props.isEditing) {
    handleSubmit()
  }
}
</script>

<style scoped lang="scss">
.user-form {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin: 1rem 0;
  border: 1px solid #e9ecef;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}
</style>

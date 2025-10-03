<template>
  <dialog ref="dialogRef" class="confirmation-dialog">
    <div class="dialog-content">
      <h3 class="dialog-title">{{ title }}</h3>
      <p class="dialog-message">{{ message }}</p>
      <div class="dialog-actions">
        <EBtn :text="$t('confirm')" color="error" @click="handleConfirm" />
        <EBtn :text="$t('cancel')" color="warn" @click="handleCancel" />
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
const { t } = useI18n()

interface Props {
  title: string
  message: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

const dialogRef = ref<HTMLDialogElement>()

const show = () => {
  dialogRef.value?.showModal()
}

const hide = () => {
  dialogRef.value?.close()
}

const handleConfirm = () => {
  emit('confirm')
  hide()
}

const handleCancel = () => {
  emit('cancel')
  hide()
}

defineExpose({
  show,
  hide,
})
</script>

<style scoped lang="scss">
.confirmation-dialog {
  border: none;
  border-radius: 0.75rem;
  padding: 0;
  max-width: 400px;
  width: 90vw;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

  &::backdrop {
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
  }
}

.dialog-content {
  padding: 1.5rem;
  text-align: center;
}

.dialog-title {
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
}

.dialog-message {
  margin: 0 0 1.5rem 0;
  color: #6b7280;
  line-height: 1.5;
}

.dialog-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
}
</style>

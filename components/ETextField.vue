<template>
  <div class="textfield">
    <label v-if="label" :for="inputId" class="textfield__label">
      {{ label }}
    </label>
    <input
      :id="inputId"
      v-bind="$attrs"
      :value="modelValue"
      @input="onInput"
      class="textfield__input"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  id?: string
  label?: string
  modelValue?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

let idCounter = 0
const inputId = props.id ?? `textfield-${++idCounter}`

function onInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<style scoped lang="scss">
.textfield {
  display: flex;
  flex-direction: column;
  gap: 4px;

  &__label {
    font-size: 14px;
    font-weight: 500;
    color: #333;
  }

  &__input {
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 14px;

    &:focus {
      outline: none;
      border-color: #0070f3;
      box-shadow: 0 0 0 2px rgba(0, 112, 243, 0.2);
    }
  }
}
</style>

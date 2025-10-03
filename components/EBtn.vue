<template>
  <button :type="props.type" :class="['e-btn', `e-btn-${props.color}`]" :disabled="props.disabled">
    <span v-if="props.text">{{ props.text }}</span>
    <slot v-else />
  </button>
</template>

<script setup lang="ts">
interface Props {
  text?: string // 若有輸入時以此為主，若沒有就顯示 slot
  color?: 'success' | 'error' | 'warn' // 預設 success
  type?: 'button' | 'submit' | 'reset' // 預設 button
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  color: 'success',
  type: 'button',
  disabled: false,
})
</script>

<style scoped lang="scss">
.e-btn {
  padding: 0.6rem 1.2rem;
  border-radius: 0.5rem;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.2s ease,
    transform 0.1s ease;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &-success {
    background: #22c55e;
    color: white;

    &:hover {
      background: #16a34a;
    }

    &:active {
      background: #15803d;
      transform: scale(0.97);
    }
  }

  &-error {
    background: #ef4444;
    color: white;

    &:hover {
      background: #dc2626;
    }

    &:active {
      background: #b91c1c;
      transform: scale(0.97);
    }
  }

  &-warn {
    background: #eab308;
    color: black;

    &:hover {
      background: #ca8a04;
    }

    &:active {
      background: #a16207;
      transform: scale(0.97);
    }
  }
}
</style>

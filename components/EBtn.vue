<template>
  <button>
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  text?: string // 若有輸入時以此為主，若沒有就顯示 slot
  color?: 'success' | 'error' | 'warn' // 預設為 success
}

const props = withDefaults(defineProps<Props>(), {})
</script>

<style scoped lang="scss">
.e-btn {
  // success 綠
  &-success {
  }

  // error 紅
  &-error {
  }

  // warn 黃
  &-warn {
  }
}
</style>

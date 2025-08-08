<template>
  <div>
    <label></label>
    <input />
  </div>
</template>

<script setup lang="ts">
interface Props {
  id?: string // 若使用者有輸入，以使用者輸入的為主，若沒有請產出一個唯一 ID
  label?: string
}

const props = withDefaults(defineProps<Props>(), {})
</script>

<style scoped lang="scss"></style>

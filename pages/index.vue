<template>
  <div></div>
</template>

<script setup lang="ts">
import axios from 'axios'
const baseUrl = '' // 由面試官提供

const getUsers = () => {
  axios({
    method: 'get',
    url: baseUrl + '/api/user',
  }).then(res => {
    const {data} = res.data
    users.value = data
  }).catch(err => {
    console.log(err)
  })
}
</script>

<style scoped lang="scss"></style>
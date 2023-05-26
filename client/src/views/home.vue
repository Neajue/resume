<template>
  <div>
    <el-button type="primary">Previous Page</el-button>
    <el-color-picker />
  </div>
</template>

<script lang="ts" setup>
import pinia from '@/store'
import userStore from '@/store/user'
const useUserStore = userStore(pinia);
console.log(useUserStore.id)
</script>
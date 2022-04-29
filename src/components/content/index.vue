<template>
  <div class="container">
    <ContentWelcome v-if="tablist.tabListNumber === 0" />
    <div class="views" v-else>
      <ContentTablist />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTabList } from '@store/tabs'
const tablist = useTabList()
</script>

<style scoped lang="less">
.container {
  display: flex;
  width: 100%;
  height: 100%;
  min-width: 300px;
  position: relative;
  background-color: rgb(30, 30, 30);
  .views {
    width: 100%;
    height: 100%;
  }
  // .views:deep(.tabsDialog) {
  //   --el-dialog-padding-primary: 14px;
  // }
}
</style>

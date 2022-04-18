<template>
  <Layout>
    <template #left>
      <div class="activitybar"></div>
      <div class="left"></div>
    </template>
    <template #content>
      <div class="content"></div>
    </template>
  </Layout>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.activitybar {
  width: 48px;
  height: 100%;
  background: #333333;
}
.left {
  background-color: #252526;
  outline-color: rgba(83, 89, 93, 0.5);
  width: 100%;
  height: 100%;
}
.content {
  display: flex;
  width: 100%;
  height: 100%;
  min-width: 300px;
  position: relative;
  background-color: #1e1e1e;
}
</style>

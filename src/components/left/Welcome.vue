<template>
  <div class="welcome">
    <p>尚未打开文件夹.</p>
    <div class="button-container">
      <el-button size="small" type="primary" @click="openFinder">打开文件夹</el-button>
    </div>
    <div class="button-container">
      <el-button size="small" type="primary">最近</el-button>
    </div>
    <!-- <p>可以打开服务器文件.</p>
    <div class="button-container">
      <el-button size="small" type="primary" @click="cloudFinder">服务器文件夹</el-button>
    </div> -->
  </div>
</template>

<script setup lang="ts">

import events from '@commonUtils/window'

const openFinder = async () => {
  events['open-directory']()
}


</script>

<style scoped lang="less">
.welcome {
  display: flex;
  flex-direction: column;
  padding: 0 20px 1em;
  box-sizing: border-box;
  align-items: center;
  width: 100%;
  height: 100%;

  >* {
    margin-block-start: 1em;
    margin-block-end: 0;
    margin-inline-start: 0;
    margin-inline-end: 0;
    width: 100%;
  }

  .button-container {
    width: 100%;
    max-width: 300px;
    transition: max-width 0.2s ease-out;

    button {
      width: 100%;
    }
  }
}
</style>

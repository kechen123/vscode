<template>
  <Main />
</template>

<script setup lang="ts">
import { ElLoading } from 'element-plus'
const loading = ElLoading.service({
  lock: true,
  text: 'Loading',
  background: 'rgba(0, 0, 0, 0.7)'
})
const interval = setInterval(() => {
  if (window.monaco) {
    clearInterval(interval)
    loading.close()
  }
}, 100)
</script>

<style lang="less">
#vscode {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>

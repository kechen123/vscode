<template>
  <Main />
</template>

<script setup lang="ts">
// import { useMonacoStore } from '@store/monaco'
// const useMonaco = useMonacoStore()
// useMonaco.init()
import useMonacoEditor from '@hook/useMonacoEditor'
useMonacoEditor()
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

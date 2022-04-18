<template>
  <Suspense>
    <template v-slot:default>
      <Main />
    </template>
    <template v-slot:fallback>
      <Skeleton />
    </template>
  </Suspense>
</template>

<script setup lang="ts">
const Main = defineAsyncComponent(() => import('@components/Main.vue'))
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

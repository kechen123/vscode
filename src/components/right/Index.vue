<template>
  <div class="right-view">
    <RightTitle :active="active" :terminalList="terminalList" :change="changeActive" />
    <RightContainer :active="active" :terminalList="terminalList" :change="change" />
  </div>
</template>

<script setup lang="ts">
import { FitAddon } from 'xterm-addon-fit'

type Obj = {
  terminal: any
  fit: FitAddon | undefined
}

const active = ref('')
let terminalList = reactive<{ [key: string]: Obj }>({})
const change = (key: string, val: any) => {
  active.value = key
  terminalList[key] = val
}
const changeActive = (val: string) => {
  active.value = val
}

</script>

<style scoped lang="less">
.right-view {
  background-color: rgb(30, 30, 30);
  outline-color: rgba(83, 89, 93, 0.5);
  border-left-color: rgba(128, 128, 128, 0.35);
  border-right-color: rgba(128, 128, 128, 0.35);
  border-left-width: 1px;
  border-left-style: solid;
  width: 100%;
  height: 100%;

}
</style>

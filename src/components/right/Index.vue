<template>
  <div class="right-view">
    <RightTitle />
    <div class="terminal">
      <RightContainer />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

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
  .terminal {
    width: 100%;
    height: calc(100% - 35px);
    padding: 10px;
  }
}
</style>

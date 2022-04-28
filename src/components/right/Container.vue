<template>
  <div class="container"></div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.container {
  width: 100%;
  height: calc(100% - 35px);
  padding: 0 10px;
  overflow: auto;
}

.container::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}
.container:hover::-webkit-scrollbar {
  width: 12px;
  height: 12px;
}

.container::-webkit-scrollbar-thumb {
  background: #333;
}

.container::-webkit-scrollbar-track {
  border-radius: 0;
  background: transparent;
}
</style>

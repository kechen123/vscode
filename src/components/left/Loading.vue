<template>
  <div ref="progressRef" class="progress">
    <div ref="bitRef" class="progress-bit"></div>
  </div>
</template>

<script setup lang="ts">
const progressRef = ref()
const bitRef = ref()

const showLoading = () => {
  progressRef.value.style.display = 'block'
  bitRef.value.style.display = 'block'
}
const hideLoading = () => {
  progressRef.value.style.display = 'none'
  bitRef.value.style.display = 'none'
}
defineExpose({
  showLoading,
  hideLoading
})
</script>

<style lang="less" scoped>
.progress {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 5;
  height: 2px;
  width: 100%;
  overflow: hidden;
  display: none;
  .progress-bit {
    width: 6%;
    height: 5px;
    position: absolute;
    left: 0;
    display: none;
    background-color: rgb(14, 112, 192);
    animation-name: animation;
    animation-iteration-count: infinite;
    animation-duration: 1s;
    animation-timing-function: linear;
  }
  @keyframes animation {
    from {
      left: 0px;
    }
    to {
      left: calc(100% - 6%);
    }
  }
}
</style>

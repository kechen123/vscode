<template>
  <div class="layout" ref="bodyRef">
    <div class="left" :style="{ width: left.realTimeWidth + 'px' }"><slot name="left"></slot></div>
    <div class="line" ref="lineRef"></div>
    <div class="right">
      <div v-if="$slots.rightTop" class="rightTop">
        <slot name="rightTop"></slot>
      </div>
      <div v-if="$slots.rightBottom" class="rightBottom">
        <slot name="rightBottom"></slot>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import useMouse from '@/hook/useMouseDrop'

const bodyRef = ref()
const left = reactive({
  realTimeWidth: 0,
  downWidth: 0
})
const down = () => {
  left.downWidth = left.realTimeWidth
}
const move = (e: MouseEvent, mouse: any) => {
  if (mouse.state === 'down') {
    left.realTimeWidth = left.downWidth + mouse.x
  }
}

const [lineRef] = useMouse({ down, move })
const init = () => {
  const w = bodyRef.value.clientWidth
  const lw = (w - 10) / 2
  left.realTimeWidth = lw
  left.downWidth = lw
}
onMounted(() => {
  init()
})
onBeforeUnmount(() => {})
</script>

<style scoped lang="less">
.layout {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #f1f1f1;
  .left,
  .right {
    width: 100%;
    height: 100%;
    border-right: solid 1px #ccc;
    border-radius: 5px;
    background: #fff;
    padding: 20px 5px 5px;
    position: relative;
  }
  .right {
    flex: 1;
  }
  .line {
    width: 10px;
    height: 100%;
    cursor: col-resize;
  }
}
</style>

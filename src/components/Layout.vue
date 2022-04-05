<template>
  <div class="layout" ref="bodyRef">
    <div class="left" :style="{ width: left.realTimeWidth + 'px' }">
      <slot name="left"></slot>
      <div class="line" ref="lineRef"></div>
    </div>

    <div class="content">
      <slot name="content"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import useMouse from '@/hook/useMouseDrop'
import { defaultActivitybarWidth, defaultLeftWidth, defaultLeftMinWidth } from '@/config/layout'
const leftwidth = defaultActivitybarWidth + defaultLeftWidth
const bodyRef = ref()
const left = reactive({
  realTimeWidth: leftwidth,
  downWidth: leftwidth
})
const down = () => {
  left.downWidth = left.realTimeWidth
}
const move = (e: MouseEvent, mouse: any) => {
  if (mouse.state === 'down') {
    let w = left.downWidth + mouse.x
    const minWidth = defaultLeftMinWidth + defaultActivitybarWidth
    if (w < minWidth) {
      w = minWidth
    }
    left.realTimeWidth = w
  }
}

const [lineRef] = useMouse({ down, move })
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
  .content {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .left {
    display: flex;
  }
  .content {
    flex: 1;
  }
  .line {
    width: 4px;
    height: 100%;
    cursor: ew-resize;
    position: absolute;
    top: 0;
    right: 0;
  }
  .line:before {
    content: '';
    pointer-events: none;
    position: absolute;
    width: 100%;
    height: 100%;
    transition: background-color 0.1s ease-out;
    background: transparent;
  }
  .hover:before {
    background: #007fd4;
  }
}
</style>

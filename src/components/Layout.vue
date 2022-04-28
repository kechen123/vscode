<template>
  <div class="layout" ref="bodyRef">
    <div class="left" :style="{ width: left.realTimeWidth + 'px' }">
      <slot name="left"></slot>
      <div class="line" ref="leftLineRef"></div>
    </div>

    <div class="content" ref="contentRef" :style="{ width: content.realTimeWidth + 'px' }">
      <slot name="content"></slot>
    </div>
    <div class="right" :style="{ width: right.realTimeWidth + 'px' }">
      <div class="line" ref="rightLineRef" style="left: 0"></div>
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import useMouse from '@hook/useMouseDrop'
import useElementResize from '@hook/useElementResize'
import {
  defaultActivitybarWidth,
  defaultLeftWidth,
  defaultLeftMinWidth,
  defaultRightWidth,
  defaultRightMinWidth
} from '@config/layout'

const leftWidth = defaultActivitybarWidth + defaultLeftWidth
const rightWidth = defaultRightWidth
const contentRef = ref()
const body = reactive({
  realTimeWidth: leftWidth,
  downWidth: leftWidth
})
const left = reactive({
  realTimeWidth: leftWidth,
  downWidth: leftWidth
})
const content = reactive({
  realTimeWidth: 0,
  downWidth: 0
})
const right = reactive({
  realTimeWidth: rightWidth,
  downWidth: rightWidth
})
const downLeft = () => {
  left.downWidth = left.realTimeWidth
}
const moveLeft = (e: MouseEvent, mouse: any) => {
  if (mouse.state === 'down') {
    let w = left.downWidth + mouse.x
    const minWidth = defaultLeftMinWidth + defaultActivitybarWidth
    if (w < minWidth) {
      w = minWidth
    }
    left.realTimeWidth = w
    content.realTimeWidth = body.realTimeWidth - w - right.realTimeWidth
  }
}

const downRight = () => {
  right.downWidth = right.realTimeWidth
}
const moveRight = (e: MouseEvent, mouse: any) => {
  if (mouse.state === 'down') {
    let w = right.downWidth - mouse.x
    const minWidth = defaultRightMinWidth
    if (w < minWidth) {
      w = minWidth
    }
    right.realTimeWidth = w
    content.realTimeWidth = body.realTimeWidth - left.realTimeWidth - w
  }
}

const bodyReSize = (event: Element, width: number, height: number) => {
  body.realTimeWidth = width
  content.realTimeWidth = body.realTimeWidth - left.realTimeWidth
}

const [leftLineRef] = useMouse({ down: downLeft, move: moveLeft })
const [rightLineRef] = useMouse({ down: downRight, move: moveRight })
const [bodyRef] = useElementResize({ resize: bodyReSize, className: 'layout' })

onMounted(() => {
  if (bodyRef.value) {
    const width = bodyRef.value.clientWidth
    body.realTimeWidth = width
    body.downWidth = width
  }
  if (contentRef.value) {
    const width = contentRef.value.clientWidth
    content.realTimeWidth = width
    content.downWidth = width
  }
})
</script>

<style scoped lang="less">
.layout {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  flex-grow: 1;
  background: #f1f1f1;
  .left,
  .content,
  .right {
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

<template>
  <teleport to="body">
    <div
      ref="target"
      v-show="isShow"
      class="context-view"
      :style="{ left: props.rect.x + 'px', top: props.rect.y + 'px' }">
      <div class="context">
        <div class="group" v-for="(item, key) in props.menu">
          <div class="item" v-for="(item1, key1) in item" @click="click(item1, item)">
            <div>
              {{ item1.label }}
            </div>
            <div>
              <span v-if="item1.keyPress">{{ item1.keyPress }}+{{ item1.keyCode }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { TabContextMenu } from '@commonTypes/contextMenu'
import { onClickOutside } from '@vueuse/core'
interface Rect {
  x: number
  y: number
}
interface Props {
  name: string
  rect: Rect
  menu: Array<Array<TabContextMenu>>
}
interface Emit {
  (e: 'click', value: TabContextMenu): void
  (e: 'onClose', event: Event): void
}
const props = defineProps<Props>()
const emit = defineEmits<Emit>()

const isShow = ref(false)

const target = ref(null)

onClickOutside(target, (event) => {
  emit('onClose', event)
  isShow.value = false
})

const click = (item1: TabContextMenu, item: TabContextMenu[]) => {
  emit('click', item1)
  isShow.value = false
}

watch([() => props.name, () => props.rect], (val) => {
  if (val) {
    isShow.value = true
  }
})
</script>

<style scoped lang="less">
.context-view {
  top: 0;
  left: 0;
  z-index: 2500;
  position: absolute;
  width: initial;

  .context {
    background: #252526;
    color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 10px rgb(0 0 0 / 40%);
    display: flex;
    flex-direction: column;

    .group {
      padding: 10px 0;
      position: relative;

      .item {
        cursor: pointer;
        padding: 4px 30px;
        font-size: 13px;
        display: flex;
        width: 324px;
        justify-content: space-between;

        span {
          text-transform: capitalize;
        }

        &:hover {
          background: #0e639c;
        }
      }
    }

    .group:not(:last-child)::after {
      content: '';
      position: absolute;
      bottom: 0;
      display: block;
      width: calc(100% - 30px);
      left: 15px;
      border-bottom: 1px solid #666;
    }
  }
}
</style>

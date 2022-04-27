<template>
  <teleport to="body">
    <div ref="target" v-show="isShow" class="quick-input">
      <div class="header">
        <div class="box">
          <div class="idle" ref="idle">
            <input @blur="inputBlur" @focus="inputFocus" />
          </div>
        </div>
      </div>
      <div class="list">
        <div class="content">
          <ul>
            <li class="select">erterter</li>
            <li>erterter</li>
            <li>erterter</li>
            <li>erterter</li>
          </ul>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { Ref } from 'vue'
import useEventListener from '@hook/useEventListener'
import { onClickOutside } from '@vueuse/core'

const isShow = ref(false)
const target = ref(null)
const idle: Ref<HTMLElement | null> = ref(null)

useEventListener(
  'click',
  (event) => {
    document.querySelector('.quick-input .select')?.classList.remove('select')
    event.target.classList.add('select')
  },
  {
    target: document,
    selector: '.quick-input .list li'
  }
)

const inputBlur = (event: Event) => {
  idle.value?.classList.remove('focus')
}
const inputFocus = (event: Event) => {
  idle.value?.classList.add('focus')
}

onClickOutside(target, (event) => (isShow.value = false))

const show = () => {
  isShow.value = true
}

const hide = () => {
  isShow.value = false
}

defineExpose({
  show,
  hide
})
</script>

<style scoped lang="less">
.quick-input {
  position: absolute;
  width: 600px;
  z-index: 2000;
  left: 50%;
  top: 5px;
  transform: translate(-50%, 0);
  background-color: rgb(37, 37, 38);
  color: rgb(204, 204, 204);
  box-shadow: rgb(0 0 0 / 36%) 0px 0px 8px 2px;
  .header {
    display: flex;
    padding: 6px 6px 4px;
    .box {
      flex-grow: 1;
      display: flex;
      position: relative;
      .idle {
        background-color: rgb(60, 60, 60);
        color: rgb(204, 204, 204);
        width: 100%;
        height: 100%;
        border: 1px solid transparent;
        position: relative;
        input {
          width: 100%;
          height: 100%;
          padding: 2px 10px 2px 12px;
          background-color: inherit;
          color: inherit;
          outline: none;
          border: none;
        }
        &::before {
          content: '>';
          position: absolute;
          font-size: 13px;
          top: 3px;
          left: 3px;
        }
      }
      .focus {
        outline: solid 1px #007fd4;
      }
    }
  }
  .list {
    line-height: 22px;
    font-size: 13px;
    .content {
      max-height: 350px;
      width: 100%;
      overflow-y: auto;
      ul {
        height: 500px;
        li {
          padding: 0 6px;
          cursor: pointer;
          &:hover:not(.select) {
            background-color: #2a2d2e;
          }
        }
        .select {
          background-color: #0b4e7a;
        }
      }
    }

    .content::-webkit-scrollbar {
      width: 0px;
      height: 0px;
    }
    .content:hover::-webkit-scrollbar {
      width: 12px;
      height: 12px;
    }

    .content::-webkit-scrollbar-thumb {
      background: #333;
    }

    .content::-webkit-scrollbar-track {
      border-radius: 0;
      background: transparent;
    }
  }
}
</style>

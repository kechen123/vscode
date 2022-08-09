<template>
  <div class="title">
    <div class="panel-switch">
      <ul>

        <li v-for="(item, i) in Object.keys(props.terminalList)"
          :class="['terminal', `${item === props.active ? 'active' : ''}`]"
          @click="props.change(item)">
          <a> 终端 {{ i + 1 }}
            <div class="close">
              <i class="codicon codicon-chrome-close" title="关闭 (Ctrl+F4)"></i>
            </div>
          </a>

        </li>
      </ul>
    </div>
    <div class="title-actions">
      <ul>
        <li>
          <a
            class="action-label codicon codicon-split-horizontal"
            title="拆分终端 (Ctrl+Shift+5)"></a>
        </li>
        <li>
          <a class="action-label codicon codicon-trash" title="终止终端"></a>
        </li>
      </ul>
    </div>
    <div class="global-actions">
      <ul>
        <li>
          <a class="action-label codicon codicon-chevron-left" title="最大化面板大小"></a>
        </li>
        <li>
          <a class="action-label codicon codicon-close" title="关闭面板" @click="store.showTerminal(false)"></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FitAddon } from 'xterm-addon-fit'
import { useLayout } from '@store/layout'
type TerminalList = {
  [key: string]: {
    terminal: any
    fit: FitAddon | undefined
  }
}
type Props = {
  active: string
  terminalList: TerminalList
  change: (val: string) => void
}
const store = useLayout()
const props = defineProps<Props>()
</script>

<style scoped lang="less">
.title {
  display: flex;
  height: 35px;
  display: flex;
  box-sizing: border-box;
  overflow: hidden;
  padding-left: 8px;
  padding-right: 8px;
  color: #c5c5c5;
  // border-bottom: solid 1px rgba(128, 128, 128, 0.35);

  .panel-switch {
    line-height: 27px;
    height: 35px;
    white-space: nowrap;

    ul {
      display: flex;
      margin: 0 auto;
      padding: 0;
      height: 100%;
      width: 100%;
      align-items: center;

      li {
        text-transform: uppercase;
        font-size: 11px;
        padding: 2px 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        position: relative;
      }

      .terminal a {
        padding: 0 2px;
        color: rgba(231, 231, 231, 0.6);
      }

      .active a {
        color: rgb(231, 231, 231);
        border-bottom: solid 1px rgb(231, 231, 231);
      }

      .close {
        display: inline-block;
        width: 14px;
        height: 14px;
        margin-left: 5px;
        color: rgba(231, 231, 231, 0.6);
        cursor: pointer;

        .codicon {
          font-size: 12px;
        }

        .codicon:hover {
          color: rgba(231, 231, 231, 0.8);
          background-color: rgba(90, 93, 94, 0.31);
        }
      }


    }
  }

  .title-actions {
    flex: 1;
    padding-left: 5px;
    height: 35px;

    ul {
      white-space: nowrap;
      display: flex;
      margin: 0 auto;
      padding: 0;
      height: 100%;
      width: 100%;
      align-items: center;
      justify-content: flex-end;

      li {
        display: block;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        position: relative;
        margin-right: 4px;
      }
    }
  }

  .global-actions {
    white-space: nowrap;
    height: 100%;

    ul {
      display: flex;
      margin: 0 auto;
      padding: 0;
      height: 100%;
      width: 100%;
      align-items: center;

      li {
        display: block;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        position: relative;
      }
    }
  }

  .action-label {
    padding: 3px;
    display: block;
    background-size: 16px;
    background-position: 50%;
    background-repeat: no-repeat;
    color: inherit;
    width: 16px;
    height: 16px;
    box-sizing: content-box;
  }

  .action-label:hover {
    background-color: rgba(90, 93, 94, 0.31);
  }
}
</style>

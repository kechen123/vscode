<template>
  <div class="title">
    <div class="panel-switch">
      <ul>
        <li>
          <a> 终端 </a>
          <div class="active-item-indicator"></div>
        </li>
        <li>
          <a style="color: rgba(231, 231, 231, 0.6)"> 输出 </a>
          <div></div>
        </li>
        <li>
          <a style="color: rgba(231, 231, 231, 0.6)"> 调试控制台 </a>
          <div></div>
        </li>
      </ul>
    </div>
    <div class="title-actions">
      <ul>
        <li>
          <a
            class="action-label codicon codicon-split-horizontal"
            title="拆分终端 (Ctrl+Shift+5)"
          ></a>
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
          <a class="action-label codicon codicon-close" title="关闭面板"></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

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
        padding: 2px 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        position: relative;
        a {
          color: rgb(231, 231, 231);
          border-bottom-color: rgb(231, 231, 231);
        }
        .active-item-indicator {
          position: absolute;
          z-index: 1;
          bottom: 0;
          overflow: hidden;
          pointer-events: none;
          height: 100%;
          top: -6px;
          left: 10px;
          width: calc(100% - 20px);
        }
        .active-item-indicator::before {
          content: '';
          position: absolute;
          z-index: 1;
          bottom: 0;
          width: 100%;
          height: 0;
          border-top-width: 1px;
          border-top-style: solid;
          border-top-color: #e7e7e7;
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

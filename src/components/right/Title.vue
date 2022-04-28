<template>
  <div class="title">
    <div class="panel-switch">
      <ul>
        <li>
          <a> 终端 </a>
          <div class="active-item-indicator"></div>
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
}
</style>

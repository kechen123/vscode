<template>
  <div class="activitybar">
    <div class="content">
      <div class="composite-bar">
        <div class="monaco-action-bar">
          <ul class="actions-container">
            <li class="action-item">
              <a class="iconfont icon-folderOpen"></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.activitybar {
  width: 48px;
  height: 100%;
  background: rgb(51, 51, 51);
  .content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .monaco-action-bar {
      white-space: nowrap;
      height: 100%;
      .actions-container {
        display: flex;
        margin: 0 auto;
        padding: 0;
        height: 100%;
        width: 100%;
        align-items: center;
        .action-item {
          display: block;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: relative;
          a {
            position: relative;
            z-index: 1;
            display: flex;
            overflow: hidden;
            width: 48px;
            height: 48px;
            margin-right: 0;
            box-sizing: border-box;
            font-size: 24px;
            align-items: center;
            justify-content: center;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>

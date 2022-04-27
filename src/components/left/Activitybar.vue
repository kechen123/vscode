<template>
  <div class="activitybar">
    <div class="content">
      <div class="composite-bar">
        <div class="monaco-action-bar">
          <ul class="actions-container">
            <li
              v-for="(item, key) in actions"
              @click="click(item)"
              :class="['action-item', item.id === active ? 'selected' : '']"
            >
              <a :class="['action-label', 'codicon', item.icon]"></a>
              <div class="active-item-indicator"></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
//icon https://microsoft.github.io/vscode-codicons/dist/codicon.html
const actions = reactive([
  {
    id: 1,
    icon: 'codicon-files',
    name: '文件'
  },
  {
    id: 2,
    icon: 'codicon-search',
    name: '搜索'
  },
  {
    id: 3,
    icon: 'codicon-source-control',
    name: '源码'
  },
  {
    id: 4,
    icon: 'codicon-debug-alt-small',
    name: '调试'
  },
  {
    id: 5,
    icon: 'codicon-extensions',
    name: '扩展'
  }
])
const active = ref(1)
const click = (obj: any) => {
  active.value = obj.id
}
</script>

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
      color: rgba(255, 255, 255, 0.4);

      .actions-container {
        display: flex;
        margin: 0 auto;
        flex-direction: column;
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
          .active-item-indicator {
            content: '';
            position: absolute;
            z-index: 1;
            top: 0;
            height: 100%;
            width: 0;
            border-left: 2px solid #fff;
            display: none;
          }
          .action-label {
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
          }
        }
        .selected {
          .active-item-indicator {
            display: block;
          }
          .action-label {
            color: #fff;
          }
        }
      }
    }
  }
}
</style>

<template>
  <div class="left">
    <div class="title">
      <div class="label">
        <h2>源代码管理</h2>
      </div>
      <div class="actions">
        <div class="content">
          <el-dropdown trigger="click">
            <a class="codicon codicon-ellipsis el-dropdown-link"> </a>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>Action 1</el-dropdown-item>
                <el-dropdown-item>Action 2</el-dropdown-item>
                <el-dropdown-item>Action 3</el-dropdown-item>
                <el-dropdown-item disabled>Action 4</el-dropdown-item>
                <el-dropdown-item divided>Action 5</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div class="loading">
      <LeftLoading ref="loading" />
    </div>
    <el-collapse v-model="activeNames" @change="handleChange" accordion>
      <el-collapse-item v-if="tree.length === 0" title="无法打开文件夹" name="1">
        <LeftWelcome />
      </el-collapse-item>
      <el-collapse-item v-else-if="tree[0].children" :title="tree[0].label" name="1">
        <LeftSidebar
          :tree="tree[0].children"
          :isLocal="isLocal"
          @showLoading="showLoading"
          @hideLoading="hideLoading" />
      </el-collapse-item>
      <el-collapse-item title="Outline" name="2">
        <div>
          Operation feedback: enable the users to clearly perceive their operations by style updates
          and interactive effects;
        </div>
      </el-collapse-item>
      <el-collapse-item title="Timeline" name="3">
        <div>Simplify the process: keep operating process simple and intuitive;</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
import pubsub from 'pubsub-js'
import { themeIcons } from 'seti-icons'
import { useDebounceFn } from '@vueuse/core'
import useEventListener from '@hook/useEventListener'
interface Tree {
  label: string
  file?: any
  children?: Tree[]
}
const loading = ref()
const headerHeight = 30
const footerHeight = 22
const otherHeight = headerHeight + footerHeight + 35 + 4 + 22 * 3
const size = ref({
  width: document.documentElement.clientWidth,
  height: document.documentElement.clientHeight,
  h: document.documentElement.clientHeight - otherHeight + 'px'
})
const isLocal = ref(false)
const activeNames = ref(['1'])
const tree = ref<Tree[]>([])
interface Em {
  data: any
  local: boolean
}
const OpenFolder = (data: any, local: boolean) => {
  tree.value = data
  console.log(tree.value[0].children)
  isLocal.value = local
}
const handleChange = (val: any) => {
  console.log(val)
}

const showLoading = () => {
  loading.value.showLoading()
}

const hideLoading = () => {
  loading.value.hideLoading()
}

const setWindowSize = useDebounceFn((event: Event) => {
  size.value = {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
    h: document.documentElement.clientHeight - otherHeight + 'px'
  }
})
const getIcon = themeIcons({
  blue: '#268bd2',
  grey: '#657b83',
  'grey-light': '#839496',
  green: '#859900',
  orange: '#cb4b16',
  pink: '#d33682',
  purple: '#6c71c4',
  red: '#dc322f',
  white: '#fdf6e3',
  yellow: '#b58900',
  ignore: '#586e75'
})

//文件图标
const setTreeFileIcon = (list: any) => {
  for (let i = 0; i < list.length; i++) {
    const element = list[i]
    if (element.children || element?.type === 'dir') {
      setTreeFileIcon(element.children)
    } else {
      const { svg, color } = getIcon(element.label)
      element.svg = svg
      element.color = color
    }
  }
}
useEventListener('resize', setWindowSize, {
  target: window
})

onMounted(() => {
  pubsub.subscribe('webSocket', (msg: string, data: any) => {
    if (data.type === 'finderTree') {
      hideLoading()
      const { data: list } = data
      setTreeFileIcon(list[0].children)
      OpenFolder(list, false)
    }
    else if (data.type === 'openFile') {
      const { data: list } = data
      console.log(list)
    }
  })
  electron.receive("open-directory", (data) => {
    showLoading()
    window.WS.finderTree(data)
  });
})
onUnmounted(() => {
  pubsub.unsubscribe('webSocket');
})
</script>

<style scoped lang="less">
.left {
  background-color: rgb(37, 37, 38);
  outline-color: rgba(83, 89, 93, 0.5);
  width: 100%;
  height: 100%;

  .title {
    display: none;
    height: 35px;
    display: flex;
    box-sizing: border-box;
    overflow: hidden;
    padding-left: 8px;
    padding-right: 8px;
    color: rgb(187, 187, 187);

    .label h2 {
      font-size: 11px;
      line-height: 35px;
      cursor: default;
      font-weight: 400;
      margin: 0;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .loading {
    position: relative;
    height: 2px;
    overflow: hidden;
  }

  .actions {
    flex: 1;
    padding-left: 5px;

    .content {
      display: flex;
      margin: 0 auto;
      padding: 0;
      height: 100%;
      width: 100%;
      align-items: center;
      justify-content: flex-end;

      .el-dropdown-link {
        cursor: pointer;
        color: #ccc;
      }
    }
  }
}

.el-collapse {
  --el-collapse-content-bg-color: unset;
  --el-collapse-header-bg-color: unset;
  --el-collapse-border-color: rgba(83, 89, 93, 0.5);
  --el-collapse-header-text-color: #ccc;
  --el-collapse-content-text-color: #ccc;
  --el-collapse-header-height: 22px;
  --el-collapse-header-font-size: 11px;
  border-top: 0;
}
</style>
<style>
.el-collapse-item__header {
  position: relative;
  padding-left: 20px;
  text-transform: uppercase;
}

.el-collapse-item__arrow {
  margin: 4px !important;
  left: 0px;
  position: absolute !important;
}

.el-collapse-item__content {
  padding-bottom: 0 !important;
  height: v-bind(size.h);
}

.el-collapse-item:last-child .el-collapse-item__header {
  border-bottom: none;
}
</style>

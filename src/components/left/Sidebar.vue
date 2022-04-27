<template>
  <div class="sidebar">
    <el-tree
      :default-expanded-keys="[1]"
      :data="props.tree"
      node-key="id"
      :indent="5"
      :icon="ArrowRight"
      highlight-current
      :check-on-click-node="true"
    >
      <template #default="{ node, data }">
        <div
          v-if="node.isLeaf"
          class="custom-tree-node"
          @click="treeClick(data, node)"
          @dblclick.native="treeDbClick(data, node)"
        >
          <div class="icon" :style="{ fill: data.color }" v-html="data.svg"></div>
          <div>{{ node.label }}</div>
        </div>
        <div v-else class="custom-tree-node">
          <div>{{ node.label }}</div>
        </div>
      </template>
    </el-tree>
  </div>
</template>

<script setup lang="ts">
import pubsub from 'pubsub-js'
import { ArrowRight } from '@element-plus/icons-vue'
import { useTabList } from '@store/tabs'
interface Tree {
  label: string
  file?: any
  url?: string
  children?: Tree[]
}
interface Props {
  tree: Tree[]
  isLocal: boolean
}
const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'showLoading'): void
  (e: 'hideLoading'): void
}>()
let time: any = null
let pubId: any = null
const useTab = useTabList()

const treeClick = (data: Tree, node: any) => {
  clearTimeout(time)
  time = setTimeout(() => {
    const name = node.label
    emit('showLoading')
    if (useTab.list.has(name)) {
      //已经打开当前文件，选中当前文件选项卡
      useTab.changeActive(name)
    } else if (data.file && props.isLocal) {
      // 读取文件内容并打开新选项卡,当前状态为预览状态
      let path = getFilePath(node)
      getLocalFileText(data, path)
    } else if (data?.url && props.isLocal === false) {
      getServerFileText(data)
    }
    emit('hideLoading')
  }, 100)
}

const treeDbClick = (data: Tree, node: any) => {
  clearTimeout(time)
  const name = data.file?.name
  const state = useTab.getActiveTabState()
  if (useTab.list.has(name)) {
    //已经打开当前文件，选中当前文件选项卡
    useTab.changeActive(name)
    if (state === 'preview') {
      //当前选项卡为预览状态，则切换到编辑状态
      useTab.editTabListState(name, 'edit')
    }
  } else if (data.file) {
    // 读取文件内容并打开新选项卡,当前状态为编辑状态
    let path = getFilePath(node)
    getFileText(data, path, 'edit')
  }
}
//本地文件内容
const getLocalFileText = async (
  data: any,
  path: string[],
  state: 'preview' | 'edit' | 'dirty' = 'preview'
) => {
  let text: string = ''
  text = await data.file.text()
  path.reverse()
  useTab.addTab({
    name: data.file.name,
    text,
    state,
    svg: data.svg,
    color: data.color,
    pathStr: path.join('/'),
    path: path,
    entry: data.entry,
    file: data.file
  })
}

const getServerFileText = async (data: any, state: 'preview' | 'edit' | 'dirty' = 'preview') => {
  window.WS.getFileText(data.url)
  if (pubId) {
    pubsub.unsubscribe(pubId)
  }
  pubId = pubsub.subscribe('webSocket', (msg: string, result: any) => {
    if (result.type === 'fileText') {
      console.log(result)
      // let path = data.path.split('/')
      // path.reverse()
      // useTab.addTab({
      //   name: data.file.name,
      //   text: result.data,
      //   state,
      //   svg: data.svg,
      //   color: data.color,
      //   pathStr: data.path,
      //   path: path
      // })
    }
  })
}

const getFilePath = (node: any, path: string[] = []) => {
  if (node?.data?.label) {
    path.push(node.data.label)
  }
  if (node?.parent && node?.parent.level > 0) {
    getFilePath(node.parent, path)
  }
  return path
}
</script>

<style scoped lang="less">
.sidebar {
  background-color: rgb(37, 37, 38);
  outline-color: rgba(83, 89, 93, 0.5);
  width: 100%;
  height: 100%;
  padding: 0 10px;
  overflow: auto;
}

.sidebar::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}
.sidebar:hover::-webkit-scrollbar {
  width: 12px;
  height: 12px;
}

.sidebar::-webkit-scrollbar-thumb {
  background: #333;
}

.sidebar::-webkit-scrollbar-track {
  border-radius: 0;
  background: transparent;
}
.el-tree {
  background-color: unset !important;
  --el-tree-node-hover-bg-color: #2a2d2e;
  --el-tree-text-color: #ccc;
  --el-tree-expand-icon-color: #ccc;
  --el-color-primary-light-9: #37373d;
  user-select: none;
  margin-bottom: 20px;
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 13px;
  padding-right: 8px;
  .icon {
    width: 18px;
    height: 18px;
    fill: #ccc;
    margin-right: 2px;
    svg {
      --fill: inherit;
      height: 1em;
      width: 1em;
      line-height: 1em;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      position: relative;
      fill: currentColor;
      fill: var(--color);
      font-size: inherit;
    }
  }
}
</style>

<style lang="less">
.el-tree .el-tree-node__expand-icon.is-leaf {
  width: 3px;
  padding: 0;
}
.el-tree-node__content {
  height: 22px !important;
}
.el-tree-node:focus {
  > .el-tree-node__content {
    background-color: #094771 !important;
    outline: 1px solid #007fd4;
    outline-offset: -1px;
  }
}
</style>

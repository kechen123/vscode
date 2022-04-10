<template>
  <div class="sidebar">
    <LeftWelcome v-if="tree.length === 0" @OpenFolder="OpenFolder" />
    <el-tree
      v-else
      :default-expanded-keys="[1]"
      :data="tree"
      node-key="id"
      :icon="ArrowRight"
      highlight-current
      :check-on-click-node="true"
    >
      <template #default="{ node, data }">
        <div
          class="custom-tree-node"
          @click="treeClick(data, node)"
          @dblclick.native="treeDbClick(data, node)"
        >
          <div
            v-if="node.isLeaf"
            class="icon"
            :style="{ fill: data.color }"
            v-html="data.svg"
          ></div>
          <div>{{ node.label }}</div>
        </div>
      </template>
    </el-tree>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import { useTabList } from '@/store/content_tablist'

const useTab = useTabList()
const tree = ref([])
const treeClickCount = ref(0)
let time: any = null
interface Tree {
  label: string
  file?: any
  children?: Tree[]
}

const treeClick = (data: Tree, node: any) => {
  clearTimeout(time)
  time = setTimeout(() => {
    if (data.file) {
      let path = getFilePath(node)
      getFileText(data, path)
    }
  }, 300)
}

const treeDbClick = (data: Tree, node: any) => {
  clearTimeout(time)
  const state = useTab.getActiveTabState()
  if (data.file && state === 'preview') {
    let path = getFilePath(node)
    getFileText(data, path, 'edit')
  }
}

const handleNodeClick = (data: Tree, node: any) => {
  if (data.file) {
    treeClickCount.value++
    if (treeClickCount.value > 2) return
    setTimeout(() => {
      let path = getFilePath(node)
      if (treeClickCount.value == 1) {
        if (!useTab.list.has(data.file.name)) {
          treeClickCount.value = 0
          // 进行单击事件处理
          getFileText(data, path)
        }
      } else if (treeClickCount.value == 2) {
        treeClickCount.value = 0
        // 进行双击事件处理
        getFileText(data, path, 'edit')
      }
    }, 300)
  }
}

const getFileText = async (
  data: any,
  path: string[],
  state: 'preview' | 'edit' | 'dirty' = 'preview'
) => {
  const text: string = await data.file.text()
  useTab.addTab({
    name: data.file.name,
    text,
    state,
    svg: data.svg,
    color: data.color,
    path: path.reverse(),
    entry: data.entry,
    file: data.file
  })
}
const OpenFolder = (data: any) => {
  tree.value = data
}
const getFilePath = (node: any, path: string[] = []) => {
  if (node?.data?.label) {
    path.push(node.data.label)
  }
  if (node?.parent && node?.parent.level > 1) {
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
}
.el-tree {
  background-color: unset !important;
  --el-tree-node-hover-bg-color: #2a2d2e;
  --el-tree-text-color: #ccc;
  --el-tree-expand-icon-color: #ccc;
  --el-color-primary-light-9: #37373d;
  user-select: none;
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

.el-tree-node:focus {
  > .el-tree-node__content {
    background-color: #094771 !important;
    outline: 1px solid #007fd4;
    outline-offset: -1px;
  }
}
</style>

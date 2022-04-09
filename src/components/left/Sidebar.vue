<template>
  <div class="sidebar">
    <LeftWelcome v-if="tree.length === 0" @OpenFolder="OpenFolder" />
    <el-tree
      v-else
      :default-expanded-keys="[1]"
      :data="tree"
      node-key="id"
      :icon="ArrowRight"
      @node-click="handleNodeClick"
    >
      <template #default="{ node, data }">
        <div class="custom-tree-node">
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
interface Tree {
  label: string
  file?: any
  children?: Tree[]
}

const handleNodeClick = (data: Tree) => {
  if (data.file) {
    treeClickCount.value++
    if (treeClickCount.value > 2) return
    setTimeout(() => {
      if (treeClickCount.value == 1) {
        if (useTab.list.has(data.file.name)) {
          return
        }
        // 进行单击事件处理
        getFileText(data)
      } else if (treeClickCount.value == 2) {
        // 进行双击事件处理
        getFileText(data, 'edit')
      }
      treeClickCount.value = 0
    }, 300)
  }
}

const getFileText = async (data: any, state: 'preview' | 'edit' | 'dirty' = 'preview') => {
  console.log(data)
  const text: string = await data.file.text()
  useTab.addTab({
    entry: data.entry,
    file: data.file,
    name: data.file.name,
    text,
    state,
    svg: data.svg,
    color: data.color
  })
}
const OpenFolder = (data: any) => {
  console.log(data)
  tree.value = data
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
<style>
.el-tree .el-tree-node__expand-icon.is-leaf {
  display: none;
}
</style>

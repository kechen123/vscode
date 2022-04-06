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
    />
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
interface TreeList {
  Tree: []
}
const handleNodeClick = (data: Tree) => {
  treeClickCount.value++
  if (treeClickCount.value > 2) return
  setTimeout(() => {
    if (treeClickCount.value == 1) {
      // 进行单击事件处理
      getFileText(data.file)
    } else if (treeClickCount.value == 2) {
      // 进行双击事件处理
      getFileText(data.file, true)
    }
    treeClickCount.value = 0
  }, 300)
}

const getFileText = async (file: any, edit: boolean = false) => {
  const text: string = await file.text()
  const name: string = file.name
  useTab.addTab({ name, text, edit })
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
}
// .el-tree-node__label {
//   color: #ccc;
// }
// .el-tree-node__content:hover {
//   background-color: #2a2d2e !important;
// }
</style>

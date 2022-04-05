<template>
  <div class="tablist">
    <el-tabs v-model="editableTabsValue" type="card" class="demo-tabs">
      <el-tab-pane v-for="(item, i) in list" :key="item.name" :label="item.name" :name="item.name">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><calendar /></el-icon>
            <span class="label">{{ item.name }}</span>
          </span>
        </template>
        <div class="tabs-breadcrumbs">
          <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
            <el-breadcrumb-item>promotion management</el-breadcrumb-item>
            <el-breadcrumb-item>promotion list</el-breadcrumb-item>
            <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div
          class="custom-tabs-content"
          :style="{ height: `${pageSize[1] - tabHeight - breadcrumbHeight}px` }"
        >
          <Editor :code="item.text" :option="option" />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { Calendar, ArrowRight } from '@element-plus/icons-vue'
import { useTabList } from '@/store/content_tablist'
const tabHeight = 35
const breadcrumbHeight = 22
const pageSize = [document.documentElement.clientWidth, document.documentElement.clientHeight]
const useTab = useTabList()
const list = useTab.list
let tabIndex = 1
const editableTabsValue = ref(list[0].name)
const option = {
  language: 'html',
  format: true,
  theme: 'vs-dark',
  minimap: {
    enabled: true // 是否启用预览图
  }
}

const handleTabsEdit = (targetName: string | number | null, action: 'remove' | 'add') => {
  if (action === 'add') {
    // const newTabName = `${++tabIndex}`
    // editableTabs.value.push({
    //   title: 'New Tab',
    //   name: newTabName,
    //   content: 'New Tab content'
    // })
    // editableTabsValue.value = newTabName
  } else if (action === 'remove') {
    // const tabs = editableTabs.value
    // let activeName = editableTabsValue.value
    // if (activeName === targetName) {
    //   tabs.forEach((tab, index) => {
    //     if (tab.name === targetName) {
    //       const nextTab = tabs[index + 1] || tabs[index - 1]
    //       if (nextTab) {
    //         activeName = nextTab.name
    //       }
    //     }
    //   })
    // }
    // editableTabsValue.value = activeName
    // editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
  }
}

const change = (val: string) => {
  console.log(val)
}

onMounted(() => {
  let element = document.querySelector('.tablist')
  if (element) {
    let obverser = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target.classList.contains('tablist')) {
          if (element) {
            let width = getComputedStyle(element).getPropertyValue('width')
            let height = getComputedStyle(element).getPropertyValue('height')
            console.log(width, height)
            element.style.width = width + 'px'
            element.style.height = height + 'px'
          }
        }
      }
    })
    obverser.observe(element)
  }
})
</script>

<style scoped lang="less">
.tablist {
  display: flex;
  height: 100%;
  width: 100%;
  background-color: rgb(30, 30, 30);
  --el-color-primary: rgba(255, 255, 255, 1);
  --el-text-color-primary: rgba(255, 255, 255, 0.5);

  .label {
    margin-left: 6px;
  }
  .tabs-breadcrumbs {
    font-size: 13px;
    color: #cccccc;
    flex: 1 100%;
    height: 22px;
    cursor: default;
    .el-breadcrumb {
      line-height: 22px;
      font-size: 13px;
      padding-left: 10px;
    }
  }
}
</style>
<style>
.demo-tabs {
  width: 100%;
  height: 100%;
}
.demo-tabs > .el-tabs__content {
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.el-tabs__header {
  height: 35px;
  background-color: rgb(37, 37, 38);
  margin: 0 !important;
}

.custom-tabs-content {
  width: 100%;
  height: 100%;
}
.el-tabs__item .is-icon-close:hover {
  background-color: rgba(90, 93, 94, 0.31) !important;
}
.el-tabs--card > .el-tabs__header .el-tabs__item .is-icon-close {
  position: relative;
  font-size: 14px !important;
  width: 0;
  width: 20px !important;
  height: 20px !important;
  vertical-align: middle;
  line-height: 15px !important;
  overflow: hidden;
  top: -5px !important;
  right: -10px !important;
  transform-origin: 100% 50%;
  border-radius: 4px;
  visibility: hidden;
}

.el-tabs--card > .el-tabs__header .el-tabs__item.is-active.is-closable .is-icon-close {
  visibility: visible;
}
.el-tabs--card > .el-tabs__header .el-tabs__item.is-closable:hover .is-icon-close {
  visibility: visible;
}
.el-tabs--card > .el-tabs__header .el-tabs__item.is-closable:hover {
  padding: 0 20px !important;
}
.el-tabs--card > .el-tabs__header .el-tabs__nav {
  border: 0 !important;
}
.el-tabs--card > .el-tabs__header .el-tabs__item {
  border: 0 !important;
  background-color: rgb(37, 37, 38);
  height: 35px;
}
.el-tabs--card > .el-tabs__header {
  border-bottom: 0 !important;
}
.el-tabs__item:hover {
  color: var(--el-text-color-primary) !important;
}
.el-tabs__item.is-active {
  color: var(--el-color-primary) !important;
  border-right: 1px solid rgb(37, 37, 38);
  background-color: rgb(30, 30, 30) !important;
}
</style>

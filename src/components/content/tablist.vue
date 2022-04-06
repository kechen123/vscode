<template>
  <div class="tablist">
    <el-tabs
      v-model="tabData.active"
      closable
      type="card"
      class="demo-tabs"
      @tab-remove="removeTab"
    >
      <el-tab-pane
        v-for="(item, key) in tabData.list"
        :key="key"
        :label="item.name"
        :name="item.name"
      >
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><calendar /></el-icon>
            <span :class="[item.edit ? '' : 'italic', 'label']">{{ item.name }}</span>
          </span>
        </template>
        <div class="tabs-breadcrumbs">
          <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
            <el-breadcrumb-item> management</el-breadcrumb-item>
            <el-breadcrumb-item> list</el-breadcrumb-item>
            <el-breadcrumb-item> detail</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div
          class="custom-tabs-content"
          :style="{ height: `${pageSize[1] - tabHeight - breadcrumbHeight}px` }"
        >
          <Editor :code="item.text" :option="option" :name="item.name" />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Calendar, ArrowRight } from '@element-plus/icons-vue'
import { useTabList } from '@/store/content_tablist'
import { Tab, TabList } from '@/common/types/editor'

const tabHeight = 35
const breadcrumbHeight = 22
const pageSize = [document.documentElement.clientWidth, document.documentElement.clientHeight]
const store = useTabList()
const tabData = reactive<TabList>({
  list: [],
  active: ''
})

watchEffect(() => {
  tabData.list = Array.from(store.list.values())
  tabData.active = store.active
  console.log(tabData)
})

const option = {
  language: 'dynamic',
  format: true,
  theme: 'vs-dark',
  minimap: {
    enabled: true // 是否启用预览图
  }
}

const removeTab = (targetName: string | number) => {
  console.log('删除tab选项卡', targetName)
}
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
  .italic {
    font-style: italic;
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

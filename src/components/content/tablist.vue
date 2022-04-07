<template>
  <div class="tablist">
    <el-tabs v-model="tabData.active" type="card" class="demo-tabs" @tab-remove="removeTab">
      <el-tab-pane
        v-for="(item, key) in tabData.list"
        :key="`${key}_${item.state}`"
        :label="item.name"
        :name="item.name"
      >
        <template #label>
          <div class="custom-tabs-label" @dblclick="dblclickTab(item.name, item.state)">
            <div class="file-ext">
              <i class="iconfont icon-javascript"></i>
            </div>
            <div class="file-name">
              <span :class="[item.state, 'label']">{{ item.name }}</span>
            </div>
            <div class="file-state">
              <div class="btns">
                <el-icon @click="removeTab(item.name)"><close /></el-icon>
              </div>
            </div>
          </div>
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
import { Calendar, ArrowRight, Close } from '@element-plus/icons-vue'
import { useTabList } from '@/store/content_tablist'
import { TabList } from '@common/types/editor'

const tabHeight = 35
const breadcrumbHeight = 22
const option = {
  language: 'dynamic',
  format: true,
  theme: 'vs-dark',
  minimap: {
    enabled: true // 是否启用预览图
  }
}
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

const removeTab = (targetName: string | number) => {
  store.removeTab(targetName.toString())
}
const dblclickTab = (key: string, state: 'preview' | 'edit' | 'dirty') => {
  if (state === 'preview') store.editTabEdit(key, 'edit')
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

  .custom-tabs-label {
    display: flex;
    > div {
      display: flex;
    }
    .file-ext {
      height: 16px;
      width: 16px;
      margin-top: 8px;
      margin-right: 6px;
      align-items: center;
      i {
        --color: inherit;
        height: 1em;
        width: 1em;
        line-height: 1em;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        position: relative;
        fill: currentColor;
        color: var(--color);
        font-size: inherit;
      }
    }
    .file-name {
      line-height: 35px;
      .label {
        user-select: none;
        font-size: 13px;
      }
      .preview {
        font-style: italic;
      }
    }
    .file-state {
      margin-top: 7px;
      margin-bottom: auto;
      width: 28px;
      height: 20px;
      align-items: center;
      justify-content: center;
      .btns {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
      }
      .btns:hover {
        background-color: rgba(90, 93, 94, 0.31);
        border-radius: 4px;
      }
    }
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

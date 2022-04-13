<template>
  <div class="tablist">
    <el-tabs v-model="tabData.active" type="card" class="demo-tabs">
      <el-tab-pane
        v-for="(item, key) in tabData.list"
        :key="`${key}-${item.state}`"
        :label="item.name"
        :name="item.name"
      >
        <template #label>
          <div class="tabs-label-content">
            <div
              class="tabs-label"
              @click.stop="clickTab(item.name)"
              @dblclick.stop="dblclickTab(item.name, item.state)"
            >
              <div class="file-ext">
                <div class="svg" :style="{ fill: item.color }" v-html="item.svg"></div>
              </div>
              <div class="file-name">
                <span :class="[item.state, 'label']">{{ item.name }}</span>
              </div>
              <div :class="['icon-' + item.state, 'file-state']">
                <ul
                  @click.stop="removeTab(item.name)"
                  :class="[tabData.active === item.name ? 'selected' : '']"
                >
                  <li>
                    <i class="iconfont icon-guanbi"></i>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </template>
        <div class="tabs-breadcrumbs">
          <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item v-for="(pathItem, pathIndex) in item.path">
              <span class="tabs-breadcrumbs-item">
                <span
                  v-if="pathIndex === item.path.length - 1"
                  class="svg"
                  :style="{ fill: item.color }"
                  v-html="item.svg"
                ></span>
                <span>{{ pathItem }}</span>
              </span>
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
  <div
    class="custom-tabs-content"
    :style="{ height: `${pageSize[1] - tabHeight - breadcrumbHeight}px` }"
  >
    <Editor
      ref="editorRef"
      :code="activeData.text"
      :option="option"
      :name="activeData.name"
      @changeCode="changeCode"
    />
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { ArrowRight } from '@element-plus/icons-vue'
import { useTabList } from '@/store/tabs'
import { TabList, File } from '@/common/types/editor'
import useKeyPress from '@/hook/useKeyPress'

const editorRef = ref()
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
  test: '',
  active: ''
})
const activeData = ref({
  name: '',
  text: '',
  state: '',
  color: '',
  path: []
})

useKeyPress(['ctrl', 's'], (event) => {
  event.preventDefault()
  const active = store.active
  if (store.tabListStateByName(active) === 'dirty') {
    const editor = editorRef.value
    editor.formatCode()
    setTimeout(() => {
      let val = editor.getValue()
      saveFile(active, val)
    }, 20)
  }
})

watchEffect(() => {
  tabData.list = Array.from(store.list.values()).map((item: File) => {
    const { name, state, path, color, svg } = item
    return {
      name,
      state,
      color,
      path,
      svg
    }
  })
  tabData.active = store.active
  activeData.value = store.getActiveTabContent()
})

// https://developer.mozilla.org/en-US/docs/Web/API/FileSystemDirectoryHandle
//写入文件
async function writeFile(fileHandle: any, contents: string) {
  try {
    const writable = await fileHandle.createWritable()
    await writable.write(contents)
    await writable.close()
    return true
  } catch (error) {
    return false
  }
}

const saveFile = async (name: string, text: string) => {
  const res = await writeFile(store.getListByName(name)?.entry, text)
  if (res) {
    store.editTabListState(name, 'edit')
  } else {
    ElMessage.error({
      message: '保存失败'
    })
  }
}

const removeTab = (targetName: string) => {
  if (store.tabListStateByName(targetName) === 'dirty') {
    ElMessage.error(`${targetName} 已修改，请先保存`)
    return
  }
  store.removeTab(targetName.toString())
}

const clickTab = (key: string) => {
  if (store.active !== key) {
    store.changeActive(key)
  }
}

const dblclickTab = (key: string, state: 'preview' | 'edit' | 'dirty') => {
  if (state === 'preview') store.editTabListState(key, 'edit')
}

const changeCode = (name: string, code: string) => {
  // console.log('changeCode', name)
  if (store.tabListStateByName(name) !== 'dirty') {
    store.editTabListState(name, 'dirty')
  }
}
</script>

<style scoped lang="less">
.tablist {
  display: flex;
  width: 100%;
  background-color: rgb(30, 30, 30);
  --el-color-primary: rgba(255, 255, 255, 1);
  --el-text-color-primary: rgba(255, 255, 255, 0.5);
  .tabs-label-content {
    .tabs-label {
      padding: 0 4px 0 10px;
      display: flex;
      > div {
        display: flex;
      }
      .file-ext {
        width: 24px;
        height: 20px;
        align-items: center;
        margin-top: 7px;
        margin-bottom: auto;
        .svg {
          fill: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
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
        height: 22px;
        align-items: center;
        justify-content: center;
        .selected {
          display: block;
        }
        ul {
          width: 22px;
          height: 22px;
          display: none;
          position: relative;
          li {
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 100%;
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
              z-index: 0;
            }
            .dirty {
              z-index: 0;
            }
          }
        }
        ul:hover {
          background-color: rgba(90, 93, 94, 0.31);
          border-radius: 4px;
          .el-icon {
            z-index: 1;
          }
        }
      }
      .icon-dirty {
        .icon-guanbi::before {
          content: '\e604';
        }
      }
      .icon-dirty:hover {
        .icon-guanbi::before {
          content: '\eca0';
        }
      }
    }
  }
  .el-tabs__item:hover {
    ul {
      display: block;
    }
  }
  .tabs-breadcrumbs {
    font-size: 13px;
    color: #cccccc;
    flex: 1 100%;
    height: 22px;
    cursor: default;
    .tabs-breadcrumbs-item {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      color: rgba(204, 204, 204, 0.8);
      .svg {
        fill: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
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
      .el-breadcrumb__separator {
        margin: 0 5px;
      }
    }

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
  height: 57px;
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
  padding: 0 !important;
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

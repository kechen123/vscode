<template>
  <div class="tablist" ref="tabsRef">
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
              @click.stop="clickTab(item.name, item.path)"
              @dblclick.stop="dblclickTab(item.name, item.state)"
              @contextmenu.stop="contextmenuTab(item.name, $event)"
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
      v-show="activeData?.fileType != `image`"
      ref="editorRef"
      :tabData="tabData"
      :option="option"
      @changeCode="changeCode"
    />
    <VSImage v-if="activeData?.fileType === `image`" :file="activeData?.file" />
    <!-- <FileView
      :file="activeData.file"
      :name="activeData.name"
      :path="activeData.path"
      :state="activeData.state"
      :svg="activeData.svg"
      :text="activeData.text"
      @editHandler="changeCode"
    /> -->
  </div>
  <ContentTabContextMenu
    :name="contextMenu.name"
    :rect="contextMenu.rect"
    :menu="contextMenu.menu"
    @click="contextMenuClick"
  />
  <el-dialog
    v-model="closeDialogVisible"
    title="vscode"
    width="300px"
    :modal="false"
    draggable
    custom-class="tabsDialog"
    :close-on-click-modal="false"
  >
    <h2>是否保存更改？</h2>
    <h3>如果不保存，你的更改将会消失</h3>
    <template #footer>
      <span class="dialog-footer">
        <el-button size="small" type="primary" plain @click="saveFileHandler"> 保存 </el-button>
        <el-button size="small" type="warning" plain @click="removeTab(undefined, false)">
          不保存
        </el-button>
        <el-button size="small" type="warning" plain @click="closeDialogVisible = false">
          取消
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { ArrowRight } from '@element-plus/icons-vue'
import { useTabList } from '@store/tabs'
import { TabList, Tab } from '@common/types/editor'
import { TabContextMenu as TabContextMenuType } from '@commonTypes/contextmenu'
import useKeyPress from '@hook/useKeyPress'
import useEventListener from '@hook/useEventListener'
import { tabContextMenu } from '@config/contextmenu'
import { getFileExt, getFileType } from '@commonUtils/common'
import { writeFile } from '@commonUtils/fileSystemAccessApi'

interface ActiveData extends Tab {
  fileType: string
}

const closeDialogVisible = ref(false)
const tabsRef = ref()
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
const contextMenu = reactive({
  rect: {
    x: 0,
    y: 0
  },
  name: '',
  menu: tabContextMenu
})
const pageSize = [document.documentElement.clientWidth, document.documentElement.clientHeight]
const store = useTabList()
const tabData = reactive<TabList>({
  list: [],
  fileNames: [],
  active: ''
})
const activeFileType = ref('text')
const activeData = ref<ActiveData | undefined>()

useKeyPress(['ctrl', 's'], (event) => {
  event.preventDefault()
  saveFileHandler()
})
useEventListener(
  'contextmenu',
  (event) => {
    event.preventDefault()
  },
  {
    target: document,
    selector: '.tablist'
  }
)

watchEffect(() => {
  tabData.list = Array.from(store.list.values()).map((item: Tab) => {
    return {
      ...item
    }
  })
  tabData.fileNames = Array.from(store.list.keys())
  tabData.active = store.active
  let active = store.getActiveTabContent()

  if (active) {
    activeData.value = {
      ...active,
      fileType: getFileType(active?.file)
    }
  }

  //  fileType: getFileType(active?.file)
  // console.log(activeData.value)
})

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

const removeTab = (targetName: string | undefined, save: boolean = true) => {
  if (!targetName) {
    targetName = store.active
  }
  if (!targetName) {
    return
  }
  if (save && store.getStateByName(targetName) === 'dirty') {
    closeDialogVisible.value = true
    return
  }
  console.log(targetName)
  store.removeTab(targetName.toString())
  closeDialogVisible.value = false
}

const clickTab = (name: string, path: string[]) => {
  if (store.active !== name) {
    store.changeActive(name)
    editorRef.value.openFile(path, name)
  }
}

const dblclickTab = (key: string, state: 'preview' | 'edit' | 'dirty') => {
  if (state === 'preview') store.editTabListState(key, 'edit')
}

const contextmenuTab = (name: string, event: any) => {
  event.preventDefault()
  contextMenu.name = name
  contextMenu.rect = {
    x: event?.clientX,
    y: event?.clientY
  }
}

const changeCode = (name: string, code: string) => {
  if (store.getStateByName(name) !== 'dirty') {
    store.editTabListState(name, 'dirty')
  }
}

const saveFileHandler = () => {
  const active = store.active
  if (store.getStateByName(active) === 'dirty') {
    const editor = editorRef.value
    editor.formatCode()
    setTimeout(() => {
      let val = editor.getValue()
      saveFile(active, val)
    }, 20)
  }
}

const contextMenuClick = (data: TabContextMenuType) => {
  console.log('tab右键菜单点击', data)
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
.el-dialog__header {
  padding: 10px 14px !important;
}
.el-dialog__body {
  padding: 20px !important;
}

.el-dialog__headerbtn {
  width: 45px !important;
  height: 45px !important;
}
</style>

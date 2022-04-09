<template>
  <div class="tablist">
    <el-tabs v-model="tabData.active" type="card" class="demo-tabs">
      <el-tab-pane
        v-for="(item, key) in tabData.list"
        :key="`${key}`"
        :label="item.name"
        :name="item.name"
      >
        <template #label>
          <div class="custom-tabs-label" @dblclick="dblclickTab(item.name, item.state)">
            <div class="file-ext">
              <div class="svg" :style="{ fill: item.color }" v-html="item.svg"></div>
            </div>
            <div class="file-name">
              <span :class="[item.state, 'label']">{{ item.name }}</span>
            </div>
            <div :class="['icon-' + item.state, 'file-state']">
              <ul>
                <li>
                  <i class="iconfont icon-guanbi" @click="removeTab(item.name)"></i>
                </li>
              </ul>
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
          <Editor
            :ref="(el:any) => (editorRef[item.name] = el)"
            :code="item.text"
            :option="option"
            :name="item.name"
            @changeCode="changeCode"
          />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { Ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Calendar, ArrowRight, Close } from '@element-plus/icons-vue'
import { useTabList } from '@/store/content_tablist'
import { TabList, File } from '@/common/types/editor'
import useKeyPress from '@/hook/useKeyPress'
const editorRef = ref<any>({})
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

useKeyPress(['ctrl', 's'], (event) => {
  event.preventDefault()
  const active = store.active
  if (store.tabListStateByName(active) === 'dirty') {
    const editor = editorRef.value[active]
    editor.formatCode()
    setTimeout(() => {
      let val = editor.getValue()
      saveFile(active, val)
    }, 20)
  }
})

watchEffect(() => {
  tabData.list = Array.from(store.list.values())
  tabData.active = store.active
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
const dblclickTab = (key: string, state: 'preview' | 'edit' | 'dirty') => {
  if (state === 'preview') store.editTabListState(key, 'edit')
}
const changeCode = (name: string, code: string) => {
  if (store.tabListStateByName(name) !== 'dirty') {
    store.editTabListState(name, 'dirty')
  }
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
      height: 20px;
      align-items: center;
      justify-content: center;
      ul {
        width: 20px;
        height: 20px;
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
        .el-icon {
          z-index: 1;
        }
      }
      .btns:hover {
        background-color: rgba(90, 93, 94, 0.31);
        border-radius: 4px;
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

<template>
  <div class="welcome">
    <p>You have not yet opened a folder.</p>
    <div class="button-container">
      <el-button size="small" type="primary" @click="btnClick">Open Folder</el-button>
    </div>
    <div class="button-container">
      <el-button size="small" type="primary">Open Recent</el-button>
    </div>
    <p>You can remotely open a repository or pull request.</p>
    <div class="button-container">
      <el-button size="small" type="primary">Open Remote Repository</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { isChromeOrEdge } from '@/common/utils/browserVersion'
import { themeIcons } from 'seti-icons'
const getIcon = themeIcons({
  blue: '#268bd2',
  grey: '#657b83',
  'grey-light': '#839496',
  green: '#859900',
  orange: '#cb4b16',
  pink: '#d33682',
  purple: '#6c71c4',
  red: '#dc322f',
  white: '#fdf6e3',
  yellow: '#b58900',
  ignore: '#586e75'
})

const emit = defineEmits<{
  (e: 'OpenFolder', value: string): void
}>()

const btnClick = async () => {
  if (isChromeOrEdge()) {
    const dirHandle = await (window as any).showDirectoryPicker()
    let list = <any>[]
    let obj = <any>[
      {
        id: 1,
        label: dirHandle.name,
        children: []
      }
    ]
    await handleDirectoryEntry(dirHandle, list)
    let arr = <any>mySort(list)
    obj[0].children = arr
    emit('OpenFolder', obj)
  } else {
    console.log('当前的浏览器不支持本地文件系统访问')
  }
}
const handleDirectoryEntry = async (dirHandle: any, out: any) => {
  for await (const entry of dirHandle.values()) {
    if (entry.kind === 'file') {
      const file = await entry.getFile()
      const { svg, color } = getIcon(file.name)
      let obj = {
        label: file.name,
        file,
        svg,
        color
      }

      out.push(obj)
    }
    if (entry.kind === 'directory') {
      const newHandle = await dirHandle.getDirectoryHandle(entry.name, { create: false })
      let obj = {
        label: entry.name,
        children: []
      }
      if (entry.name !== 'node_modules') {
        await handleDirectoryEntry(newHandle, obj.children)
        out.push(obj)
      }
    }
  }
}

const mySort = (list: any) => {
  let newData = <any>[]
  for (let i = 0; i < list.length; i++) {
    const item = list[i]
    if (item.children) {
      let arr = mySort(item.children)
      item.children = arr
    }
    if (i === list.length - 1) {
      let files = list
        .filter((item: any) => {
          return item.file
        })
        .sort((a: any, b: any) => {
          return a.label.localeCompare(b.label)
        })
      let dirs = list
        .filter((item: any) => {
          return item.children
        })
        .sort((a: any, b: any) => {
          return a.label.localeCompare(b.label)
        })
      newData = [...dirs, ...files]
    }
  }
  return newData
}

const sortList = (list: any, newList?: any) => {
  if (!newList) {
    newList = <any>[]
  }
  for (let i = 0; i < list.length; i++) {
    const element = list[i]
    if (element.children) {
      sortList(element.children, newList)
    } else {
      let files = list
        .filter((item: any) => {
          return item.file
        })
        .sort((a: any, b: any) => {
          return a.label.localeCompare(b.label)
        })
      let dirs = list
        .filter((item: any) => {
          return item.children
        })
        .sort((a: any, b: any) => {
          return a.label.localeCompare(b.label)
        })
      newList = [...dirs, ...files]
    }
  }
  return newList
}
</script>

<style scoped lang="less">
.welcome {
  display: flex;
  flex-direction: column;
  padding: 0 20px 1em;
  box-sizing: border-box;
  align-items: center;
  width: 100%;
  height: 100%;
  > * {
    margin-block-start: 1em;
    margin-block-end: 0;
    margin-inline-start: 0;
    margin-inline-end: 0;
    width: 100%;
  }
  .button-container {
    width: 100%;
    max-width: 300px;
    transition: max-width 0.2s ease-out;
    button {
      width: 100%;
    }
  }
}
</style>

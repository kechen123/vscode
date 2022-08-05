<template>
  <div class="welcome">
    <p>尚未打开文件夹.</p>
    <div class="button-container">
      <el-button size="small" type="primary" @click="openFinder">打开文件夹</el-button>
    </div>
    <div class="button-container">
      <el-button size="small" type="primary">最近</el-button>
    </div>
    <!-- <p>可以打开服务器文件.</p>
    <div class="button-container">
      <el-button size="small" type="primary" @click="cloudFinder">服务器文件夹</el-button>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import pubsub from 'pubsub-js'
import { isChromeOrEdge } from '@/common/utils/browserVersion'
import { showDirectoryPicker, handleDirectoryEntry } from '@commonUtils/fileSystemAccessApi'
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

interface Em {
  data: any
  local: boolean
}


const emit = defineEmits<{
  (e: 'openFolder', data: any, local: boolean): void
  (e: 'showLoading'): void
  (e: 'hideLoading'): void
}>()

const openFinder = async () => {
  electron.send("openDirectory", "some data");
  // const result = await electron.ipcRenderer.invoke('openDirectory', 'some data')
  // window.WS.finderTree(result)
  // if (isChromeOrEdge()) {
  //   //https://developer.mozilla.org/en-US/docs/Web/API/File_and_Directory_Entries_API
  //   //https://stackoverflow.com/questions/69803693/svelte-how-to-use-native-web-apis/69804292#69804292
  //   const dirHandle = await showDirectoryPicker()
  //   let list = <any>[]
  //   let obj = <any>[
  //     {
  //       id: 1,
  //       label: dirHandle.name,
  //       children: []
  //     }
  //   ]
  //   emit('showLoading')
  //   await handleDirectoryEntry(dirHandle, list)
  //   let arr = mySort(list)
  //   setTreeFileIcon(arr)
  //   obj[0].children = arr
  //   emit('openFolder', obj, true)
  //   emit('hideLoading')
  // } else {
  //   console.log('当前的浏览器不支持本地文件系统访问')
  // }
}

const mySort = (list: any): [] => {
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

//文件图标
const setTreeFileIcon = (list: any) => {
  for (let i = 0; i < list.length; i++) {
    const element = list[i]
    if (element.children || element?.type === 'dir') {
      setTreeFileIcon(element.children)
    } else {
      const { svg, color } = getIcon(element.label)
      element.svg = svg
      element.color = color
    }
  }
}

const cloudFinder = () => {
  window.WS.finderTree()
}
onMounted(() => {
  pubsub.subscribe('webSocket', (msg: string, data: any) => {
    if (data.type === 'finderTree') {
      const { data: list } = data
      setTreeFileIcon(list[0].children)
      emit('openFolder', list, false)
    }
    else if (data.type === 'openFile') {
      const { data: list } = data
      console.log(list)
    }
  })

  electron.receive("openDirectory", (data) => {
    window.WS.finderTree(data)
  });
})
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

  >* {
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

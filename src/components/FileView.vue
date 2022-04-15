<template>
  <component :is="component" :name="name" :code="text" :option="option" :file="file"></component>
</template>

<script setup lang="ts">
// import { TabList, File, Tab } from '@common/types/editor'
import Image from '@components/filePreview/Image.vue'
import Editor from '@components/Editor.vue'
export interface File {
  name: string
  path: string[]
  file: any
  [propName: string]: any
  text: string
  svg?: string
  color?: string
}
interface Emit {
  (e: 'editHandler', name: string, code: string): void
}
const props = defineProps<File>()
const emit = defineEmits<Emit>()
const option = {
  language: 'dynamic',
  format: true,
  theme: 'vs-dark',
  minimap: {
    enabled: true // 是否启用预览图
  }
}
const component = shallowRef()
watch(
  () => props.name,
  (newValue, oldValue) => {
    const type = props.file.type.split('/')[0]
    if (type === 'image') {
      component.value = Image
    } else {
      component.value = Editor
    }

    //这种方式也能实现动态加载，但是每次切换都会重新请求文件，不太好
    // component.value = defineAsyncComponent(() => {
    //   const type = props.file.type.split('/')[0]
    //   let url = './'
    //   if (type === 'image') {
    //     url += 'filePreview/Image'
    //   } else {
    //     url += 'Editor'
    //   }
    //   return import(`${url}.vue`)
    // })
  },
  { immediate: true }
)
</script>

<style scoped></style>

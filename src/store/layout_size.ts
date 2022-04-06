import { defaultActivitybarWidth, defaultLeftWidth } from './../config/layout'
import { defineStore } from 'pinia'
import { Size, Editor } from '@/common/types/editor'

interface layout {
  page: Size
  readonly activitybar: number
  left: number
  content: Editor[]
}

export const useTabList = defineStore({
  id: 'layoutSize', // id必填，且需要唯一
  state: () => {
    return <layout>{
      page: {
        width: document.body.clientWidth,
        height: document.body.clientHeight
      },
      activitybar: defaultActivitybarWidth,
      left: defaultLeftWidth,
      content: []
    }
  }
})

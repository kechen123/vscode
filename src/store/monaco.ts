//https://github.com/suren-atoyan/monaco-loader

import { defineStore } from 'pinia'
import loader from '@monaco-editor/loader'
import * as monaco from 'monaco-editor'

interface MonacoState {
  monaco: any
}
export const useMonacoStore = defineStore({
  id: 'monaco', // id必填，且需要唯一
  state: () => {
    return <MonacoState>{
      monaco: undefined
    }
  },

  actions: {
    //异步 action
    async init() {
      loader.config({ monaco })
      loader.config({
        paths: {
          vs: '/node_modules/monaco-editor/min/vs'
        }
      })
      loader.config({
        'vs/nls': {
          availableLanguages: { '*': 'zh-cn' }
        }
      })
      loader.init().then((monacoInstance) => {
        this.monaco = monacoInstance
      })
    },
    setData(data: any) {
      console.log(data)
    }
  }
})

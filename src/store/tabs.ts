import { defineStore } from 'pinia'
import { Tab, TabListStore } from '@/common/types/editor'
import { getPrevKey, getNextKey } from '@commonUtils/common'

export const useTabList = defineStore({
  id: 'tabs', // id必填，且需要唯一
  state: () => {
    return <TabListStore>{
      list: new Map(),
      active: ''
    }
  },
  getters: {
    tabListNumber: (state) => {
      return state.list.size
    },
    getStateByName: (state) => (pathStr: string) => {
      return state.list.get(pathStr)?.state
    },
    getItemByName: (state) => (pathStr: string) => {
      return state.list.get(pathStr)
    },
    getActiveTabState: (state) => () => {
      return state.list.get(state.active)?.state
    },
    getActiveTabContent: (state) => () => {
      return state.list.get(state.active)
    },
    getListByName: (state) => (pathStr: string) => {
      return state.list.get(pathStr)
    }
  },
  actions: {
    addTab(tab: Tab) {
      const length = this.tabListNumber
      let lastVal = length > 0 ? Array.from(this.list.values()).pop() : false
      let lastKey = length > 0 ? Array.from(this.list.keys()).pop() : false
      if (lastVal && lastKey && lastVal.state === 'preview') {
        this.list.delete(lastKey)
      }
      this.list.set(tab.pathStr, tab)
      this.active = tab.pathStr
    },
    removeTab(pathStr: string) {
      this.list.delete(pathStr)
      const prevKeys = getPrevKey(this.list, pathStr)
      const nextKeys = getNextKey(this.list, pathStr)
      this.active = prevKeys === '' ? nextKeys : prevKeys
    },
    editTabListState(pathStr: string, state: 'preview' | 'edit' | 'dirty') {
      if (this.list.has(pathStr)) {
        ;(this.list.get(pathStr) as Tab).state = state
      }
    },
    changeActive(pathStr: string) {
      this.active = pathStr
    },
    //异步 action
    async login(account: string, pwd: string) {
      // const { data } = await api.login(account, pwd)
      //this.setData(data) // 调用另一个 action 的方法
      // return data
    },
    setData(data: any) {
      // console.log(data)
    }
  }
})

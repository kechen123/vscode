import { defineStore } from 'pinia'
import { Tab, TabListStore } from '@/common/types/editor'
import { getPrevKey, getNextKey } from '@utils/common'

export const useTabList = defineStore({
  id: 'tablist', // id必填，且需要唯一
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
    tabListStateByName: (state) => (name: string) => {
      return state.list.get(name)?.state
    },
    getActiveTabState: (state) => () => {
      return state.list.get(state.active)?.state
    },
    getActiveTabContent: (state) => () => {
      return state.list.get(state.active)
    },
    getListByName: (state) => (name: string) => {
      return state.list.get(name)
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
      this.list.set(tab.name, tab)
      this.active = tab.name
    },
    removeTab(name: string) {
      this.list.delete(name)
      const prevKeys = getPrevKey(this.list, name)
      const nextKeys = getNextKey(this.list, name)
      console.log('prevKeys:' + prevKeys + '---:' + (prevKeys === ''))
      console.log('nextKeys:' + nextKeys)
      this.active = prevKeys === '' ? nextKeys : prevKeys
    },
    editTabListState(name: string, state: 'preview' | 'edit' | 'dirty') {
      if (this.list.has(name)) {
        ;(this.list.get(name) as Tab).state = state
      }
    },
    changeActive(name: string) {
      this.active = name
    },
    //异步 action
    async login(account: string, pwd: string) {
      // const { data } = await api.login(account, pwd)
      //this.setData(data) // 调用另一个 action 的方法
      // return data
    },
    setData(data: any) {
      console.log(data)
    }
  }
})

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
      const prevKeys = getPrevKey(this.list, name)
      const nextKeys = getNextKey(this.list, name)
      this.active = prevKeys === '' ? nextKeys : prevKeys
      this.list.delete(name)
    },
    editTabEdit(name: string, state: 'preview' | 'edit' | 'dirty') {
      if (this.list.has(name)) {
        ;(this.list.get(name) as Tab).state = state
      }
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
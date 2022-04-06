import { defineStore } from 'pinia'
import { Tab, TabListStore } from '@/common/types/editor'

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
      if (lastVal && lastKey && lastVal.edit === false) {
        this.list.delete(lastKey)
      }
      this.list.set(tab.name, tab)
      this.active = tab.name
    },
    removeTab(index: number) {},
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

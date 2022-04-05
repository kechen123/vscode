//https://juejin.cn/post/7049196967770980389

import { defineStore } from 'pinia'
interface Tab {
  name: string
  path?: string
  text: string
  edit: boolean
}
interface TabList {
  list: Tab[]
}

export const useTabList = defineStore({
  id: 'tablist', // id必填，且需要唯一
  state: () => {
    return <TabList>{
      list: []
    }
  },
  getters: {
    tabListNumber: (state) => {
      return state.list.length
    }
  },
  actions: {
    addTab(tab: Tab) {
      this.list.push(tab)
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

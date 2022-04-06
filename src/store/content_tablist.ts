import { defineStore } from 'pinia'
import { File } from '@/common/types/editor'
interface Tab extends File {
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
      const length = this.list.length
      let last = length > 0 ? this.list[length - 1] : false
      if (last && tab.edit === false && last?.edit === false) {
        this.list[length - 1] = tab
      } else {
        this.list.push(tab)
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

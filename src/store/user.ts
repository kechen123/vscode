//https://juejin.cn/post/7049196967770980389

import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user', // id必填，且需要唯一
  state: () => {
    return {
      name: '张三',
      count: 0
    }
  },
  getters: {
    fullName: (state) => {
      return state.name + '丰'
    }
  },
  actions: {
    updateName(name: string) {
      this.name = name
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

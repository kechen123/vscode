//https://juejin.cn/post/7049196967770980389

import { type } from 'os'
import { defineStore } from 'pinia'
const defaultActivitybarWidth = 48
const defaultLeftWidth = 296
const defaultLeftMinWidth = 170
const defaultRightWidth = 400
const defaultRightMinWidth = 170
const leftWidth = defaultActivitybarWidth + defaultLeftWidth

type Item = {
  realTimeWidth: number
  downWidth: number
  show?: boolean
}
type Layout = {
  body: Item
  tree: Item
  content: Item
  terminal: Item
}

export const useLayout = defineStore({
  id: 'layout', // id必填，且需要唯一
  state: () => {
    return <Layout>{
      body: {
        realTimeWidth: leftWidth,
        downWidth: leftWidth
      },
      tree: {
        realTimeWidth: leftWidth,
        downWidth: leftWidth,
        show: true
      },
      content: {
        realTimeWidth: 0,
        downWidth: 0
      },
      terminal: {
        realTimeWidth: defaultRightWidth,
        downWidth: defaultRightWidth,
        show: false
      }
    }
  },
  getters: {
    // fullName: (state) => {
    //   return state.name + '丰'
    // }
  },
  actions: {
    update(body: Item, tree: Item, content: Item, terminal: Item) {
      this.body = body
      this.tree = tree
      this.content = content
      this.terminal = terminal
    },
    showTerminal(show: boolean) {
      this.terminal.show = show
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

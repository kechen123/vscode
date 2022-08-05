import pubsub from 'pubsub-js'
class WS {
  ws: WebSocket
  state: 'notConnected' | 'open' | 'close'
  constructor(url: string = 'ws://localhost:3005') {
    const ws = new WebSocket(url)
    this.ws = ws
    this.state = 'notConnected'
    this.init()
  }
  init() {
    const ws = this.ws
    ws.onopen = () => {
      this.state = 'open'
      const data = {
        type: 'socketState',
        data: {
          state: '已连接'
        }
      }
      pubsub.publish('webSocket', data)
    }

    ws.onmessage = (e: any) => {
      const data = JSON.parse(e.data)
      pubsub.publish('webSocket', data)
    }

    ws.onclose = (e: any) => {
      console.log(e)
      this.state = 'close'
      const data = {
        type: 'socketState',
        data: {
          state: '已断开'
        }
      }
      pubsub.publish('webSocket', data)
    }
  }
  send(data: string) {
    const { ws, state } = this
    if (state === 'open') ws.send(data)
  }
  finderTree(path: string) {
    const data = {
      type: 'finderTree',
      data: {
        path: path
      }
    }
    this.send(JSON.stringify(data))
  }
  getFileText(path: string) {
    const data = {
      type: 'getFileText',
      data: {
        path: path
      }
    }
    this.send(JSON.stringify(data))
  }
  writeFile(path: string, text: string) {
    const data = {
      type: 'writeFile',
      data: {
        path: path,
        text: text
      }
    }
    this.send(JSON.stringify(data))
  }
  openTerminal(path?: string) {
    const data = {
      type: 'openTerminal',
      data: {}
    }
    this.send(JSON.stringify(data))
  }
  terminal(cmd: string) {
    const data = {
      type: 'terminal',
      data: {
        cmd: cmd
      }
    }
    this.send(JSON.stringify(data))
  }
}
export default WS

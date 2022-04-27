import pubsub from 'pubsub-js'
class WS {
  ws: WebSocket
  state: 'connecting' | 'open' | 'closing' | 'closed'
  constructor(url: string = 'ws://localhost:8003') {
    const ws = new WebSocket(url)
    this.ws = ws
    this.state = 'closed'
    this.init()
  }
  init() {
    const ws = this.ws
    ws.onopen = () => {
      this.state = 'open'
      console.log('[WebSocket] onopen')
    }

    ws.onmessage = (e: any) => {
      const data = JSON.parse(e.data)
      pubsub.publish('webSocket', data)
      console.log('[WebSocket] 客户端收到消息:', e)
    }

    ws.onclose = (e: any) => {
      this.state = 'closed'
      console.log('[WebSocket] WebSocket onclose')
    }
  }
  send(data: string) {
    const { ws, state } = this
    if (state === 'open') ws.send(data)
  }
  finderTree() {
    const data = {
      type: 'finderTree',
      data: {
        path: `D:\\code\\vscode_web`
      }
    }
    this.send(JSON.stringify(data))
  }
  getFileText(path: string) {
    const data = {
      type: 'fileText',
      data: {
        path: path
      }
    }
    this.send(JSON.stringify(data))
  }
}
export default WS

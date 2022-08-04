import * as WebSocket from 'ws'
import * as pty from 'node-pty'
import * as os from 'os'
import { getFinderPathTree, getFileText } from './file'
import { createTerminal } from './terminal'

let ptyProcess: any = null

const createWebSocket = () => {
  let ws = new (WebSocket as any).Server({ port: 3005 })
  console.log('服务端webSocket已启动')
  ws.on('connection', (ws) => {
    console.log('server connection')
    ws.on('message', (msg) => {
      let msgData = msg.toString('utf-8')
      msgData = JSON.parse(msgData)
      console.log('收到消息:', msgData)
      if (messageFun[msgData.type]) {
        const data = messageFun[msgData.type](msgData.data, ws)
        if (data) {
          const msg = {
            type: msgData.type,
            data
          }
          ws.send(JSON.stringify(msg))
        }
      }
    })
  })
}

const messageFun = {
  finderTree: (data) => {
    const finder = getFinderPathTree(data.path)
    return finder
  },
  fileText: (data) => {
    const text = getFileText(data.path)
    return text
  },
  openTerminal: (data, ws) => {
    try {
      ptyProcess = createTerminal(data.path)
      ptyProcess.on('data', function (data) {
        data = data.toString('utf-8')
        const msg = {
          type: 'terminal',
          data
        }
        ws.send(JSON.stringify(msg))
      })
    } catch (error) {
      console.log(error)
    }
  },
  terminal: (data) => {
    console.log('收到cmd-data:', data.cmd)
    ptyProcess.write(data.cmd)
  }
}

export { createWebSocket }

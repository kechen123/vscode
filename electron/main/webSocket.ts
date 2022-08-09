import * as WebSocket from 'ws'
import { getFinderPathTree, getFileText, writeFile } from './file'
import { createTerminal } from './terminal'

let terminals: any = {}

const createWebSocket = () => {
  let ws = new (WebSocket as any).Server({ port: 3005 })
  console.log('webSocket start...')
  ws.on('connection', (ws) => {
    console.log('server connection')
    ws.on('message', (msg) => {
      let msgData = msg.toString('utf-8')
      msgData = JSON.parse(msgData)
      console.log('get message:', msgData)
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
  getFileText: (data) => {
    const text = getFileText(data.path)
    return text
  },
  writeFile: (data) => {
    const text = writeFile(data.path, data.text)
    return text
  },

  openTerminal: (data, ws) => {
    try {
      const { id, path } = data
      const ptyProcess = createTerminal(path)
      terminals[id] = ptyProcess
      ptyProcess.on('data', function (data) {
        const msg = {
          type: 'terminal',
          data: {
            msg: data,
            id
          }
        }
        console.log('send message:', msg)
        ws.send(JSON.stringify(msg))
      })
    } catch (error) {
      console.log(error)
    }
  },
  terminal: (data: { id: string; cmd: string }) => {
    console.log('cmd-data:', data.cmd)
    terminals[data.id].write(data.cmd)
  }
}

export { createWebSocket }

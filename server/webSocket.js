const WebSocket = require('ws')
const { getFinderPathTree, getFileText } = require('./file')

const createWebSocket = () => {
  const ws = new WebSocket.Server({ port: 8003 })

  ws.on('connection', (ws) => {
    console.log('server connection')
    ws.on('message', (msg) => {
      let msgData = msg.toString('utf-8')
      msgData = JSON.parse(msgData)
      console.log('收到消息:', msgData)
      if (messageFun[msgData.type]) {
        const data = messageFun[msgData.type](msgData.data)
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
  }
}

module.exports = createWebSocket

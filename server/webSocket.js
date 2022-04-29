const WebSocket = require('ws')
const pty = require('node-pty')
const os = require('os')
const { getFinderPathTree, getFileText } = require('./file')

let ptyProcess = null

const createWebSocket = () => {
  let ws = new WebSocket.Server({ port: 8003 })
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
    const shell = process.env[os.platform() === 'win32' ? 'COMSPEC' : 'SHELL']
    const path = data && data.path ? data.path : process.env.HOMEDRIVE + process.env.HOMEPATH
    ptyProcess = pty.spawn(shell, [], {
      name: 'xterm-color',

      cwd: path, //process.env.INIT_CWD
      env: process.env
    })
    ptyProcess.on('data', function (data) {
      data = data.toString('utf-8')
      console.log('获取到cmd结果-data:')
      console.log('-------------')
      console.log(data)
      console.log('-------------')
      const msg = {
        type: 'terminal',
        data
      }
      ws.send(JSON.stringify(msg))
    })
  },
  terminal: (data) => {
    console.log('收到cmd-data:', data.cmd)
    ptyProcess.write(data.cmd)
  }
}

module.exports = createWebSocket

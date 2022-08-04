import { contextBridge, ipcRenderer } from 'electron'

const message = [
  'openDirectory',
  'open-dev',
  'open-win',
  'win-maximize',
  'win-minimize',
  'win-restore',
  'win-close'
]

const url = `http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}/`

contextBridge.exposeInMainWorld('electron', {
  versions: {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron
  },
  ROOT_PATH: url,
  send: (channel, data) => {
    // whitelist channels
    if (message.includes(channel)) {
      ipcRenderer.send(channel, data)
    }
  },
  receive: (channel, func) => {
    if (message.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => func(...args))
    }
  }
})

import { contextBridge, ipcRenderer } from 'electron'

const message = [
  'open-directory',
  'open-dev',
  'open-win',
  'win-maximize',
  'win-minimize',
  'win-restore',
  'win-close'
]

contextBridge.exposeInMainWorld('electron', {
  versions: {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron
  },
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

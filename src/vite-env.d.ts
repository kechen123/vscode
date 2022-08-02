declare const electron: {
  versions: {
    node: () => string
    chrome: () => string
    electron: () => string
  }
  ipcRenderer: any
}

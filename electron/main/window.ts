import { ipcMain, dialog, BrowserWindow } from 'electron'

class W {
  win: BrowserWindow
  constructor(win: BrowserWindow) {
    this.win = win
    console.log('win', this.win)
    this.init()
  }
  init() {
    const { win } = this

    ipcMain.on('win-maximize', (event, arg) => {
      win.maximize()
    })

    ipcMain.on('win-minimize', (event, arg) => {
      win.minimize()
    })

    ipcMain.on('win-restore', (event, arg) => {
      win.restore()
    })

    ipcMain.on('win-close', (event, arg) => {
      win.close()
    })

    ipcMain.on('openDirectory', async function (event, arg) {
      const { canceled, filePaths } = await dialog.showOpenDialog({
        properties: ['openDirectory']
      })

      if (canceled) {
        win.webContents.send('openDirectory', '')
      } else {
        win.webContents.send('openDirectory', filePaths[0])
      }
    })

    ipcMain.on('open-dev', (event, arg) => {
      console.log(win.webContents.isDevToolsOpened())
      if (win.webContents.isDevToolsOpened()) {
        win.webContents.closeDevTools()
      } else {
        win.webContents.openDevTools()
      }
    })
  }
}
export default W

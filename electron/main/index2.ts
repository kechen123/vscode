import { app, BrowserWindow, dialog, ipcMain } from 'electron'
import { join } from 'path'
import { createWebSocket } from './webSocket'

export const ROOT_PATH = {
  // /dist
  dist: join(__dirname, '../..'),
  // /dist or /public
  public: join(__dirname, app.isPackaged ? '../..' : '../../../public')
}
let win: BrowserWindow | null = null
const createWindow = () => {
  const preload = join(__dirname, '../preload/index.js')
  const url = `http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}`
  const indexHtml = join(ROOT_PATH.dist, 'index.html')
  win = new BrowserWindow({
    webPreferences: {
      devTools: !app.isPackaged,
      preload,
      nodeIntegration: true
    }
  })
  createWebSocket()
  if (app.isPackaged) {
    win.loadFile(indexHtml)
  } else {
    win.loadURL(url)
  }
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
ipcMain.on('openDirectory', async function (event, arg) {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openDirectory']
  })

  if (canceled) {
    win?.webContents.send('openDirectory', '')
  } else {
    win?.webContents.send('openDirectory', filePaths[0])
  }
})

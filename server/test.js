const fs = require('fs')
const path = require('path')
let p1 = 'D:\\code\\vscode_web\\index.html'
let p2 = 'D:\\code\\vscode_web\\'
let p3 = 'D:\\code\\vscode_web\\server\\shell.txt'
fs.watch(p3, (event, filename) => {
  if (filename && event == 'change') {
    console.log(`${filename}文件发生更新`)
  }
})

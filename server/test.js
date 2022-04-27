const fs = require('fs')
const path = require('path')
let p1 = 'D:\\code\\vscode_web\\index.html'
let p2 = 'D:\\code\\vscode_web\\'
const url = p1.replace(p2, '')
console.log(url)

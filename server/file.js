const fs = require('fs')
const path = require('path')
const filterList = [
  '.git',
  '.gitignore',
  '.idea',
  '.vscode',
  'node_modules',
  'dist',
  'build',
  'server',
  'package-lock.json',
  'yarn.lock',
  'yarn-error.log'
]

function getFinderPathTree(startPath) {
  let result = [
    {
      label: path.basename(startPath),
      children: []
    }
  ]

  function finder(url, parent) {
    let files = fs.readdirSync(url)
    files.forEach((val, index) => {
      let fPath = path.join(url, val)
      const name = path.basename(fPath)
      const find = filterList.find((item) => item === name)
      if (!find) {
        let stats = fs.statSync(fPath)
        let obj = {
          label: name,
          type: 'file',
          url: fPath
        }
        if (stats.isDirectory()) {
          obj.children = []
          obj.type = 'folder'
          finder(fPath, obj.children)
        }
        parent.push(obj)
      }
    })
  }
  function mySort(list) {
    let newData = []
    for (let i = 0; i < list.length; i++) {
      const item = list[i]
      if (item.children) {
        let arr = mySort(item.children)
        item.children = arr
      }
      if (i === list.length - 1) {
        let files = list
          .filter((item) => {
            return item.type === 'file'
          })
          .sort((a, b) => {
            return a.label.localeCompare(b.label)
          })
        let dirs = list
          .filter((item) => {
            return item.type === 'folder'
          })
          .sort((a, b) => {
            return a.label.localeCompare(b.label)
          })
        newData = [...dirs, ...files]
      }
    }
    return newData
  }
  try {
    finder(startPath, result[0].children)
  } catch (error) {
    result[0] = {
      err: '读取目录出错'
    }
  }
  if (result.msg) {
    return result
  }
  result[0].children = mySort(result[0].children)
  return result
}

function getFileText(url) {
  console.log('获取文件内容', url)
  const text = fs.readFileSync(url)
  return text.toString('utf-8')
}
module.exports = {
  getFinderPathTree,
  getFileText
}

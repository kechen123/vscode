import * as fs from 'fs'
import * as path from 'path'
import * as mime from 'mime'
const filterList = ['.git', '.gitignore', '.idea', '.vscode', 'node_modules']

//文件夹目录
function getFinderPathTree(startPath) {
  let result: any = [
    {
      label: path.basename(startPath),
      children: []
    }
  ]

  function finder(url, parent) {
    let files = fs.readdirSync(url)
    files.forEach((val, index) => {
      let fPath = path.join(url, val)
      const relativePath = fPath.replace(startPath + '\\', '')
      const name = path.basename(fPath)

      const find = filterList.find((item) => item === name)
      if (!find) {
        let stats = fs.statSync(fPath)
        let obj: any = {
          label: name,
          type: 'file',
          url: fPath,
          relativePath
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
    let newData: any = []
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

//文件内容
function getFileText(url) {
  try {
    const type = mime.getType(url) || 'text/plain'
    if (type.includes('image')) {
      const content = fs.readFileSync(url, 'base64')
      return {
        msg: '读取成功',
        code: 200,
        data: content,
        type: type
      }
    }
    const text = fs.readFileSync(url, 'utf-8')
    return {
      msg: '读取成功',
      code: 200,
      data: text,
      type: type
    }
  } catch (error) {
    return {
      msg: '读取失败',
      code: 500,
      data: error
    }
  }
}

function writeFile(url, text) {
  try {
    console.log('writeFileSync', url)
    const result = fs.writeFileSync(url, text)
    console.log('writeFileSync--success', result)
    return {
      msg: '写入成功',
      code: 200,
      url: url
    }
  } catch (error) {
    return error
  }
}

function watchFile(url) {
  let p3 = 'D:\\code\\vscode_web\\server\\shell.txt'
  fs.watch(p3, (event, filename) => {
    if (filename && event == 'change') {
      console.log(`${filename}文件发生更新`)
    }
  })
}

export { getFinderPathTree, getFileText, writeFile, watchFile }

import { themeIcons } from 'seti-icons'
const getIcon = themeIcons({
  blue: '#268bd2',
  grey: '#657b83',
  'grey-light': '#839496',
  green: '#859900',
  orange: '#cb4b16',
  pink: '#d33682',
  purple: '#6c71c4',
  red: '#dc322f',
  white: '#fdf6e3',
  yellow: '#b58900',
  ignore: '#586e75'
})

// https://developer.mozilla.org/en-US/docs/Web/API/FileSystemDirectoryHandle
//写入文件
export async function writeFile(fileHandle: any, contents: string) {
  try {
    const writable = await fileHandle.createWritable()
    await writable.write(contents)
    await writable.close()
    return true
  } catch (error) {
    return false
  }
}

export async function showDirectoryPicker() {
  const dirHandle = await window.showDirectoryPicker()
  return dirHandle
}

export async function handleDirectoryEntry(dirHandle: any, out: any) {
  for await (const entry of dirHandle.values()) {
    if (entry.kind === 'file') {
      const file = await entry.getFile()
      const { svg, color } = getIcon(file.name)
      let obj = {
        label: file.name,
        file,
        entry,
        svg,
        color
      }

      out.push(obj)
    }
    if (entry.kind === 'directory') {
      const newHandle = await dirHandle.getDirectoryHandle(entry.name, { create: false })
      let obj = {
        label: entry.name,
        children: []
      }
      if (entry.name !== 'node_modules') {
        await handleDirectoryEntry(newHandle, obj.children)
        out.push(obj)
      }
    }
  }
}

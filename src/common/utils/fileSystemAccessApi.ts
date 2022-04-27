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
      let obj = {
        label: file.name,
        file,
        entry
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

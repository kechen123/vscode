//获取文件名
export function getFileName(fileName: string): string {
  return fileName.substring(0, fileName.lastIndexOf('.'))
}

//获取文件后缀名
export function getFileExt(fileName: string): string {
  if (getFileName(fileName)) {
    return fileName.substring(fileName.lastIndexOf('.') + 1)
  }
  return ''
}

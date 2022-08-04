declare const electron: {
  versions: {
    node: () => string
    chrome: () => string
    electron: () => string
  }
  send: (key: string, val: any) => void
  receive: (key: string, fn: (event: any, ...args: []) => void) => void
}

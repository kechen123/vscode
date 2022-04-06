export interface File {
  name: string
  path?: string
  text: string
}

export interface Size {
  width: number
  height: number
}

export interface Editor extends Size {
  file: File[]
}
export interface EditorWindow {
  Editor: Editor[]
}

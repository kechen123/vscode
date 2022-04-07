export interface File {
  name: string
  path?: string
  text: string
  svg?: string
  color?: string
}

export interface Size {
  width: number
  height: number
}

export interface Editor extends Size {
  file: File[]
}

export interface Tab extends File {
  state: 'preview' | 'edit' | 'dirty'
}
export interface TabListStore {
  list: Map<string, Tab>
  active: string
}

export interface TabList {
  list: Tab[]
  active: string
}
export interface EditorWindow {
  Editor: Editor[]
}
interface rect {
  w: number
  h: number
}
export interface EditorLayoutStore {
  rect: rect
  direction?: 'row' | 'column'
  files?: string[]
  active?: string
  children?: EditorLayoutStore[]
}

export interface TabContextMenu {
  id: string
  label: string
  disabled?: boolean
  icon?: string
  handler?: (event: Event) => void
  keyPress?: '' | 'ctrl' | 'shift' | 'alt' | 'meta'
  keyCode?: number
  submenu?: TabContextMenu[]
}

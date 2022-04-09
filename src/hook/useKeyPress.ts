import { Ref } from 'vue'

export type KeyPredicate = (event: KeyboardEvent) => boolean
export type keyType = number | string
export type KeyFilter = keyType | keyType[]
export type EventHandler = (event: KeyboardEvent) => void
export type KeyEvent = 'keydown' | 'keyup'
type ModifierKeys = 'ctrl' | 'shift' | 'alt' | 'meta'

export type Target = HTMLElement | Document

export type Options = {
  events?: KeyEvent[]
  target?: Target
  exactMatch?: boolean
}
// 键盘事件 keyCode 别名
const aliasKeyCodeMap = {
  '0': 48,
  '1': 49,
  '2': 50,
  '3': 51,
  '4': 52,
  '5': 53,
  '6': 54,
  '7': 55,
  '8': 56,
  '9': 57,
  backspace: 8,
  tab: 9,
  enter: 13,
  shift: 16,
  ctrl: 17,
  alt: 18,
  pausebreak: 19,
  capslock: 20,
  esc: 27,
  space: 32,
  pageup: 33,
  pagedown: 34,
  end: 35,
  home: 36,
  leftarrow: 37,
  uparrow: 38,
  rightarrow: 39,
  downarrow: 40,
  insert: 45,
  delete: 46,
  a: 65,
  b: 66,
  c: 67,
  d: 68,
  e: 69,
  f: 70,
  g: 71,
  h: 72,
  i: 73,
  j: 74,
  k: 75,
  l: 76,
  m: 77,
  n: 78,
  o: 79,
  p: 80,
  q: 81,
  r: 82,
  s: 83,
  t: 84,
  u: 85,
  v: 86,
  w: 87,
  x: 88,
  y: 89,
  z: 90,
  leftwindowkey: 91,
  rightwindowkey: 92,
  selectkey: 93,
  numpad0: 96,
  numpad1: 97,
  numpad2: 98,
  numpad3: 99,
  numpad4: 100,
  numpad5: 101,
  numpad6: 102,
  numpad7: 103,
  numpad8: 104,
  numpad9: 105,
  multiply: 106,
  add: 107,
  subtract: 109,
  decimalpoint: 110,
  divide: 111,
  f1: 112,
  f2: 113,
  f3: 114,
  f4: 115,
  f5: 116,
  f6: 117,
  f7: 118,
  f8: 119,
  f9: 120,
  f10: 121,
  f11: 122,
  f12: 123,
  numlock: 144,
  scrolllock: 145,
  semicolon: 186,
  equalsign: 187,
  comma: 188,
  dash: 189,
  period: 190,
  forwardslash: 191,
  graveaccent: 192,
  openbracket: 219,
  backslash: 220,
  closebracket: 221,
  singlequote: 222
}

// 修饰键
const modifierKey = {
  ctrl: (event: KeyboardEvent) => event.ctrlKey,
  shift: (event: KeyboardEvent) => event.shiftKey,
  alt: (event: KeyboardEvent) => event.altKey,
  meta: (event: KeyboardEvent) => event.metaKey
}

const defaultEvents: KeyEvent[] = ['keydown']

const genFilterKey = (keyFilter: KeyFilter, event: KeyboardEvent): boolean => {
  // 浏览器自动补全 input 的时候，会触发 keyDown、keyUp 事件，但此时 event.key 等为空
  if (!event.key) {
    return false
  }
  // 数字类型直接匹配事件的 keyCode
  if (typeof keyFilter === 'number') {
    return event.keyCode === keyFilter
  }
  // 字符串依次判断是否有组合键
  const genArr = Array.isArray(keyFilter) ? keyFilter : keyFilter.split('.')
  let genLen = 0
  for (const key of genArr) {
    // 组合键
    // @ts-ignore
    const genModifier = modifierKey[key]
    // keyCode 别名
    // @ts-ignore
    const aliasKeyCode = aliasKeyCodeMap[key.toLowerCase()]
    if ((genModifier && genModifier(event)) || (aliasKeyCode && aliasKeyCode === event.keyCode)) {
      genLen++
    }
  }
  return genLen === genArr.length
}

export default function (keyFilter: KeyFilter, eventHandler: EventHandler, option?: Options) {
  const { events = defaultEvents } = option || {}
  const eventHandlerRef = ref(eventHandler)
  const target = ref(option?.target || document)
  const handleEvent = (event: any) => {
    if (genFilterKey(keyFilter, event)) {
      eventHandlerRef.value(event)
    }
  }

  onMounted(() => {
    const el = target.value
    events.forEach((eventName) => {
      el?.addEventListener?.(eventName, handleEvent)
    })
  })
  onBeforeUnmount(() => {
    const el = target.value
    defaultEvents.forEach((eventName) => {
      el?.removeEventListener?.(eventName, handleEvent)
    })
  })
}

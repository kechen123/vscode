import { Ref } from 'vue'

interface Props {
  down?: (event: MouseEvent, mouse: Mouse) => void
  move?: (event: MouseEvent, mouse: Mouse) => void
  up?: (event: MouseEvent, mouse: Mouse) => void
}
interface Mouse {
  state: 'auto' | 'down' | 'move' | 'up'
  x: number //按下之后移动坐标
  y: number //按下之后移动坐标
  down: {
    x: number
    y: number
  }
  move: {
    x: number
    y: number
  }
  up: {
    x: number
    y: number
  }
}
export default function ({ down, move, up }: Props) {
  let mouse = reactive<Mouse>({
    state: 'auto',
    x: 0,
    y: 0,
    down: {
      x: 0,
      y: 0
    },
    move: {
      x: 0,
      y: 0
    },
    up: {
      x: 0,
      y: 0
    }
  })
  const target: Ref<HTMLElement | null> = ref(null)
  const mousedown = (event: MouseEvent) => {
    mouse.down.x = event.pageX
    mouse.down.y = event.pageY
    mouse.state = 'down'
    if (down) down(event, mouse)
  }
  const mousemove = (event: MouseEvent) => {
    const x = event.pageX
    const y = event.pageY
    mouse.move.x = x
    mouse.move.y = y
    if (mouse.state === 'down') {
      mouse.x = x - mouse.down.x
      mouse.y = y - mouse.down.y
    }
    if (move) {
      move(event, mouse)
    }
  }
  const mouseup = (event: MouseEvent) => {
    mouse.up.x = event.pageX
    mouse.up.y = event.pageY
    mouse.state = 'auto'
    if (up) up(event, mouse)
  }
  onMounted(() => {
    if (isRef(target) && target.value != null) {
      target.value.addEventListener('mousedown', mousedown)
      document.addEventListener('mousemove', mousemove)
      document.addEventListener('mouseup', mouseup)
    }
  })

  onBeforeUnmount(() => {
    if (isRef(target) && target.value != null) {
      target.value.removeEventListener('mousedown', mousedown)
      target.value.removeEventListener('mousemove', mousemove)
      target.value.removeEventListener('mouseup', mouseup)
    }
  })

  return [target]
}

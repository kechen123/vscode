import { Ref } from 'vue'

interface Props {
  resize?: (event: Element, width: number, height: number) => void
  className: string
}

export default function ({ resize, className }: Props) {
  const target: Ref<HTMLElement | null> = ref(null)
  onMounted(() => {
    const el = target.value
    if (el) {
      let obverser = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.target.classList.contains(className)) {
            const domRect = el.getBoundingClientRect()
            let width = domRect.width
            let height = domRect.height
            if (resize) {
              resize(entry.target, width, height)
            }
          }
        }
      })
      obverser.observe(el)
    }
  })
  return [target]
}

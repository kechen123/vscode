import { ref } from 'vue'

interface Props {
  click: any
  dbClick: any
}

//无用
export default function ({ click, dbClick }: Props) {
  const clickCount = ref(0)
  const kcClick = () => {
    clickCount.value++
    if (clickCount.value > 2) return
    setTimeout(() => {
      if (clickCount.value === 1) {
        if (click) {
          console.log(clickCount)
          click()
        }
      } else if (clickCount.value === 2) {
        if (dbClick) {
          console.log(clickCount)
          dbClick()
        }
      }
      clickCount.value = 0
    }, 300)
  }
  return kcClick
}

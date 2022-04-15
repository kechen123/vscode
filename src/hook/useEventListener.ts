interface Options {
  target?: Element | Document | Window | Document
  selector?: string
  capture?: boolean
  once?: boolean
  passive?: boolean
}

type noop = (...p: any) => void

/*
useEventListener(
  'contextmenu',
  function (event) {
    console.log(event)
  },
  {
    target: tabsRef.value,
    selector: '.tabs-label-content'
  }
)
*/

function useEventListener(eventName: string, handler: noop, options: Options): void
function useEventListener(eventName: string, handler: noop, options: Options = {}) {
  const target = options?.target || document
  const handlerRef = ref(handler)

  if (!target?.addEventListener) {
    return
  }
  const eventListener = (event: Event) => {
    if (options?.selector) {
      let el = event.target as Element,
        b = true
      while (!el.matches(options.selector)) {
        if (target === el || !el.parentElement) {
          b = false
          return
        }
        el = el.parentElement as Element
      }

      /*
       *  event['kc_target'] = el
       * Reflect.set(event, 'kc_target', el) //Reflect.defineProperty
       *
       * Object.defineProperty和Reflect.defineProperty的区别：
       * Object.defineProperty只能定义对象的属性，
       * 而Reflect.defineProperty可以定义对象的属性，也可以定义对象的方法，
       * 而且可以定义属性的特性，比如可以定义属性的可枚举、可配置、可配置的特性等。
       */
      Reflect.defineProperty(event, 'kc_target', {
        value: el,
        enumerable: true, //控制属性是否可以枚举，默认值是false
        writable: true, //控制属性是否可以被修改，默认值是false
        configurable: true //控制属性是否可以被删除，默认值是false
      })
      b && handlerRef.value(event)
    } else {
      return handlerRef.value(event)
    }
  }
  onMounted(() => {
    target.addEventListener(eventName, eventListener, {
      capture: options.capture,
      once: options.once,
      passive: options.passive
    })
  })
  onBeforeUnmount(() => {
    target.removeEventListener(eventName, eventListener)
  })
}

export default useEventListener

<template>
  <div class="terminal" ref="terminalRef">
    <div v-for="item in Object.keys(props.terminalList)" :key="item" :id="'terminal-' + item"
      v-show="item === props.active"></div>
  </div>
</template>

<script setup lang="ts">
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import 'xterm/css/xterm.css'
import 'xterm/lib/xterm.js'
import pubsub from 'pubsub-js'
import { v4 as uuidv4 } from 'uuid'
import { useLayout } from '@store/layout'
import useElementResize from '@hook/useElementResize'


type TerminalList = {
  [key: string]: {
    terminal: any
    fit: FitAddon | undefined
  }
}
type Props = {
  terminalList: TerminalList
  active: string
  change: (key: string, val: any) => void
}

const props = defineProps<Props>()
const store = useLayout()

const bodyReSize = (event: Element, width: number, height: number) => {
  console.log('resize>>>');
  try {
    Object.values(props.terminalList).forEach(item => {
      if (item.fit) {
        item.fit.fit()
      }
    })
  } catch (e) {
    console.log('e', e)
  }
}

const [terminalRef] = useElementResize({ resize: bodyReSize, className: 'container' })


const createTerminal = (id: string, ref: HTMLElement) => {
  if (props.terminalList[id].terminal) {
    return
  }
  const terminal: any = new Terminal({
    fontSize: 14,
    fontFamily: 'Menlo, "DejaVu Sans Mono", Consolas, "Lucida Console", monospace',
    cursorStyle: 'bar', //光标样式
    cursorBlink: true, //光标闪烁
    convertEol: true, //启用时，光标将设置为下一行的开头
    scrollback: 20, //终端中的回滚量
    disableStdin: false, //是否应禁用输入
    theme: {
      background: '#1e1e1e', //背景色
      foreground: '#ccc', //字体
      cursor: 'help' //设置光标
    },
    windowsMode: true
  })
  const fit = new FitAddon()
  terminal.loadAddon(fit)
  terminal.open(ref)
  terminal.prompt = () => {
    terminal.write('\r')
  }
  terminal.focus()
  terminal.onKey((e: { key: string; domEvent: KeyboardEvent }) => {
    const ev = e.domEvent
    const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey
    window.WS.terminal(e.key, id)
    // if (ev.code === 'Enter') {
    //   terminal.prompt()
    // } else if (ev.code === 'Backspace' && terminal._core.buffer.x > 2) {
    //   terminal.write('\b \b')
    // } else if (ev.code === 'Tab') {
    //   terminal.write('\r')
    // } else if (ev.ctrlKey && ev.code === 'C') {
    //   terminal.write('\n')
    // }
  })

  fit.fit()
  props.change(id, {
    terminal,
    fit
  })
}

onMounted(() => {
  pubsub.subscribe('webSocket', (msg: string, result: any) => {
    if (result.type === 'terminal') {
      const id = result.data.id
      // console.log('收到服务端控制台消息')
      console.log('收到服务端控制台消息-------------')
      console.log(msg)
      console.log(result)
      console.log('-------------')
      props.terminalList[id].terminal.write(result.data.msg)
    }
  })
  pubsub.subscribe('new-terminal', async (msg: string, result: any) => {
    if (!store.terminal.show) {
      store.showTerminal(true)
    }

    const id: string = uuidv4().substring(0, 8)
    props.change(id, {
      terminal: undefined,
      fit: undefined
    })
    await nextTick()
    window.WS.openTerminal(id)
    const ref = document.getElementById(`terminal-${id}`) as HTMLElement
    createTerminal(id, ref)
  })
})
</script>

<style scoped lang="less">
.terminal {
  width: 100%;
  height: calc(100% - 35px);
  padding: 10px;

  .container {
    width: 100%;
    height: 100%;
  }
}
</style>
<style>
.xterm-viewport.xterm-viewport {
  scrollbar-width: thin;
}

.xterm-viewport::-webkit-scrollbar {
  width: 12px;
}

.xterm-viewport:hover::-webkit-scrollbar {
  width: 12px;
}

.xterm-viewport::-webkit-scrollbar-track {
  opacity: 0;
}

.xterm-viewport::-webkit-scrollbar-thumb {
  min-height: 20px;
  background-color: #333;
}
</style>

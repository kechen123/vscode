<template>
  <div class="container" ref="terminalRef"></div>
</template>

<script setup lang="ts">
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import 'xterm/css/xterm.css'
import 'xterm/lib/xterm.js'
import pubsub from 'pubsub-js'
import useElementResize from '@hook/useElementResize'

type Obj = {
  terminal: any
  fit: FitAddon | undefined
}

let obj = reactive<Obj>({
  terminal: undefined,
  fit: undefined
})

const cmd = ref('')
let pubId: any
const bodyReSize = (event: Element, width: number, height: number) => {
  try {
    obj.fit?.fit()
  } catch (e) {
    console.log('e', e)
  }
}

const [terminalRef] = useElementResize({ resize: bodyReSize, className: 'container' })

onMounted(() => {
  const terminal: any = new Terminal({
    fontSize: 12,
    fontFamily: 'Menlo, Monaco, "Courier New", monospace',
    cursorStyle: 'bar', //光标样式
    cursorBlink: true, //光标闪烁
    convertEol: true, //启用时，光标将设置为下一行的开头
    scrollback: 20, //终端中的回滚量
    disableStdin: false, //是否应禁用输入
    theme: {
      background: '#1e1e1e', //背景色
      foreground: '#FFF', //字体
      cursor: 'help' //设置光标
    },
    windowsMode: true
  })
  const fit = new FitAddon()
  terminal.loadAddon(fit)
  terminal.open(terminalRef?.value as HTMLElement)
  terminal.prompt = () => {
    terminal.write('\r')
  }
  terminal.prompt()
  // terminal.write('D:\\code\\vscode_web>')
  terminal.focus()
  terminal.onKey((e: { key: string; domEvent: KeyboardEvent }) => {
    const ev = e.domEvent
    const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey
    window.WS.terminal(e.key)
    if (ev.code === 'Enter') {
      terminal.prompt()
      // console.log('enter')
    } else if (ev.code === 'Backspace') {
      // Do not delete the prompt
      if (terminal._core.buffer.x > 2) {
        terminal.write('\b \b')
        // cmd.value = cmd.value.substring(0, cmd.value.length - 1)
      }
    } else if (printable) {
      // if (!ev.code.includes('Arrow')) {
      //   cmd.value += e.key
      // }
      // terminal.write(e.key)
    }
  })

  fit.fit()
  obj.terminal = terminal
  obj.fit = fit
  window.WS.openTerminal()
  pubId = pubsub.subscribe('webSocket', (msg: string, result: any) => {
    if (result.type === 'terminal') {
      console.log('收到服务端控制台消息')
      console.log('-------------')
      console.log(result.data)
      console.log('-------------')
      terminal.write(result.data)
    }
  })
})
</script>

<style scoped lang="less">
.container {
  width: 100%;
  height: calc(100% - 35px);
  padding: 0 10px;
  overflow: auto;
}

.container::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}
.container:hover::-webkit-scrollbar {
  width: 12px;
  height: 12px;
}

.container::-webkit-scrollbar-thumb {
  background: #333;
}

.container::-webkit-scrollbar-track {
  border-radius: 0;
  background: transparent;
}
</style>

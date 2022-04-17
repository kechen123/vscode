import { useScriptTag } from '@vueuse/core'
declare type monacoType = typeof import('monaco-editor')
declare global {
  interface Window {
    monaco: monacoType
    define: any
    prettier: any
    prettierPlugins: any
    require: any
  }
}

function loadScript(url: string, cb: () => void) {
  const script = document.createElement('script')
  script.src = url
  document.getElementsByTagName('body')[0].appendChild(script)
  script.onload = cb
}

export function initLoadScript() {
  loadScript(
    '/node_modules/monaco-editor/min/vs/loader.js',
    // 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.30.1/min/vs/loader.min.js',
    // '/loader.min.js',
    () => {
      window.require.config({
        paths: {
          // vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.30.1/min/vs'
          vs: '/node_modules/monaco-editor/min/vs'
        }
      })
      window.require.config({
        'vs/nls': {
          availableLanguages: {
            '*': 'zh-cn'
          }
        }
      })
      window.require(['vs/editor/editor.main'], function () {})
    }
  )
}

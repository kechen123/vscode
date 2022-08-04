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
    // '/node_modules/monaco-editor/min/vs/loader.js',
    // 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.30.1/min/vs/loader.min.js',
    electron.ROOT_PATH + '/monaco-editor/loader.min.js',
    () => {
      console.log('loader.min.js loaded', typeof window.require)
      window.require.config({
        paths: {
          // vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.30.1/min/vs'
          // vs: '/node_modules/monaco-editor/min/vs'
          vs: electron.ROOT_PATH + '/monaco-editor/vs'
        }
      })
      window.require.config({
        'vs/nls': {
          availableLanguages: {
            '*': 'zh-cn'
          }
        }
      })
      window.require([electron.ROOT_PATH + '/monaco-editor/vs/editor/editor.main'], function () {})
      window.define(
        'prettier',
        [
          // 'https://unpkg.com/prettier@2.5.1/standalone.js',
          // 'https://unpkg.com/prettier@2.5.1/parser-babel.js',
          // 'https://unpkg.com/prettier@2.5.1/parser-html.js',
          // 'https://unpkg.com/prettier@2.5.1/parser-postcss.js',
          // 'https://unpkg.com/prettier@2.5.1/parser-typescript.js'
          electron.ROOT_PATH + '/monaco-editor/standalone.js',
          electron.ROOT_PATH + '/monaco-editor/parser-babel.js',
          electron.ROOT_PATH + '/monaco-editor/parser-html.js',
          electron.ROOT_PATH + '/monaco-editor/parser-postcss.js',
          electron.ROOT_PATH + '/monaco-editor/parser-typescript.js'
        ],
        (prettier: any, ...args: any[]) => {
          window.prettier = prettier
          const prettierPlugins = {
            babel: args[0],
            html: args[1],
            postcss: args[2],
            typescript: args[3]
          }
          return {
            prettier,
            prettierPlugins
          }
        }
      )
    }
  )
}

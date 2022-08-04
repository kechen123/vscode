// import prettier from 'https://unpkg.com/prettier@2.6.2/esm/standalone.mjs'
// import babel from 'https://unpkg.com/prettier@2.5.1/parser-babel.js'
// import html from 'https://unpkg.com/prettier@2.5.1/parser-html.js'
// import postcss from 'https://unpkg.com/prettier@2.5.1/parser-postcss.js'
// import typescript from 'https://unpkg.com/prettier@2.5.1/parser-typescript.js'

import * as monaco from 'monaco-editor'
import prettier from 'prettier'
import babel from 'prettier/parser-babel'
import html from 'prettier/parser-html'
import postcss from 'prettier/parser-postcss'
import typescript from 'prettier/parser-typescript'
export default function () {
  onMounted(() => {
    function provideDocumentFormattingEdits(model: any) {
      // const p = window.require('prettier')
      // if (!p.prettier) return
      // const text = p.prettier.format(model.getValue(), {
      //   filepath: model.uri.path,
      //   plugins: p.prettierPlugins,
      //   singleQuote: true,
      //   tabWidth: 2
      // })
      const text = prettier.format(model.getValue(), {
        filepath: model.uri.path,
        plugins: [babel, html, postcss, typescript],
        singleQuote: true,
        tabWidth: 2
      })
      return [
        {
          range: model.getFullModelRange(),
          text
        }
      ]
    }
    monaco.languages.registerDocumentFormattingEditProvider('javascript', {
      provideDocumentFormattingEdits
    })
    monaco.languages.registerDocumentFormattingEditProvider('typescript', {
      provideDocumentFormattingEdits
    })
    setTimeout(() => {
      window.monaco.languages.registerDocumentFormattingEditProvider('html', {
        provideDocumentFormattingEdits
      })
    }, 3000)
    window.monaco.languages.registerDocumentFormattingEditProvider('css', {
      provideDocumentFormattingEdits
    })
    window.monaco.languages.registerDocumentFormattingEditProvider('less', {
      provideDocumentFormattingEdits
    })
  })
}

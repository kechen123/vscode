// import prettier from 'https://unpkg.com/prettier@2.6.2/esm/standalone.mjs'
// import babel from 'https://unpkg.com/prettier@2.5.1/parser-babel.js'
// import html from 'https://unpkg.com/prettier@2.5.1/parser-html.js'
// import postcss from 'https://unpkg.com/prettier@2.5.1/parser-postcss.js'
// import typescript from 'https://unpkg.com/prettier@2.5.1/parser-typescript.js'
export default function () {
  onMounted(() => {
    function provideDocumentFormattingEdits(model: any) {
      const p = window.require('prettier')
      if (!p.prettier) return
      const text = p.prettier.format(model.getValue(), {
        filepath: model.uri.path,
        plugins: p.prettierPlugins,
        singleQuote: true,
        tabWidth: 2
      })
      // const text = prettier.format(model.getValue(), {
      //   filepath: model.uri.path,
      //   plugins: [babel, html, postcss, typescript],
      //   singleQuote: true,
      //   tabWidth: 2
      // })
      return [
        {
          range: model.getFullModelRange(),
          text
        }
      ]
    }
    window.monaco.languages.registerDocumentFormattingEditProvider('javascript', {
      provideDocumentFormattingEdits
    })
    window.monaco.languages.registerDocumentFormattingEditProvider('typescript', {
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

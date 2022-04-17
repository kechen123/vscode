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

<!--  -->
<template>
  <div ref="myRef" id="code-editor"></div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, PropType } from 'vue'
import * as monaco from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import { language, conf } from '@config/vueLanguage'
import { editorLanguage } from '@config/fileExt'
import { TabList, Tab } from '@common/types/editor'
import { getFileExt, getFileType } from '@commonUtils/common'
import usePrettier from '@hook/usePrettier'
/**
 * 不支持vue语法=> https://github.com/microsoft/monaco-editor/issues/1630
 * 动态language切换=> https://github.com/vitejs/vite/discussions/1791#discussioncomment-321046
 *  更改语言 => https://stackoverflow.com/questions/57781013/how-to-change-the-monaco-editors-locale
 */
// @ts-ignore
self.MonacoEnvironment = {
  getWorker(_: string, label: string) {
    if (label === 'json') {
      return new jsonWorker()
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new cssWorker()
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new htmlWorker()
    }
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker()
    }
    return new editorWorker()
  }
}
export default defineComponent({
  props: {
    tabData: {
      type: Object as PropType<TabList>,
      required: true,
      default: ''
    },
    option: {
      type: Object,
      default: () => ({})
    }
  },
  emits: {
    changeCode: (name: string, value: string) => {
      return true
    }
  },
  setup(props, context) {
    const editorStatus = ref(new Map())
    const preFilePath = ref('')
    const listener = ref<any>(null)
    usePrettier()
    let defaultOption = {
      format: false, //自定义属性，是否自动格式化
      value: '', //自定义属性，默认值
      readOnly: false, // 是否可编辑 // 是否为只读模式
      language: 'javascript', // 语言类型
      theme: 'vs', // vs, hc-black, or vs-dark // 编辑器主题
      acceptSuggestionOnCommitCharacter: true, // 接受关于提交字符的建议
      acceptSuggestionOnEnter: 'on', // 接受输入建议 "on" | "off" | "smart" //-如果设置off 编辑器上的代码补全显示了,但却不补上
      accessibilityPageSize: 10, // 辅助功能页面大小 Number 说明：控制编辑器中可由屏幕阅读器读出的行数。警告：这对大于默认值的数字具有性能含义。
      accessibilitySupport: 'off', // 辅助功能支持 控制编辑器是否应在为屏幕阅读器优化的模式下运行。
      autoClosingBrackets: 'always', // 是否自动添加结束括号(包括中括号) "always" | "languageDefined" | "beforeWhitespace" | "never"
      autoClosingDelete: 'always', // 是否自动删除结束括号(包括中括号) "always" | "never" | "auto"
      autoClosingOvertype: 'always', // 是否关闭改写 即使用insert模式时是覆盖后面的文字还是不覆盖后面的文字 "always" | "never" | "auto"
      autoClosingQuotes: 'always', // 是否自动添加结束的单引号 双引号 "always" | "languageDefined" | "beforeWhitespace" | "never"
      autoIndent: 'advanced', // 控制编辑器在用户键入、粘贴、移动或缩进行时是否应自动调整缩进 "none" | "keep" | "brackets" | "advanced" | "full" | undefined
      automaticLayout: true, // 自动布局
      foldingStrategy: 'indentation', // 折叠方式  auto | indentation
      codeLens: false, // 是否显示codeLens 通过 CodeLens，你可以在专注于工作的同时了解代码所发生的情况 – 而无需离开编辑器。 可以查找代码引用、代码更改、关联的 Bug、工作项、代码评审和单元测试。
      codeLensFontFamily: '', // codeLens的字体样式
      codeLensFontSize: 14, // codeLens的字体大小
      colorDecorators: false, // 呈现内联色彩装饰器和颜色选择器
      comments: {
        ignoreEmptyLines: true, // 插入行注释时忽略空行。默认为真。
        insertSpace: true // 在行注释标记之后和块注释标记内插入一个空格。默认为真。
      }, // 注释配置
      contextmenu: true, // 启用上下文菜单
      columnSelection: false, // 启用列编辑 按下shift键位然后按↑↓键位可以实现列选择 然后实现列编辑
      autoSurround: 'never', // 是否应自动环绕选择
      copyWithSyntaxHighlighting: false, // 是否应将语法突出显示复制到剪贴板中 即 当你复制到word中是否保持文字高亮颜色
      cursorBlinking: 'solid', // 光标动画样式
      cursorSmoothCaretAnimation: false, // 是否启用光标平滑插入动画  当你在快速输入文字的时候 光标是直接平滑的移动还是直接"闪现"到当前文字所处位置
      cursorStyle: 'line', //"line" | "block" | "underline" | "line-thin" | "block-outline" | "underline-thin" | undefined 光标样式
      cursorSurroundingLines: 0, // 光标环绕行数 当文字输入超过屏幕时 可以看见右侧滚动条中光标所处位置是在滚动条中间还是顶部还是底部 即光标环绕行数 环绕行数越大 光标在滚动条中位置越居中
      cursorSurroundingLinesStyle: 'all', // "default" | "all" 光标环绕样式
      cursorWidth: 2, // <=25 光标宽度
      minimap: {
        enabled: false // 是否启用预览图
      }, // 预览图设置
      folding: true, // 是否启用代码折叠
      links: true, // 是否点击链接
      overviewRulerBorder: false, // 是否应围绕概览标尺绘制边框
      renderLineHighlight: 'gutter', // 当前行突出显示方式
      roundedSelection: false, // 选区是否有圆角
      scrollBeyondLastLine: false // 设置编辑器是否可以滚动到最后一行之后
    }
    const myRef = ref<HTMLElement>()
    let editor: monaco.editor.IStandaloneCodeEditor

    const getFileUrl = (path: Array<string> | string): string => {
      if (typeof path === 'string') {
        return path
      }
      return '/' + path.join('/')
    }
    const openFile = (path: string[], name: string) => {
      let pathStr = getFileUrl(path)

      const model = window.monaco.editor.getModels().find((model) => model.uri.path === pathStr)
      if (pathStr !== preFilePath.value) {
        // 储存上一个path的编辑器的状态
        editorStatus.value.set(preFilePath.value, editor.saveViewState())
      }
      if (model) {
        editor.setModel(model)
        const editorState = editorStatus.value.get(pathStr)
        if (editorState) {
          // 恢复编辑器的状态
          editor.restoreViewState(editorState)
        }
        // 聚焦编辑器
        editor.focus()
        preFilePath.value = pathStr
        if (listener.value) {
          // 取消上一次的监听
          listener.value.dispose()
        }
        // 监听文件的变更
        listener.value = model.onDidChangeContent(() => {
          const v = model.getValue()
          context.emit('changeCode', name, v)
        })
      }
    }
    const initEditor = () => {
      const arr = props.tabData.list
      const models = window.monaco.editor.getModels()
      models.forEach((model) => {
        const path = model.uri.path
        const tab = arr.find((tab) => getFileUrl(tab.path) === path)
        if (!tab) {
          model.dispose()
        }
      })
      arr.forEach((item: Tab) => {
        let path = getFileUrl(item.path)
        const type = getFileType(item.file)
        if (!models.find((model) => model.uri.path === path) && type !== 'image') {
          let language = 'javascript'
          let fileExt = getFileExt(item.name)
          if (fileExt != '' && Object.keys(editorLanguage).includes(fileExt)) {
            language = editorLanguage[fileExt]
          }
          window.monaco.editor.createModel(
            item.text,
            language,
            new window.monaco.Uri().with({ path })
          )
        }
      })
      let active = props.tabData.list.find((item) => item.name === props.tabData.active)
      if (active) openFile(active.path, active.name)
    }

    function updateModel(path: Array<string> | string, value: string) {
      let pathStr = getFileUrl(path)
      let model = monaco.editor.getModels().find((model) => model.uri.path === path)

      if (model && model.getValue() !== value) {
        // 通过该方法，可以实现undo堆栈的保留
        model.pushEditOperations(
          [],
          [
            {
              range: model.getFullModelRange(),
              text: value
            }
          ],
          function () {
            return []
          }
        )
      }
    }
    const formatCode = () => {
      // editor?.trigger('javascript', 'editor.action.formatDocument', null)
      editor.getAction('editor.action.formatDocument').run()
    }

    const getValue = () => {
      return editor?.getValue()
    }
    onMounted(() => {
      window.monaco.languages.register({
        id: 'vue',
        extensions: ['.vue'],
        aliases: ['Vue', 'vuejs']
      })

      window.monaco.languages.setMonarchTokensProvider('vue', language)
      window.monaco.languages.setLanguageConfiguration('vue', conf)
      let option: any = Object.assign({}, defaultOption, props.option || {})
      if (myRef.value) {
        editor = window.monaco.editor.create(myRef.value, option)
        window.monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
          noSemanticValidation: true,
          noSyntaxValidation: true
        })
      }

      initEditor()
      // data.oldValue = props.code
      // data.oldHash = hashVal(props.code)
      // onChange()
    })

    watch([() => props.tabData.fileNames, () => props.tabData.active], (newValue, oldValue) => {
      if (newValue[0].join('-') !== oldValue[0].join('-')) {
        initEditor()
      } else if (newValue[1] !== oldValue[1]) {
        let active = props.tabData.list.find((item) => item.name === newValue[1])
        if (active) openFile(active.path, active.name)
      }
    })

    onUnmounted(() => {
      editor.dispose()
    })
    return {
      myRef,
      openFile,
      formatCode,
      getValue
    }
  }
})
</script>
<style scoped lang="less">
#code-editor {
  width: 100%;
  height: 100%;
}
</style>

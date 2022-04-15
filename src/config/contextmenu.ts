import { TabContextMenu } from '@commonTypes/contextMenu'
export const tabContextMenu: Array<Array<TabContextMenu>> = [
  [
    {
      id: 'close',
      label: '关闭',
      keyPress: 'ctrl',
      keyCode: 81
    },
    {
      id: 'close-other',
      label: '关闭其他'
    },
    {
      id: 'close-to-right',
      label: '关闭到右侧'
    },
    {
      id: 'close-to-saved',
      label: '关闭已保存',
      keyPress: 'ctrl',
      keyCode: 81
    },
    {
      id: 'close-all',
      label: '全部关闭'
    }
  ],
  [
    {
      id: 'copy-path',
      label: '复制路径'
    },
    {
      id: 'copy-url',
      label: '复制相对路径'
    }
  ],
  [
    {
      id: 'keep-open',
      label: '保持打开状态'
    },
    {
      id: 'pin',
      label: '固定',
      keyPress: 'ctrl',
      keyCode: 81
    }
  ],
  [
    {
      id: 'split-up',
      label: '向上拆分'
    },
    {
      id: 'split-down',
      label: '向下拆分'
    },
    {
      id: 'split-left',
      label: '向左拆分',
      keyPress: 'ctrl',
      keyCode: 81
    },
    {
      id: 'split-right',
      label: '向右拆分',
      keyPress: 'ctrl',
      keyCode: 81
    }
  ]
]

import { TabContextMenu } from '@commonTypes/contextMenu'
//编辑器title
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
//文件
export const fileContextMenu: Array<Array<TabContextMenu>> = [
  [
    {
      id: 'close',
      label: '新建文件',
      keyPress: 'ctrl',
      keyCode: 81
    },
    {
      id: 'close',
      label: '新建窗口',
      keyPress: 'ctrl',
      keyCode: 81
    }
  ],
  [
    {
      id: 'close-other',
      label: '打开文件'
    },
    {
      id: 'close-to-right',
      label: '打开文件夹'
    },
    {
      id: 'close-to-saved',
      label: '打开最近的文件',
      keyPress: 'ctrl',
      keyCode: 81
    }
  ],
  [
    {
      id: 'keep-open',
      label: '保存'
    },
    {
      id: 'pin',
      label: '另存为',
      keyPress: 'ctrl',
      keyCode: 81
    },
    {
      id: 'split-up',
      label: '全部保存'
    }
  ],
  [
    {
      id: 'split-up',
      label: '自动保存'
    },
    {
      id: 'split-down',
      label: '首选项'
    }
  ],
  [
    {
      id: 'split-left',
      label: '关闭编辑器',
      keyPress: 'ctrl',
      keyCode: 81
    },
    {
      id: 'split-right',
      label: '关闭文件夹',
      keyPress: 'ctrl',
      keyCode: 81
    },
    {
      id: 'split-right',
      label: '退出',
      keyPress: 'ctrl',
      keyCode: 81
    }
  ]
]
//编辑
export const editContextMenu: Array<Array<TabContextMenu>> = [
  [
    {
      id: 'close',
      label: '撤销',
      keyPress: 'ctrl',
      keyCode: 81
    },
    {
      id: 'close',
      label: '恢复',
      keyPress: 'ctrl',
      keyCode: 81
    }
  ],
  [
    {
      id: 'close-other',
      label: '剪切'
    },
    {
      id: 'close-to-right',
      label: '复制'
    },
    {
      id: 'close-to-saved',
      label: '复制为',
      keyPress: 'ctrl',
      keyCode: 81
    },
    {
      id: 'close-to-right',
      label: '粘贴'
    }
  ],
  [
    {
      id: 'keep-open',
      label: '查找'
    },
    {
      id: 'pin',
      label: '替换',
      keyPress: 'ctrl',
      keyCode: 81
    }
  ],
  [
    {
      id: 'split-up',
      label: '在文件中查找'
    },
    {
      id: 'split-down',
      label: '在文件中替换'
    }
  ],
  [
    {
      id: 'split-left',
      label: '切换行注释',
      keyPress: 'ctrl',
      keyCode: 81
    },
    {
      id: 'split-right',
      label: '切换块注释',
      keyPress: 'ctrl',
      keyCode: 81
    },
    {
      id: 'split-right',
      label: 'Emmet: 展开缩写',
      keyPress: 'ctrl',
      keyCode: 81
    }
  ]
]
//选择
export const selectContextMenu: Array<Array<TabContextMenu>> = [
  [
    {
      id: 'close',
      label: '全选',
      keyPress: 'ctrl',
      keyCode: 81
    },
    {
      id: 'close',
      label: '扩大选区',
      keyPress: 'ctrl',
      keyCode: 81
    },
    {
      id: 'close',
      label: '缩小选区',
      keyPress: 'ctrl',
      keyCode: 81
    }
  ],
  [
    {
      id: 'close-other',
      label: '向上复制一行'
    },
    {
      id: 'close-to-right',
      label: '向下复制一行'
    },
    {
      id: 'close-to-saved',
      label: '向上移动一行',
      keyPress: 'ctrl',
      keyCode: 81
    },
    {
      id: 'close-to-right',
      label: '向下移动一行'
    },
    {
      id: 'close-to-right',
      label: '重复选择'
    }
  ],
  [
    {
      id: 'keep-open',
      label: '在上面添加光标'
    },
    {
      id: 'pin',
      label: '在下面添加光标',
      keyPress: 'ctrl',
      keyCode: 81
    },
    {
      id: 'pin',
      label: '在行尾添加光标',
      keyPress: 'ctrl',
      keyCode: 81
    },
    {
      id: 'pin',
      label: '添加下一个匹配项',
      keyPress: 'ctrl',
      keyCode: 81
    },
    {
      id: 'pin',
      label: '添加上一个匹配项',
      keyPress: 'ctrl',
      keyCode: 81
    },
    {
      id: 'pin',
      label: '选择所有匹配项',
      keyPress: 'ctrl',
      keyCode: 81
    }
  ],
  [
    {
      id: 'split-up',
      label: '切换为“Alt+单击”进行多光标功能'
    },
    {
      id: 'split-down',
      label: '列选择模式'
    }
  ]
]
//查看
export const viewContextMenu: Array<Array<TabContextMenu>> = [
  [
    {
      id: 'close',
      label: '命令面板',
      keyPress: 'ctrl',
      keyCode: 81
    },
    {
      id: 'close',
      label: '打开视图',
      keyPress: 'ctrl',
      keyCode: 81
    }
  ],
  [
    {
      id: 'close-other',
      label: '外观'
    },
    {
      id: 'close-to-right',
      label: '编辑器布局'
    }
  ],
  [
    {
      id: 'keep-open',
      label: '资源管理器'
    },
    {
      id: 'pin',
      label: '搜索',
      keyPress: 'ctrl',
      keyCode: 81
    },
    {
      id: 'pin',
      label: 'SCM',
      keyPress: 'ctrl',
      keyCode: 81
    },
    {
      id: 'pin',
      label: '运行',
      keyPress: 'ctrl',
      keyCode: 81
    },
    {
      id: 'pin',
      label: '扩展',
      keyPress: 'ctrl',
      keyCode: 81
    }
  ],
  [
    {
      id: 'split-up',
      label: '问题'
    },
    {
      id: 'split-down',
      label: '输出'
    },
    {
      id: 'split-up',
      label: '调试控制台'
    },
    {
      id: 'split-down',
      label: '终端'
    }
  ],
  [
    {
      id: 'split-up',
      label: '自动换行'
    },
    {
      id: 'split-down',
      label: '显示缩略图'
    },
    {
      id: 'split-up',
      label: '显示导航痕迹'
    },
    {
      id: 'split-down',
      label: '显示空格'
    },
    {
      id: 'split-down',
      label: '显示控制字符'
    }
  ]
]
//转到
export const goContextMenu: Array<Array<TabContextMenu>> = [
  [
    {
      id: 'close',
      label: '返回',
      keyPress: 'ctrl',
      keyCode: 81
    },
    {
      id: 'close',
      label: '前进',
      keyPress: 'ctrl',
      keyCode: 81
    },
    {
      id: 'close',
      label: '上次编辑位置',
      keyPress: 'ctrl',
      keyCode: 81
    }
  ],
  [
    {
      id: 'close-other',
      label: '切换编辑器'
    },
    {
      id: 'close-to-right',
      label: '切换组'
    }
  ],
  [
    {
      id: 'keep-open',
      label: '转到文件'
    },
    {
      id: 'pin',
      label: '转到工作区中的符号',
      keyPress: 'ctrl',
      keyCode: 81
    }
  ],
  [
    {
      id: 'split-up',
      label: '转到编辑器中的符号'
    },
    {
      id: 'split-down',
      label: '转到定义'
    },
    {
      id: 'split-up',
      label: '转到类型定义'
    },
    {
      id: 'split-down',
      label: '转到声明'
    },
    {
      id: 'split-down',
      label: '转到实现'
    },
    {
      id: 'split-down',
      label: '转到引用'
    }
  ],
  [
    {
      id: 'split-up',
      label: '转到行/列'
    },
    {
      id: 'split-down',
      label: '转到括号'
    }
  ],
  [
    {
      id: 'split-up',
      label: '上一个问题'
    },
    {
      id: 'split-down',
      label: '下一个问题'
    }
  ],
  [
    {
      id: 'split-up',
      label: '上一个更改'
    },
    {
      id: 'split-down',
      label: '下一个更改'
    }
  ]
]
//终端
export const terminalsContextMenu: Array<Array<TabContextMenu>> = [
  [
    {
      id: 'close',
      label: '新建终端',
      keyPress: 'ctrl',
      keyCode: 81
    },
    {
      id: 'close',
      label: '拆分终端',
      keyPress: 'ctrl',
      keyCode: 81
    }
  ],
  [
    {
      id: 'close-other',
      label: '运行任务'
    },
    {
      id: 'close-to-right',
      label: '运行生成任务'
    },
    {
      id: 'close-other',
      label: '运行活动文本'
    },
    {
      id: 'close-to-right',
      label: '运行所选文本'
    }
  ],
  [
    {
      id: 'keep-open',
      label: '显示正在运行的任务'
    },
    {
      id: 'pin',
      label: '重启正在运行的任务',
      keyPress: 'ctrl',
      keyCode: 81
    },
    {
      id: 'pin',
      label: '终止任务',
      keyPress: 'ctrl',
      keyCode: 81
    }
  ],
  [
    {
      id: 'split-up',
      label: '配置任务'
    },
    {
      id: 'split-down',
      label: '配置默认生成任务'
    }
  ]
]
//帮助
export const helpContextMenu: Array<Array<TabContextMenu>> = [
  [
    {
      id: 'close',
      label: '开始',
      keyPress: 'ctrl',
      keyCode: 81
    },
    {
      id: 'close',
      label: '显示所有命令',
      keyPress: 'ctrl',
      keyCode: 81
    },
    {
      id: 'close',
      label: '编辑器操场',
      keyPress: 'ctrl',
      keyCode: 81
    },
    {
      id: 'close',
      label: '文档',
      keyPress: 'ctrl',
      keyCode: 81
    },
    {
      id: 'close',
      label: '发行说明',
      keyPress: 'ctrl',
      keyCode: 81
    }
  ],
  [
    {
      id: 'close-other',
      label: '键盘快捷方式参考'
    },
    {
      id: 'close-to-right',
      label: '视频教程'
    },
    {
      id: 'close-to-right',
      label: '贴士和技巧'
    }
  ],
  [
    {
      id: 'keep-open',
      label: 'Twitter上和我们互动'
    },
    {
      id: 'pin',
      label: '搜索功能请求',
      keyPress: 'ctrl',
      keyCode: 81
    },
    {
      id: 'pin',
      label: '使用英文报告问题',
      keyPress: 'ctrl',
      keyCode: 81
    }
  ],
  [
    {
      id: 'split-up',
      label: '查看许可证'
    },
    {
      id: 'split-down',
      label: '隐私声明'
    }
  ],
  [
    {
      id: 'split-up',
      label: '切换开发人员工具'
    },
    {
      id: 'split-down',
      label: '打开进程管理器'
    }
  ],
  [
    {
      id: 'split-up',
      label: '检查更新'
    }
  ],
  [
    {
      id: 'split-up',
      label: '关于'
    }
  ]
]

let data = [
  {
    label: 'node_modules',
    file: 'node_modules'
  },
  {
    label: 'package.json',
    file: 'package.json'
  },
  {
    label: 'README.md',
    file: 'README.md'
  },
  {
    label: 'tsconfig.json',
    file: 'tsconfig.json'
  },
  {
    label: 'app.vue',
    file: 'app.vue'
  },
  {
    label: 'src',
    children: [
      {
        label: 'components',
        children: [
          {
            label: 'left',
            children: [
              {
                label: 'Index.vue',
                file: 'Index.vue'
              },
              {
                label: 'Activitybar.vue',
                file: 'Activitybar.vue'
              }
            ]
          }
        ]
      },
      {
        label: 'styles',
        children: [
          {
            label: 'base.less',
            file: 'base.less'
          }
        ]
      }
    ]
  },
  {
    label: 'public',
    children: [
      {
        label: 'echartList',
        children: [
          {
            label: 'b.png',
            file: 'b.png'
          },
          {
            label: 'a.png',
            file: 'a.png'
          }
        ]
      },
      {
        label: 'index.html',
        file: 'index.html'
      },
      {
        label: 'favicon.ico',
        file: 'favicon.ico'
      }
    ]
  }
]
const mySort = (list) => {
  let newData = []
  for (let i = 0; i < list.length; i++) {
    const item = list[i]
    if (item.children) {
      let arr = mySort(item.children)
      item.children = arr
    }
    if (i === list.length - 1) {
      let files = list
        .filter((item) => {
          return item.file
        })
        .sort((a, b) => {
          return a.label.localeCompare(b.label)
        })
      let dirs = list
        .filter((item) => {
          return item.children
        })
        .sort((a, b) => {
          return a.label.localeCompare(b.label)
        })
      newData = [...dirs, ...files]
    }
  }
  return newData
}

console.log(JSON.stringify(mySort(data), null, 2))
// let a = data
//   .filter((item) => {
//     return item.file
//   })
//   .sort((a, b) => {
//     return a.label.localeCompare(b.label)
//   })
// console.log(a)

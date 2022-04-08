import { UserConfigExport, ConfigEnv } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// 如果编辑器提示 path 模块找不到，则可以安装一下 @types/node -> npm i @types/node -D
import { resolve } from 'path'

// https://vitejs.dev/config/
export default ({ command }: ConfigEnv): UserConfigExport => {
  // 根据项目配置。可以配置在.env文件
  let prodMock = true
  return {
    plugins: [
      vue(),
      viteMockServe({
        mockPath: './src/mock',
        localEnabled: command === 'serve', // 开发打包开关
        prodEnabled: command !== 'serve' && prodMock, // 生产打包开关
        supportTs: true, // 打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件。
        watchFiles: true // 监视文件更改
      }),
      AutoImport({
        resolvers: [ElementPlusResolver()],
        imports: ['vue', 'vue-router'],
        //为true时在项目根目录自动创建
        dts: 'types/auto-imports.d.ts'
      }),
      Components({
        //自动加载的组件目录，默认值为 ['src/components']
        dirs: ['src/components'],
        //组件名称包含目录，防止同名组件冲突
        directoryAsNamespace: true,
        //指定类型声明文件，为true时在项目根目录创建
        dts: 'types/components.d.ts',
        //引入element plus自动组件支持
        resolvers: [ElementPlusResolver()]
      })
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'), // 设置 `@` 指向 `src` 目录
        '@assets': resolve(__dirname, 'src/assets'), // 设置 `@assets` 指向 `src/assets` 目录
        '@hook': resolve(__dirname, 'src/hook'),
        '@components': resolve(__dirname, 'src/components'), // 设置 `@components` 指向 `src/components` 目录
        '@config': resolve(__dirname, 'src/config'), // 设置 `@config` 指向 `src/config` 目录
        '@pages': resolve(__dirname, 'src/pages'), // 设置 `@pages` 指向 `src/pages` 目录
        '@router': resolve(__dirname, 'src/router'), // 设置 `@router` 指向 `src/router` 目录
        '@store': resolve(__dirname, 'src/store'), // 设置 `@store` 指向 `src/store` 目录
        '@utils': resolve(__dirname, 'src/common/utils'), // 设置 `@utils` 指向 `src/utils` 目录
        '@views': resolve(__dirname, 'src/views') // 设置 `@views` 指向 `src/views` 目录
      }
    },
    base: './', // 设置打包路径
    server: {
      port: 4000, // 设置服务启动端口号
      open: false, // 设置服务启动时是否自动打开浏览器
      cors: true // 允许跨域

      // 设置代理，根据我们项目实际情况配置
      // proxy: {
      //   '/api': {
      //     target: 'http://xxx.xxx.xxx.xxx:8000',
      //     changeOrigin: true,
      //     secure: false,
      //     rewrite: (path) => path.replace('/api/', '/')
      //   }
      // }
    }
  }
}

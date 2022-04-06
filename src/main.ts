import { createApp } from 'vue'
import router from '@/router/index'
import store from '@/store/index'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import styleImport from '@/common/utils/style-import'
import '@/style/basic.less'

const app = createApp(App)
// styleImport(app).use(router).use(store, key).mount('#app')
app.use(store).use(ElementPlus).mount('#vscode')

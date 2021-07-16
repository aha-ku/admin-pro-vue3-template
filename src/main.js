import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@ant-design-vue/pro-layout/dist/style.css';
import { Button, Tooltip, Switch, Select, Space, Tag } from 'ant-design-vue'
import ProLayout, { PageContainer } from '@ant-design-vue/pro-layout'
import '@/assets/index.less'
const app = createApp(App)
app.use(Button)
    .use(Tooltip)
    .use(Switch)
    .use(Select)
    .use(Space)
    .use(Tag)
    .use(ProLayout)
    .use(PageContainer)
app.use(router)
app.mount('#app')

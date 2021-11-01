import { createApp } from 'vue'
import App from './App.vue'
import axios from './axios/index'
import {AxiosInstance} from 'axios'
import './registerServiceWorker'
import router from './router'
import store from './store'
import antd from 'ant-design-vue'
import { message } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css'

import Components from './components/index'
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
      $axios: AxiosInstance;
    }
}

const app = createApp(App)

app.provide('axios', axios);
app.use(antd)
app.use(store)
app.use(router)
app.use(Components)
app.component('$message', message)//全局注册组件
app.config.globalProperties.count=23
app.config.globalProperties.axios = axios
app.mount('#app')

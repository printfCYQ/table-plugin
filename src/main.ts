import { Notification } from '@arco-design/web-vue';
import 'virtual:uno.css';
import { createApp } from 'vue';
import App from './App.vue';
import '@arco-design/web-vue/es/notification/style/css.js'
const app = createApp(App)
app.config.globalProperties.$notification = Notification
app.mount('#app')
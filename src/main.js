import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia';
import axios from 'axios'
import VueAxios from 'vue-axios'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import moment from 'moment'
import piniaPluginPersistedState from "pinia-plugin-persistedstate"
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import "./style.css"


const pinia = createPinia();
pinia.use(piniaPluginPersistedState)
const app = createApp(App)
app.use(pinia)
app.provide('moment', moment)
app.use(router)
app.use(Antd)
app.use(VueAxios, axios)
app.mount('#app')
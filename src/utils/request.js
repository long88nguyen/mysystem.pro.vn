import axios from 'axios'
import { toRefs } from 'vue'
import { getActivePinia } from "pinia"
import { authStore, loadingStore } from '../store'
import router from '../router'
import { message } from 'ant-design-vue';

const baseUrl = import.meta.env.VITE_APP_API
console.log(baseUrl);

const service = axios.create({
  baseURL: baseUrl,
  timeout: 400000
})

service.interceptors.request.use(
  config => {
    const loading = toRefs(loadingStore())
    const auth = toRefs(authStore());
    loading.start.value()
    if (auth.token?.value) {
      config.headers['Authorization'] = 'Bearer ' + auth.token?.value
    }

    return config
  },
  error => {
    const loading = toRefs(loadingStore())
    loading.stop.value()
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const loading = toRefs(loadingStore())
    loading.stop.value()
    const res = response

    if (response?.status !== 200) {
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res.data
    }
  },
  error => {
    const loading = toRefs(loadingStore())
    loading.stop.value()

    if (error) {
      const errorUrl = error.response?.config?.url;
      if (error.response?.status == 422) {
        return error.response.data
      } else if (error.response?.status == 401) {
        getActivePinia()._s.forEach(store => store.$reset());
      }
      else if (error.response?.status == 403) {
        message.error('Bạn không có quyền truy cập chức năng này!')
        return;
      }
      if (errorUrl === 'login') {
        const auth = toRefs(authStore());
        auth.isShow.value = true;
      } else {
        if (error.response?.status == 401) {
          location.reload();
          setInterval(() => {
            message.error('Phiên đăng nhập đã hết hạn !');
          }, 2000)
        }
        else {
          message.error('Đã có lỗi xảy ra !');
        }
      }
    }
    return Promise.reject(error)
  }
)

export default service
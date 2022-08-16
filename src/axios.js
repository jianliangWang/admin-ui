import axios from 'axios'
import router from './router'
import Element from 'element-ui'

axios.defaults.baseURL = 'http://localhost:8888'

const request = axios.create({
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

request.interceptors.request.use(config => {
  config.headers.Authorization = localStorage.getItem('token')
  return config
})

request.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === 200) {
      return response
    } else {
      Element.Message.error(res.msg ? res.msg : '系统异常')
      return Promise.reject(res.msg)
    }
  },
  error => {
    if (error.response.data) {
      error.message = error.response.msg
    }
    if (error.response.status === 401) {
      console.log('请登录')
      router.push('/login')
    }
    console.log(error.response.status)
    Element.Message.error(error.message, { duration: 3000 })
    return Promise.reject(error)
  }
)

export default request

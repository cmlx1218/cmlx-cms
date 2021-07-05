import axios from "axios";
import {BASE_URL} from "./baseUrl";

// 1、登录接口请求
export function requestLogin(config) {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
      'Authorization': 'Basic Y21zOkFpbXlGaXRuZXNz',
    }
  })
  // 请求前拦截
  instance.interceptors.request.use(config => {
    return config
  }, error => {
    return Promise.reject(error)
  })

  // 响应式拦截
  instance.interceptors.response.use(result => {
    return result.data
  }, error => {
    return Promise.reject(error)
  })

  return instance(config)
}


// 2、登录后接口请求
export function request(config) {
  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Authorization': sessionStorage.getItem('Authorization')
    }
  })

  // 请求前拦截
  instance.interceptors.request.use(config => {
    if (sessionStorage.getItem('Authorization') === '') {
      this.$router.replace('/home')
    }
    return config
  }, error => {
    console.log(error);
  })

  // 响应式拦截
  instance.interceptors.response.use(result => {
    if (result.code === 302) {
      this.$router.push('/login')
    }
    return result.data
  }, error => {
    console.log(error);
  })

  return instance(config)
}

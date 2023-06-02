import axios from './axios'

// 登录
export const loginApi: any = (data: any) => {
  return axios.post('/login', data);
}

// 注册
export const registerApi: any = (data: any) => {
  return axios.post('/register', data);
}
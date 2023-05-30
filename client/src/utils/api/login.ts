import axios from './axios'

// 登录
export const loginApi: any = (data: any) => {
  return axios.post(`/login?accountName=${data.accountName}&password=${data.password}`, {});
}

// 注册
export const registerApi: any = (data: any) => {
  return axios.post(`/register?accountName=${data.accountName}&password=${data.password}&userId=${data.userId}`, {});
}
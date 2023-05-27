import axios from './axios'

export const loginApi: any = (data: any) => {
  return axios.post(`/login?accountName=${data.accountName}&password=${data.password}`, {});
}

import axios from './axios'

export const login: any = (data: any) => {
  return axios.post('v1/resume/login', data);
}

import axios from 'axios'

const baseUrl = 'http://localhost:3000'

//调用此接口 , 判断登录账号密码
export function getLogin(id,pwd) {
  return axios.get(`${baseUrl}/login?id=${Number(id)}&pwd=${pwd}`)
}
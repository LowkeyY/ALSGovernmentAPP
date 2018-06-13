import { request ,config} from 'utils'
const {api : {AppBaseApi,userLogout}} = config
export async function queryAppbase (payload) {
  return request({
    url: AppBaseApi,
    method: 'get',
    data:payload
  })
}
export async function logout() {
  return request({
    url: userLogout,
    method: 'get',
  })
}

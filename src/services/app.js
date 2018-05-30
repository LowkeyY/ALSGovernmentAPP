import { request ,config} from 'utils'
const {api : {AppBaseApi}} = config
export async function queryAppbase () {
  return request({
    url: AppBaseApi,
    method: 'get'
  })
}

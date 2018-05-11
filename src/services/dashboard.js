import { request ,config} from 'utils'
const {api} = config
const {dashboard} = api
export async function query () {
  return request({
    url: dashboard,
    method: 'get'
  })
}

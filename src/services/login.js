import { request, config } from 'utils'

const {api} = config
const {LoginApi} = api

export async function login(data) {
  return request({
    url: LoginApi,
    method: 'post',
    data,
  })
}

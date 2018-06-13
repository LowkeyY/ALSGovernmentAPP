// import { request ,config} from 'utils'
// const {api} = config
// const {DetailsApi} = api
// export async function queryDetails (payload) {
//   return request({
//     url: DetailsApi,
//     method: 'get',
//     data:payload
//   })
// };

import { request, config } from 'utils'
const { api } = config
const { DetailsApi , QueryHtmlBody} = api

export async function queryDetails (payload) {
  return request({
    url: DetailsApi,
    method: 'get',
    data: payload,
  })
}
export async function queryHtmlBody (payload) {
  return request({
    url: QueryHtmlBody,
    method: 'get',
    data: payload,
  })
}

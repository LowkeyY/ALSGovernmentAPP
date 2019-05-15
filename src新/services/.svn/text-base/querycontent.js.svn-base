
import { request, config } from 'utils'
const { api } = config
const { DetailsApi , QueryHtmlBody,GetAboutInfoApi,sendOpinionApi} = api

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
export async function GetAboutInfo (payload) {
  return request({
    url: GetAboutInfoApi,
    method: 'get',
    data: payload,
  })
}
export async function sendOpinion (payload) {
  return request({
    url: sendOpinionApi,
    method: 'post',
    data: payload,
  })
}

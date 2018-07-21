import { request, config } from 'utils'
const { api } = config
const { GetLegallistTypeApi, GetLegallistApi, sendLigallistApi } = api

export async function GetLegallistType (payload) {
  return request({
    url: GetLegallistTypeApi,
    method: 'get',
    data:payload
  })
}
export async function GetLegallist (payload) {
  return request({
    url: GetLegallistApi,
    method: 'get',
    data:payload
  })
}
export async function sendLigallist (payload) {
  return request({
    url: sendLigallistApi,
    method: 'post',
    data:payload
  })
}

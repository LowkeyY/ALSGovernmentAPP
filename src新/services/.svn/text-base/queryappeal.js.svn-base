import { request, config, formsubmit } from 'utils'

const { api } = config
const { GetAppealTypeApi, SendAppealInfoApi, GetAppealList, GetAppealContent, QueryWorkCountApi, CollectAppealApi } = api

export async function queryAppealType (payload) {
  return request({
    url: GetAppealTypeApi,
    method: 'get',
    data:payload
  })
}

export async function queryAppealList (payload) {
  return request({
    url: GetAppealList,
    method: 'post',
    data: payload,
  })
}

export async function queryAppealContent (payload) {
  return request({
    url: GetAppealContent,
    method: 'get',
    data: payload,
  })
}

export async function queryWorkCount () {
  return request({
    url: QueryWorkCountApi,
    method: 'get',
  })
}

export async function collectAppeal (payload) {
  return request({
    url: CollectAppealApi,
    method: 'post',
    data: payload,
  })
}

export async function sendAppealInfo (params = {}, images, files) {
  return formsubmit(SendAppealInfoApi, params, images, files, true)
}

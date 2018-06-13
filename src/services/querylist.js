import { request, config } from 'utils'

const { api } = config
const { QueryManuscriptApi, QueryColumnTypeApi, JicengshengyinApi, LanmuAllApi ,GetTaskListApi ,GetAllTaskApi} = api

export async function queryPartyData (payload) {
  return request({
    url: QueryManuscriptApi,
    method: 'get',
    data: payload,
  })
  return {}
}

export async function queryPartyTabs (payload) {
  return request({
    url: QueryColumnTypeApi,
    method: 'get',
    data: payload,
  })
}

export async function queryPatryList (payload) {
  return request({
    url: QueryManuscriptApi,
    method: 'get',
    data: payload,
  })
}

export async function getJicengshenying (payload) {
  return request({
    url: JicengshengyinApi,
    method: 'get',
    data: payload,
  })
}

export async function getAllLanmu (payload) {
  return request({
    url: LanmuAllApi,
    method: 'get',
    data: payload,
  })
}

export async function getTaskList (payload) {
  return request({
    url: GetTaskListApi,
    method: 'get',
    data: payload,
  })
}

export async function getAllTask (payload) {
  return request({
    url: GetAllTaskApi,
    method: 'get',
    data: payload,
  })
}


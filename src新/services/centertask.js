import { request, config } from 'utils'

const { api: { GetCenterAppealApi, OpenAppealApi, CloseAppealApi, ReplyAppealApi, RefuseAppealApi, CompleteAppealApi, CenterSendTaskApi } } = config

export async function queryCenterAppeal (payload) {
  return request({
    url: GetCenterAppealApi,
    method: 'get',
    data: payload,
  })
}

export async function queryCenterAppealDetails (payload) {
  return request({
    url: GetCenterAppealApi,
    method: 'get',
    data: payload,
  })
}

export async function openAppeal (payload) {
  return request({
    url: OpenAppealApi,
    method: 'get',
    data: payload,
  })
}

export async function closeAppeal (payload) {
  return request({
    url: CloseAppealApi,
    method: 'get',
    data: payload,
  })
}

export async function refuseAppeal (payload) {
  return request({
    url: RefuseAppealApi,
    method: 'get',
    data: payload,
  })
}

export async function completeAppeal (payload) {
  return request({
    url: CompleteAppealApi,
    method: 'get',
    data: payload,
  })
}

export async function replyAppeal (payload) {
  return request({
    url: ReplyAppealApi,
    method: 'get',
    data: payload,
  })
}
export async function centerSendTask (payload) {
  return request({
    url: CenterSendTaskApi,
    method: 'post',
    data: payload,
  })
}

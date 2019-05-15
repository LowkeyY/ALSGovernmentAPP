import {request, config} from 'utils'

const {api: {AppBaseApi, userLogout, PostGuijiApi,GetStudyTimeApi}} = config

export async function queryAppbase(payload) {
  return request({
    url: AppBaseApi,
    method: 'get',
    data: payload
  })
}

export async function logout() {
  return request({
    url: userLogout,
    method: 'get',
  })
}

export async function guiji(payload) {
  return request({
    url: PostGuijiApi,
    method: 'Post',
    data: payload
  })
}
export async function GetStudyTime(payload) {
  return request({
    url: GetStudyTimeApi,
    method: 'get',
    data: payload
  })
}

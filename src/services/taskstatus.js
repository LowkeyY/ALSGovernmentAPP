import { request, config } from 'utils'

const {api:{TaskStatusApi,CompleteTaskApi,CompleteButtonApi,ZhiHuiConformTaskApi}} = config


export async function taskStatus (data) {
  return request({
    url: TaskStatusApi,
    method: 'post',
    data,
  })
}
export async function completeTask (data) {
  return request({
    url: CompleteTaskApi,
    method: 'post',
    data,
  })
}
export async function completeButtonTask (data) {
  return request({
    url: CompleteButtonApi,
    method: 'post',
    data,
  })
}
export async function zhiHuiConformTask (data) {
  return request({
    url: ZhiHuiConformTaskApi,
    method: 'post',
    data,
  })
}

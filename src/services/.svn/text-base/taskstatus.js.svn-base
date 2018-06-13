import { request, config } from 'utils'

const {api:{TaskStatusApi,CompleteTaskApi}} = config


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

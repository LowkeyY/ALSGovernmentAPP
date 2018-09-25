import { request, config, formsubmit } from 'utils';

const { api: { TaskStatusApi, CompleteTaskApi, CompleteButtonApi, ZhiHuiConformTaskApi, sendTaskTableApi, getTaskReactApi, sendTaskReactApi } } = config;


export async function taskStatus (data) {
  return request({
    url: TaskStatusApi,
    method: 'post',
    data,
  });
}

export async function completeTask (data) {
  return request({
    url: CompleteTaskApi,
    method: 'post',
    data,
  });
}

export async function completeButtonTask (data) {
  return request({
    url: CompleteButtonApi,
    method: 'post',
    data,
  });
}

export async function zhiHuiConformTask (data) {
  return request({
    url: ZhiHuiConformTaskApi,
    method: 'post',
    data,
  });
}

export async function getTaskReact (data) {
  return request({
    url: getTaskReactApi,
    method: 'post',
    data,
  });
}

export async function sendTaskReact (data) {
  return request({
    url: sendTaskReactApi,
    method: 'post',
    data,
  });
}

export async function sendTaskTable (params = {}, images, files) {
  return formsubmit(sendTaskTableApi, params, images, files, true);
}

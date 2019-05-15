import { request, config, formsubmit } from 'utils';

const { api } = config;
const { GetDiaryTypeApi, SendDiaryApi, GetDiaryListApi, GetDiaryDetailsApi } = api;

export async function sendDiary (params = {}, images, files) {
  return formsubmit(SendDiaryApi, params, images, files, true);
}

export async function queryDiaryType (payload) {
  return request({
    url: GetDiaryTypeApi,
    method: 'get',
    data: payload,
  });
}
export async function queryDiaryList (payload) {
  return request({
    url: GetDiaryListApi,
    method: 'get',
    data: payload,
  });
}
export async function queryDiarydetails (payload) {
  return request({
    url: GetDiaryDetailsApi,
    method: 'get',
    data: payload,
  });
}

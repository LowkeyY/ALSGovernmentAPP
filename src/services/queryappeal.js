import { request, config, formsubmit } from 'utils';

const { api } = config;
const { GetAppealTypeApi, SendAppealInfoApi, GetAppealList, GetAppealContent, QueryWorkCountApi, CollectAppealApi, TaskurgentApi, IsAdminApi, ChooseUsersApi, CreateNewTaskApi, sendLegalMediationApi, getEducationTypeApi, getMediationTypeApi } = api;

export async function queryAppealType (payload) {
  return request({
    url: GetAppealTypeApi,
    method: 'get',
    data: payload
  });
}
export async function getEducationType (payload) {
  return request({
    url: getEducationTypeApi,
    method: 'get',
    data: payload
  });
} export async function getMediationType (payload) {
  return request({
    url: getMediationTypeApi,
    method: 'get',
    data: payload
  });
}
export async function queryTaskurgent (payload) {
  return request({
    url: TaskurgentApi,
    method: 'get',
    data: payload
  });
}

export async function createNewTask (payload) {
  return request({
    url: CreateNewTaskApi,
    method: 'post',
    data: payload
  });
}

export async function queryUsers (payload) {
  return request({
    url: ChooseUsersApi,
    method: 'get',
    data: payload
  });
}

export async function queryAdmin (payload) {
  return request({
    url: IsAdminApi,
    method: 'get',
    data: payload
  });
}

export async function queryAppealList (payload) {
  return request({
    url: GetAppealList,
    method: 'post',
    data: payload,
  });
}

export async function queryAppealContent (payload) {
  return request({
    url: GetAppealContent,
    method: 'get',
    data: payload,
  });
}

export async function queryWorkCount () {
  return request({
    url: QueryWorkCountApi,
    method: 'get',
  });
}

export async function collectAppeal (payload) {
  return request({
    url: CollectAppealApi,
    method: 'post',
    data: payload,
  });
}

export async function sendAppealInfo (params = {}, images, files) {
  return formsubmit(SendAppealInfoApi, params, images, files, true);
}

export async function sendLegalMediation (params = {}, images, files) {
  return formsubmit(sendLegalMediationApi, params, images, files, true);
}
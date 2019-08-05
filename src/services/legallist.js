import { request, config,formsubmit} from 'utils';

const { api } = config;
const { GetLegallistTypeApi, GetLegallistApi, sendLigallistApi, GetFairTypesApi, SendFairService } = api;

export async function GetLegallistType (payload) {
  return request({
    url: GetLegallistTypeApi,
    method: 'get',
    data: payload,
  });
}

export async function GetLegallist (payload) {
  return request({
    url: GetLegallistApi,
    method: 'get',
    data: payload,
  });
}

export async function sendLigallist (payload) {
  return request({
    url: sendLigallistApi,
    method: 'post',
    data: payload,
  });
}

export async function getFairTypes (payload) {
  return request({
    url: GetFairTypesApi,
    method: 'get',
    data: payload,
  });
}

export async function sendFairService (params = {}, images, files) {
  return formsubmit(SendFairService, params, images, files, true);
}

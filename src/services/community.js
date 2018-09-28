import { request, config, formsubmit } from 'utils';

const { api } = config;
const { GetCommunityListApi, GetCommunityDetailsApi, JoinCommunityApi, GetJoinCommunityInputApi, SendJoinCommunityApi } = api;

export async function SendJoinCommunity (params = {}, images, files) {
  return formsubmit(SendJoinCommunityApi, params, images, files, true);
}

export async function queryCommunityList (payload) {
  return request({
    url: GetCommunityListApi,
    method: 'get',
    data: payload,
  });
}

export async function joinCommunity (payload) {
  return request({
    url: JoinCommunityApi,
    method: 'post',
    data: payload,
  });
}

export async function queryCommunityDetails (payload) {
  return request({
    url: GetCommunityDetailsApi,
    method: 'get',
    data: payload,
  });
}

export async function queryJoinInput (payload) {
  return request({
    url: GetJoinCommunityInputApi,
    method: 'get',
    data: payload,
  });
}

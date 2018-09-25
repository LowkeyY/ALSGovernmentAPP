import { request, config } from 'utils';

const { api } = config;
const { getSignApi, signApi } = api;

export async function getSign (payload) {
  return request({
    url: getSignApi,
    method: 'get',
    data: payload,
  });
}

export async function sign (payload) {
  return request({
    url: signApi,
    method: 'get',
    data: payload,
  });
}


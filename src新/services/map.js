import { request, config, formsubmit } from 'utils';

const { api } = config;
const { GetPartyMapApi } = api;

export async function queryPartyMap (payload) {
  return request({
    url: GetPartyMapApi,
    method: 'get',
    data: payload,
  });
}

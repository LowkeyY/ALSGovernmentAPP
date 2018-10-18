import { request, config } from 'utils';

const { api } = config;
const { GetGoodsListApi, GetGoodsInfoApi, GetUserIntegralApi, ChangeGoodsApi, GetGoodsMyListApi } = api;

export async function getGoodsList (payload) {
  return request({
    url: GetGoodsListApi,
    method: 'get',
    data: payload,
  });
}

export async function getGoodsInfo (payload) {
  return request({
    url: GetGoodsInfoApi,
    method: 'get',
    data: payload,
  });
}

export async function getUserIntegral (payload) {
  return request({
    url: GetUserIntegralApi,
    method: 'get',
    data: payload,
  });
}

export async function changeGoods (payload) {
  return request({
    url: ChangeGoodsApi,
    method: 'get',
    data: payload,
  });
}

export async function getGoodsMyList (payload) {
  return request({
    url: GetGoodsMyListApi,
    method: 'get',
    data: payload,
  });
}

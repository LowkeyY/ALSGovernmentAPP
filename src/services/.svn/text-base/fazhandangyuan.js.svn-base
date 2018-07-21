import { request, config, formsubmit } from 'utils'

const { api: { FazhandangyuanApi , FazhandangyuanxinxiApi , FazhandangyuanListApi} } = config

export async function getFazhandangyuan (payload) {
  return request({
    url: FazhandangyuanApi,
    method: 'get',
    data: payload,
  })
}

export async function getFazhandangyuanList (payload) {
  return request({
    url: FazhandangyuanListApi,
    method: 'get',
    data: payload,
  })
}

export async function getFazhandangyuanxinxi (payload) {
  return request({
    url: FazhandangyuanxinxiApi,
    method: 'get',
    data: payload,
  })
}

export async function postFazhandangyuan (params = {}, images, files) {
  params.isOriginal = true
  return formsubmit(FazhandangyuanApi, params, images, files, true)
}

export async function postFazhandangyuanxinxi (params = {}, images, files) {
  params.isOriginal = true
  return formsubmit(FazhandangyuanxinxiApi, params, images, files, true)
}

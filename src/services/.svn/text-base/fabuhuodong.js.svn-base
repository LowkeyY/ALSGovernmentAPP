import {request, config} from 'utils'

const {api} = config
const {Getfabuhuodong, Getbangfuduixiang} = api

export async function Fabuhuodong() {
  return request({
    url: Getfabuhuodong,
    method: 'get',
  })
}

export async function Bangfuduixiang(payload) {
  return request({
    url: Getbangfuduixiang,
    method: 'post',
    data: payload,
  })
}

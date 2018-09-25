import { request, config, formsubmit } from 'utils'

const { api } = config
const { sendMsgFilesApi ,readMessageApi,GetMobilePartyApi} = api


export async function sendMsgFiles (params = {}, images, files) {
  return formsubmit(sendMsgFilesApi, params, images, files, true)
}

export async function readMessage (payload) {
  return request({
    url: readMessageApi,
    method: 'post',
    data: payload,
  })
}
export async function sendMobileParty (payload) {
  return request({
    url: GetMobilePartyApi,
    method: 'post',
    data: payload,
  })
}

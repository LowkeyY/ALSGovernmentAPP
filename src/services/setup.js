import { request, config ,formsubmit} from 'utils'

const {api} = config
const {SetUpAPi,ResetPasswordApi} = api

// export async function setUserInfo (data) {
//   return request({
//     url: SetUpAPi,
//     method: 'post',
//     data,
//   })
// }
export async function setUserInfo (params = {}, images, files) {
  return formsubmit(SetUpAPi, params, images, files, true)
}
export async function resetPassword (data) {
  return request({
    url: ResetPasswordApi,
    method: 'post',
    data,
  })
}

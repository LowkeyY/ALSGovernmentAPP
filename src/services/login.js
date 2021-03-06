import { request, config } from 'utils';

const { api } = config;
const { LoginApi, SendValidateCodeApi, PhoneLoginApi } = api;

export async function login (data, serverError = false) {
  return request({
    url: LoginApi,
    method: 'post',
    data,
    serverError
  });
}

export async function SendValidateCode (data, serverError = false) {
  return request({
    url: SendValidateCodeApi,
    method: 'post',
    data,
  });
}

export async function PhoneLogin (data, serverError = false) {
  return request({
    url: PhoneLoginApi,
    method: 'post',
    data,
    serverError
  });
}

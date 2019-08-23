import { request, config, formsubmit } from 'utils';

const { api } = config;
const { getSurveyApi, submitSurveyApi, SubmitSurveyInfoApi } = api;

export async function getSurvey (payload) {
  return request({
    url: getSurveyApi,
    method: 'get',
    data: payload,
  });
}

export async function submitSurvey (payload) {
  return request({
    url: submitSurveyApi,
    method: 'post',
    data: payload,
  });
}

export async function submitSurveyInfo (payload) {
  return request({
    url: SubmitSurveyInfoApi,
    method: 'post',
    data: payload,
  });
}

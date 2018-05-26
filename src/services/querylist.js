import { request ,config} from 'utils'
const {api} = config
const {QueryPartyDataApi,QueryPartyTabsApi} = api
export async function queryPartyData (payload) {
/*  return request({
    url: QueryPartyDataApi,
    method: 'get',
    data:payload
  })*/
  return {}
};
export async function queryPartyTabs () {
/*  return request({
    url: QueryPartyTabsApi,
    method: 'get',
  })*/
  return {}
}

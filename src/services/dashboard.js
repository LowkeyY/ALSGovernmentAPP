import { request ,config} from 'utils'
const {api : {DashboardApi}} = config
export async function queryDashboard () {
  return request({
    url: DashboardApi,
    method: 'get'
  })
}

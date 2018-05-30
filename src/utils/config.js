module.exports = {
  name: 'ALS-APP',
  logo: '/logo.png',
  baseURL: 'http://192.168.3.199:8080',
  userTag: {
    username: 'username',
    usertoken: 'usertoken',
    userpower: 'userpower'
  },
  api: {
    QueryPartyDataApi: `/cphsc/interface/huoqugaojian.jcp`,
    QueryPartyTabsApi: `/cphsc/interface/huoqufenlei.jcp`,
    LoginApi: '/login/login.jcp',
    DetailsApi: '/cphsc/interface/getGaoJianInfo.jcp',
    DashboardApi : 'cphsc/interface/getHomeMenuInfo.jcp',
    AppBaseApi : 'cphsc/interface/getAppBase.jcp'
  }
}

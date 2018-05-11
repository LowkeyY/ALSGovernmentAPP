
module.exports = {
  name: 'ALS-APP',
  logo: '/logo.png',
  baseURL:'http://192.168.0.202:8080',
  accessToken: 'CNESSIONID',
  api:{
    QueryPartyDataApi:`/cphsc/interface/huoqugaojian.jcp`,
    QueryPartyTabsApi:`/cphsc/interface/huoqufenlei.jcp`,
    LoginApi:'/login/login.jcp'
  }
}

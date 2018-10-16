module.exports = {
  name: 'ALS-APP',
  logo: '/logo.png',

  baseURL: 'http://192.168.0.202:9200',
  // baseURL: 'http://www.myals.gov.cn:9000',
  wsURL: 'ws://www.myals.gov.cn:9000/websocket/chat/',
  userTag: {
    username: 'username',
    usertoken: 'KSESSIONID',
    userpower: 'userpower',
    userid: 'userid',
    useravatar: 'useravatar',
    usertype: 'usertype',
  },
  privateApi: {
    iframeUrlwanggequ: '/cphsc/htmlpage/ShowAllUserLocation.jcp',
    iframeUrlguiji: '/ExternalItems/guiji/guijiwanggequ.jcp',
    sumbitUrlPositions: '/cphsc/interface/UpdateUserLocation.jcp',
  },
  api: {
    QueryManuscriptApi: '/cphsc/interface/huoqugaojian.jcp',
    QueryColumnTypeApi: '/cphsc/interface/huoqufenlei.jcp',
    LoginApi: '/login/login.jcp',
    userLogout: '/login/appLogout.jcp',
    DetailsApi: '/cphsc/interface/getGaoJianInfo.jcp',
    DashboardApi: '/cphsc/interface/getHomeMenuInfo.jcp',
    AppBaseApi: '/cphsc/interface/getAppBase.jcp',
    GetAppealList: '/cphsc/interface/getPoliceWorkInterface.jcp',
    GetAppealContent: '/cphsc/interface/PoliceWorkInfo.jcp',
    GetAppealTypeApi: '/cphsc/interface/getAppealType.jcp',
    SendAppealInfoApi: '/ExternalItems/policWork/PoliceWorkAdd.jcp',
    QueryHtmlBody: '/cphsc/interface/getHttpHtml.jcp',
    getSurveyApi: '/cphsc/interface/surveyPanel.jcp',
    submitSurveyApi: '/usr/survey/surveyPanel.jcp',
    QueryWorkCountApi: '/cphsc/interface/getWookPoliceWorkCount.jcp',
    JicengshengyinApi: '/cphsc/interface/getJicengshengyin.jcp',
    LanmuAllApi: '/cphsc/interface/getAllZiLanMu.jcp',
    CollectAppealApi: '/ExternalItems/policWork/interface/showCangInterface.jcp',
    SetUpAPi: '/ExternalItems/userInterFace/userUpdateInfo.jcp',
    ResetPasswordApi: '/ExternalItems/userInterFace/userChangePwd.jcp',
    GetTaskListApi: '/ExternalItems/taskRelease/interface/getMyTask.jcp',
    GetAllTaskApi: '/ExternalItems/taskRelease/interface/getTaskMsgAllByApp.jcp',
    sendMsgFilesApi: '/ExternalItems/taskRelease/interface/appSendMsg.jcp',
    TaskStatusApi: '/ExternalItems/taskRelease/policeWorkTaskCreat.jcp',
    CompleteTaskApi: '/ExternalItems/taskRelease/conformTask.jcp',
    CompleteButtonApi: '/ExternalItems/taskRelease/interface/completeTask.jcp',
    SendValidateCodeApi: '/cphsc/interface/sendValidateCode.jcp',
    PhoneLoginApi: '/login/appPhoneLogin.jcp',
    readMessageApi: '/ExternalItems/taskRelease/upMsgState.jcp',
    positionApi: '/ExternalItems/policWork/appWorkView.jcp',
    helpApi: '/cphsc/htmlpage/help.htm',
    Getfabuhuodong: '/cphsc/interface/zhiyuanzhefuwu/huoqusuoyou.jcp',
    Postfabuhuodong: '/cphsc/interface/zhiyuanzhefuwu/baoming.jcp',
    Getbangfuduixiang: '/cphsc/interface/zhiyuanzhefuwu/fuwuinfo.jcp',
    GetTowStupidApi: '/cphsc/interface/getLiangweiyuanType.jcp',
    GetPatryWorkListApi: '/cphsc/interface/getWentiqingdan.jcp',
    GetTowStupidListApi: '/cphsc/interface/getLiangweiyuan.jcp',
    PostGuijiApi: '/ExternalItems/guiji/interface/guijijilu.jcp',
    GetStudyTimeApi: '/cphsc/interface/updateTongJiEndTime.jcp',
    GetVolunteerOrderApi: '/cphsc/interface/zhiyuanzhefuwu/tongjigeren.jcp',
    GettongjibumenApi: '/cphsc/interface/zhiyuanzhefuwu/tongjibumen.jcp',
    GetUnreadMessageApi: '/ExternalItems/taskRelease/interface/getNoViewMsg.jcp',
    GetAboutInfoApi: 'cphsc/interface/readme/get.jcp',
    sendOpinionApi: 'cphsc/interface/readme/post.jcp',
    GetLegallistTypeApi: '/cphsc/interface/fazhi/zixunleixing.jcp',
    GetLegallistApi: '/cphsc/interface/fazhi/zixunlibiao.jcp',
    sendLigallistApi: '/cphsc/interface/fazhi/submitZixun.jcp',
    FazhandangyuanApi: '/ExternalItems/dangjian/fazhandangyuan.jcp',
    ZhiHuiConformTaskApi: '/ExternalItems/taskRelease/zhiHuiConformTask.jcp',
    FazhandangyuanxinxiApi: '/ExternalItems/dangjian/fazhandangyuanxinxi.jcp',
    FazhandangyuanListApi: '/ExternalItems/dangjian/fazhandangyuanList.jcp',
    QueryMembersApi: '/ExternalItems/taskRelease/interface/getSelectTaskUser.jcp',
    SendTaskApi: '/ExternalItems/taskRelease/interface/appTaskCreat.jcp',
    PraiseApi: '/cphsc/interface/gaoJianDianZan.jcp',
    TaskurgentApi: '/ExternalItems/taskRelease/interface/getUrgency.jcp',
    IsAdminApi: '/ExternalItems/taskRelease/interface/getUserAuth.jcp',
    ChooseUsersApi: '/ExternalItems/taskRelease/interface/AppSelectCreatTaskUser.jcp',
    CreateNewTaskApi: '/ExternalItems/taskRelease/window/xinjianrenwuCreat.jcp',
    Get110TaskApi: '/ExternalItems/shouhu/getZhuanTouList.jcp',
    Get110TaskDetailApi: '/ExternalItems/shouhu/getZhuanTouInfo.jcp',
    Reply110TaskApi: '/ExternalItems/waiguajs/suqiuzhuantou.jcp',
    GetTaskStatisticsApi: '/ExternalItems/shouhu/getChartData.jcp',
    GetDiaryTypeApi: '/cphsc/interface/dangjian/getBangFuLeiXing.jcp',
    SendDiaryApi: '/cphsc/interface/dangjian/savaBangFuLog.jcp',
    GetDiaryListApi: '/cphsc/interface/dangjian/getBangFuLogList.jcp',
    GetDiaryDetailsApi: '/cphsc/interface/dangjian/getBangFuLogData.jcp',
    GetMobilePartyApi: '/cphsc/interface/dangjian/savaGuanXiZhuanJie.jcp',
    GetPartyMapApi: '/cphsc/interface/dangjian/getDangJianMapData.jcp',
    GetCommunityListApi: '/cphsc/interface/dangjian/getSheQuHuoDongList.jcp',
    GetCommunityDetailsApi: '/cphsc/interface/dangjian/getSheQuHuoDongData.jcp',
    JoinCommunityApi: '/cphsc/interface/dangjian/sheQuHuoDongBaoMing.jcp',
    GetJoinCommunityInputApi: '/cphsc/interface/dangjian/getSheQuHuoDongBaoMing.jcp',
    SendJoinCommunityApi: '/cphsc/interface/dangjian/saveSheQuHuoDongBaoMing.jcp',
    sendLegalMediationApi: '/cphsc/interface/fazhi/submitTiaoJie.jcp',
    getEducationTypeApi: '/cphsc/interface/fazhi/getWenHuaChengDu.jcp',
    getMediationTypeApi: '/cphsc/interface/fazhi/getJiuFenLeiXing.jcp ',
    sendTaskTableApi: '/ExternalItems/taskRelease/interface/conformTaskForm.jcp',
    getSignApi: '/ExternalItems/dangjian/interface/getQianDaoInfo.jcp',
    signApi: '/ExternalItems/dangjian/interface/QianDao.jcp',
    getTaskReactApi: '/ExternalItems/taskRelease/interface/getQingShiInfo.jcp',
    sendTaskReactApi: '/ExternalItems/taskRelease/interface/saveQingShiInfo.jcp',
    GetCenterAppealApi: '/ExternalItems/policWork/getPoliceWorkPage.jcp',
    OpenAppealApi: '/ExternalItems/policWork/interface/gongkaiFanKui.jcp',
    CloseAppealApi: '/ExternalItems/policWork/interface/cheHuiGongkaiFanKui.jcp',
    ReplyAppealApi: '/ExternalItems/policWork/replyWork.jcp',
    RefuseAppealApi: '/ExternalItems/policWork/backWork.jcp',
    CompleteAppealApi: '/ExternalItems/taskRelease/zhiHuiConformTask.jcp',
    CenterSendTaskApi: '/ExternalItems/taskRelease/interface/AppPoliceWorkTaskCreat.jcp',

  },
};

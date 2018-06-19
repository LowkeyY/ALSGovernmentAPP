import {routerRedux} from 'dva/router'
import {login, SendValidateCode, PhoneLogin} from 'services/login'
import {Toast} from 'antd-mobile'
import modelExtend from 'dva-model-extend'
import {pageModel} from './common'
import {setLoginIn , postCurrentPosition} from 'utils'

const MD5 = require('md5'),
  encrypt = (word) => {
    return MD5(word, 'hex')
  }

export default modelExtend(pageModel, {
  namespace: 'login',

  state: {
    state: true,
    loadPwd: '',
    buttonState: true, //登录按钮状态
  },

  effects: {
    * login({payload}, {call, put, select}) {
      yield put({
        type: 'updateState',
        payload: {
          buttonState: false,
        },
      })
      const {from = '/', ...params} = payload, {usrPwd = ''} = params
      const data = yield call(login, Object.assign({}, params, {usrPwd: encrypt(usrPwd)}), true)
      yield put({
        type: 'updateState',
        payload: {
          buttonState: true,
        },
      })
      if (data && data.success) {
        if (data.errors) {
          Toast.offline(data.errors[0].msg)
        } else {
          const {sessionId = '', realName = '', userId = '', headPortrait = '', userType = '', guiji = {}} = data,
            users = {
              user_name: realName,
              user_power: usrPwd,
              user_token: sessionId,
              user_id: userId,
              user_avatar: headPortrait,
              user_type: userType
            }
          setLoginIn(users)
          yield put({
            type: 'app/updateUsers',
            payload: {
            },
          })
          yield put({
            type: 'app/updateGuiji',
            payload: {
              ...guiji
            },
          })
          postCurrentPosition(guiji)
          yield put(routerRedux.replace({
            pathname: from,
          }))
        }
      }
    },
    * SendValidateCode({payload}, {call, put, select}) {
      const {phoneNum} = payload
      const data = yield call(SendValidateCode, {phoneNum: phoneNum})
      if (data) {
        console.log(data)
      }
    },
    * PhoneLogin({payload}, {call, put, select}) {
      const {from = '/'} = payload
      const data = yield call(PhoneLogin, payload, true)
      if (data && data.success) {
        if (data.errors) {
          Toast.offline(data.errors[0].msg)
        } else {
          const {sessionId = '', realName = '', userId = '', headPortrait = '', userType = ''} = data,
            users = {
              user_name: realName,
              user_token: sessionId,
              user_id: userId,
              user_avatar: headPortrait,
              user_type: userType
            }
          setLoginIn(users)
          yield put({
            type: 'app/updateUsers',
            payload: {
            },
          })
          yield put(routerRedux.replace({
            pathname: from,
          }))
        }
      } else {
        Toast.offline('请检查手机号和验证码')
      }
    },
  },
  reducers: {
    'disabled'(state) {
      return state = !state
    },
  },
})

import {routerRedux} from 'dva/router'
import {login} from 'services/login'
import {Toast} from 'antd-mobile'
import modelExtend from 'dva-model-extend'
import {pageModel} from './common'
import {setLoginIn} from 'utils'

const MD5 = require("md5"), encrypt = (word) => {

  return MD5(word, 'hex');
}

export default modelExtend(pageModel, {
  namespace: 'login',

  state: {
    state: true,
    isLogin: true,
    loadPwd: ''
  },

  effects: {
    * login({payload}, {call, put, select}) {
      yield put({
        type: 'updateState',
        payload: {
          isLogin: false
        }
      })
      const {from = "/", ...params} = payload, {usrPwd = ""} = params;
      const data = yield call(login, Object.assign({}, params, {usrPwd: encrypt(usrPwd)}));
      console.log(data)
      if (data && data.success) {
        if (data.errors) {
          Toast.offline(data.errors[0].msg)
          yield put({
            type: 'updateState',
            payload: {
              isLogin: true
            }
          })
        } else {
          yield put({
            type: 'updateState',
            payload: {
              isLogin: true
            }
          })
          yield put({
            type: 'app/updateState',
            payload: {
              isLayout: false
            }
          })
          setLoginIn({
            ...data,
            ...params
          });

          yield put(routerRedux.replace({
            pathname: from
          }))
        }

      } else {
      }
    }
  },
  reducers: {
    'disabled'(state) {
      return state = !state;
    }
  }
})

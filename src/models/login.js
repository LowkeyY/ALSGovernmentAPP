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
    loadPwd: '',
    buttonState:true //登录按钮状态
  },

  effects: {
    * login({payload}, {call, put, select}) {
      yield put({
        type: 'updateState',
        payload: {
          buttonState: false
        }
      })
      const {from = "/", ...params} = payload, {usrPwd = ""} = params;
      const data = yield call(login, Object.assign({}, params, {usrPwd: encrypt(usrPwd)}));
      if (data && data.success) {
        if (data.errors) {
          Toast.offline(data.errors[0].msg)
          yield put({
            type: 'updateState',
            payload: {
              buttonState: true
            }
          })
        } else {
          yield put({
            type: 'app/updateState',
            payload: {
              isLogin: true,
            }
          })

          yield put({
            type: 'updateState',
            payload: {
              buttonState: true,
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
        yield put({
          type: 'updateState',
          payload: {
            buttonState: true,
          }
        })
      }
    }
  },
  reducers: {
    'disabled'(state) {
      return state = !state;
    }
  }
})

import {parse} from 'qs'
import modelExtend from 'dva-model-extend'
import { model } from 'models/common'
import { GetUnreadMessage } from 'services/querylist'
export default modelExtend(model, {
  namespace: 'mine',
  state: {

  },
  subscriptions: {
    setupHistory ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname ==='/mine') {
          dispatch({
            type: 'queryMessage',
          })
        }
      })
    }
    ,
  },
  effects: {
    * queryMessage ({ payload }, { call, put, select }) {
      const { isLogin = false } = yield select(_ => _.app)
      if (isLogin) {
        const data = yield call(GetUnreadMessage), { success, noViewCount = 0 } = data
        if (success) {
          yield put({
            type: 'app/updateState',
            payload: {
              noViewCount:noViewCount*1,
            },
          })
        }
      }
    }
  }

})

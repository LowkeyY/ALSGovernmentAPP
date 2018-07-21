import {parse} from 'qs'
import modelExtend from 'dva-model-extend'
import { model } from 'models/common'
import {GetAboutInfo} from 'services/querycontent'
export default modelExtend(model, {
  namespace: 'aboutus',
  state: {
     content:''
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(location => {
        let {pathname, query,action} = location
        if (pathname.startsWith('/aboutus')) {
          if(action=='PUSH'){
            dispatch({
              type: 'query',
            })
          }
        }
      })
    },
  },
  effects: {
    * query ({ payload }, { call, put, select }) {
      const data = yield call(GetAboutInfo), { content = '' } = data
      yield put({
        type: 'updateState',
        payload: {
          content
        },
      })
    },
  }

})

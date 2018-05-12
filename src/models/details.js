import {parse} from 'qs'
import modelExtend from 'dva-model-extend'
import { model } from 'models/common'
import { queryDetails } from 'services/querycontent'

export default modelExtend(model, {
  namespace: 'details',
  state: {
      currentData:{}
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(location => {
        let {pathname, query} = location;
        if (pathname.startsWith('/details')) {
          dispatch({
            type: 'queryDetails',
            payload: {
              ...query
            }
          })

        }
      })
    }
  },
  effects: {
    * queryDetails({payload, }, {call, put, select}) {
      const data = yield call(queryDetails, {...payload});
      yield put({
        type: 'updateState',
        payload: {
          currentData:data
        },
      })

    },
  }

})

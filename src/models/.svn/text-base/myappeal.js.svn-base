import modelExtend from 'dva-model-extend'
import { model } from 'models/common'
import { queryAppealList } from 'services/queryappeal'
export default modelExtend(model, {
  namespace: 'myappeal',
  state: {
    dataList:[],
    showType:''
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, action, query }) => {
        const { showType } =query
        if (pathname === `/myappeal`) {
          dispatch({
            type: 'updateState',
            payload: {
              name,
            }
          })
          dispatch({
            type: 'query',
            payload:{
              showType
            }
          })
        }
      })
    },
  },
  effects: {

    * query ({ payload = {} }, { call, put, select }) {
      const { showType } = yield select(_ => _.myappeal),
        { success = false, data = [], message = '获取数据失败。' } = yield call(queryAppealList, payload)
      if (success) {
        yield put({
          type: 'updateState',
          payload: {
            dataList: data,
          },
        })
      }
    },

  }
})

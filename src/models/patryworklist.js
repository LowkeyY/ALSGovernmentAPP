import modelExtend from 'dva-model-extend'
import { model } from 'models/common'
import { GetPatryWorkList } from 'services/querylist'

export default modelExtend(model, {
  namespace: 'patryworklist',
  state: {
     dataList:[]
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/patryworklist') {
          const { id = '', name = '' } = query
          dispatch({
            type: 'query',
          })
          dispatch({
            type: 'updateState',
            payload: {
              id,
              name,
            },
          })
        }
      })
    },
  },
  effects: {
    * query ({ payload }, { call, put, select }) {
      const data = yield call(GetPatryWorkList)
      if(data){
        const list = JSON.parse(data.datas)

        yield put({
          type:'updateState',
          payload:{
            dataList:list
          }
        })
      }
    },
  },
})

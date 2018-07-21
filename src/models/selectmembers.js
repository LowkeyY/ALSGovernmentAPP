import {parse} from 'qs'
import modelExtend from 'dva-model-extend'
import { model } from 'models/common'
import {QueryMembers} from 'services/querylist'
export default modelExtend(model, {
  namespace: 'selectmembers',
  state: {
    lists:[],
    taskId:'',
    itemLists:[]
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query , action}) => {
        if (pathname === '/selectmembers') {
          if (action === 'PUSH'){
            const { taskId = '', name = '' } = query
            dispatch({
              type: 'updateState',
              payload: {
                name,
                taskId
              },
            })
            dispatch({
              type: 'queryMembers',
              payload:{
                taskId
              }
            })
          }
        }
      })
    },
  },
  effects: {
    * queryMembers ({ payload }, { call, put, select }) {
       const result = yield call(QueryMembers, {...payload})
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            lists: result.data,
          },
        })
      }
    },
    * queryItems ({ payload }, { call, put, select }) {
      const result = yield call(QueryMembers, {...payload}),
        { lists } = yield select(state => state.selectmembers)
      if (result) {
        const {children=true,data} = result
        console.log(data)
        yield put({
          type: 'updateState',
          payload: {
            lists:lists,
          },
        })
      }
    },
  }

})

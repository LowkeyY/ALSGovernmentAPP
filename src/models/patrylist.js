
import {parse} from 'qs'
import modelExtend from 'dva-model-extend'
import { model } from 'models/common'
import { queryPatryList } from 'services/querylist'

export default modelExtend(model, {
  namespace: 'patrylist',
  state:{
    dataId:'',
    patryListData:[]
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(({pathname, query, action}) => {
       const {id} =query
        if (pathname === '/patrylist') {
          dispatch({
            type: "query",
            payload:{
              dataId:id
            }
          })
        }
      })
    },
  },
  effects: {
    * query({payload}, {call, put, select}) {
      const data = yield call(queryPatryList,payload);
      if(data){
        yield put({
          type: 'updateState',
          payload: {
            patryListData:data.data
          },
        })
      }
    }
  },
  reducers:{
    resetState(state, {payload}) {
      return {

      }
    },
    updateData(state, {payload}) {
      return {
        ...state,
        ...payload
      }
    },

  }
})

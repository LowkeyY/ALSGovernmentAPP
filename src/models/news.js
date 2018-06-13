import {parse} from 'qs'
import modelExtend from 'dva-model-extend'
import { model } from 'models/common'
import { queryPartyTabs, queryPartyData } from 'services/querylist'
 const  getList = (datas = []) => {
   const result = []
   datas.map((_, index) => {
     const { id = '', route = 'details' } = _
     if (id != '' > 0) {
       result.push({
         ..._,
         id,
         route,
       })
     }
   })
   return result.length > 0 ? result : []
 }
export default modelExtend(model, {
  namespace: 'news',
  state: {
    banners:[],
    tuijian:[],
    tabs:[],
    selectedIndex:0,
    lists:[]
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/news') {
          const { id = '', name = '' } = query
          dispatch({
            type: 'updateState',
            payload: {
              id,
              name,
            },
          })
          dispatch({
            type: 'query',
            payload: {
              dataId: id,
            },
          })
        }
      })
    },
  },

  effects: {
    * query ({ payload }, { call, put, select }) {
     const  { selectedIndex } = yield select(state => state.news)
      const data = yield call(queryPartyTabs, payload)
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            banners:data.banners,
            tuijian:data.tuijian,
            tabs:data.data
          },
        })
        if (data.data.length > 0) {
          const { id = '' } = data.data[selectedIndex]

          yield put({
            type: 'querySelect',
            payload: {
              id,
            },
          })
        } else {
          yield put({
            type: 'updateState',
            payload: {
              lists: [],
            },
          })
        }
      }

    },
    * querySelect ({ payload }, { call, put, select }) {
      const { id = '', selected = -1 } = payload, { selectedIndex } = yield select(state => state.news)
        const result = yield call(queryPartyData, { dataId: id })
        if (result) {
          let { data = [] } = result,
            updates = {
              lists: getList(data),
            }
          if (selected != -1) {
            updates['selectedIndex'] = selected
          }
          yield put({
            type: 'updateState',
            payload: {
              ...updates,
            },
          })
        }
    },
  },


})

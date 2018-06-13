import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { model } from 'models/common'
import { queryPartyTabs, queryPartyData } from 'services/querylist'



export default modelExtend(model, {
  namespace: 'threebig',
  state: {
    id: '',
    name: '',
    selectedIndex: 0,
    tabs: [],
    itemData:[],
    bannersData:[],
   fixData:[],
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query , action}) => {
        if (pathname === '/threebig') {
          if (action === 'PUSH'){
            const { id = '', name = '' } = query
            dispatch({
              type: 'updateState',
              payload: {
                id,
                name,
                selectedIndex: 0,
                tabs: [],
              },
            })
            dispatch({
              type: 'query',
              payload: {
                ...query,
              },
            })
          }
        }
      })
    },
  },
  effects: {
    * query ({ payload }, { call, put, select }) {
      const { id = '' } = payload,
        result = yield call(queryPartyTabs, { dataId: id })
      if (result) {
        let { data = [] ,banners=[]} = result
        yield put({
          type: 'updateState',
          payload: {
            tabs: data,
            bannersData:banners
          },
        })
        if (data.length > 0) {
          const { id = '' } = data[0]
          yield put({
            type: 'querySelect',
            payload: {
              id,
            },
          })
        }
      }
    },
    * queryOthers ({ payload }, { call, put, select }) {
      const { id = '' } = payload,
        result = yield call(queryPartyTabs, { dataId: id })
      if (result) {
        let { data = [] ,banners=[]} = result
        yield put({
          type: 'updateState',
          payload: {
            fixData:data
          },
        })
      }
    },

    * querySelect ({ payload }, { call, put, select }) {
      const { id = '',selected = -1 } = payload, { selectedIndex } = yield select(state => state.threebig)
      if (selected != -1) {
        yield put({
          type: 'updateState',
          payload: {
            selectedIndex: selected,
          },
        })
      }
      const result = yield call(queryPartyData, { dataId: id })
      if (result) {
        let { data = [] } = result,
          updates = {
            itemData:data
          }
        yield put({
          type: 'updateState',
          payload: {
            ...updates
          },
        })
      }

    },
  }
})

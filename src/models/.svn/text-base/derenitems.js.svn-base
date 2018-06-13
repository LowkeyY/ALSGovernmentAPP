import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { model } from 'models/common'
import { queryPartyTabs, queryPartyData } from 'services/querylist'



export default modelExtend(model, {
  namespace: 'derenitems',
  state: {
    id: '',
    name: '',
    selectedIndex: 0,
    tabs: [],
    itemData:[],
    bannersData:[]
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query , action}) => {
        if (pathname === '/derenitems') {
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

    * querySelect ({ payload }, { call, put, select }) {
      const { id = '' } = payload, { selectedIndex } = yield select(state => state.derenitems)

      yield put({
        type: 'updateState',
        payload: {
          selectedIndex
        },
      })
      const result = yield call(queryPartyData, { dataId: id })
      if (result) {
        let { data = [] } = result
        yield put({
          type: 'updateState',
          payload: {
            itemData:data
          },
        })
      }

    },
  }
})

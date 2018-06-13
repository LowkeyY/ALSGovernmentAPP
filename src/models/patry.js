import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { model } from 'models/common'
import { queryColumn } from 'services/querycolumntype'

export default modelExtend(model, {
  namespace: 'patry',
  state: {
    patryDate: [],
    patryList: [],
    isScroll: false,
    id: '',
    name: '',
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/patry') {
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
      const data = yield call(queryColumn, payload)
      if (data) {
        yield put({
          type: 'updateData',
          payload: {
            patryDate: data.data,
            patryList: data.tuijian,
          },
        })
      }

    },
  },

  reducers: {
    resetState (state, { payload }) {
      return {}
    },
    updateData (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },

  },

})

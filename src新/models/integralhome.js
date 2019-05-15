import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { model } from 'models/common'
import { getUserIntegral, getIntegralList } from 'services/shop'
import { routerRedux } from 'dva/router'
import { Toast } from 'components'

const getDefaultPaginations = () => ({
    current: 1,
    total: 0,
    size: 10,
  }),
  namespace = 'integralhome'

export default modelExtend(model, {
  namespace,
  state: {
    intergation: '0',
    scrollerTop: 0,
    paginations: getDefaultPaginations(),
    lists: [],
  },
  subscriptions: {
    setupHistory ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/integralhome') {
          dispatch({
            type: 'updateState',
            payload: {
              dataList: [],
              scrollerTop: 0,
              paginations: getDefaultPaginations(),
            }
          });
          dispatch({
            type: 'query',
          })
          dispatch({
            type: 'queryIntegral',
          })
          dispatch({
            type: 'getIntegralList',
          })
        }
      })
    },
  },
  effects: {
    * queryIntegral ({ payload }, { call, put, select }) {
      const data = yield call(getUserIntegral),
        { success, intergation } = data
      if (success) {
        yield put({
          type: 'updateState',
          payload: {
            intergation,
          },
        })
      }
    },
    * getIntegralList ({ payload = {} }, { call, put, select }) {
      const { callback = '', isRefresh = false } = payload,
        _this = yield select(_ => _[`${namespace}`]),
        { paginations: { current, total, size }, lists } = _this,
        start = isRefresh ? 1 : current
      const result = yield call(getIntegralList, { nowPage: start, showCount: size })
      if (result) {
        let { data = [], total = 0 } = result,
          newLists = []
        newLists = start == 1 ? data : [...lists, ...data]
        yield put({
          type: 'updateState',
          payload: {
            paginations: {
              ..._this.paginations,
              total: total * 1,
              current: start + 1,
            },
            lists: newLists,
          },
        })
      }
      if (callback) {
        callback()
      }
    },

  },
})

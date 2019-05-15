import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { model } from 'models/common'
import { queryCenterAppeal } from 'services/centertask'

const getDefaultPaginations = () => ({
    current: 1,
    total: 0,
    size: 10,
  }),
  namespace = 'centertask'
export default modelExtend(model, {
  namespace,
  state: {
    selectedIndex: 0,
    dataList: [],
    scrollerTop: 0,
    paginations: getDefaultPaginations(),
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        let { pathname, action } = location
        if (pathname === '/centertask') {
          dispatch({
            type: 'updateState',
            payload: {
              scrollerTop: 0,
              paginations: getDefaultPaginations(),
            },
          })
          dispatch({
            type: 'queryList',
            payload: {},
          })
        }
      })
    },
  },
  effects: {
    * queryList ({ payload }, { call, put, select }) {
      const { callback = '', isRefresh = false, selected = -1 } = payload,
        _this = yield select(_ => _[`${namespace}`]),
        { paginations: { current, total, size }, selectedIndex, dataList } = _this,
        currentSelectedIndex = selected !== -1 ? selected : selectedIndex
      yield put({
        type: 'updateState',
        payload: {
          selectedIndex: currentSelectedIndex,
        },
      })
      const start = isRefresh ? 1 : current,
        result = yield call(queryCenterAppeal, { showType: currentSelectedIndex + 1, nowPage: start, showCount: size })
      if (result) {
        let { data = [], sumCount = 0 } = result,
          newLists = []
        newLists = start === 1 ? data : [...dataList, ...data]
        yield put({
          type: 'updateState',
          payload: {
            paginations: {
              ..._this.paginations,
              total: sumCount * 1,
              current: start + 1,
            },
            dataList: newLists,
          },
        })
      }
      if (callback) {
        callback()
      }
    },
  },

})

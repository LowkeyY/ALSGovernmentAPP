import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { model } from 'models/common'
import { getJicengshenying } from 'services/querylist'

const getDefaultPaginations = () => ({
  current: 1,
  total: 0,
  size:10,
}),
  namespace = 'basevoice'
export default modelExtend(model, {
  namespace: 'basevoice',
  state: {
    tabs: [{ id: 1, title: '待办理' },
      { id: 2, title: '急需办理' },
      { id: 3, title: '已办结' },
      { id: 4, title: '已逾期' }],
    lists: [],
    selectedIndex: 0,
    scrollerTop: 0,
    paginations: getDefaultPaginations(),
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      dispatch({
        type: 'queryListview',
        payload: {
          types: 1,
        },
      })
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/basevoice') {
          const { id = '', name = '' } = query
          dispatch({
            type: 'updateState',
            payload: {
              id,
              name,
              scrollerTop: 0,
              paginations: getDefaultPaginations(),
            },
          })
        }
      })
    },
  },

  effects: {
    * queryListview ({ payload }, { call, put, select }) {
      const {callback = '', isRefresh = false, selected = -1 } = payload,
        _this = yield select(_ => _[`${namespace}`]),
        {paginations: {current, total, size},lists,selectedIndex} = _this
      if (selected != -1) {
        yield put({
          type: 'updateState',
          payload: {
            selectedIndex: selected,
          },
        })
      }
      const start = isRefresh ? 1 : current,
     { success = true, datas = [],totalCount=0 } = yield call(getJicengshenying,{types:selectedIndex+1, nowPage: start, showCount: size} )
      if (success) {
         let newLists = []
        newLists = start == 1 ? datas : [...lists, ...datas]
        yield put({
          type: 'updateState',
          payload: {
            paginations: {
              ..._this.paginations,
              total: totalCount * 1,
              current: start + 1
            },
            lists:newLists
          },
        })
      }
      if (callback)
        callback()
    },
  },
})

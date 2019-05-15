import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { model } from 'models/common'
import { queryPartyTabs, queryPartyData } from 'services/querylist'

const getDefaultPaginations = () => ({
    current: 1,
    total: 0,
    size: 10
  }),
  namespace='derenitems'


export default modelExtend(model, {
  namespace: 'derenitems',
  state: {
    id: '',
    name: '',
    selectedIndex: 0,
    tabs: [],
    itemData:[],
    bannersData:[],
    scrollerTop: 0,
    paginations: getDefaultPaginations(),
    refreshId:''
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
                scrollerTop: 0,
                paginations: getDefaultPaginations(),
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
            type: 'updateState',
            payload: {
              refreshId:id,
            },
          })
          yield put({
            type: 'queryListview',
            payload: {
              refreshId:id,
            },
          })
        }
      }
    },

    * queryListview({payload}, {call, put, select}) {
      const {callback = '', isRefresh = false, selected = -1 } = payload,
        _this = yield select(_ => _[`${namespace}`]),
        {paginations: {current, total, size}, itemData,selectedIndex,refreshId} = _this
      if (selected != -1) {
        yield put({
          type: 'updateState',
          payload: {
            selectedIndex: selected,
          },
        })
      }
      const start = isRefresh ? 1 : current,
        result = yield call(queryPartyData, {dataId:refreshId, nowPage: start, showCount: size})
      if (result) {
        let {data = [], totalCount = 0} = result,
          newLists = []
        newLists = start == 1 ? data : [...itemData, ...data]
        yield put({
          type: 'updateState',
          payload: {
            paginations: {
              ..._this.paginations,
              total: totalCount * 1,
              current: start + 1
            },
            itemData:newLists
          },
        })
      }
      if (callback)
        callback()
    }
  }
})

import modelExtend from 'dva-model-extend'
import { model } from 'models/common'
import { queryPartyTabs, queryPartyData } from 'services/querylist'

const getGrids = (arr) => {
    const gridList = arr.slice(1)
    return gridList
  },
  getFixColumn = (arr) => {
    const fixColumn = arr.slice(0, 1)
    return fixColumn[0]
  },
  getBanners = (arr) => {
    arr && arr.map(item => {
      item.url = item.image
    })
    return arr
  },
  getList = (datas = []) => {
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
  },
  getDefaultPaginations = () => ({
    current: 1,
    total: 0,
    size: 10,
  }),
  namespace = 'incorrupt'
export default modelExtend(model, {
  namespace: 'incorrupt',
  state: {
    selectedIndex: 0,
    banners: [],
    dataList: [],
    gridList: [],
    fixColumn: {},
    scrollerTop: 0,
    paginations: getDefaultPaginations(),
    refreshId:''
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (action == 'PUSH') {
          if (pathname === '/incorrupt') {
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
            dispatch({
              type: 'query',
              payload: {
                dataId: id,
              },
            })
          }
        }
      })
    },
  },
  effects: {
    * query ({ payload }, { call, put, select }) {

      const result = yield call(queryPartyTabs, payload)
      if (result) {
        let { data = [], banners = [] } = result
        const gridList = getGrids(data)
        yield put({
          type: 'updateState',
          payload: {
            gridList,
            fixColumn: getFixColumn(data),
            banners: getBanners(banners),
          },
        })
        if (gridList.length > 0) {
          const { id = '', route = '' } = gridList[0]
          if (id != '' && route == '') {
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

      }
    },
    // * querySelect ({ payload }, { call, put, select }) {
    //   const { id = '', selected = -1 } = payload
    //   if (selected != -1) {
    //     yield put({
    //       type: 'updateState',
    //       payload: {
    //         selectedIndex: selected,
    //       },
    //     })
    //   }
    //   const result = yield call(queryPartyData, { dataId: id }), { selectedIndex } = yield select(state => state.incorrupt)
    //   if (result) {
    //     let { data = [] } = result,
    //       updates = {
    //         dataList: getList(data),
    //       }
    //     if (selected != -1) {
    //       updates['selectedIndex'] = selected
    //     }
    //     yield put({
    //       type: 'updateState',
    //       payload: {
    //         ...updates,
    //       },
    //     })
    //   }
    // },
    * queryListview({payload}, {call, put, select}) {
      const {callback = '', isRefresh = false, selected = -1 } = payload,
        _this = yield select(_ => _[`${namespace}`]),
        {paginations: {current, total, size}, dataList,selectedIndex,refreshId} = _this
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
        newLists = start == 1 ? data : [...dataList, ...data]
        yield put({
          type: 'updateState',
          payload: {
            paginations: {
              ..._this.paginations,
              total: totalCount * 1,
              current: start + 1
            },
            dataList:newLists
          },
        })
      }
      if (callback)
        callback()
    }
  },

})

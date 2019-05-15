import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { model } from 'models/common'
import { queryPartyTabs, queryPartyData,GetUnreadMessage } from 'services/querylist'
const getGrid = (datas = []) => {
    let result = [],
      counts = 0,
      fixedLanmu = []
    datas.map((data, index) => {
      const { id = '', route = '', image = '', ...others } = data
      if (id != '' && counts++ < 4) {
        result.push({
          id,
          route,
          icon: image || [],
          ...others,
        })
      }
    })
    if (counts == datas.length && datas[counts - 1]) {
      fixedLanmu = {
        ...datas[counts - 1],
      }
    }
    return {
      grids: result.length > 0 ? result : [],
    }
  },
  getBanners = (datas = []) => {
    let result = []
    datas.map((data, index) => {
      const { image = '', id = '' } = data
      if (image != '' && id != '') {
        result.push({
          url: image,
          ...data,
        })
      }
    })
    return result.length > 0 ? result : []
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
  namespace = 'lanmutabshouhu'

export default modelExtend(model, {
  namespace: 'lanmutabshouhu',
  state: {
    bannerDatas: [],
    grids: [],
    lists: [],
    id: '',
    name: '',
    selectedIndex: 0,
    scrollerTop: 0,
    paginations: getDefaultPaginations(),
    refreshId: '',
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/lanmutabshouhu') {
          dispatch({
            type: 'queryMessage',
          })
          if (action === 'PUSH') {
            const { id = '', name = '' } = query
            dispatch({
              type: 'updateState',
              payload: {
                id,
                name,
                bannerDatas: [],
                grids: [],
                lists: [],
                selectedIndex: 0,
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
        let { data = [], banners = [] } = result,
          { grids } = getGrid(data)
        yield put({
          type: 'updateState',
          payload: {
            grids,
            bannerDatas: getBanners(banners),
          },
        })
        if (grids.length > 0) {
          const { id = '', route = '' } = grids[0]
          if (id != '' && route == '') {
            yield put({
              type: 'updateState',
              payload: {
                refreshId: id,
              },
            })
            yield put({
              type: 'queryListview',
              payload: {
                refreshId: id,
              },
            })
          }
        }
      }
    },
    * queryListview ({ payload }, { call, put, select }) {
      const { callback = '', isRefresh = false, selected = -1 } = payload,
        _this = yield select(_ => _[`${namespace}`]),
        { paginations: { current, total, size }, lists, selectedIndex, refreshId } = _this
      if (selected != -1) {
        yield put({
          type: 'updateState',
          payload: {
            selectedIndex: selected,
          },
        })
      }
      const start = isRefresh ? 1 : current,
        result = yield call(queryPartyData, { dataId: refreshId, nowPage: start, showCount: size })
      if (result) {
        let { data = [], totalCount = 0 } = result,
          newLists = []
        newLists = start == 1 ? data : [...lists, ...data]
        yield put({
          type: 'updateState',
          payload: {
            paginations: {
              ..._this.paginations,
              total: totalCount * 1,
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
    * queryMessage ({ payload }, { call, put, select }) {
      const { isLogin = false } = yield select(_ => _.app)
      if (isLogin) {
        const data = yield call(GetUnreadMessage), { success, noViewCount = 0 } = data
        if (success) {
          yield put({
            type: 'app/updateState',
            payload: {
              noViewCount:noViewCount*1,
            },
          })
        }
      }
    }
  },

})

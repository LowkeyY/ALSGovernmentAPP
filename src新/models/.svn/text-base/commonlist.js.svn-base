import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { model } from 'models/common'
import { queryPartyTabs, queryPartyData } from 'services/querylist'

const getDefaultPaginations = () => ({
    current: 1,
    total: 0,
    size:10,
  }),
  namespace = 'commonlist',
  getGrid = (datas = []) => {
    let result = [],
      counts = 0,
      fixedLanmu = []
    datas.map((data, index) => {
      const { id = '', route = '', image = '', ...others } = data
      if (id != '' && counts++ < 4) {
        result.push({
          id,
          route: route || '/',
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
      fixedLanmu,
    }
  },
  getBanners = (datas = []) => {
    let result = [],
      counts = 0
    datas.map((data, index) => {
      const { image = '', id = '' } = data
      if (image != '' && id != '' && counts++ < 4) {
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
  getexternalUrl = (datas = []) => {
    datas.map((data, index) => {
      if (data.externalUrl !== '') {
        return data.externalUrl
      }
    })
  }


export default modelExtend(model, {
  namespace: 'commonlist',
  state: {
    bannerDatas: [],
    grids: [],
    fixedLanmu: {},
    lists: [],
    id: '',
    name: '',
    selectedIndex: 0,
    isOuterChain: false,
    scrollerTop: 0,
    paginations: getDefaultPaginations(),
    refreshId: '',
    dataItems:[]
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/commonlist') {
          if (action === 'PUSH') {
            const { id = '', name = '' } = query
            dispatch({
              type: 'updateState',
              payload: {
                id,
                name,
                bannerDatas: [],
                grids: [],
                fixedLanmu: {},
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
        { selectedIndex } = yield select(state => state.commonlist),
        result = yield call(queryPartyTabs, { dataId: id })
      if (result) {
        let { data = [], banners = [] } = result,
          { grids, fixedLanmu } = getGrid(data)
        yield put({
          type: 'updateState',
          payload: {
            grids,
            fixedLanmu,
            bannerDatas: getBanners(banners),
          },
        })
        if (grids.length > 0) {
          const { id = '' } = grids[0]
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

          yield put ({
            type:'queryOthers',
            payload: grids[selectedIndex]
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
    * queryOthers ({ payload }, { call, put, select }) {
      const { id = '' } = payload,
        result = yield call(queryPartyTabs, { dataId: id })
      if (result) {
        let { data = [] } = result
        yield put({
          type: 'updateState',
          payload: {
            dataItems:data
          },
        })
      }
    },
    * queryListview ({ payload }, { call, put, select }) {
      const { callback = '', isRefresh = false, selected = -1 } = payload,
        _this = yield select(_ => _[`${namespace}`]),
        { paginations: { current, total, size }, lists, selectedIndex, refreshId, isOuterChain } = _this
      if (!isOuterChain) {
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
          let {data = [], totalCount = 0} = result,
            newLists = []
          newLists = start == 1 ? data : [...lists, ...data]
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
      } else {
        const updates = {}
        if (selected != -1) {
          updates['selectedIndex'] = selected
        }
        yield put({
          type: 'updateState',
          payload: {
            ...updates,
            externalUrl: getexternalUrl(),
            isOuterChain: true,
          },
        })

      }


    },
  },

})

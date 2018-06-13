import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { model } from 'models/common'
import { queryPartyTabs, queryPartyData } from 'services/querylist'

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
  }

export default modelExtend(model, {
  namespace: 'lanmutabshouhu',
  state: {
    bannerDatas: [],
    grids: [],
    lists: [],
    id: '',
    name: '',
    selectedIndex: 0,
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/lanmutabshouhu') {
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
              type: 'querySelect',
              payload: {
                id,
              },
            })
          }
        }
      }
    },
    * querySelect ({ payload }, { call, put, select }) {
      const { id = '', selected = -1 } = payload
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
            lists: getList(data),
          }
        yield put({
          type: 'updateState',
          payload: {
            ...updates,
          },
        })
      }
    },
  },

})

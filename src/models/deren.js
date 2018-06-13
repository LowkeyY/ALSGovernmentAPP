import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { model } from 'models/common'
import { queryPartyTabs } from 'services/querylist'
import defaultIcon from 'themes/images/nmenus/lvyou.png'

const getGrid = (datas = []) => {
    const result = []
    datas.map((data, index) => {
      const { id = '', route = '', image = '', ...others } = data
      if (id != '') {
        result.push({
          id,
          route: route || '/',
          icon: image || defaultIcon,
          ...others,
        })
      }
    })
    return result.length > 0 ? result : []
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
      const { id = '', route = 'details', items = [] } = _
      if (id != '' && items.length > 0) {
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
  namespace: 'deren',
  state: {
    bannerDatas: [],
    grids: [],
    lists: [],
    id: '',
    name: '',
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query }) => {
        if (pathname === '/deren') {
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
              ...query,
            },
          })
        }
      })
    },
  },
  effects: {
    * query ({ payload }, { call, put, select }) {
      const { id = '' } = payload,
        result = yield call(queryPartyTabs, { dataId: id })
      if (result) {
        let { data = [], banners = [], tuijian = [] } = result
        yield put({
          type: 'updateState',
          payload: {
            grids: getGrid(data),
            bannerDatas: getBanners(banners),
            lists: getList(tuijian),
          },
        })
      }
    },
  },
})

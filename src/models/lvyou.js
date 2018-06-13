import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { model } from 'models/common'
import { queryPartyTabs } from 'services/querylist'

const defaultBanners = [{
    url: require('themes/images/lvyou/default.jpg'),
  }, {
    url: require('themes/images/lvyou/default.jpg'),
  }],
  defaultGrids = [{
    icon: require('themes/images/nmenus/suqiu.png'),
    name: '一键诉求',
    route: 'appeal',
  }],
  defaultLists = [{
    title: '动态新闻',
    items: [{
      id: '0',
      title: '测试',
      image: '',
    }],
  }],
  defaultIcon = require('themes/images/nmenus/suqiu.png'),
  getGrid = (datas = []) => {
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
    return result.length > 0 ? result : defaultGrids
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
    return result.length > 0 ? result : defaultBanners
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
    return result.length > 0 ? result : defaultLists
  }

export default modelExtend(model, {
  namespace: 'lvyou',
  state: {
    bannerDatas: [],
    grids: [],
    lists: [],
    id: '',
    name: '',
    isScroll: false,
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query }) => {
        if (pathname === '/lvyou') {
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

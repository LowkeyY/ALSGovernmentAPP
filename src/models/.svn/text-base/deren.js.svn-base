import {parse} from 'qs'
import modelExtend from 'dva-model-extend'
import {model} from 'models/common'
import {queryPartyTabs, queryPartyData} from 'services/querylist'
import defaultIcon from 'themes/images/nmenus/lvyou.png'

const namespace = 'deren', getGrid = (datas = []) => {
    const result = []
    datas.map((data, index) => {
      const {id = '', route = '', image = '', ...others} = data
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
      const {image = '', id = ''} = data
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
      const {id = '', route = 'details', items = []} = _
      if (id != '' && items.length > 0) {
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
    size:10
  })

export default modelExtend(model, {
  namespace: 'deren',
  state: {
    bannerDatas: [],
    grids: [],
    lists: [],
    id: '',
    name: '',
    scrollerTop: 0,
    paginations: getDefaultPaginations()
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(({pathname, query, action}) => {
        if (pathname === '/deren' && action == 'PUSH') {
          const {id = '', name = ''} = query
          dispatch({
            type: 'updateState',
            payload: {
              id,
              name,
              scrollerTop: 0,
              paginations: getDefaultPaginations()
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
    * query({payload}, {call, put, select}) {
      const {id = ''} = payload,
        result = yield call(queryPartyTabs, {dataId: id})
      if (result) {
        let {data = [], banners = [], tuijian = []} = result
        yield put({
          type: 'updateState',
          payload: {
            grids: getGrid(data),
            bannerDatas: getBanners(banners),
            lists: getList(tuijian),
          },
        })
        if (tuijian.length > 0) {
          const {id = '', title = ''} = tuijian[0]
          yield put({
            type: 'queryListview',
            payload: {
              id,
              title
            },
          })
        }
      }
    },
    * queryListview({payload}, {call, put, select}) {
      const {id = '', title = '', callback = '', isRefresh = false} = payload,
        _this = yield select(_ => _[`${namespace}`]),
        {paginations: {current, total, size}, lists} = _this,
        start = isRefresh ? 1 : current,
        result = yield call(queryPartyData, {dataId: id, nowPage: start, showCount: size})
      if (result) {
        let {data = [], totalCount = 0} = result,
          newLists = [], {items = [], ...others} = (lists.length > 0 ? lists[0] : {})
        newLists = start == 1 ? data : [...items, ...data]
        yield put({
          type: 'updateState',
          payload: {
            paginations: {
              ..._this.paginations,
              total: totalCount * 1,
              current: start + 1
            },
            lists: [{
              ...others,
              items: newLists
            }],
          },
        })
      }
      if (callback)
        callback()
    }
  },
})

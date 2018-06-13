import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { model } from 'models/common'
import { queryPartyTabs, queryPartyData } from 'services/querylist'
const   defaultLists = [{
  title: '动态新闻',
  items: [{
    id: '0',
    title: '测试',
    image: '',
  }],
}]
 const getList = (datas = []) => {
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
  namespace: 'ecology',
  state: {
    data: [],
    banners: [],
    lists: [],
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/ecology') {
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
              dataId: id,
            },
          })
        }
      })
    },
  },

  effects: {
    * query ({ payload }, { call, put, select }) {
      const data = yield call(queryPartyTabs, payload)
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            banners:data.banners,
            data:data.data,
            lists: getList(data.tuijian)
          },
        })
      }
    },
    * querySelect ({ payload }, { call, put, select }) {
      console.log(payload)
      const { id = '' } = payload
      const result = yield call(queryPartyData, { dataId: id })
      if (result) {

        yield put({
          type: 'updateState',
          payload: {
            items,
          },
        })
      }
    },
  },

})

import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { model } from 'models/common'
import { queryPartyTabs } from 'services/querylist'
import { queryAdmin } from 'services/queryappeal'
import { doDecode } from 'utils'

const getInfo = (info) => {
    if (info) {
      try {
        return doDecode(info)
      } catch (e) {

      }
    }
    return {}
  },
  getGridbox = (data = []) => {
    let gridDatas = []
    data.map((item, index) => {
      const { id = '', route = '', image = '', infos = '', ...others } = item
      let { type, scenery = 'false' } = getInfo(infos)
      if (type === 'grids') {
        gridDatas.push({
          id,
          scenery,
          route: route || '/',
          icon: image || '',
          ...others,
        })
      }
    })
    return gridDatas.length > 0 ? gridDatas : []
  }
export default modelExtend(model, {
    namespace: 'service',
    state: {
      grids: [],
    },
    subscriptions: {
      setup ({ dispatch, history }) {
        history.listen(({ pathname, query, action }) => {
          const { id = '' } = query
          if (pathname === '/service') {
            dispatch({
              type: 'updateState',
              payload: {
                grids: [],
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
          let { data = [] } = result
          yield put({
            type: 'updateState',
            payload: {
              grids: getGridbox(data),
            },
          })
        }
      },
    },
    reducers: {},
  },
)

import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { model } from 'models/common'
import { Toast } from 'components'
import { postionsToString } from 'utils'
import { routerRedux } from 'dva/router'
import { queryAppealType, sendAppealInfo } from 'services/queryappeal'

const getType = (datas = []) => {
  const currentDatas = JSON.parse(datas)
  currentDatas.map(items => {
    items.label = items.name
  })
  return currentDatas
}
export default modelExtend(model, {
  namespace: 'warning',
  state: {
    appealType: [],
    files: {},
    animating: false,
    name: '',
    location: '',
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, action, query }) => {
        if (pathname === '/warning') {
          const { name = '', location = postionsToString({}) } = query
          dispatch({
            type: 'updateState',
            payload: {
              name,
              location,
            },
          })
          dispatch({
            type: 'query',
          })
        }
      })
    },
  },
  effects: {
    * query ({ payload }, { call, put, select }) {
      const data = yield call(queryAppealType)
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            appealType: getType(data.datas),
          },
        })
      }
    },
    * sendAppealInfo ({ payload }, { call, put, select }) {
      const { images = [], mediaFile = {}, ...others } = payload,
        { location } = yield select(_ => _.warning),
        { success, workId = '' } = yield call(sendAppealInfo, { ...others, location }, images, mediaFile)
      if (success) {
        yield put({
          type: 'updateState',
          payload: {
            animating: false,
          },
        })
        yield put(routerRedux.replace({
          pathname: '/seekdetails',
          query: {
            id: workId,
          },
        }))
      } else {
        yield put({
          type: 'updateState',
          payload: {
            animating: false,
          },
        })
        Toast.offline(data.message)
      }
    },
  },
})

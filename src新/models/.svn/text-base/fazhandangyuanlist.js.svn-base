import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { routerRedux } from 'dva/router'
import { model } from 'models/common'
import { Toast } from 'components'
import { getFazhandangyuanList } from 'services/fazhandangyuan'

const namespace = 'fazhandangyuanlist',
  defaultState = () => ({
    items: [],
  })

export default modelExtend(model, {
  namespace,
  state: {
    liuchengId: '7a9bf0d6-824c-4e04-9775-d268a5ab0325',
    ...defaultState(),
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        let { pathname, query, action } = location
        if (pathname.startsWith(`/${namespace}`)) {
          const { liuchengId = '7a9bf0d6-824c-4e04-9775-d268a5ab0325' } = query
          if (action == 'PUSH') {
            dispatch({
              type: 'updateState',
              payload: {
                liuchengId,
              },
            })
          }
          dispatch({
            type: 'query',
            payload: {
              liuchengId,
            },
          })
        }
      })
    },
  },
  effects: {
    * query ({ payload }, { call, put, select }) {
      const result = yield call(getFazhandangyuanList, payload), { success = false, message = '发生未知错误。', ...others } = result
      if (success) {
        yield put({
          type: 'updateState',
          payload: {
            ...defaultState(),
            ...others,
          },
        })
      } else {
        Toast.fail(message, 2)
        yield put(routerRedux.goBack())
      }
    },
  },
})

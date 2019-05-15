import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { model } from 'models/common'
import { Toast } from 'components'
import { postionsToString } from 'utils'
import { routerRedux } from 'dva/router'
import { queryAppealType, sendAppealInfo } from 'services/queryappeal'
import { GetAboutInfo } from 'services/querycontent'

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
    notesvisible: false,
    content: '',
    isFankui: false,
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      dispatch({
        type: 'queryAbout',
        payload: {
          key: 'suqiu',
        },
      })
      history.listen(({ pathname, action, query }) => {
        if (pathname === '/warning') {
          const { name = '', location = postionsToString({}),isFankui=false } = query
          dispatch({
            type: 'updateState',
            payload: {
              name,
              location,
              isFankui:isFankui==='true'?true:false
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
      const { isFankui } = yield select(_ => _.warning),
       data = yield call(queryAppealType,{isFankui:isFankui?'2':'1'})
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
        { location,isFankui } = yield select(_ => _.warning),
        { success, workId = '' } = yield call(sendAppealInfo, {
          ...others,
          location,
          isFankui: isFankui ? '2' : '1',
        }, images, mediaFile)
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
    * queryAbout ({ payload }, { call, put, select }) {
     const data = yield call(GetAboutInfo, payload), { content = '', autoShow = false } = data
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            content,
          },
        })
        if (autoShow) {
          yield put({
            type: 'updateState',
            payload: {
              notesvisible: true,
            },
          })
        }
      }
    },
  },
})

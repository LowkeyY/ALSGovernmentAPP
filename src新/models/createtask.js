import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { model } from 'models/common'
import { Toast } from 'components'
import { postionsToString } from 'utils'
import {
  queryAppealType,
  sendAppealInfo,
  queryStreet,
  queryTaskurgent,
  queryAdmin,
  queryUsers,
  createNewTask,
} from 'services/queryappeal'
import { routerRedux } from 'dva/router'

const getType = (datas = []) => {
    let currentDatas
    if (Array.isArray(datas)) {
      currentDatas = datas
    } else {
      currentDatas = JSON.parse(datas)
    }
    currentDatas.map(items => {
      items.label = items.name
      if (items.id) {
        items.value = items.id
      }
    })
    return currentDatas
  },
  getUser = (datas = []) => {
    const arr = []
    datas[0].data && datas[0].data.map((item, i) => {
      arr.push({
        label: `${item.name}${item.deptPath}`,
        value: item.userId,
        dept: item.deptPath,
      })
    })
    return arr.length > 0 ? arr : []
  }
export default modelExtend(model, {
  namespace: 'createtask',
  state: {
    appealType: [],
    noticeType: [],
    files: {},
    animating: false,
    name: '',
    location: '',
    content: '',
    isAdmin: false,
    isShowSelectMenu: false,
    userItems: [],
    selectedUsers: [],
    selectedIndex: 0,
    district: [],
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
        if (pathname === '/createtask' && action === 'PUSH') {
          const { name = '', location = postionsToString({}) } = query
          dispatch({
            type: 'updateState',
            payload: {
              name,
              location,
              selectedUsers: [],
            },
          })
          dispatch({
            type: 'queryType',
          })
          dispatch({
            type: 'queryTaskurgent',
          })
          dispatch({
            type: 'queryAdmin',
          })
          dispatch({
            type: 'queryUsers',
          })
          dispatch({
            type: 'queryStreet',
          })
        }
      })
    },
  },
  effects: {
    * queryType ({ payload }, { call, put, select }) {
      const data = yield call(queryAppealType, { isFankui: '2' })
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            appealType: getType(data.datas),
          },
        })
      }
    },
    * queryStreet ({ payload }, { call, put }) {
      const data = yield call(queryStreet)
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            district: data.data,
          },
        })
      }
    },
    * queryTaskurgent ({ payload }, { call, put }) {
      const data = yield call(queryTaskurgent)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            noticeType: getType(data.data),
          },
        })
      }
    },
    * queryAdmin ({ payload }, { call, put }) {
      const data = yield call(queryAdmin)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            isAdmin: data.isAdmin,
          },
        })
      }
    },
    * queryUsers ({ payload }, { call, put }) {
      const data = yield call(queryUsers)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            userItems: getUser(data.data),
          },
        })
      }
    },
    * createNewTask ({ payload }, { call, put }) {
      const data = yield call(createNewTask, { ...payload })
      console.log(data)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            animating: false,
          },
        })
        yield put(routerRedux.goBack())
        Toast.success('已成功下发通知')
      } else {
        yield put({
          type: 'updateState',
          payload: {
            animating: false,
          },
        })
        Toast.offline('通知失败请稍后再试')
      }
    },
    * sendAppealInfo ({ payload }, { call, put, select }) {
      const { images = [], mediaFile = {}, ...others } = payload,
        { location } = yield select(_ => _.createtask),
        { success, workId = '' } = yield call(sendAppealInfo, {
          ...others,
          location,
          isFankui: '2',
        }, images, mediaFile)
      if (success) {
        yield put({
          type: 'updateState',
          payload: {
            animating: false,
          },
        })
        yield put(routerRedux.goBack())
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
  reducers: {
    updateUser (state, { payload = {} }) {
      const { selectedUsers = [] } = payload
      return {
        ...state,
        selectedUsers,
      }
    },
  },
})

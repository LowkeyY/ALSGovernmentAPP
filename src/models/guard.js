import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { model } from 'models/common'
import { getTaskList } from 'services/querylist'
import { queryAppealList } from 'services/queryappeal'

export default modelExtend(model, {
  namespace: 'guard',
  state: {
    selectedIndex: 2,
    segmentedIndex: 0,
    scrollerTop: 0,
    taskList: [],
    dataList: [],
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/guard') {
          dispatch({
            type: 'getTaskList',
          })
        }
      })
    },
  },
  effects: {
    * getTaskList ({ payload = {} }, { call, put, select }) {
      const { selected = -1 } = payload, { segmentedIndex } = yield select(_ => _.guard),
        currentSelectedIndex = selected != -1 ? selected : segmentedIndex
      yield put({
        type: 'updateState',
        payload: {
          dataList: [],
          segmentedIndex: currentSelectedIndex,
        },
      })
      const { pageType } = yield select(state => state.guard)
      const data = yield call(getTaskList, { pageType: currentSelectedIndex + 1 })
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            taskList: data.data,
          },
        })

      }
    },
    * getAppelList ({ payload = {} }, { call, put, select }) {
      const { selected = -1 } = payload, { segmentedIndex } = yield select(_ => _.guard),
        currentSelectedIndex = selected != -1 ? selected : segmentedIndex
      yield put({
        type: 'updateState',
        payload: {
          dataList: [],
          segmentedIndex: currentSelectedIndex,
        },
      })
      const { success = false, data = [], message = '获取数据失败。' } = yield call(queryAppealList, { showType: '2' })
      if (success) {
        yield put({
          type: 'updateState',
          payload: {
            dataList: data,
          },
        })
      }
    },
  },
  reducers: {},

})

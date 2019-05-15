import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { model } from 'models/common'
import { getTaskList } from 'services/querylist'
import { queryAppealList } from 'services/queryappeal'

const getDefaultPaginations = () => ({
  current: 1,
  total: 0,
  size:10,
}),
  namespace = 'guard'

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
            type: 'updateState',
            payload: {
              scrollerTop: 0,
              paginations: getDefaultPaginations(),
            },
          })
          dispatch({
            type: 'getTaskList',
          })
        }
      })
    },
  },
  effects: {
    * getTaskList ({ payload = {} }, { call, put, select }) {
      const { callback='', isRefresh = false,selected=-1} = payload,
        _this = yield select(_ => _[`${namespace}`]),
     { segmentedIndex, paginations: { current, total, size }, taskList, } = _this,
        start = isRefresh ? 1 : current,
        currentSelectedIndex = selected != -1 ? selected : segmentedIndex
      yield put({
        type: 'updateState',
        payload: {
          // dataList: [],
          segmentedIndex: currentSelectedIndex,
        },
      })
      const { pageType } = yield select(state => state.guard)
      if(currentSelectedIndex!=2){
        const result = yield call(getTaskList,{ nowPage: start, showCount: size,pageType: currentSelectedIndex + 1 })
    if (result) {
            let {data = [], totalCount = 0} = result,
              newLists = []
            newLists = start == 1 ? data : [...taskList, ...data]
            yield put({
              type: 'updateState',
              payload: {
                paginations: {
                  ..._this.paginations,
                  total: totalCount * 1,
                  current: start + 1
                },
                taskList:newLists
              },
            })
        }
      }else {
        yield put({
          type: 'getAppelList',
        })
      }
      if (callback)
        callback()
    },
    * getAppelList ({ payload = {} }, { call, put, select }) {
      const {  callback='', isRefresh = false,selected=-1 } = payload,
        _this = yield select(_ => _[`${namespace}`]),
        { segmentedIndex,paginations: { current, total, size },dataList } = _this,
        start = isRefresh ? 1 : current,
        currentSelectedIndex = selected != -1 ? selected : segmentedIndex
      yield put({
        type: 'updateState',
        payload: {
          // dataList: [],
          segmentedIndex: currentSelectedIndex,
        },
      })
      const { success = false, data = [], message = '获取数据失败。',totalCount = 0 } = yield call(queryAppealList, { nowPage: start, showCount: size,showType: '4' })
      if (success) {
        // yield put({
        //   type: 'updateState',
        //   payload: {
        //     dataList: data,
        //   },
        // })
        let newLists = []
        newLists = start == 1 ? data : [...dataList, ...data]
        yield put({
          type: 'updateState',
          payload: {
            paginations: {
              ..._this.paginations,
              total: totalCount * 1,
              current: start + 1
            },
            dataList:newLists
          },
        })
      }
    },
  },
  reducers: {},

})

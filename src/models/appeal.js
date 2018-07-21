import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { model } from 'models/common'
import { queryAppealList, queryWorkCount, collectAppeal } from 'services/queryappeal'

const changeAttByItems = (items = [], id = '', isOk = false) => {
    const result = []
    items.map(item => {
      if (item.id === id) {
        item['shoucang'] = isOk
      }
      result.push(item)
    })
    return result
  },
  getDefaultPaginations = () => ({
    current: 1,
    total: 0,
    size:10,
  }),
  namespace = 'appeal'

export default modelExtend(model, {
  namespace,
  state: {
    btnDisabled: false,
    btnTitle: '',
    selectedIndex: 0,
    dataList: [],
    name: '',
    workCount: {},
    scrollerTop: 0,
    paginations: getDefaultPaginations(),
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, action, query }) => {
        if (pathname === `/${namespace}`) {
          const { btnTitle = '发起诉求', name = '反应问题' } = query
          if (action === 'PUSH') {
            dispatch({
              type: 'updateState',
              payload: {
                btnDisabled: false,
                btnTitle,
                name,
                scrollerTop: 0,
                paginations: getDefaultPaginations(),
              },
            })
            dispatch({
              type: 'queryCount',
            })
            dispatch({
              type: 'queryListview',
              payload: {},
            })
          }
        }
      })
    },
  },
  effects: {

    * queryListview ({ payload }, { call, put, select }) {
      const { callback = '', isRefresh = false, selected = -1 } = payload,
        _this = yield select(_ => _[`${namespace}`]),
        { paginations: { current, total, size }, selectedIndex, dataList } = _this,
        currentSelectedIndex = selected != -1 ? selected : selectedIndex
      yield put({
        type: 'updateState',
        payload: {
          selectedIndex: currentSelectedIndex,
        },
      })
      const start = isRefresh ? 1 : current,
        result = yield call(queryAppealList, { showType: currentSelectedIndex + 1, nowPage: start, showCount: size })
      if (result) {
        let { data = [], totalCount = 0 } = result,
          newLists = []
        newLists = start == 1 ? data : [...dataList, ...data]
        yield put({
          type: 'updateState',
          payload: {
            paginations: {
              ..._this.paginations,
              total: totalCount * 1,
              current: start + 1,
            },
            dataList: newLists,
          },
        })
      }
      if (callback) {
        callback()
      }
    },

    * queryCount ({ payload }, { call, put, select }) {
      const data = yield call(queryWorkCount)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            workCount: data,
          },
        })
      }
    },
    * collent ({ payload }, { call, put, select }) {
      console.log(payload)
      const { id, shoucang } = payload, { success } = yield call(collectAppeal, { ...payload, workId: id })
      if (success) {
        const { dataList } = yield select(_ => _[namespace]),
          curDataList = changeAttByItems(dataList, id, !shoucang)
        yield put({
          type: 'updateState',
          payload: {
            dataList: curDataList,
          },
        })
      }
    },
  }
  ,
})

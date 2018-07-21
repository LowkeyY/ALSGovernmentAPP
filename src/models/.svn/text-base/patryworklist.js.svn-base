import modelExtend from 'dva-model-extend'
import { model } from 'models/common'
import { GetPatryWorkList } from 'services/querylist'
const   getDefaultPaginations = () => ({
    current: 1,
    total: 0,
    size:10,
  }),
  namespace = 'patryworklist'

export default modelExtend(model, {
  namespace: 'patryworklist',
  state: {
     dataList:[],
    scrollerTop: 0,
    paginations: getDefaultPaginations(),
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/patryworklist') {
          const { id = '', name = '' } = query
          dispatch({
            type: 'queryListview',
          })
          dispatch({
            type: 'updateState',
            payload: {
              id,
              name,
              scrollerTop: 0,
              paginations: getDefaultPaginations(),
            },
          })
        }
      })
    },
  },
  effects: {
    // * query ({ payload }, { call, put, select }) {
    //   const data = yield call(GetPatryWorkList)
    //   if(data){
    //     const list = JSON.parse(data.datas)
    //
    //     yield put({
    //       type:'updateState',
    //       payload:{
    //         dataList:list
    //       }
    //     })
    //   }
    // },
    * queryListview ({ payload={} }, { call, put, select }) {

      const { callback='', isRefresh = false,} = payload,
        _this = yield select(_ => _[`${namespace}`]),
        { paginations: { current, total, size }, dataList} = _this,
        start = isRefresh ? 1 : current,
        result = yield call(GetPatryWorkList, {nowPage: start, showCount: size  })
      if (result) {
        let {datas = [], totalCount = 0} = result,
          newLists = []
        newLists = start == 1 ?  JSON.parse(datas) : [...dataList, ... JSON.parse(datas)]
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
      if (callback)
        callback()
    },
  },
})

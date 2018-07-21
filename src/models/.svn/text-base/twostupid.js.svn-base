import modelExtend from 'dva-model-extend'
import { model } from 'models/common'
import { GetTowStupid ,GetTowStupidList} from 'services/querylist'

const getTabs = (arr) => {
  arr.map((item,i)=>{
    item.title=item.name
  })
  return arr
},
  getDefaultPaginations = () => ({
    current: 1,
    total: 0,
    size:10,
  }),
  namespace = 'twostupid'

export default modelExtend(model, {
  namespace: 'twostupid',
  state: {
    tabs:[],
    dataList:[],
    selectedIndex: 0,
    scrollerTop: 0,
    paginations: getDefaultPaginations(),
    refreshValue:''
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      dispatch({
        type: 'query',
        payload: {

        },
      })
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/twostupid') {
          const { id = '', name = '' } = query
          dispatch({
            type: 'updateState',
            payload: {
              id,
              name,
              selectedIndex: 0,
              scrollerTop: 0,
              paginations: getDefaultPaginations(),
            },
          })
        }
      })
    },
  },
  effects: {
    * query ({ payload }, { call, put, select }) {
      const  { selectedIndex } = yield select(state => state.twostupid)
      const { success = true, datas = [] } = yield call(GetTowStupid)
        if(success){
          yield put({
            type:'updateState',
            payload:{
              tabs:getTabs(datas)
            }
          })
          if (datas.length > 0) {
            const { value = '' } =datas[selectedIndex]
            yield put({
              type: 'updateState',
              payload: {
                refreshValue:value,
              },
            })
            yield put({
              type: 'queryListview',
              payload: {
                refreshValue:value,
              },
            })
          }
        }

    },
    // * querySelect ({ payload }, { call, put, select }) {
    //   const { value = '', selected = -1 } = payload, { selectedIndex } = yield select(state => state.twostupid)
    //
    //   if (selected != -1) {
    //     yield put({
    //       type: 'updateState',
    //       payload: {
    //         selectedIndex: selected,
    //       },
    //     })
    //   }
    //   const result = yield call(GetTowStupidList, { type: value })
    //   if (result) {
    //     let { datas = [] } = result,
    //       updates = {
    //         dataList:JSON.parse(datas)
    //       }
    //     yield put({
    //       type: 'updateState',
    //       payload: {
    //         ...updates
    //       },
    //     })
    //   }
    // },
    * queryListview({payload}, {call, put, select}) {
      const {callback = '', isRefresh = false, selected = -1 } = payload,
        _this = yield select(_ => _[`${namespace}`]),
        {paginations: {current, total, size}, dataList,selectedIndex,refreshValue} = _this
      if (selected != -1) {
        yield put({
          type: 'updateState',
          payload: {
            selectedIndex: selected,
          },
        })
      }
      const start = isRefresh ? 1 : current,
        result = yield call(GetTowStupidList, {type:refreshValue, nowPage: start, showCount: size})
      if (result) {
        let {datas = [], totalCount = 0} = result,
          newLists = []
        newLists = start == 1 ? JSON.parse(datas) : [...dataList, ...JSON.parse(datas)]
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
  }
})

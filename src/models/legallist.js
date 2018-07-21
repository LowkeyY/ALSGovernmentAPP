import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { model } from 'models/common'
import {Toast} from 'components'
import { GetLegallistType, GetLegallist,sendLigallist } from 'services/legallist'

const getType = (datas) => {
  const currentDatas =datas
  currentDatas.map(items => {
    items.label = items.name
  })
  return currentDatas
},
getDefaultPaginations = () => ({
  current: 1,
  total: 0,
  size:10,
}),
  namespace = 'legallist',
  getDefaultValue=()=>({
    contents:'',
    tels:'',
    positions:'阿拉善盟',
    isNiming:true
  })

export default modelExtend(model, {
  namespace: 'legallist',
  state: {
    legalType:[],
    lists:'',
    animating:false,
    scrollerTop: 0,
    paginations: getDefaultPaginations(),
    resetValue:getDefaultValue()
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        const {name} =query
        if (pathname === '/legallist') {
          if (action === 'PUSH') {
            dispatch({
              type: 'updateState',
              payload: {
                name,
                list:'',
                animating:false,
                scrollerTop: 0,
                paginations: getDefaultPaginations()
              },
            })
            dispatch({
              type: 'queryType',
            })
            dispatch({
              type: 'queryListview',
            })
          }
        }
      })
    },
  },
  effects: {
    * queryType ({ payload }, { call, put, select }) {
       const result = yield call(GetLegallistType)
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            legalType: getType(result.datas),
          },
        })
      }
    },
    * queryListview ({ payload={} }, { call, put, select }) {

      const { callback='', isRefresh = false,} = payload,
        _this = yield select(_ => _[`${namespace}`]),
        { paginations: { current, total, size }, lists} = _this,
        start = isRefresh ? 1 : current,
        result = yield call(GetLegallist, {nowPage: start, showCount: size  })
      if (result) {
        let {data = [], totalCount = 0} = result,
          newLists = []
        newLists = start == 1 ?data: [...lists, ...data]
        yield put({
          type: 'updateState',
          payload: {
            paginations: {
              ..._this.paginations,
              total: totalCount * 1,
              current: start + 1
            },
            lists:newLists
          },
        })
      }
      if (callback)
        callback()
    },
    * sendLegallistInfo ({ payload }, { call, put, select }) {
      const { resetValue } = yield select(_ => _.legallist)
       const { success,message=''} = yield call(sendLigallist,payload)
       Toast.success(message,2)
      yield put({
        type: 'updateState',
        payload: {
          animating: false,
        },
      })
      if (success) {
        yield put({
          type: 'resetValue',
          payload: {
            resetValue:getDefaultValue()
          },
        })
      }
    },
  },
  reducers: {
    resetValue(state,{payload}){
      return {
        ...state,
        ...payload
      }
    }
  },
})

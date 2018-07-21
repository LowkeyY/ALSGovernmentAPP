import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { model } from 'models/common'
import { queryColumn } from 'services/querycolumntype'
import { queryPartyData} from 'services/querylist'
 const getDefaultPaginations = () => ({
   current: 1,
   total: 0,
   size:10
 }),
   namespace = 'patry'
export default modelExtend(model, {
  namespace: 'patry',
  state: {
    patryDate: [],
    patryList: [],
    isScroll: false,
    id: '',
    name: '',
    scrollerTop: 0,
    paginations: getDefaultPaginations()
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/patry') {
         if(action=="PUSH"){
           const { id = '', name = '' } = query
           dispatch({
             type: 'updateState',
             payload: {
               id,
               name,
               scrollerTop: 0,
               paginations: getDefaultPaginations()
             },
           })
           dispatch({
             type: 'query',
             payload: {
               dataId: id,
             },
           })
         }
        }
      })
    },
  },
  effects: {
    * query ({ payload }, { call, put, select }) {
      const data = yield call(queryColumn, payload)
      if (data) {
        yield put({
          type: 'updateData',
          payload: {
            patryDate: data.data,
            patryList: data.tuijian,
          },
        })
        if(data.tuijian.length>0){
          const {id = '', title = ''} =data.tuijian[0]
          yield put({
            type: 'queryListview',
            payload: {
              id,
              title
            },
          })
        }
      }

    },
    * queryListview({payload}, {call, put, select}) {
      const {id = '', title = '', callback = '', isRefresh = false} = payload,
        _this = yield select(_ => _[`${namespace}`]),
        {paginations: {current, total, size}, patryList} = _this,
        start = isRefresh ? 1 : current,
        result = yield call(queryPartyData, {dataId: id, nowPage: start, showCount: size})
      if (result) {
        let {data = [], totalCount = 0} = result,
          newLists = [], {items = [], ...others} = (patryList.length > 0 ? patryList[0] : {})
        newLists = start == 1 ? data : [...items, ...data]
        yield put({
          type: 'updateState',
          payload: {
            paginations: {
              ..._this.paginations,
              total: totalCount * 1,
              current: start + 1
            },
            patryList: [{
              ...others,
              items: newLists
            }],
          },
        })
      }
      if (callback)
        callback()
    },
  },

  reducers: {
    resetState (state, { payload }) {
      return {}
    },
    updateData (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },

  },

})

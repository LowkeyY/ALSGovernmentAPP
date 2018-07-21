import {parse} from 'qs'
import modelExtend from 'dva-model-extend'
import { model } from 'models/common'
import { queryPartyTabs, queryPartyData } from 'services/querylist'
 const  getList = (datas = []) => {
   const result = []
   datas.map((_, index) => {
     const { id = '', route = 'details' } = _
     if (id != '' > 0) {
       result.push({
         ..._,
         id,
         route,
       })
     }
   })
   return result.length > 0 ? result : []
 },
   getDefaultPaginations = () => ({
     current: 1,
     total: 0,
     size:10
   }),
   namespace='news'
export default modelExtend(model, {
  namespace: 'news',
  state: {
    banners:[],
    tuijian:[],
    tabs:[],
    selectedIndex:0,
    lists:[],
    scrollerTop: 0,
    refreshId:'',
    paginations: getDefaultPaginations()
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/news') {
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
     const  { selectedIndex } = yield select(state => state.news)
      const data = yield call(queryPartyTabs, payload)
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            banners:data.banners,
            tuijian:data.tuijian,
            tabs:data.data
          },
        })
        if (data.data.length > 0) {
          const { id = '' } = data.data[selectedIndex]
          yield put({
            type: 'updateState',
            payload: {
              refreshId:id,
            },
          })
          yield put({
            type: 'queryListview',
            payload: {
              refreshId:id,
            },
          })

        } else {
          yield put({
            type: 'updateState',
            payload: {
              lists: [],
            },
          })
        }
      }

    },
    // * querySelect ({ payload }, { call, put, select }) {
    //   const { id = '', selected = -1 } = payload, { selectedIndex } = yield select(state => state.news)
    //     const result = yield call(queryPartyData, { dataId: id })
    //     if (result) {
    //       let { data = [] } = result,
    //         updates = {
    //           lists: getList(data),
    //         }
    //       if (selected != -1) {
    //         updates['selectedIndex'] = selected
    //       }
    //       yield put({
    //         type: 'updateState',
    //         payload: {
    //           ...updates,
    //         },
    //       })
    //     }
    // },
    * queryListview({payload}, {call, put, select}) {
      const { callback = '', isRefresh = false, selected = -1 } = payload,
        _this = yield select(_ => _[`${namespace}`]),
        {paginations: {current, total, size}, lists,selectedIndex,refreshId} = _this
      if (selected != -1) {
        yield put({
          type: 'updateState',
          payload: {
            selectedIndex: selected,
          },
        })
      }
      const start = isRefresh ? 1 : current,
        result = yield call(queryPartyData, {dataId:refreshId, nowPage: start, showCount: size})
      if (result) {
        let {data = [], totalCount = 0} = result,
          newLists = []
        newLists = start == 1 ? data : [...lists, ...data]

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
    }
  },


})

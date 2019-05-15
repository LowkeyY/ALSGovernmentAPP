// import { parse } from 'qs'
// import modelExtend from 'dva-model-extend'
// import { model } from 'models/common'
// import { queryPartyData } from 'services/querylist'
// import { doDecode } from 'utils'
//
// const   getInfo = (info) => {
//     if (info) {
//       try {
//         return doDecode(info)
//       } catch (e) {
//       }
//     }
//     return {}
//   },
// getList = (datas = []) => {
//   const result = []
//   datas.map((_, index) => {
//     const { id = '', route = 'details', infos = '' } = _
//     if (id != '') {
//       result.push({
//         ..._,
//         id,
//         route,
//         _attributes: {
//           ...getInfo(infos),
//         },
//       })
//     }
//   })
//   return result.length > 0 ? result : []
// }
// export default modelExtend(model, {
//   namespace: 'lawyerlist',
//   state: {
//    dataList:[]
//   },
//
//   subscriptions: {
//     setup ({ dispatch, history }) {
//       history.listen(({ pathname, query, action }) => {
//         if (pathname === '/lawyerlist') {
//           if (action === 'PUSH') {
//             const { id = '', name = '' } = query
//             dispatch({
//               type: 'query',
//               payload: {
//                 dataId: id
//               },
//             })
//           }
//         }
//       })
//     },
//   },
//   effects: {
//     * query ({ payload }, { call, put, select }) {
//       const result = yield call(queryPartyData, payload)
//      if(result){
//         yield put ({
//           type:'updateState',
//           payload:{
//             dataList:getList(result.data)
//           }
//         })
//      }
//     },
//
//   },
// })
import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { model } from 'models/common'
import { queryPartyTabs, queryPartyData } from 'services/querylist'
import { doDecode } from 'utils'


const  getGrids = (datas) => {
    const result = []
    datas.map(data => {
      const { id = '', title = '' } = data
      if (id != '' && title != '') {
        result.push({
          id, title,
        })
      }
    })
    return result.length > 0 ? result : []
  },
  getInfo = (info) => {
    if (info) {
      try {
        return doDecode(info)
      } catch (e) {
      }
    }
    return {}
  },
  getList = (datas = []) => {
    const result = []
    datas.map((_, index) => {
      const { id = '', route = 'details', infos = '' } = _
      if (id != '') {
        result.push({
          ..._,
          id,
          route,
          _attributes: {
            ...getInfo(infos),
          },
        })
      }
    })
    return result.length > 0 ? result : []
  }

export default modelExtend(model, {
  namespace: 'lawyerlist',
  state: {
    grids: [],
    gridList: {},
    id: '',
    name: '',
    selectedIndex: 0,
    lists:[]
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/lawyerlist') {
          if (action === 'PUSH') {
            const { id = '', name = '' } = query
            dispatch({
              type: 'updateState',
              payload: {
                id,
                name,
                grids: [],
                gridList: {},
                selectedIndex: 0,
              },
            })
            dispatch({
              type: 'query',
              payload: {
                ...query,
              },
            })
          }
        }
      })
    },
  },
  effects: {
    * query ({ payload }, { call, put, select }) {
      const { id = '' } = payload,
        result = yield call(queryPartyTabs, { dataId: id })
      if (result) {
        let { data = [] } = result,
          grids = getGrids(data)
        yield put({
          type: 'updateState',
          payload: {
            grids,
          },
        })
        if (grids.length > 0) {
          const { id = '' } = grids[0]
          yield put({
            type: 'querySelect',
            payload: {
              id,
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
    * querySelect ({ payload }, { call, put, select }) {
      const { id = '', selected = -1 } = payload,
        { selectedIndex } = yield select(state => state.lawyerlist),
        result = yield call(queryPartyData, { dataId: id })
      if (result) {
        let { data = [] } = result,
          updates = {
            lists: getList(data),
          }
        if (selected != -1) {
          updates['selectedIndex'] = selected
        }
        yield put({
          type: 'updateState',
          payload: {
            ...updates,
          },
        })
      }
    },
  },
  reducers: {},
})

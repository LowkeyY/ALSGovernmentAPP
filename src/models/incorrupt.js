import modelExtend from 'dva-model-extend'
import { model } from 'models/common'
import { queryPartyTabs, queryPartyData } from 'services/querylist'

const getGrids = (arr) =>{
  const gridList = arr.slice(1)
  return gridList
},
  getFixColumn = (arr) => {
   const fixColumn = arr.slice(0,1)
    return fixColumn[0]
  },
  getBanners = (arr) =>{
    arr&&arr.map(item => {
      item.url = item.image
    })
    return arr
  },
  getList = (datas = []) => {
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
  }
export default modelExtend(model, {
  namespace:'incorrupt',
  state: {
    selectedIndex:0,
    banners : [],
    dataList:[],
    gridList:[],
    fixColumn:{}
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/incorrupt') {
          const { id = '', name = '' } = query
          dispatch({
            type: 'updateState',
            payload: {
              id,
              name,
            },
          })
          dispatch({
            type: 'query',
            payload: {
              dataId: id,
            },
          })
        }
      })
    },
  },
 effects:{
   * query ({ payload }, { call, put, select }) {
     const result = yield call(queryPartyTabs,payload)
     if (result) {
       let { data = [], banners = [] } = result
       const gridList = getGrids(data)
       console.log(gridList)
       yield put({
         type: 'updateState',
         payload: {
           gridList,
           fixColumn:getFixColumn(data),
           banners:getBanners(banners)
         },
       })
       if (gridList.length > 0) {
         const { id = '', route = '' } = gridList[0]
         if (id != '' && route == '') {
           yield put({
             type: 'querySelect',
             payload: {
               id,
             },
           })
         }
       }

     }
   },
   * querySelect ({ payload }, { call, put, select }) {
     const { id = '', selected = -1 } = payload
     if (selected != -1) {
       yield put({
         type: 'updateState',
         payload: {
           selectedIndex: selected,
         },
       })
     }
     const result = yield call(queryPartyData, { dataId: id })
     if (result) {
       console.log(result)
       let { data = [] } = result,
         updates = {
           dataList: getList(data),
         }
       yield put({
         type: 'updateState',
         payload: {
           ...updates,
         },
       })
     }
   },
 }

})

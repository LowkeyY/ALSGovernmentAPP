import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { model } from 'models/common'
import { queryPartyData } from 'services/querylist'
import { doDecode } from 'utils'

const   getInfo = (info) => {
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
   dataList:[]
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/lawyerlist') {
          if (action === 'PUSH') {
            const { id = '', name = '' } = query
            dispatch({
              type: 'query',
              payload: {
                dataId: id
              },
            })
          }
        }
      })
    },
  },
  effects: {
    * query ({ payload }, { call, put, select }) {
      const result = yield call(queryPartyData, payload)
     if(result){
        yield put ({
          type:'updateState',
          payload:{
            dataList:getList(result.data)
          }
        })
     }
    },

  },
})

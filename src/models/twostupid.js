import modelExtend from 'dva-model-extend'
import { model } from 'models/common'
import { GetTowStupid ,GetTowStupidList} from 'services/querylist'
const defaultTabs= [
  {
    title:'答复类'
  }
  , {
    title:'需政策解决类'
  },
  {
    title:'需资金解决类'
  },
  {
    title:'需协调解决类'
  }
],
  defaultDataList = [

    {
      type:'fdsfdsf',
      content:'建议政府将驼肉等畜产品的精细化加工纳入重点规划，特别是对于项目用地给予相应的支持。'
    }
    ,{
      type:'社ewgfew会民生',
      content:'建议政府将驼肉等畜产品的精细化加工纳入重点规划，特别是对于项目用地给予相应的支持。'
    }
    ,{
      type:'社会民wer生',
      content:'建议政府将驼肉等畜产品的精细化加工纳入重点规划，特别是对于项目用地给予相应的支持。'
    }
    ,{
      type:'社会ewr民生',
      content:'建议政府将驼肉等畜产品的精细化加工纳入重点规划，特别是对于项目用地给予相应的支持。'
    }
  ]
const getTabs = (arr) => {
  arr.map((item,i)=>{
    item.title=item.name
  })
  return arr
}

export default modelExtend(model, {
  namespace: 'twostupid',
  state: {
    tabs:[],
    dataList:[],
    selectedIndex:0
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
              type: 'querySelect',
              payload: {
                value,
              },
            })
          }
        }

    },
    * querySelect ({ payload }, { call, put, select }) {
      const { value = '', selected = -1 } = payload, { selectedIndex } = yield select(state => state.twostupid)

      if (selected != -1) {
        yield put({
          type: 'updateState',
          payload: {
            selectedIndex: selected,
          },
        })
      }
      const result = yield call(GetTowStupidList, { type: value })
      if (result) {
        let { datas = [] } = result,
          updates = {
            dataList:JSON.parse(datas)
          }
        yield put({
          type: 'updateState',
          payload: {
            ...updates
          },
        })
      }
    },
  }
})

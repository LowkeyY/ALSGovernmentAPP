import modelExtend from 'dva-model-extend'
import {model} from 'models/common'
import {Bangfuduixiang} from 'services/fabuhuodong'

export default modelExtend(model, {
  namespace: 'volunteerdetails',
  state: {
    id: '',
    name: '',
    currentSelect: [],
    userInfos: [],
    currentData: {}
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(({pathname, query, action}) => {
        if (pathname === '/volunteerdetails') {
          if (action === 'PUSH') {
            const {id = '', name = ''} = query
            dispatch({
              type: 'updateState',
              payload: {
                id,
                name,
                currentSelect: [],
              },
            })
            dispatch({
              type: 'query',
              payload: {
                id
              },
            })
          }
        }
      })
    },
  },
  effects: {
    * query({payload}, {call, put, select}) {
      const {id = ''} = payload,
        {success = false, ...result} = yield call(Bangfuduixiang, {dataId: id})
      if (success) {
        let {bfrJa = [], ...others} = result
        console.log(bfrJa, others)
        yield put({
          type: 'updateState',
          payload: {
            currentData: {
              ...others
            },
            userInfos: bfrJa
          },
        })
      }
    },
  }
})

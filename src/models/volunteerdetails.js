import modelExtend from 'dva-model-extend'
import {model} from 'models/common'
import {Toast} from 'components'
import {routerRedux} from 'dva/router';
import {Bangfuduixiang, submitHuodong} from 'services/fabuhuodong'

const defaultInitState = () => ({
  id: '',
  name: '',
  currentSelect: [],
  userInfos: [],
  currentData: {},
  deptIds: ''
}), namespace = 'volunteerdetails'
export default modelExtend(model, {
  namespace,
  state: {
    ...defaultInitState()
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
                ...defaultInitState(),
                id,
                name
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
        let {bfrJa = [], deptId = '', ...others} = result
        yield put({
          type: 'updateState',
          payload: {
            currentData: {
              ...others
            },
            deptIds: deptId,
            userInfos: bfrJa
          },
        })
      }
    },
    * submit({payload}, {call, put, select}) {
      const {id = '', deptIds = '', currentSelect = []} = yield select(_ => _[namespace])
      if (id != '') {
        const result = yield call(submitHuodong, {
          huodongId: id,
          jubanfangId: deptIds,
          bangfurenId: currentSelect.join(',')
        })
      }
      Toast.success('感谢您的参与。', 2)
      yield put(routerRedux.goBack())
    }
  }
})

import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { model } from 'models/common'
import { replyAppeal } from 'services/centertask'
import { routerRedux } from 'dva/router'
import { Toast } from 'components'

export default modelExtend(model, {
  namespace: 'centerreply',
  state: {},
  effects: {
    * sendReply ({ payload }, { call, put, select }) {
      const data = yield call(replyAppeal, payload)
      if (data) {
        Toast.success('回复成功', 2)
        yield put(routerRedux.goBack())
      }
    },
  },
})

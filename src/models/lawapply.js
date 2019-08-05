import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { Toast } from 'components';
import { sendApply } from 'services/queryappeal';
import { routerRedux } from 'dva/router';

export default modelExtend(model, {
  namespace: 'lawapply',
  state: {
    disputeType: [],
    educationType: [],
    files: {},
    animating: false,
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/lawapply') {

        }
      });
    },
  },
  effects: {

    * sendApply ({ payload }, { call, put }) {
      const { success, msg = '请稍后再试' } = yield call(sendApply, payload);
      if (success) {
        yield put(routerRedux.goBack());
        yield put({
          type: 'updateState',
          payload: {
            animating: false,
          },
        });
      } else {
        Toast.fail(msg);
        yield put({
          type: 'updateState',
          payload: {
            animating: false,
          },
        });
      }
    },
  },
});

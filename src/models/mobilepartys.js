import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { sendMobileParty } from 'services/sendmsgfile';
import { routerRedux } from 'dva/router';
import { Toast } from 'components';

export default modelExtend(model, {
  namespace: 'mobilepartys',
  state: {
    animating: false,
  },
  effects: {
    * submit ({ payload }, { call, put, select }) {
      const data = yield call(sendMobileParty, payload),
        { message = '提交时出现错误，请稍后再试' } = data;
      if (data.success) {
        Toast.success('转接成功', 2);
        yield put(routerRedux.goBack());
        yield put({
          type: 'updateState',
          payload: {
            animating: false,
          },
        });
      } else {
        yield put({
          type: 'updateState',
          payload: {
            animating: false,
          },
        });
        Toast.offline(data.message);
      }
    },
  }
});

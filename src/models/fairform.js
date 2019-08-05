
import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { Toast } from 'components';
import { routerRedux } from 'dva/router';
import { sendFairService } from 'services/legallist';


export default modelExtend(model, {
  namespace: 'fairform',
  state: {
    files: {},
    animating: false,
    name: '',
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, action, query }) => {
        if (pathname === '/fairform') {
        }
      });
    },
  },
  effects: {
    * sendFairService ({ payload }, { call, put }) {
      const { images = [], ...others } = payload,
        { success } = yield call(sendFairService, { ...others }, images, {});
      if (success) {
        yield put({
          type: 'updateState',
          payload: {
            animating: false,
          },
        });
        Toast.success('提交成功');
        yield put(routerRedux.goBack());
      } else {
        yield put({
          type: 'updateState',
          payload: {
            animating: false,
          },
        });
        Toast.offline('提交失败，请稍后再试');
      }
    },

  },
});

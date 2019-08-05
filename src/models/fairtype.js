import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { Toast } from 'components';
import { getFairTypes } from 'services/legallist';

export default modelExtend(model, {
  namespace: 'fairtype',
  state: {
    data: [],
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/fairtype') {
          dispatch({
            type: 'query',
          });
        }
      });
    },
  },
  effects: {
    * query ({ payload }, { call, put }) {
      const { success, data = [] } = yield call(getFairTypes, payload);
      if (success) {
        if (success) {
          yield put({
            type: 'updateState',
            payload: { data },
          });
        }
      }
    },
  },
});

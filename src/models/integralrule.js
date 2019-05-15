import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { getIntegralRule } from 'services/shop';

export default modelExtend(model, {
  namespace: 'integralrule',
  state: {
    lists: [],
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/integralrule') {
          const { name = '' } = query;
          dispatch({
            type: 'updateState',
            payload: {
              name,
            },
          });
          dispatch({
            type: 'query',
          });
        }
      });
    },
  },
  effects: {
    * query ({ payload }, { call, put }) {
      const data = yield call(getIntegralRule);
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            lists: data.data,
          },
        });
      }
    },
  },
});

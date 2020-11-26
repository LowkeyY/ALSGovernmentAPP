import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { queryFlow } from 'services/centertask';
import { model } from 'models/common';


export default modelExtend(model, {
  namespace: 'appealflow',
  state: {
    data: [],
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/appealflow') {
          const { dataId = '' } = query;
          dispatch({
            type: 'updateState',
            payload: {
              data: [],
            },
          });
          dispatch({
            type: 'query',
            payload: {
              dataId,
            },
          });
        }
      });
    },
  },
  effects: {
    * query ({ payload }, { call, put }) {
      const { success, data } = yield call(queryFlow, payload);
      if (success) {
        yield put({
          type: 'updateState',
          payload: {
            data,
          },
        });
      }
    },
  },
  reducers: {},
});

import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { Toast } from 'components';
import { queryRank } from 'services/querylist';


export default modelExtend(model, {
  namespace: 'rank',
  state: {
    currentData: {},
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        let { pathname, query } = location;
        if (pathname.startsWith('/rank')) {
          dispatch({
            type: 'updateState',
            payload: {
              currentData: {},
            },
          });
          dispatch({
            type: 'queryRank',
            payload: {
              ...query,
            },
          });
        }
      });
    },
  },
  effects: {
    * queryRank ({ payload }, { call, put }) {
      const data = yield call(queryRank, payload);
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            currentData: data,
          },
        });
      }
    },
  },
});

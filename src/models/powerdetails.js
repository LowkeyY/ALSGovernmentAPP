import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { queryPowersDetails } from 'services/querylist';
import { Toast } from 'components';
import { model } from 'models/common';


export default modelExtend(model, {
  namespace: 'powerdetails',
  state: {
    data: {},
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query }) => {
        if (pathname === '/powerdetails') {
          const { id = '' } = query;
          dispatch({
            type: 'updateState',
            payload: {
              data: {},
            },
          });
          dispatch({
            type: 'query',
            payload: {
              dataId: id,
            },
          });
        }
      });
    },
  },
  effects: {
    * query ({ payload }, { call, put }) {
      const data = yield call(queryPowersDetails, payload);
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            data,
          },
        });
      } else {
        Toast.fail('获取失败，请稍后再试');
      }
    },
  },
});

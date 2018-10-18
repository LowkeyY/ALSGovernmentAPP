import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { getGoodsList, getUserIntegral } from 'services/shop';

export default modelExtend(model, {
  namespace: 'integral',
  state: {
    currentGoods: [],
    serverIP: '',
    serverPort: '',
    intergation: '0',
  },
  subscriptions: {
    setupHistory ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/integral') {
          dispatch({
            type: 'query',
          });
          dispatch({
            type: 'queryIntegral',
          });
        }
      });
    },
  },
  effects: {
    * query ({ payload }, { call, put, select }) {
      const data = yield call(getGoodsList),
        { success, datas, serverIP, serverPort } = data;
      if (success) {
        yield put({
          type: 'updateState',
          payload: {
            currentGoods: datas,
            serverIP,
            serverPort,
          },
        });
      }
    },
    * queryIntegral ({ payload }, { call, put, select }) {
      const data = yield call(getUserIntegral),
        { success, intergation } = data;
      if (success) {
        yield put({
          type: 'updateState',
          payload: {
            intergation,
          },
        });
      }
    },
  },
});

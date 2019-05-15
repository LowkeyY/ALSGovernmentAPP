import modelExtend from 'dva-model-extend';
import { parse } from 'qs';
import { model } from 'models/common';
import { queryTask110List } from 'services/querylist';

export default modelExtend(model, {
  namespace: 'task110',
  state: {
    dataList: [],
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, action, query }) => {
        if (pathname === '/task110') {
          dispatch({
            type: 'updateState',
            payload: {
              dataList: [],
            }
          });
          dispatch({
            type: 'query',
          });
        }
      });
    },
  },
  effects: {
    * query ({ payload = {} }, { call, put, select }) {
      const { success = false, listData = [], message = '获取数据失败。' } = yield call(queryTask110List, payload);
      if (success) {
        yield put({
          type: 'updateState',
          payload: {
            dataList: listData
          }
        });
      }
    },
    
  }
});

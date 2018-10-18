import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { queryUsers } from 'services/queryappeal';
import { Toast } from 'components';
import { routerRedux } from 'dva/router';

export default modelExtend(model, {
  namespace: 'workers',
  state: {
    lists: [],
    currentSelect: [],
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/workers') {
          if (action === 'PUSH') {
            const { name = '' } = query;
            dispatch({
              type: 'updateState',
              payload: {
                name,
                currentSelect: [],
              },
            });
            dispatch({
              type: 'queryUsers',
            });
          }
        }
      });
    },
  },
  effects: {
    * queryUsers ({ payload }, { call, put, select }) {
      const result = yield call(queryUsers);
      if (result) {
        if (result.success) {
          yield put({
            type: 'updateState',
            payload: {
              lists: result.data,
            },
          });
        }
      }
    },
    * selectUsers ({ payload }, { call, put, select }) {
      const result = yield call(queryUsers, payload);
      if (result) {
        if (result.data.length > 0) {
          yield put({
            type: 'updateState',
            payload: {
              lists: result.data,
            },
          });
        } else {
          Toast.offline('该用户不存在');
        }
      }
    },


  },
  reducers: {},

});

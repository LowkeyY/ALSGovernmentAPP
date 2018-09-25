import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { QueryMembers, SendTask } from 'services/querylist';
import { Toast } from 'components';

export default modelExtend(model, {
  namespace: 'searchuser',
  state: {
    lists: []
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/searchuser') {
          if (action === 'PUSH') {
            const { name = '' } = query;
            dispatch({
              type: 'updateState',
              payload: {
                name,
                lists: []
              },
            });
          }
        }
      });
    },
  },
  effects: {
    * queryUsers ({ payload }, { call, put, select }) {
      const result = yield call(QueryMembers, { ...payload });
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
    
  }
});

import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { QueryMembers, SendTask } from 'services/querylist';
import { Toast } from 'components';
import { routerRedux } from 'dva/router';

export default modelExtend(model, {
  namespace: 'selectmembers',
  state: {
    lists: [],
    taskId: '',
    workId: '',
    isWork: '',
    itemLists: [],
    flowLeve: 0,
    currentSelect: []
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/selectmembers') {
          if (action === 'PUSH') {
            const { taskId = '', name = '', workId, isWork, flowLeve } = query;
            dispatch({
              type: 'updateState',
              payload: {
                name,
                taskId,
                workId,
                isWork,
                flowLeve,
                currentSelect: []
              },
            });
            dispatch({
              type: 'queryMembers',
              payload: {
                taskId
              }
            });
          }
        }
      });
    },
  },
  effects: {
    * queryMembers ({ payload }, { call, put, select }) {
      const result = yield call(QueryMembers, { ...payload });
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            lists: result.data,
          },
        });
      }
    },
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
    * submit ({ payload }, { call, put, select }) {
      const result = yield call(SendTask, { ...payload });
      if (result.success) {
        yield put(routerRedux.goBack());
        Toast.success('成功下发任务');
      }
    },
    
  },
  reducers: {
  
  }
  
});

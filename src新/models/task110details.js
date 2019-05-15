import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { queryTask110Details, Reply110Task } from 'services/querylist';
import { routerRedux } from 'dva/router';
import { Toast } from 'components';

export default modelExtend(model, {
  namespace: 'task110Details',
  state: {
    id: '',
    currentData: {},
    name: '',
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, action, query }) => {
        if (pathname === '/task110Details') {
          const { name = '任务详情', id = '' } = query;
          dispatch({
            type: 'updateState',
            payload: {
              name,
              id,
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
    * query ({ payload }, { call, put, select }) {
      const data = yield call(queryTask110Details, payload);
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            currentData: data.listData[0],
          },
        });
      }
    },
    * reply110Task ({ payload }, { call, put, select }) {
      const data = yield call(Reply110Task, payload), 
        { text } = payload;
      if (data.success) {
        Toast.success(text);
        yield put(routerRedux.goBack());
      } else {
        Toast.fail('操作错误');
        yield put(routerRedux.goBack());
      }
    },
  },
  
});

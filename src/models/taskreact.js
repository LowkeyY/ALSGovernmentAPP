import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { getTaskReact, sendTaskReact } from 'services/taskstatus';
import { routerRedux } from 'dva/router';
import { Toast } from 'components';

export default modelExtend(model, {
  namespace: 'taskreact',
  state: {
    content: '',
    createUser: '',
    createDate: '',
    taskId: '',
    flowId: ''
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/taskreact') {
          if (action === 'PUSH') {
            const { workId = '', name = '' } = query;
            dispatch({
              type: 'updateState',
              payload: {
                workId,
                name,
                content: ''
              },
            });
            dispatch({
              type: 'query',
              payload: {
                ...query,
              },
            });
          }
        }
      });
    }
  },
  effects: {
    * query ({ payload }, { call, put, select }) {
      const data = yield call(getTaskReact, payload);
      if (data) {
        const { certDate, certUserName, miaoshu, taskId, flowId } = data;
        yield put({
          type: 'updateState',
          payload: {
            createUser: certUserName,
            createDate: certDate,
            content: miaoshu,
            taskId,
            flowId
          }
        });
      }
    },
    * sendTaskReact ({ payload }, { call, put, select }) {
      const data = yield call(sendTaskReact, payload);
      if (data.success) {
        Toast.success('提交成功', 2);
        yield put(routerRedux.goBack());
      } else {
        Toast.fail('未知错误');
      }
    },
    
  }
});

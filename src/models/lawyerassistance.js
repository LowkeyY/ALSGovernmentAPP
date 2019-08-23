import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { Toast } from 'antd-mobile';
import { queryAssistanceList } from 'services/querylist';

export default modelExtend(model, {
  namespace: 'lawyerassistance',
  state: {
    dataList: [],
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, action }) => {
        if (pathname === '/lawyerassistance' && action === 'PUSH') {
          dispatch({
            type: 'query',
          });
        }
      });
    },
  },
  effects: {

    * query (_, { call, put, select }) {
      const { success = false, data = [], message = '获取数据失败。' } = yield call(queryAssistanceList);
      if (success) {
        yield put({
          type: 'updateState',
          payload: {
            dataList: data,
          },
        });
      } else {
        Toast.fail(message);
      }
    },

  },
});

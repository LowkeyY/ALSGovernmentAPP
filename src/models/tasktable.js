
import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { Toast } from 'components';
import { routerRedux } from 'dva/router';
import { sendTaskTable } from 'services/taskstatus';


export default modelExtend(model, {
  namespace: 'tasktable',
  state: {
    files: {},
    animating: false,
    name: '',
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, action, query }) => {
        if (pathname === '/tasktable') {
          const { name = '', id = '' } = query;
        }
      });
    },
  },
  effects: {
    * sendTaskTable ({ payload }, { call, put, select }) {
      const { images = [], ...others } = payload,
        { success } = yield call(sendTaskTable, { ...others }, images, {});
      if (success) {
        yield put({
          type: 'updateState',
          payload: {
            animating: false,
          },
        });
        Toast.success('提交成功');
        yield put(routerRedux.goBack());
      } else {
        yield put({
          type: 'updateState',
          payload: {
            animating: false,
          },
        });
        Toast.offline('提交失败，请稍后再试');
      }
    },

  },
});

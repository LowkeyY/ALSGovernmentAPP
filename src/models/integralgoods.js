import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { getGoodsMyList } from 'services/shop';
import { Toast } from 'components';

export default modelExtend(model, {
  namespace: 'integralgoods',
  state: {
    list: [],
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/integralgoods') {
          dispatch({
            type: 'query',
          });
        }
      });
    },
  },
  effects: {
    * query ({ payload = {} }, { call, put }) {
      const { success = false, datas = [], message = '获取数据失败。' } = yield call(getGoodsMyList);
      if (success) {
        yield put({
          type: 'updateState',
          payload: {
           list: datas,
          },
        });
      } else {
        Toast.fail(message);
      }
    },

  },
});

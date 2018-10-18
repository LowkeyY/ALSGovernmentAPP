import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { Toast } from 'components';
import { getGoodsInfo, changeGoods } from 'services/shop';

export default modelExtend(model, {
  namespace: 'integraldetails',
  state: {
    goodsDetails: '',
    goodsId: '',
    goodsJiFen: '',
    goodsKuCun: '',
    goodsName: '',
    goodsPhoto: '',
  },
  subscriptions: {
    setupHistory ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        const { goodsId } = query;
        if (pathname === '/integraldetails') {
          dispatch({
            type: 'query',
            payload: {
              goodsId,
            },
          });
        }
      });
    },
  },
  effects: {
    * query ({ payload }, { call, put, select }) {
      const data = yield call(getGoodsInfo, payload),
        { success, goodsDetails, goodsId, goodsJiFen, goodsKuCun, goodsName, goodsPhoto } = data;
      if (success) {
        yield put({
          type: 'updateState',
          payload: {
            goodsDetails,
            goodsId,
            goodsJiFen,
            goodsKuCun,
            goodsName,
            goodsPhoto,
          },
        });
      }
    },
    * changeGoods ({ payload }, { call, put, select }) {
      const data = yield call(changeGoods, payload),
        { success, msg, error } = data;
      if (success && !error) {
        Toast.fail(msg);
      } else if (success) {
        Toast.success(msg);
      } else {
        Toast.fail(msg);
      }
    },
  },
});

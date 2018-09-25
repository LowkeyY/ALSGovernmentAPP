import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { Bangfuduixiang, submitHuodong } from 'services/fabuhuodong';

export default modelExtend(model, {
  namespace: 'donationDetails',
  state: {
    dataList: [],
    name: '',
    id: ''
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, action, query }) => {
        const { id = '', name } = query;
        if (pathname === `/donationDetails`) {
          dispatch({
            type: 'updateState',
            payload: {
              name,
              id,
              dataList: []
            }
          });
          dispatch({
            type: 'query',
            payload: {
              id
            },
          });
        }
      });
    },
  },
  effects: {
    
    * query ({ payload }, { call, put, select }) {
      const { id = '' } = payload,
        { success = false, ...result } = yield call(Bangfuduixiang, { dataId: id });
      if (success) {
        let { bfjl = [] } = result;
        yield put({
          type: 'updateState',
          payload: {
            dataList:bfjl
          },
        });
      }
    },
    
  }
});

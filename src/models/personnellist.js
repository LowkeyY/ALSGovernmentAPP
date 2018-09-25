import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { queryPartyData } from 'services/querylist';

export default modelExtend(model, {
  namespace: 'personnellist',
  state: {
    dataList: [],
    dataId: '',
    name: '',
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, action, query }) => {
        const { id = '', name = '' } = query;
        if (pathname === `/personnellist`) {
        
          dispatch({
            type: 'query',
            payload: {
              dataId: id
            }
          });
        }
      });
    },
  },
  effects: {
    * query ({ payload  }, { call, put, select }) {
      const { success = false, data = [], message = '获取数据失败。' } = yield call(queryPartyData, payload);
      if (success) {
        yield put({
          type: 'updateState',
          payload: {
            dataList: data,
          },
        });
      }
    },
    
  }
});

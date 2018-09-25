import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { queryDiarydetails } from 'services/diary';

export default modelExtend(model, {
  namespace: 'diarydetails',
  state: {
    currentData: {},
    name: '',
    isOpen: false,
    viewImageIndex: -1,
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, action, query }) => {
        if (pathname === '/diarydetails') {
          const { name = '帮扶日志', id = '' } = query;
          dispatch({
            type: 'updateState',
            payload: {
              name,
              currentId: id,
              isOpen: false,
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
      const data = yield call(queryDiarydetails, payload);
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            currentData: data
          },
        });
      }
    },
  },
});

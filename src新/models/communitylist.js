import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { queryCommunityList } from 'services/community';

export default modelExtend(model, {
  namespace: 'communitylist',
  state: {
    dataList: [],
    id: '',
    name: '',
    type: '1',
    selectedIndex: 0,
  },
  
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query }) => {
        if (pathname === '/communitylist') {
          const { id = '', name = '' } = query;
          dispatch({
            type: 'updateState',
            payload: {
              id,
              name,
              dataList: [],
            },
          });
          dispatch({
            type: 'querySelect',
            payload: {
              id,
            },
          });
        }
      });
    },
  },
  effects: {
    * querySelect ({ payload }, { call, put, select }) {
      const { id = '', selected = -1 } = payload,
        { type = 1 } = yield select(state => state.communitylist);
      const result = yield call(queryCommunityList, { dataId: id, type });
      if (result) {
        let { data = [] } = result,
          updates = {
            dataList: (data),
          };
        if (selected !== -1) {
          updates.selectedIndex = selected;
        }
        yield put({
          type: 'updateState',
          payload: {
            ...updates,
          },
        });
      }
    },
  },
  reducers: {},
});

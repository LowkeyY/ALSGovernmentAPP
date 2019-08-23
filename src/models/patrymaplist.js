import modelExtend from 'dva-model-extend';
import { parse } from 'qs';
import { model } from 'models/common';
import { queryPartyData } from 'services/querylist';

const getDefaultPaginations = () => ({
    current: 1,
    total: 0,
    size: 10,
  }),
  namespace = 'patrymaplist';
export default modelExtend(model, {
  namespace: 'patrymaplist',
  state: {
    scrollerTop: 0,
    dataList: [],
    paginations: getDefaultPaginations(),
    dataId: '2f8e2d9d-7841-4b28-b3a1-d318fe9ce646'
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, action, query }) => {
        if (pathname === '/patrymaplist') {
          dispatch({
            type: 'updateState',
            payload: {
              dataList: [],
              scrollerTop: 0,
              paginations: getDefaultPaginations(),
              dataId: '2f8e2d9d-7841-4b28-b3a1-d318fe9ce646'
            }
          });
          dispatch({
            type: 'querylist',
          });
        }
      });
    },
  },
  effects: {
    * querylist ({ payload = {} }, { call, put, select }) {
      const { callback = '', isRefresh = false } = payload,
        _this = yield select(_ => _[`${namespace}`]),
        { paginations: { current, total, size }, dataList, dataId } = _this,
        start = isRefresh ? 1 : current;
      const result = yield call(queryPartyData, { nowPage: start, showCount: size, dataId });
      if (result) {
        let { data = [], totalCount = 0 } = result,
          newLists = [];
        newLists = start == 1 ? data : [...dataList, ...data];
        yield put({
          type: 'updateState',
          payload: {
            paginations: {
              ..._this.paginations,
              total: totalCount * 1,
              current: start + 1
            },
            dataList: newLists
          },
        });
      }
      if (callback) { callback(); }
    },
    
  }
});

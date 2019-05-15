import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { queryPartyData } from 'services/querylist';

const getList = (datas = []) => {
    const result = [];
    datas.map((_, index) => {
      const { id = '', route = 'details' } = _;
      if (id != '') {
        result.push({
          ..._,
          id,
          route,
        });
      }
    });
    return result.length > 0 ? result : [];
  },
  getDefaultPaginations = () => ({
    current: 1,
    total: 0,
    size: 10,
  }),
  namespace = 'twinsbox';

export default modelExtend(model, {
  namespace: 'twinsbox',
  state: {
    lists: [],
    id: '',
    name: '',
    scrollerTop: 0,
    paginations: getDefaultPaginations(),
    refreshId: ''
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/twinsbox') {
          if (action == 'PUSH') {
            const { id = '', name = '' } = query;
            dispatch({
              type: 'updateState',
              payload: {
                id,
                name,
                scrollerTop: 0,
                paginations: getDefaultPaginations(),
              },
            });
            dispatch({
              type: 'queryListview',
              payload: {
                ...query,
              },
            });
          }
        }
      });
    },
  },
  effects: {
    * queryListview ({ payload }, { call, put, select }) {
      const { callback = '', isRefresh = false, } = payload,
        _this = yield select(_ => _[`${namespace}`]),
        { paginations: { current, total, size }, lists, id } = _this,
        start = isRefresh ? 1 : current,
        result = yield call(queryPartyData, { dataId: id, nowPage: start, showCount: size });
      if (result) {
        let { data = [], totalCount = 0 } = result,
          newLists = [];
        newLists = start === 1 ? data : [...lists, ...data];
        yield put({
          type: 'updateState',
          payload: {
            paginations: {
              ..._this.paginations,
              total: totalCount * 1,
              current: start + 1
            },
            lists: newLists
          },
        });
      }
      if (callback) { callback(); }
    },
  },
});

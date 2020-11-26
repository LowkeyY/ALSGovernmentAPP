import modelExtend from 'dva-model-extend';
import { parse } from 'qs';
import { model } from 'models/common';
import { queryPowersList } from 'services/querylist';

const getDefaultPaginations = () => ({
    current: 1,
    total: 0,
    size: 10,
  }),
  namespace = 'powerlist';
export default modelExtend(model, {
  namespace: 'powerlist',
  state: {
    scrollerTop: 0,
    dataList: [],
    paginations: getDefaultPaginations(),
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        const { quanlileibie = '', shixiangmingcheng = '', zerenzhuti = '' } = query;
        if (pathname === '/powerlist') {
          if (1) {
            dispatch({
              type: 'updateState',
              payload: {
                dataList: [],
                scrollerTop: 0,
                paginations: getDefaultPaginations(),
              },
            });
            dispatch({
              type: 'getList',
              payload: {
                quanlileibie,
                shixiangmingcheng,
                zerenzhuti,
              },
            });
          }
        }
      });
    },
  },
  effects: {
    * getList ({ payload = {} }, { call, put, select }) {
      const { callback = '', isRefresh = false, quanlileibie, shixiangmingcheng, zerenzhuti } = payload,
        _this = yield select(_ => _[`${namespace}`]),
        { paginations: { current, size }, dataList } = _this,
        start = isRefresh ? 1 : current;
      const result = yield call(queryPowersList, {
        nowPage: start,
        showCount: size,
        quanlileibie,
        shixiangmingcheng,
        zerenzhuti,
      });
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
              current: start + 1,
            },
            dataList: newLists,
          },
        });
      }
      if (callback) {
        callback();
      }
    },

  },
});

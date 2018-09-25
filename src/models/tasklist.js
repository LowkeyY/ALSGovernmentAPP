import modelExtend from 'dva-model-extend';
import { parse } from 'qs';
import { model } from 'models/common';
import { getTaskList } from 'services/querylist';

const getDefaultPaginations = () => ({
    current: 1,
    total: 0,
    size: 10,
  }),
  namespace = 'tasklist';
export default modelExtend(model, {
  namespace: 'tasklist',
  state: {
    scrollerTop: 0,
    taskList: [],
    paginations: getDefaultPaginations(),
    pageType: '1'
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, action, query }) => {
        const { showType } = query;
        if (pathname === '/tasklist') {
          dispatch({
            type: 'updateState',
            payload: {
              dataList: [],
              scrollerTop: 0,
              paginations: getDefaultPaginations(),
              pageType: showType
            }
          });
          dispatch({
            type: 'getTaskList',
          });
        }
      });
    },
  },
  effects: {
    * getTaskList ({ payload = {} }, { call, put, select }) {
      const { callback = '', isRefresh = false } = payload,
        _this = yield select(_ => _[`${namespace}`]),
        { paginations: { current, total, size }, taskList, pageType } = _this,
        start = isRefresh ? 1 : current;
      const result = yield call(getTaskList, { nowPage: start, showCount: size, pageType });
      if (result) {
        let { data = [], totalCount = 0 } = result,
          newLists = [];
        newLists = start == 1 ? data : [...taskList, ...data];
        yield put({
          type: 'updateState',
          payload: {
            paginations: {
              ..._this.paginations,
              total: totalCount * 1,
              current: start + 1
            },
            taskList: newLists
          },
        });
      }
      if (callback)
        callback();
    },
    
  }
});

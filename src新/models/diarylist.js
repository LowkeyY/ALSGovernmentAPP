import modelExtend from 'dva-model-extend';
import { parse } from 'qs';
import { model } from 'models/common';
import { queryDiaryList } from 'services/diary';

const getDefaultPaginations = () => ({
    current: 1,
    total: 0,
    size: 15,
  }),
  namespace = 'diarylist';
export default modelExtend(model, {
  namespace: 'diarylist',
  state: {
    scrollerTop: 0,
    diaryList: [],
    paginations: getDefaultPaginations(),
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, action, query }) => {
        if (pathname === '/diarylist') {
          dispatch({
            type: 'updateState',
            payload: {
              diaryList: [],
              scrollerTop: 0,
              paginations: getDefaultPaginations(),
            }
          });
          dispatch({
            type: 'getDiaryList',
          });
        }
      });
    },
  },
  effects: {
    * getDiaryList ({ payload = {} }, { call, put, select }) {
      const { callback = '', isRefresh = false } = payload,
        _this = yield select(_ => _[`${namespace}`]),
        { paginations: { current, total, size }, diaryList, pageType } = _this,
        start = isRefresh ? 1 : current;
      const result = yield call(queryDiaryList, { nowPage: start, showCount: size, pageType });
      if (result) {
        let { data = [], totalCount = 0 } = result,
          newLists = [];
        newLists = start === 1 ? data : [...diaryList, ...data];
        yield put({
          type: 'updateState',
          payload: {
            paginations: {
              ..._this.paginations,
              total: totalCount * 1,
              current: start + 1
            },
            diaryList: newLists
          },
        });
      }
      if (callback) { callback(); }
    },
    
  }
});

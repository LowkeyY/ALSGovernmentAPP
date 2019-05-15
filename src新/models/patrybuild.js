import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { queryPartyTabs, queryPartyData } from 'services/querylist';
import { doDecode } from 'utils';

const getInfo = (info) => {
    if (info) {
      try {
        return doDecode(info);
      } catch (e) {
      }
    }
    return {};
  },
  getGridbox = (data = []) => {
    let gridDatas = [];
    data.map((item, index) => {
      const { id = '', route = '', image = '', infos = '', ...others } = item;
      let { type } = getInfo(infos);
      if (type === 'grids') {
        gridDatas.push({
          id,
          route: route || '/',
          icon: image || '',
          ...others,
        });
      }
    });
    return gridDatas.length > 0 ? gridDatas : [];
  },
  getBannerDatas = (data = []) => {
    data && data.map(item => {
      item.url = item.image;
    });
    return data.length > 0 ? data : [];
  },
  getList = (datas = []) => {
    const result = [];
    datas.map((_, index) => {
      const { id = '', route = 'details', items = [] } = _;
      if (id !== '' && items.length > 0) {
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
    size: 10
  }),
  namespace = 'patrybuild';

export default modelExtend(model, {
  namespace: 'patrybuild',
  state: {
    name: '',
    id: '',
    grids: [],
    scrollerTop: 0,
    paginations: getDefaultPaginations(),
    refreshId: '',
    banners: [],
    lists: []
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/patrybuild') {
          if (action === 'PUSH') {
            const { id = '', name = '' } = query;
            dispatch({
              type: 'updateState',
              payload: {
                id,
                name,
                grids: [],
                selectedIndex: 0,
                selectedItemIndex: 0,
                scrollerTop: 0,
                paginations: getDefaultPaginations(),
              },
            });
            dispatch({
              type: 'query',
              payload: {
                ...query,
              },
            });
          }
        }
      });
    }
  },
  effects: {
    * query ({ payload }, { call, put, select }) {
      const { id = '', selected = -1 } = payload,
        { selectedIndex } = yield select(state => state.patrybuild),
        result = yield call(queryPartyTabs, { dataId: id });
      if (result) {
        const { data, banners = [], tuijian = [] } = result;
        yield put({
          type: 'updateState',
          payload: {
            grids: getGridbox(data),
            banners: getBannerDatas(banners),
            lists: getList(tuijian)
          },
        });
        if (tuijian.length > 0) {
          const { id = '', title = '' } = tuijian[0];
          yield put({
            type: 'queryListview',
            payload: {
              id,
              title
            },
          });
        }
      }
    },
    * queryListview ({ payload }, { call, put, select }) {
      const { id = '', title = '', callback = '', isRefresh = false } = payload,
        _this = yield select(_ => _[`${namespace}`]),
        { paginations: { current, total, size }, lists } = _this,
        start = isRefresh ? 1 : current,
        result = yield call(queryPartyData, { dataId: id, nowPage: start, showCount: size });
      if (result) {
        let { data = [], totalCount = 0 } = result,
          newLists = [],
          { items = [], ...others } = (lists.length > 0 ? lists[0] : {});
        newLists = start === 1 ? data : [...items, ...data];
        yield put({
          type: 'updateState',
          payload: {
            paginations: {
              ..._this.paginations,
              total: totalCount * 1,
              current: start + 1
            },
            lists: [{
              ...others,
              items: newLists
            }],
          },
        });
      }
      if (callback) {
        callback();
      }
    }
  }
});

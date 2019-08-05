import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { queryPartyTabs, queryPartyData } from 'services/querylist';
import { defaultBlank } from 'utils/defaults';
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
  getGBox = (data = []) => {
    let gridDatas = [];
    let bannerDatas = [];
    let picDatas = [];
    data.map((item, index) => {
      const { id = '', route = '', image = '', infos = '', title, ...others } = item;
      let { type, scenery = 'false' } = getInfo(infos);
      if (type === 'grids') {
        gridDatas.push({
          id,
          scenery,
          title,
          route: route || '/',
          icon: image || '',
          ...others,
        });
        return gridDatas.length > 0 ? gridDatas : [];
      } else if (type === 'banner') {
        bannerDatas.push({
          url: item.image,
          id,
          title,
          ...others,
          route,
          infos,
        });
      } else if (type === 'pic') {
        picDatas.push({
          id,
          route: route || '/',
          icon: image || '',
          ...others,
        });
      } else {
        return [];
      }
    });
    return {
      gridDatas,
      bannerDatas,
      picDatas,
    };
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
    return result;
  },
  getDefaultPaginations = () => ({
    current: 1,
    total: 0,
    size: 10,
  }),
  namespace = 'lvyou';

export default modelExtend(model, {
  namespace: 'lvyou',
  state: {
    bannerDatas: [],
    grids: [],
    lists: [],
    picDatas: [],
    id: '',
    name: '',
    isScroll: false,
    scrollerTop: 0,
    paginations: getDefaultPaginations(),
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/lvyou') {
          if (action === 'PUSH') {
            const { id = '', name = '' } = query;
            dispatch({
              type: 'updateState',
              payload: {
                id,
                name,
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
    },
  },
  effects: {
    * query ({ payload }, { call, put }) {
      const { id = '' } = payload,
        result = yield call(queryPartyTabs, { dataId: id });
      if (result) {
        let { data = [], tuijian = [] } = result;
        yield put({
          type: 'updateState',
          payload: {
            grids: getGBox(data).gridDatas,
            bannerDatas: getGBox(data).bannerDatas,
            picDatas: getGBox(data).picDatas,
            lists: getList(tuijian),
          },
        });
        if (tuijian.length > 0) {
          const { id = '', title = '' } = tuijian[0];
          yield put({
            type: 'queryListview',
            payload: {
              id,
              title,
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
        newLists = start == 1 ? data : [...items, ...data];
        yield put({
          type: 'updateState',
          payload: {
            paginations: {
              ..._this.paginations,
              total: totalCount * 1,
              current: start + 1,
            },
            lists: [{
              ...others,
              items: newLists,
            }],
          },
        });
      }
      if (callback) {
        callback();
      }
    },
  },
});

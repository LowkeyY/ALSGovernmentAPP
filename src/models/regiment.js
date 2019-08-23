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
  getBanners = (datas = []) => {
    let result = [],
      counts = 0;
    datas.map((data, index) => {
      const { image = '', id, ...others } = data;
      if (image != '' && id != '' && counts++ < 4) {
        result.push({
          url: image,
          id,
          ...others,
        });
      }
    });
    return result.length > 0 ? result : [];
  },
  getGridbox = (data = []) => {
    let gridDatas = [];
    data.map((item) => {
      const { id = '', route = '', image = '', infos = '', ...others } = item;
      let { type = 'grids' } = getInfo(infos);
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
  getList = (datas = []) => {
    const result = [];
    datas.map((_) => {
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
    size: 10,
  }),
  namespace = 'regiment';
export default modelExtend(model, {
    namespace,
    state: {
      grids: [],
      bannerDatas: [],
      lists: [],
      id: '',
      name: '',
      scrollerTop: 0,
      paginations: getDefaultPaginations(),
    },
    subscriptions: {
      setup ({ dispatch, history }) {
        history.listen(({ pathname, query, action }) => {
          const { id = '' } = query;
          if (pathname === '/regiment') {
            if (action === 'PUSH') {
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
                type: 'query',
                payload: {
                  id,
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
          let { data = [], banners = [], tuijian = [] } = result;
          yield put({
            type: 'updateState',
            payload: {
              grids: getGridbox(data),
              bannerDatas: getBanners(banners),
              lists: getList(tuijian),
            },
          });
          if (tuijian.length > 0) {
            const { id: dataId = '', title = '' } = tuijian[0];
            yield put({
              type: 'queryListview',
              payload: {
                id: dataId,
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
    reducers: {},
  },
);

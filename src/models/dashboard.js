import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { defaultGrids, defaultGridIcon, defaultBanners } from 'utils/defaults';
import { queryPartyData } from 'services/querylist';
import { queryDashboard } from 'services/dashboard';

const appendIcon = (grid, i) => {
    let { icon = '', route = 'default' } = grid;
    if (icon === '') {
      grid = { ...grid, ...{ icon: defaultGridIcon[route] } };
    }
    return grid;
  },
  appendBanners = (items, i, target) => {
    let { image = '' } = items;
    if (image !== '') {
      target.push({ ...items, url: image });
    }
  },
  getList = (item) => {
    const { id, data, title } = item;
    let arr = [];
    arr.push({
      id,
      items: data,
      title,
    });
    return arr.length > 0 ? arr : [];
  };
const getDefaultPaginations = () => ({
    current: 1,
    total: 0,
    size: 10,
  }),
  namespace = 'dashboard';
export default modelExtend(model, {
  namespace: 'dashboard',

  state: {
    bannerDatas: [],
    grids: [],
    isScroll: false,
    selectedIndex: 0,
    weath: [],
    scrollerTop: 0,
    paginations: getDefaultPaginations(),
    newsList: [],
    newsData: {},
  },

  subscriptions: {
    setup ({ dispatch, history, action }) {
      history.listen(({ pathname }) => {
        if (pathname === '/dashboard' || pathname === '/') {
          dispatch({
            type: 'query',
          });
          dispatch({
            type: 'updateState',
            payload: {
              scrollerTop: 0,
              paginations: getDefaultPaginations(),
            },
          });
        }
      });
    },
  },
  effects: {
    * query ({ payload }, { call, put, select }) {
      const data = yield call(queryDashboard),
        { newsList } = yield select(_ => _.dashboard);
      if (data) {
        let { grids = defaultGrids, banners = defaultBanners, weath, newsData } = data,
          bannerDatas = [];
        grids = grids.map((grid, i) => appendIcon(grid, i));
        banners.map((banners, i) => {
          appendBanners(banners, i, bannerDatas);
        });
        yield put({
          type: 'updateState',
          payload: {
            grids,
            bannerDatas,
            weath,
            newsList: getList(newsData),
            newsData,
          },
        });
        if (newsData !== '') {
          const { id = '', title = '' } = newsData;
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
        { paginations: { current, total, size }, newsList } = _this,
        start = isRefresh ? 1 : current,
        result = yield call(queryPartyData, { dataId: id, nowPage: start, showCount: size });
      if (result) {
        let { data = [], totalCount = 0 } = result,
          newLists = [],
          { items = [], ...others } = (newsList.length > 0 ? newsList[0] : {});
        newLists = start === 1 ? data : [...items, ...data];
        yield put({
          type: 'updateState',
          payload: {
            paginations: {
              ..._this.paginations,
              total: totalCount * 1,
              current: start + 1,
            },
            newsList: [{
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

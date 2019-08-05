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
    dataList: [],
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
      const data = yield call(queryDashboard);
      if (data) {
        let { grids = defaultGrids, banners = defaultBanners, weath, newsData } = data,
          bannerDatas = [];
        grids = grids.map((grid, i) => appendIcon(grid, i));
        banners.map((item, i) => {
          appendBanners(item, i, bannerDatas);
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
    * queryListview ({ payload }, { call, put }) {
      const { id = '', callback = '', } = payload,
        result = yield call(queryPartyData, { dataId: id, nowPage: 1, showCount: 10 });
      if (result) {
        let { data = [] } = result
        yield put({
          type: 'updateState',
          payload: {
            dataList: [{
              ...payload,
              items: data,
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

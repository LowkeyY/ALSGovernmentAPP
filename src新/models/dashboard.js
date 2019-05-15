import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { defaultNewGrids, defaultGridIcon, defaultBanners } from 'utils/defaults';
import { queryDashboard } from 'services/dashboard';

const getGrid = (grid, i) => {
    const { image = '', title = '', tag, content = '', route = '' } = grid;
    if (defaultNewGrids[route]) {
      if (image === '') {
        grid.image = defaultNewGrids[route].image;
      }
      if (title === '') {

        grid.title = defaultNewGrids[route].title;
      }
      if (!tag) {

        grid.tag = defaultNewGrids[route].tag;

      }
      if (content === '') {

        grid.content = defaultNewGrids[route].content;
      }
    }
    return grid;
  },
  appendBanners = (items, i, target) => {
    let { image = '' } = items;
    if (image != '') {
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
export default modelExtend(model, {
  namespace: 'dashboard',

  state: {
    bannerDatas: [],
    grids: [],
    weath: [],
  },

  subscriptions: {
    setup ({ dispatch, history, action }) {
      history.listen(({ pathname }) => {
        if (pathname === '/dashboard' || pathname === '/') {
          dispatch({
            type: 'query',
          });
        }
      });
    },
  },
  effects: {
    * query ({ payload }, { call, put }) {
      const data = yield call(queryDashboard);
      if (data) {
        let { grids = defaultNewGrids, banners = defaultBanners, weath } = data,
          bannerDatas = [];
        grids = grids.map((grid, i) => getGrid(grid, i));
        banners.map((banners, i) => {
          appendBanners(banners, i, bannerDatas);
        });
        yield put({
          type: 'updateState',
          payload: {
            grids,
            bannerDatas,
            weath,
          },
        });
      }
    },
  },
});

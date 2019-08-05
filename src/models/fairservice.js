import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { queryPartyTabs } from 'services/querylist';
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
  getBanners = (data) => {
    data && data.map(item => {
      item.url = item.image;
    });
    return data || [];
  },
  getGBox = (data = []) => {
    let gridDatas = [];
    data.map((item) => {
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
      } else {
        return [];
      }
    });
    return gridDatas;
  },
  namespace = 'fairservice';

export default modelExtend(model, {
  namespace,
  state: {
    bannerDatas: [],
    grids: [],
    id: '',
    name: '',
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/fairservice') {
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
        let { data = [], tuijian = [], banners = [] } = result;
        yield put({
          type: 'updateState',
          payload: {
            grids: getGBox(data),
            bannerDatas: getBanners(banners) || [],
          },
        });
      }
    },
  },
});

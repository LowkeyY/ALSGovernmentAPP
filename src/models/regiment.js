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
  getGridbox = (data = []) => {
    let gridDatas = [];
    data.map((item) => {
      const { id = '', route = '', image = '', infos = '', ...others } = item;
      let { type } = getInfo(infos);
      if (type !== 'news') {
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
    size: 10,
  }),
  namespace = 'regiment';
export default modelExtend(model, {
  namespace,
  state: {
    grids: [],
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
        let { data = [] } = result;
        yield put({
          type: 'updateState',
          payload: {
            grids: getGridbox(data),
          },
        });
      }
    },

  },
  reducers: {},
},
);

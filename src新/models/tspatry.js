import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { doDecode } from 'utils';
import { queryPartyTabs, queryPartyData } from 'services/querylist';

const getInfo = (info) => {
    if (info) {
      try {
        return doDecode(info);
      } catch (e) {
      }
    }
    return {};
  },
  getBannerDatas = (data = []) => {
    let bannerDatas = [];
    data.map((item, index) => {
      const { id = '', title = '', route = '', infos = '', ...others } = item;
      let { type } = getInfo(infos);
      if (type === 'banner') {
        bannerDatas.push({
          url: item.image,
          id,
          title,
          ...others,
          route
        });
      }
    });
    return bannerDatas.length > 0 ? bannerDatas : [];
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
  getItemGridbox = (data = []) => {
    let gridDatas = [];
    data.map((item, index) => {
      const { id = '', route = '', image = '', infos = '', ...others } = item;
      gridDatas.push({
        id,
        route: route || '/',
        icon: image || '',
        ...others,
      });
    });
    return gridDatas.length > 0 ? gridDatas : [];
  },
  getDefaultPaginations = () => ({
    current: 1,
    total: 0,
    size: 10
  }),
  namespace = 'tspatry';

export default modelExtend(model, {
  namespace: 'tspatry',
  state: {
    name: '',
    id: '',
    bannerDatas: [],
    grids: [],
    gridsitem: [],
    selectedIndex: 0,
    selectedItemIndex: 0,
    scrollerTop: 0,
    paginations: getDefaultPaginations(),
    refreshId: '',
    itemData: []
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/tspatry') {
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
      const { id = '' } = payload,
        result = yield call(queryPartyTabs, { dataId: id });
      if (result) {
        const { data } = result;
        yield put({
          type: 'updateState',
          payload: {
            bannerDatas: getBannerDatas(data),
            grids: getGridbox(data)
          },
        });
        if (getGridbox(data).length > 0) {
          const { id = '' } = getGridbox(data)[0];
          yield put({
            type: 'updateState',
            payload: {
              refreshId: id,
            },
          });
          yield put({
            type: 'queryListview',
            payload: {
              refreshId: id,
            },
          });
        }
      }
    },
    * queryListview ({ payload }, { call, put, select }) {
      const { callback = '', isRefresh = false, selected = -1, itemSelected = -1 } = payload,
        _this = yield select(_ => _[`${namespace}`]),
        { paginations: { current, total, size }, itemData, selectedIndex, refreshId, selectedItemIndex } = _this;
      if (selected !== -1) {
        yield put({
          type: 'updateState',
          payload: {
            selectedIndex: selected,
          },
        });
      }
      if (itemSelected !== -1) {
        yield put({
          type: 'updateState',
          payload: {
            selectedItemIndex: itemSelected,
          },
        });
      }
      const start = isRefresh ? 1 : current,
        result = yield call(queryPartyData, { dataId: refreshId, nowPage: start, showCount: size });
      if (result) {
        let { data = [], totalCount = 0 } = result,
          newLists = [];
        newLists = start === 1 ? data : [...itemData, ...data];
        yield put({
          type: 'updateState',
          payload: {
            paginations: {
              ..._this.paginations,
              total: totalCount * 1,
              current: start + 1
            },
            itemData: newLists
          },
        });
      }
      if (callback) { callback(); }
    },
    * queryItems ({ payload }, { call, put, select }) {
      const { id = '', selected = -1 } = payload,
        _this = yield select(_ => _[`${namespace}`]),
        { selectedIndex, selectedItemIndex } = _this;
      if (selected !== -1) {
        yield put({
          type: 'updateState',
          payload: {
            selectedIndex: selected,
          },
        });
      }
      const result = yield call(queryPartyTabs, { dataId: id });
      if (result) {
        let { data = [] } = result,
          gridsitem = getItemGridbox(data);
        yield put({
          type: 'updateState',
          payload: {
            gridsitem,
          },
        });
        if (gridsitem.length > 0) {
          const { id = '' } = gridsitem[selectedItemIndex];
          yield put({
            type: 'updateState',
            payload: {
              refreshId: id,
            },
          });
          yield put({
            type: 'queryListview',
            payload: {
              refreshId: id,
              isRefresh: true
            },
          });
        } else {
          yield put({
            type: 'updateState',
            payload: {
              lists: [],
            },
          });
        }
      }
    },
  }
});

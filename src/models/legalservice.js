import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { queryPartyTabs, queryPartyData } from 'services/querylist';
import { doDecode } from 'utils';
import defaultIcon from 'themes/images/nmenus/lvyou.png';

const getInfo = (info) => {
    if (info) {
      try {
        return doDecode(info);
      } catch (e) {

      }
    }
    return {};
  },
  namespace = 'legalservice',
  getGrid = (datas = []) => {
    let result = [],
      counts = 0,
      fixedLanmu = {};
    datas.map((data) => {
      const { id = '', route = '', image = '', infos = '', ...others } = data;
      let { pageType = '' } = getInfo(infos);
      if (id !== '' && counts++ < 4) {
        result.push({
          id,
          route,
          icon: image || defaultIcon,
          pageType,
          ...others,
        });
      }
    });
    if (counts === datas.length && datas[counts - 1]) {
      fixedLanmu = {
        ...datas[counts - 1],
      };
    }
    return {
      gridsItem: result.length > 0 ? result : [],
      fixedLanmu,
    };
  },
  getBanners = (datas = []) => {
    let result = [],
      counts = 0;
    datas.map((data, index) => {
      const { image = '', id = '' } = data;
      if (image != '' && id != '' && counts++ < 4) {
        result.push({
          url: image,
          ...data,
        });
      }
    });
    return result.length > 0 ? result : [];
  },
  getList = (datas = []) => {
    const result = [];
    datas.map((_, index) => {
      const { id = '', route = 'details', items = [] } = _;
      if (id != '' && items.length > 0) {
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
  });

export default modelExtend(model, {
  namespace,
  state: {
    bannerDatas: [],
    grids: {},
    lists: [],
    id: '',
    name: '',
    scrollerTop: 0,
    paginations: getDefaultPaginations(),
    refreshId: '',
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/legalservice' && action == 'PUSH') {
          const { id = '', name = '' } = query;
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
              ...query,
            },
          });
        }
      });
    },
  },
  effects: {
    * query ({ payload }, { call, put, select }) {
      const { id = '' } = payload,
        result = yield call(queryPartyTabs, { dataId: id });
      if (result) {
        let { data = [], banners = [], tuijian = [] } = result;
        yield put({
          type: 'updateState',
          payload: {
            grids: getGrid(data),
            bannerDatas: getBanners(banners),
            lists: getList(tuijian),
          },
        });
        const { gridsItem } = getGrid(data);
        if (gridsItem.length > 0) {
          const { id = '' } = gridsItem[0];
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
    * queryListview ({ payload }, { call, put, select }) {
      const { id = '', title = '', callback = '', isRefresh = false } = payload,
        _this = yield select(_ => _[`${namespace}`]),
        { paginations: { current, total, size }, lists, refreshId } = _this,
        start = isRefresh ? 1 : current,
        result = yield call(queryPartyData, { dataId: refreshId, nowPage: start, showCount: size });
      if (result) {
        let { data = [], totalCount = 0 } = result,
          newLists = [];
        newLists = start === 1 ? data : [...lists, ...data];
        yield put({
          type: 'updateState',
          payload: {
            paginations: {
              ..._this.paginations,
              total: totalCount * 1,
              current: start + 1,
            },
            lists: newLists,
          },
        });
      }
      if (callback) {
        callback();
      }
    },
  },
});

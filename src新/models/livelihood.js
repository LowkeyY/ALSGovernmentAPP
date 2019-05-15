import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { queryPartyTabs, getAllLanmu, queryPartyData } from 'services/querylist';
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
  appendItems = (datas = []) => {
    const result = [],
      children = [];
    datas.map((_, index) => {
      const { id = '', items = [], infos = '', ...others } = _;
      let { type } = getInfo(infos);
      if (id != '' > 0) {
        result.push({
          ...others,
          id,
        });
        children.push(items);
      }
    });
    return { tabs: result, items: children };
  },
  getTabs = (data = []) => {
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
  namespace = 'livelihood';

export default modelExtend(model, {
  namespace: 'livelihood',
  state: {
    tabs: [],
    tips: [],
    ptrEl: '',
    selectIndex: 0,
    scrollerTop: 0,
    paginations: getDefaultPaginations(),
    refreshId: '',
    lists: [],
    todolist: []
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/livelihood' && action === 'PUSH') {
          const { id = '', name = '' } = query;
          dispatch({
            type: 'updateState',
            payload: {
              id,
              name,
              ptrEl: '',
              selectIndex: 0,
              scrollerTop: 0,
              paginations: getDefaultPaginations(),
            },
          });
          dispatch({
            type: 'query',
            payload: {
              dataId: id,
            },
          });
        }
      });
    },
  },
  
  effects: {
    * query ({ payload }, { call, put, select }) {
      const result = yield call(queryPartyTabs, payload);
      if (result) {
        const { data } = result;
        yield put({
          type: 'updateState',
          payload: {
            tabs: getTabs(data),
          },
        });
        if (data.length > 0) {
          const { id = '' } = data[0];
          yield put({
            type: 'queryitems',
            payload: {
              dataId: id
            },
          });
        }
      }
    },
    * queryitems ({ payload }, { call, put, select }) {
      const { selected = -1 } = payload;
      if (selected !== -1) {
        yield put({
          type: 'updateState',
          payload: {
            selectedIndex: selected,
          },
        });
      }
      const result = yield call(queryPartyTabs, payload);
      if (result) {
        const { data, tuijian = [] } = result;
        yield put({
          type: 'updateState',
          payload: {
            tips: data,
            lists: getList(tuijian)
          },
        });
        if (tuijian.length > 0) {
          const { id = '', title = '' } = tuijian[0];
          yield put({
            type: 'queryListview',
            payload: {
              id,
              title,
              isRefresh: true
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
    },
    
  },
});

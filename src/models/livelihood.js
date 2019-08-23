import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { queryPartyTabs, queryRobotData, queryPartyData, queryZwfwList, getOffice } from 'services/querylist';
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
  getTabs = (data = []) => {
    let gridDatas = [];
    data.map((item, index) => {
      const { id = '', route = '', image = '', infos = '', ...others } = item;
      let { type = '' } = getInfo(infos);
      gridDatas.push({
        id,
        route: route || '/',
        icon: image || '',
        ...others,
        type,
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
  defaultList = [
    {
      header: '亲，您好，我是Lilly，人称阿拉善小灵通，有什么问题都可以咨询我哦！很高兴为您解答各种问题。',
      answers: [],
    },
  ],
  getDefaultPaginations = () => ({
    current: 1,
    total: 0,
    size: 10,
  }),
  namespace = 'livelihood';

export default modelExtend(model, {
  namespace,
  state: {
    tabs: [],
    lists: [],
    selectIndex: 0,
    lanmuId: '',
    listsBianMin: defaultList,
    listsBanShi: defaultList,
    robotType: 'banshi',
    scrollerTop: 0,
    paginations: getDefaultPaginations(),
    dataId: '',
    serviceItems: [],
    officeData: [],
    activeKey: [],
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
              selectIndex: 0,
              listsBianMin: defaultList,
              listsBanShi: defaultList,
              scrollerTop: 0,
              paginations: getDefaultPaginations(),
              dataId: '',
              activeKey: [],
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
    * query ({ payload }, { call, put }) {
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
          const { id = '', infos = '' } = data[0];
          let { type = '' } = getInfo(infos);
          yield put({
            type: 'updateState',
            payload: {
              lanmuId: id,
            },
          });
          if (type === 'zwzx') {
            yield put({
              type: 'queryService',
              payload: {
                dataId: id,
              },
            });
          }
          if (type === 'office') {
            yield put({
              type: 'queryOffice',
              payload: {
                dataId: id,
              },
            });
          }
        }
      }
    },
    * queryRes ({ payload }, { call, put, select }) {
      const { selected = -1, searchText = '', lanmuId } = payload;
      if (selected !== -1) {
        yield put({
          type: 'updateState',
          payload: {
            selectedIndex: selected,
          },
        });
      }
      const { data, success } = yield call(queryRobotData, { searchText, lanmuId });
      const { robotType } = yield select(_ => _.livelihood);
      if (success && data.length > 0) {
        yield put({
          type: robotType === 'bianmin' ? 'updateListbianmin' : 'updateListbanshi',
          payload: {
            header: `很高兴为您解答，以下为您列举了一些关于“${searchText}”的常见问题：`,
            answers: data,
          },
        });
      } else {
        yield put({
          type: robotType === 'bianmin' ? 'updateListbianmin' : 'updateListbanshi',
          payload: {
            header: `对不起，我已经使用了洪荒之力了，还是没有找到关于“${searchText}”的咨询结果。`,
            answers: data,
          },
        });
      }
    },

    * queryListview ({ payload }, { call, put, select }) {
      const { callback = '', isRefresh = false } = payload,
        _this = yield select(_ => _[`${namespace}`]),
        { paginations: { current, total, size }, lists, dataId } = _this,
        start = isRefresh ? 1 : current,
        result = yield call(queryPartyData, { dataId, nowPage: start, showCount: size });
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

    * queryService ({ payload }, { call, put }) {
      const result = yield call(queryZwfwList, payload);
      if (result) {
        const { data } = result;
        yield put({
          type: 'updateState',
          payload: {
            serviceItems: data,
          },
        });
      }
    },
    * queryOffice ({ payload }, { call, put }) {
      const result = yield call(getOffice, payload);
      if (result) {
        const { data } = result;
        yield put({
          type: 'updateState',
          payload: {
            officeData: data,
          },
        });
      }
    },

  },
  reducers: {
    updateListbianmin (state, { payload }) {
      return {
        ...state,
        listsBianMin: [...state.listsBianMin, payload],
      };
    },
    updateListbanshi (state, { payload }) {
      return {
        ...state,
        listsBanShi: [...state.listsBanShi, payload],
      };
    },
  },
});

import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { queryPartyTabs, GetUnreadMessage, queryPartyData } from 'services/querylist';
import { queryAdmin } from 'services/queryappeal';
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

  getGridbox = (data = [], isAdmin) => {
    let gridDatas = [];
    data.map((item, index) => {
      const { id = '', route = '', image = '', infos = '', ...others } = item;
      let { type, showType = '', admin = 'false', badge = false } = getInfo(infos);
      if (isAdmin === true) {
        if (type === 'grids') {
          gridDatas.push({
            id,
            showType,
            route: route || '/',
            icon: image || '',
            badge,
            ...others,
          });
        }
      } else if (type === 'grids' && admin === 'false') {
        gridDatas.push({
          id,
          showType,
          route: route || '/',
          icon: image || '',
          badge,
          ...others,
        });
      }
    });
    return gridDatas.length > 0 ? gridDatas : [];
  };
export default modelExtend(model, {
    namespace: 'guard',
    state: {
      grids: [],
      noticeData: {},
      isAdmin: false,
      noticeGird: '',
    },
    subscriptions: {
      setup ({ dispatch, history }) {
        history.listen(({ pathname, query, action }) => {
          const { id = '' } = query;
          if (pathname === '/guard') {
            dispatch({
              type: 'queryMessage',
            });
            dispatch({
              type: 'updateState',
              payload: {
                grids: [],
                noticeData: {},
                isAdmin: false,
                noticeGird: '',
              },
            });
            dispatch({
              type: 'queryAdmin',
              payload: {
                id,
              },
            });
          }
        });
      },
    },
    effects: {
      * query ({ payload }, { call, put, select }) {
        const { id = '' } = payload,
          { isAdmin } = yield select(_ => _.guard),
          result = yield call(queryPartyTabs, { dataId: id });
        if (result) {
          let { data = [] } = result;
          yield put({
            type: 'updateState',
            payload: {
              grids: getGridbox(data, isAdmin),
            },
          });
          const notice = data.find(item => getInfo(item.infos).type === 'notice');
          if (notice) {
            yield put({
              type: 'queryList',
              payload: {
                id: notice.id || '',
              },
            });
            yield put({
              type: 'updateState',
              payload: {
                noticeGird: notice || {},
              },
            });
          }
        }
      },
      * queryList ({ payload }, { call, put }) {
        const { id = '', callback = '' } = payload,
          result = yield call(queryPartyData, { dataId: id, nowPage: 1, showCount: 10 });
        if (result) {
          let { data = [] } = result;
          yield put({
            type: 'updateState',
            payload: {
              noticeData: data[0] || {},
            },
          });
        }
        if (callback) {
          callback();
        }
      },
      * queryAdmin ({ payload }, { call, put }) {
        const data = yield call(queryAdmin),
          { id } = payload;
        if (data.success) {
          yield put({
            type: 'updateState',
            payload: {
              isAdmin: data.isAdmin,
            },
          });
          yield put({ // 先判断admin
            type: 'query',
            payload: {
              id,
            },
          });
        }
      },
      * queryMessage ({ payload }, { call, put, select }) {
        const { isLogin = false } = yield select(_ => _.app);
        if (isLogin) {
          const data = yield call(GetUnreadMessage),
            { success, noViewCount = 0 } = data;
          if (success) {
            yield put({
              type: 'app/updateState',
              payload: {
                noViewCount: noViewCount * 1,
              },
            });
          }
        }
      },

    },
    reducers: {},
  },
);

import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { Toast } from 'components';
import {
  queryAppealType,
  queryTaskurgent,
  queryUsers,
} from 'services/queryappeal';
import { centerSendTask } from 'services/centertask';
import { routerRedux } from 'dva/router';

const getType = (datas = []) => {
    let currentDatas;
    if (Array.isArray(datas)) {
      currentDatas = datas;
    } else {
      currentDatas = JSON.parse(datas);
    }
    currentDatas.map(items => {
      items.label = items.name;
      if (items.id) {
        items.value = items.id;
      }
    });
    return currentDatas;
  },
  getUser = (datas = []) => {
    const arr = [];
    datas[0].data && datas[0].data.map((item, i) => {
      arr.push({
        label: item.name,
        value: item.userId,
        dept: item.deptPath,
      });
    });
    return arr.length > 0 ? arr : [];
  };
export default modelExtend(model, {
  namespace: 'centersendtask',
  state: {
    appealType: [],
    noticeType: [],
    files: {},
    animating: false,
    name: '',
    isShowSelectMenu: false,
    userItems: [],
    selectedUsers: [],
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, action, query }) => {
        if (pathname === '/centersendtask' && action === 'PUSH') {
          const { name = '' } = query;
          dispatch({
            type: 'updateState',
            payload: {
              name,
              selectedUsers: [],
            },
          });
          dispatch({
            type: 'query',
          });
          dispatch({
            type: 'queryTaskurgent',
          });
          dispatch({
            type: 'queryUsers',
          });
        }
      });
    },
  },
  effects: {
    * query ({ payload }, { call, put, select }) {
      const data = yield call(queryAppealType, { isFankui: '1' });
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            appealType: getType(data.datas),
          },
        });
      }
    },
    * queryTaskurgent ({ payload }, { call, put, select }) {
      const data = yield call(queryTaskurgent);
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            noticeType: getType(data.data),
          },
        });
      }
    },
    * queryEventType ({ payload }, { call, put, select }) {
      const data = yield call(queryEventType);
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            noticeType: getType(data.data),
          },
        });
      }
    },
    * queryUsers ({ payload }, { call, put }) {
      const data = yield call(queryUsers);
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            userItems: getUser(data.data),
          },
        });
      }
    },
    * centerSendTask ({ payload }, { call, put }) {
      const data = yield call(centerSendTask, { ...payload });
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            animating: false,
          },
        });
        yield put(routerRedux.goBack());
        Toast.success('已成功下发任务');
      } else {
        yield put({
          type: 'updateState',
          payload: {
            animating: false,
          },
        });
        Toast.offline('下发失败请稍后再试');
      }
    },
  },
  reducers: {
    updateUser (state, { payload = {} }) {
      const { selectedUsers = [] } = payload;
      return {
        ...state,
        selectedUsers,
      };
    },
  },
});

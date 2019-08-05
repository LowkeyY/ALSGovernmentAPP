import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { queryPartyTabs, queryPartyData, GetVolunteerOrder, Gettongjibumen } from 'services/querylist';
import { Fabuhuodong } from 'services/fabuhuodong';
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
  getList = (datas = []) => {
    const result = [];
    datas.map((_, index) => {
      const { id = '', route = 'details', infos = '' } = _;
      if (id != '') {
        result.push({
          ..._,
          id,
          route,
          _attributes: {
            ...getInfo(infos),
          },
        });
      }
    });
    return result.length > 0 ? result : [];
  };

export default modelExtend(model, {
  namespace: 'volunteer',
  state: {
    gridList: {},
    id: '',
    name: '',
    volunteers: [],
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/volunteer') {
          if (action === 'PUSH') {
            const { id = '', name = '', active = '' } = query;
            dispatch({
              type: 'updateState',
              payload: {
                id,
                name,
                gridList: {},
              },
            });
            dispatch({
              type: 'query',
              payload: {
                dataId: id,
                type: active === 'choice' ? 2 : 1,
              },
            });
          }
        }
      });
    },
  },
  effects: {
    * query ({ payload }, { call, put }) {
      const result = yield call(Fabuhuodong, payload);
      if (result) {
        let { datas = [] } = result;
        yield put({
          type: 'updateState',
          payload: {
            lists: getList(datas),
          },
        });
      }
    },
    * querytongjibumen ({ payload }, { call, put }) {
      const result = yield call(Gettongjibumen);
      if (result) {
        let { datas = [] } = result;
        yield put({
          type: 'updateState',
          payload: {
            volunteers: datas,
          },
        });
      }
    },
  },
  reducers: {},
});

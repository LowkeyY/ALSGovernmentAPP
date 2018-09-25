import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { queryPartyTabs, queryPartyData, GetVolunteerOrder, Gettongjibumen } from 'services/querylist';
import { Fabuhuodong } from 'services/fabuhuodong';
import { doDecode } from 'utils';

const getGrids = (datas) => {
    const result = [];
    datas.map(data => {
      const { id = '', title = '' } = data;
      if (id != '' && title != '') {
        result.push({
          id, title,
        });
      }
    });
    return result.length > 0 ? result : [];
  },
  getInfo = (info) => {
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
    grids: [],
    gridList: {},
    id: '',
    name: '',
    selectedIndex: 0,
    volunteers: [],
    type: 1
  },
  
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/volunteer') {
          if (action === 'PUSH') {
            const { id = '', name = '' } = query;
            dispatch({
              type: 'updateState',
              payload: {
                id,
                name,
                grids: [],
                gridList: {},
                selectedIndex: 0,
                type: 1
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
    * query ({ payload }, { call, put, select }) {
      const { id = '' } = payload,
        result = yield call(queryPartyTabs, { dataId: id });
      if (result) {
        let { data = [] } = result,
          grids = getGrids(data);
        yield put({
          type: 'updateState',
          payload: {
            grids,
          },
        });
        if (grids.length > 0) {
          const { id = '' } = grids[0];
          yield put({
            type: 'querySelect',
            payload: {
              id,
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
    * querySelect ({ payload }, { call, put, select }) {
      const { id = '', selected = -1 } = payload,
        { selectedIndex, type = 1 } = yield select(state => state.volunteer);
      const result = yield call(Fabuhuodong, { dataId: id, type });
      if (result) {
        let { datas = [] } = result,
          updates = {
            lists: getList(datas),
          };
        if (selected !== -1) {
          updates.selectedIndex = selected;
        }
        yield put({
          type: 'updateState',
          payload: {
            ...updates,
          },
        });
      }
    },
    * querytongjibumen ({ payload }, { call, put, select }) {
      const { selectedIndex } = yield select(state => state.volunteer),
        result = yield call(Gettongjibumen);
      if (result) {
        let { datas = [] } = result;
        yield put({
          type: 'updateState',
          payload: {
            volunteers: datas
          },
        });
      }
    },
  },
  reducers: {},
});

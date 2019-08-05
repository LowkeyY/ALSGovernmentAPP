import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { queryPartyTabs, searchLanmu } from 'services/querylist';
import { Toast } from 'components';
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
      const { id = '', route = '', image = '', ...others } = item;
      gridDatas.push({
        id,
        route: route || '/',
        icon: image || '',
        ...others,
      });

    });
    return gridDatas.length > 0 ? gridDatas : [];
  };
export default modelExtend(model, {
    namespace: 'threeopen',
    state: {
      lists: [],
    },
    subscriptions: {
      setup ({ dispatch, history }) {
        history.listen(({ pathname, query, action }) => {
          const { id = '' } = query;
          if (pathname === '/threeopen') {
              dispatch({
                type: 'updateState',
                payload: {
                  lists: [],
                },
              });
              dispatch({
                type: 'query',
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
          result = yield call(queryPartyTabs, { dataId: id });
        if (result) {
          let { data = [] } = result;
          yield put({
            type: 'updateState',
            payload: {
              lists: getGridbox(data),
            },
          });
        }
      },
      * searchLanmu ({ payload }, { call, put, select }) {
        const result = yield call(searchLanmu, payload);
        if (result) {
          let { data = [] } = result;
          yield put({
            type: 'updateState',
            payload: {
              lists: getGridbox(data),
            },
          });
        } else {
          Toast.fail('未知错误，请稍后再试');
        }
      },

    },
    reducers: {},
  },
);

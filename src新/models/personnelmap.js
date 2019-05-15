import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { queryPartyTabs, queryPartyData } from 'services/querylist';
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
  getButtonId = (data = []) => {
    let buttonId = '';
    data.map((item, index) => {
      const { id = '', route = '', image = '', infos = '', ...others } = item;
      let { type } = getInfo(infos);
      if (type === 'button') {
        buttonId = id;
      }
    });
    return buttonId;
  };
export default modelExtend(model, {
  namespace: 'personnelmap',
  state: {
    externalUrl: '',
    htmlBody: '',
    name: '',
    buttonId: '',
    buttons: []
  },
  
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/personnelmap') {
          const { externalUrl = '', name = '', id = '' } = query;
          dispatch({
            type: 'updateState',
            payload: {
              externalUrl,
              name,
            },
          });
          dispatch({
            type: 'query',
            payload: {
              id
            }
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
          type: 'queryButtons',
          payload: {
            dataId: getButtonId(data),
          },
        });
      }
    },
    * queryButtons ({ payload }, { call, put, select }) {
      const { id = '' } = payload,
        result = yield call(queryPartyData, { ...payload });
      if (result) {
        let { data = [] } = result;
        yield put({
          type: 'updateState',
          payload: {
            buttons: data,
          },
        });
      }
    },
  },
  reducers: {},
});

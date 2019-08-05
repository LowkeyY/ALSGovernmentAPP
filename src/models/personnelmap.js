import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { queryPartyTabs, queryPartyData } from 'services/querylist';
import { queryPartyMap } from 'services/map';
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
  getMenu = (data = []) => {
    let gridDatas = [];
    data.map((item, index) => {
      const { id = '', image = '', infos = '', title, ...others } = item;
      gridDatas.push({
        id,
        title,
        icon: image || '',
        ...others,
      });
    });
    return gridDatas.length > 0 ? gridDatas : [];
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
    buttons: [],
    mapUrl: '',
    maskDiv: [],
    menu: [],
    head: '',
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
              id,
            },
          });
        }
      });
    },
  },
  effects: {
    * query ({ payload }, { call, put, select, all }) {
      const { id = '' } = payload,
        [result, mapDate] = yield ([call(queryPartyTabs, { dataId: id }), call(queryPartyMap, { dataId: id })]);
      if (result.success) {
        let { data = [] } = result;
        yield put({
          type: 'queryButtons',
          payload: {
            dataId: getButtonId(data),
          },
        });
      }
      if (mapDate.success) {
        const { mapData = {}, maskData = [], menuData = [] } = mapDate;
        yield put({
          type: 'updateState',
          payload: {
            mapUrl: mapData.img,
            head: mapData.title || '',
            maskDiv: maskData,
            menu: getMenu(menuData),
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

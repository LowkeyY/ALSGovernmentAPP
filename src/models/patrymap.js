import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { queryPartyMap } from 'services/map';

const getMenu = (data = []) => {
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
};
export default modelExtend(model, {
  namespace: 'patrymap',
  state: {
    mapUrl: '',
    maskDiv: [],
    menu: [],
    head: ''
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        let { pathname, query, action } = location;
        const { id = '' } = query;
        if (pathname.startsWith('/patrymap')) {
          dispatch({
            type: 'query',
            payload: {
              dataId: id
            }
          });
        }
      });
    },
  },
  effects: {
    * query ({ payload }, { call, put, select }) {
      const data = yield call(queryPartyMap, payload);
      if (data.success) {
        const { mapData = {}, maskData = [], menuData = [] } = data;
        yield put({
          type: 'updateState',
          payload: {
            mapUrl: mapData.img,
            head: mapData.title || '',
            maskDiv: maskData,
            menu: getMenu(menuData)
          }
        });
      }
      
    },
  }
  
});

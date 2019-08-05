import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { Toast } from 'components';
import { queryDetails } from 'services/querycontent';
import { queryPartyData } from 'services/querylist';

const getViewIamges = (text) => {
  const result = [];
  if (text) {
    const imgReg = /<img.*?(?:>|\/>)/gi,
      srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i,
      images = text.match(imgReg);
    images && images.map(image => {
      let imageSrc = image.match(srcReg);
      if (imageSrc && imageSrc[1]) {
        result.push(imageSrc[1].replace(':80/', '/'));
      }
    });
  }
  return result;
};
export default modelExtend(model, {
  namespace: 'lawnotice',
  state: {
    currentData: {},
    isOpen: false,
    viewImages: [],
    viewImageIndex: -1,
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, action, query }) => {
        if (pathname === '/lawnotice') {
          const { name = '', id } = query;
          dispatch({
            type: 'updateState',
            payload: {
              name,
              isOpen: false,
              viewImages: [],
              viewImageIndex: -1,
              currentData: {},
            },
          });
          dispatch({
            type: 'queryNotice',
            payload: { dataId: id },
          });
        }
      });
    },
  },
  effects: {
    * queryNotice ({ payload }, { call, put, select }) {
      const { success, data = [] } = yield call(queryPartyData, payload);
      if (success) {
        const id = data[0] && data[0].id;
        if (success) {
          yield put({
            type: 'queryDetails',
            payload: { dataId: id },
          });
        }
      }
    },
    * queryDetails ({ payload }, { call, put, }) {
      const data = yield call(queryDetails, { ...payload }),
        { content = ''} = data,
        viewImages = getViewIamges(content);
      yield put({
        type: 'updateState',
        payload: {
          currentData: data,
          viewImages,
        },
      });
    },

  },
});

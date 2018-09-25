import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { Toast } from 'components';
import { postionsToString } from 'utils';
import { routerRedux } from 'dva/router';
import { queryJoinInput, SendJoinCommunity } from 'services/community';

const getImages = (arr) => {
  let newArr = [];
  if (arr && Array.isArray(arr)) {
    arr.map((data, index) => {
      newArr.push({
        url: data,
        file: ''
      });
    });
  }
  return newArr;
};

export default modelExtend(model, {
  namespace: 'communityjoin',
  state: {
    files: {},
    animating: false,
    name: '',
    content: '',
    wcqk: '',
    imgFile: [],
    szzzb: '',
    imgs: []
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, action, query }) => {
        if (pathname === '/communityjoin') {
          const { name = '', id = '' } = query;
          dispatch({
            type: 'query',
            payload: {
              name,
              hdid: id
            },
          });
        }
      });
    },
  },
  effects: {
    * query ({ payload }, { call, put, select }) {
      const { success, wcqk = '', imgFile = [], szzzb = '' } = yield call(queryJoinInput, payload);
      if (success) {
        yield put({
          type: 'updateState',
          payload: {
            wcqk,
            imgFile,
            szzzb,
            imgs: getImages(imgFile)
          }
        });
      }
    },
    * sendJoinCommunity ({ payload }, { call, put, select }) {
      const { images = [], ...others } = payload,
        { success } = yield call(SendJoinCommunity, { ...others, }, images, {});
      if (success) {
        yield put({
          type: 'updateState',
          payload: {
            animating: false,
          },
        });
        Toast.success('保存成功');
        yield put(routerRedux.goBack());
      } else {
        yield put({
          type: 'updateState',
          payload: {
            animating: false,
          },
        });
        Toast.offline('保存失败，请稍后再试');
      }
    },
    
  },
});

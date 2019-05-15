import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { Toast } from 'components';
import { routerRedux } from 'dva/router';
import { sendLegalMediation, getEducationType, getMediationType } from 'services/queryappeal';

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
};
export default modelExtend(model, {
  namespace: 'legalmediation',
  state: {
    disputeType: [],
    educationType: [],
    files: {},
    animating: false,
    name: '',
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, action, query }) => {
        if (pathname === '/legalmediation') {
          const { name = '' } = query;
          dispatch({
            type: 'updateState',
            payload: {
              name,
            },
          });
          dispatch({
            type: 'queryEducationType'
          });
          dispatch({
            type: 'queryMediationType'
          });
        }
      });
    },
  },
  effects: {
    * queryEducationType ({ payload }, { call, put, select }) {
      const data = yield call(getEducationType);
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            educationType: getType(data.data),
          },
        });
      }
    },
    * queryMediationType ({ payload }, { call, put, select }) {
      const data = yield call(getMediationType);
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            disputeType: getType(data.data),
          },
        });
      }
    },
    * sendLegalMediation ({ payload }, { call, put, select }) {
      const { images = [], mediaFile = {}, ...others } = payload,
        { location } = yield select(_ => _.legalmediation),
        { success } = yield call(sendLegalMediation, {
          ...others,
          location,
        }, images, mediaFile);
      if (success) {
        yield put({
          type: 'updateState',
          payload: {
            animating: false,
          },
        });
        Toast.success('上传成功');
        yield put(routerRedux.goBack());
      } else {
        yield put({
          type: 'updateState',
          payload: {
            animating: false,
          },
        });
        Toast.offline('未知错误请稍后再试');
      }
    },
    
  },
});

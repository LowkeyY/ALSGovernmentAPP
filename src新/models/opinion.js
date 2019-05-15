import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { sendOpinion, PatryOpinion } from 'services/querycontent';
import { routerRedux } from 'dva/router';
import { Toast } from 'components';

export default modelExtend(model, {
  namespace: 'opinion',
  state: {},
  effects: {
    * sendOpinion ({ payload }, { call, put, select }) {
      const data = yield call(sendOpinion, payload), 
        { message = '感谢您的宝贵意见' } = data;
      if (data) {
        Toast.success(message, 2);
        yield put(routerRedux.goBack());
      }
    },
    * sendPatryOpinion ({ payload }, { call, put, select }) {
      const data = yield call(PatryOpinion, payload), 
        { message = '感谢您的宝贵意见' } = data;
      if (data) {
        Toast.success(message, 2);
        yield put(routerRedux.goBack());
      }
    },
  }
});

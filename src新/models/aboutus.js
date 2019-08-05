import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { GetAboutInfo } from 'services/querycontent';

export default modelExtend(model, {
  namespace: 'aboutus',
  state: {
    content: '',
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        let { pathname, query, action } = location;
        if (pathname.startsWith('/aboutus')) {
          if (action === 'PUSH') {
            dispatch({
              type: 'query',
            });
          }
        }
      });
    },
  },
  effects: {
    * query ({ payload }, { call, put }) {
      const data = yield call(GetAboutInfo, { type: 'new' }),
        { content = '' } = data;
      yield put({
        type: 'updateState',
        payload: {
          content,
        },
      });
    },
  },

});

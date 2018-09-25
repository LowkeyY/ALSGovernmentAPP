import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { Toast } from 'components';
import { postionsToString } from 'utils';
import { routerRedux } from 'dva/router';
import { queryDiaryType, sendDiary } from 'services/diary';

const getType = (datas = []) => {
  datas.map(items => {
    items.label = items.name;
    items.value = items.id;
  });
  return datas;
};
export default modelExtend(model, {
  namespace: 'diary',
  state: {
    diaryType: [],
    files: {},
    animating: false,
    name: '',
    content: '',
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, action, query }) => {
        if (pathname === '/diary') {
          const { name = '' } = query;
          dispatch({
            type: 'updateState',
            payload: {
              name,
            },
          });
          dispatch({
            type: 'query',
          });
        }
      });
    },
  },
  effects: {
    * query ({ payload }, { call, put, select }) {
      const data = yield call(queryDiaryType);
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            diaryType: getType(data.data),
          },
        });
      }
    },
    * sendDiary ({ payload }, { call, put, select }) {
      const { images = [], mediaFile = {}, ...others } = payload,
        { success } = yield call(sendDiary, {
          ...others,
        }, images, mediaFile);
      if (success) {
        yield put({
          type: 'updateState',
          payload: {
            animating: false,
          },
        });
        Toast.success('日志发布成功');
        yield put(routerRedux.goBack());
      } else {
        yield put({
          type: 'updateState',
          payload: {
            animating: false,
          },
        });
        Toast.offline(data.message);
      }
    },
    
  },
});

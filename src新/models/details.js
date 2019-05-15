import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { Toast } from 'components';
import { queryDetails, Praise } from 'services/querycontent';
import { GetStudyTime } from 'services/app';

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
  namespace: 'details',
  state: {
    currentData: {},
    isOpen: false,
    viewImages: [],
    viewImageIndex: -1,
    isPraise: false,
    num: 0
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        let { pathname, query, action } = location;
        if (pathname.startsWith('/details')) {
          if (action == 'PUSH') {
            dispatch({
              type: 'updateState',
              payload: {
                isOpen: false,
                viewImages: [],
                viewImageIndex: -1,
                currentData: {},
                isPraise: false
              },
            });
            dispatch({
              type: 'query',
              payload: {
                ...query,
              },
            });
          }
        }
      });
    },
  },
  effects: {
    * query ({ payload }, { call, put, select }) {
      const data = yield call(queryDetails, { ...payload }), 
        { content = '', isClick, dzSum } = data,
        viewImages = getViewIamges(content);
      yield put({
        type: 'updateState',
        payload: {
          currentData: data,
          viewImages,
          isPraise: isClick,
          num: dzSum
        },
      });
    },
    * praise ({ payload }, { call, put, select }) {
      const { isClick, message = '操作失败，请稍后尝试' } = payload;
      let { num } = yield select(_ => _.details);
      const data = yield call(Praise, { ...payload });
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            isPraise: !isClick,
            num: isClick ? --num : ++num
          },
        });
        Toast.success('操作成功');
      } else {
        Toast.fail(message);
      }
    },
    * getStudyTime ({ payload }, { call, put }) {
      const data = yield call(GetStudyTime, payload);
    },
  }
});

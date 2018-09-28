import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { Toast } from 'components';
import { routerRedux } from 'dva/router';
import { queryCommunityDetails, joinCommunity } from 'services/community';

const defaultInitState = () => ({
    dataId: '',
    name: '',
    currentData: {},
  }),
  namespace = 'communitydetails';
export default modelExtend(model, {
  namespace,
  state: {
    ...defaultInitState(),
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/communitydetails') {
          if (action === 'PUSH') {
            const { dataId = '', name = '' } = query;
            dispatch({
              type: 'updateState',
              payload: {
                ...defaultInitState(),
                dataId,
                name,
              },
            });
            dispatch({
              type: 'query',
              payload: {
                dataId
              },
            });
          }
        }
      });
    },
  },
  effects: {
    * query ({ payload }, { call, put }) {
      const { success = false, ...result } = yield call(queryCommunityDetails, payload);
      if (success) {
        let { ...others } = result;
        yield put({
          type: 'updateState',
          payload: {
            currentData: {
              ...others
            },
          },
        });
      }
    },
    * joinCommunity ({ payload }, { call, put }) {
      const { success = false } = yield call(joinCommunity, payload);
      if (success) {
        Toast.success('参与成功');
        yield put(routerRedux.goBack());
      } else {
        Toast.fail('系统出错，请稍后再试');
      }
    },
  }
});

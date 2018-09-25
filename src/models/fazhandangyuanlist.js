import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { routerRedux } from 'dva/router';
import { model } from 'models/common';
import { Toast } from 'components';
import { getFazhandangyuanList, deleteMembers } from 'services/fazhandangyuan';

const namespace = 'fazhandangyuanlist',
  defaultState = () => ({
    items: [],
    isEdit: false,
    currentSelect: []
  });

export default modelExtend(model, {
  namespace,
  state: {
    liuchengId: '7a9bf0d6-824c-4e04-9775-d268a5ab0325',
    ...defaultState(),
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        let { pathname, query, action } = location;
        if (pathname.startsWith(`/${namespace}`)) {
          const { liuchengId = '7a9bf0d6-824c-4e04-9775-d268a5ab0325', startSortId, endSortId, isLastStep } = query;
          if (action === 'PUSH') {
            dispatch({
              type: 'updateState',
              payload: {
                liuchengId,
              },
            });
          }
          dispatch({
            type: 'query',
            payload: {
              liuchengId,
              startSortId,
              endSortId,
              isLastStep
            },
          });
        }
      });
    },
  },
  effects: {
    * query ({ payload }, { call, put, select }) {
      const result = yield call(getFazhandangyuanList, payload),
        { success = false, message = '发生未知错误。', ...others } = result;
      if (success) {
        yield put({
          type: 'updateState',
          payload: {
            ...defaultState(),
            ...others,
          },
        });
      } else {
        Toast.fail(message, 2);
        yield put(routerRedux.goBack());
      }
    },
    * deleteMembers ({ payload }, { call, put, select }) {
      const result = yield call(deleteMembers, payload),
        { success = false, message = '发生未知错误。', ...others } = result,
        { shenhe_tags } = payload;
      if (success) {
        Toast.success('删除成功', 2);
        yield put({
          type: 'updateState',
          payload: {
            isEdit: false
          }
        });
        yield put({
          type: 'fazhandangyuanlist/delete',
          payload: {
            shenhe_tags
          }
        });
      } else {
        Toast.fail(message, 2);
        yield put(routerRedux.goBack());
      }
    },
    
  },
  reducers: {
    
    'delete' (state, { payload }) {
      const { items } = state, { shenhe_tags } = payload,
        id = shenhe_tags.split(','),
        result = [];
      id && id.map((item, i) => {
        if (Array.isArray(id)) {
          items.map((data, index) => {
            if (item !== data.shenhe_tag) {
              result.push(data);
            }
          });
        }
      });
      
      
      console.log(result);
      return {
        ...state,
        items: result
      };
    },
  },
});

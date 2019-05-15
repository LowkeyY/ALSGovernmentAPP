import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { Toast } from 'components';
import { routerRedux } from 'dva/router';
import { Bangfuduixiang, submitHuodong } from 'services/fabuhuodong';

const defaultInitState = () => ({
    dataId: '',
    name: '',
    currentSelect: [],
    userInfos: [],
    currentData: {},
    deptIds: '',
    typeId: ''
  }),
  namespace = 'volunteerdetails';
export default modelExtend(model, {
  namespace,
  state: {
    ...defaultInitState(),
    isShowModal: false
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/volunteerdetails') {
          if (action === 'PUSH') {
            const { dataId = '', name = '' } = query;
            dispatch({
              type: 'updateState',
              payload: {
                ...defaultInitState(),
                dataId,
                name,
                isShowModal: false
              },
            });
            dispatch({
              type: 'query',
              payload: {
                id: dataId
              },
            });
          }
        }
      });
    },
  },
  effects: {
    * query ({ payload }, { call, put, select }) {
      const { id = '' } = payload,
        { success = false, ...result } = yield call(Bangfuduixiang, { dataId: id });
      if (success) {
        let { bfrJa = [], deptId = '', ...others } = result;
        yield put({
          type: 'updateState',
          payload: {
            currentData: {
              ...others
            },
            deptIds: deptId,
            userInfos: bfrJa
          },
        });
      }
    },
    * submit ({ payload }, { call, put, select }) {
      const { dataId = '', deptIds = '', currentSelect = [] } = yield select(_ => _[namespace]);
      if (dataId != '') {
        const result = yield call(submitHuodong, {
          huodongId: dataId,
          jubanfangId: deptIds,
          bangfurenId: currentSelect.join(',')
        });
      }
      Toast.success('感谢您的参与。', 2);
      yield put(routerRedux.goBack());
    },
    * submitActive ({ payload }, { call, put, select }) {
      const { dataId = '', deptIds = '', currentSelect = [], typeId = '' } = yield select(_ => _[namespace]);
      if (dataId !== '') {
        const result = yield call(submitHuodong, {
          huodongId: dataId,
          jubanfangId: deptIds,
          bangfurenId: currentSelect.join(','),
          bfxx: typeId
        });
      }
      Toast.success('感谢您的参与。', 2);
      yield put(routerRedux.goBack());
    }
  }
});

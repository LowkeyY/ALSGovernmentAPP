import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { getAllTask, SendTask } from 'services/querylist';
import { sendMsgFiles, readMessage } from 'services/sendmsgfile';
import { validateTask } from 'services/centertask';
import { routerRedux } from 'dva/router';
import { taskStatus, completeTask, completeButtonTask, zhiHuiConformTask, ConfromTask } from 'services/taskstatus';
import { Toast } from 'components';


const getChartArr = (obj = {}) => {
  let chartArr = [],
    length = Object.keys(obj).length;
  for (let i = 0; i < length; i++) {
    let newObj = obj[`msgData${i}`];
    if (newObj) {
      chartArr.push(newObj);
    }
  }
  return chartArr;
};
export default modelExtend(model, {
  namespace: 'taskdetails',
  state: {
    chartArr: [],
    val: '',
    isDisabled: true,
    taskTitle: '',
    taskInfo: '',
    localArr: [],
    imageArr: [],
    workId: '',
    flowState: '',
    flowLeve: '',
    flowId: '',
    taskId: '',
    isShowButton: true,
    isOpen: false,
    viewImageIndex: -1,
    isLoading: true,
    taskType: '',
    taskUrgency: '',
    creatDate: '',
    endDate: '',
    complete: '0',
    isWork: '',
    isUpTable: '',
    qingshi: '',
    integralLargeClassName: '',
    integralClassName: '',
    integralClass: '',
    integralLargeClass: '',
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        const { taskId } = query;
        if (pathname === '/taskdetails') {
          dispatch({
            type: 'updateState',
            payload: {
              taskId,
              isOpen: false,
              isShowButton: true,
            },
          });
          dispatch({
            type: 'getTaskList',
            payload: {
              taskId,
            },
          });
        }
      });
    },
  },
  effects: {
    * getTaskList ({ payload }, { call, put, select }) {
      const { success = false, data = {}, taskTitle = '', workId, taskInfo = '', flowId = '', flowLeve = '', flowState = '', taskId = '', taskType = '', taskUrgency = '', creatDate = '', endDate = '', complete = '0', isWork = '', isUpTable = '', qingshi = '', integralLargeClassName = '', integralClassName = '', integralLargeClass = '', integralClass = '' } = yield call(getAllTask, payload);
      if (success) {
        yield put({
          type: 'updateState',
          payload: {
            chartArr: getChartArr(data),
            taskTitle,
            taskInfo,
            flowId,
            flowLeve,
            flowState,
            taskId,
            workId,
            taskType,
            taskUrgency,
            creatDate,
            endDate,
            complete,
            isWork,
            isUpTable,
            qingshi,
            integralLargeClassName,
            integralClassName,
            integralClass,
            integralLargeClass,

          },
        });
      }
    },
    * sendMsgFiles ({ payload }, { call, put, select }) {
      const { images = [], files = {}, params = {}, appends } = payload,
        { _Key } = params,
        data = yield call(sendMsgFiles, params, images, files),
        { chartArr } = yield select(_ => _.taskdetails);

      let currentCharArr = [];
      chartArr.map((item = {}) => {
        let changes = {};
        if (item.hasOwnProperty('_Key') && item._Key === _Key) {
          changes._status = data.success ? 0 : 2;
        }
        currentCharArr.push({ ...item, ...changes });
      });
      yield put({
        type: 'updateState',
        payload: {
          chartArr: currentCharArr,
        },
      });
    },
    * taskStatus ({ payload }, { call, put, select }) {
      const { taskId } = yield select(_ => _.taskdetails),
        { type } = payload;
      const data = yield call(taskStatus, payload);
      if (type === 'back') {
        yield put(routerRedux.goBack());
      } else if (type === 'conform') {
        if (data.success) {
          yield put({
            type: 'getTaskList',
            payload: {
              taskId,
            },
          });
          Toast.success('操作成功');
        }
      }
    },
    * validateTask ({ payload, callbackSuccess, callbackError }, { call }) {
      const { taskId } = payload,
        data = yield call(validateTask, { taskId });
      if (data.success) {
        if (callbackSuccess) callbackSuccess();
      } else {
        Toast.fail('请完善任务信息');
        if (callbackError) callbackError();
      }
    },
    * completeTask ({ payload }, { call, put, select }) {
      const data = yield call(completeTask, payload);
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            isShowButton: false,
          },
        });
        Toast.success('操作成功');
      }
    },
    * completeButtonTask ({ payload }, { call, put, select }) {
      const data = yield call(completeButtonTask, payload);
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            isShowButton: false,
          },
        });
        Toast.success('操作成功');
      }
    },
    * zhiHuiConformTask ({ payload }, { call, put, select }) {
      const data = yield call(zhiHuiConformTask, payload);
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            isShowButton: false,
          },
        });
        Toast.success('操作成功');
      }
    },
    * readMessage ({ payload }, { call, put, select }) {
      const data = yield call(readMessage, payload);
    },
    * backTask ({ payload }, { call, put, select }) {
      const data = yield call(SendTask, payload);
      if (data) {
        yield put(routerRedux.go(-2));
        Toast.success('任务已成功退回');
      }
    },
  },
  reducers: {
    appendMessage (state, { payload }) {
      let { chartArr } = state,
        { appends = {} } = payload;
      chartArr = [...chartArr, { ...appends }];
      return {
        ...state,
        chartArr,
      };
    },
  },
});

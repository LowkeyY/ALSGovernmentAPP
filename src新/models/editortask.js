import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { model } from 'models/common'
import { Toast } from 'components'
import { routerRedux } from 'dva/router'
import { getAllTask } from 'services/querylist'
import { queryAppealType, queryStreet, queryTaskurgent, queryEventType, sendEventType } from 'services/queryappeal'

const getType = (datas = []) => {
    let currentDatas
    if (Array.isArray(datas)) {
      currentDatas = datas
    } else {
      currentDatas = JSON.parse(datas)
    }
    currentDatas.map(items => {
      items.label = items.name
      if (items.id) {
        items.value = items.id
      }
    })
    return currentDatas
  },

  getEventValue = (first = '', last = '') => {
    return `${first}${last}`.split('')
  }
export default modelExtend(model, {
  namespace: 'editortask',
  state: {
    appealType: [],
    eventType: [],
    noticeType: [],
    animating: false,
    taskId: '',
    taskTypeId: '',
    taskUrgencyId: '',
    dateValue: new Date(),
    eventValue: [],
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, action, query }) => {
        if (pathname === '/editortask') {
          const { taskId = '' } = query
          dispatch({
            type: 'updateState',
            payload: {
              taskId,
            },
          })
          dispatch({
            type: 'getTaskList',
            payload: {
              taskId,
            },
          })
          dispatch({
            type: 'queryType',
          })
          dispatch({
            type: 'queryStreet',
          })
          dispatch({
            type: 'queryTaskurgent',
          })
          dispatch({
            type: 'queryEventType',
          })
        }
      })
    },
  },
  effects: {
    * getTaskList ({ payload }, { call, put, select }) {
      const { success = false, data = {}, taskTitle = '', workId, taskInfo = '', flowId = '', flowLeve = '', flowState = '', taskId = '', taskType = '', taskUrgency = '', creatDate = '', endDate = '', complete = '0', isWork = '', isUpTable = '', qingshi = '', integralLargeClassName = '', integralClassName = '', taskTypeId = '', taskUrgencyId = '', dateValue = '', eventValue = [], integralClass = '', integralLargeClass = '' } = yield call(getAllTask, payload)
      if (success) {
        yield put({
          type: 'updateState',
          payload: {
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
            taskUrgencyId: taskUrgencyId.split(),
            taskTypeId: taskTypeId.split(),
            dateValue: new Date(endDate),
            eventValue: getEventValue(integralLargeClass, integralClass),
          },
        })
      }
    },
    * queryType ({ payload }, { call, put, select }) {
      const data = yield call(queryAppealType, { isFankui: '2' })
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            appealType: getType(data.datas),
          },
        })
      }
    },
    * queryEventType ({ payload }, { call, put }) {
      const data = yield call(queryEventType)
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            eventType: data.data,
          },
        })
      }
    },
    * queryTaskurgent ({ payload }, { call, put }) {
      const data = yield call(queryTaskurgent)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            noticeType: getType(data.data),
          },
        })
      }
    },
    * sendEventType ({ payload }, { call, put }) {
      const data = yield call(sendEventType, { ...payload })
      console.log(data)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            animating: false,
          },
        })
        yield put(routerRedux.goBack())
        Toast.success('已成修改任务信息')
      } else {
        yield put({
          type: 'updateState',
          payload: {
            animating: false,
          },
        })
        Toast.offline('修改失败请稍后再试')
      }
    },

  },
})

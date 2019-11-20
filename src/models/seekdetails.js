import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { queryAppealContent, queryWorkFormData } from 'services/queryappeal';
import { Toast } from 'components';

const appendPositions = ({ street = '', district = '', city = '', province = '' }) => {
    return street || district || city || province;
  },
  appendAnswer = (answers = []) => {
    const result = [];
    answers.map(answer => {
      const { userName, cdate, neirong } = answer;
      result.push({
        contents: neirong,
        date: cdate,
        position: userName,
      });
    });
    return result;
  },
  appendData = ({
                  username, createDate, address = {}, title, voicePath = '', serverHost, shState = '',
                  status = '', content, images = [], huifu = [], shoucang = false, id = '', userPhoto, situatton,
                }) => {
    return {
      username,
      createDate,
      positions: appendPositions(address),
      title,
      status,
      shState,
      content,
      images,
      answers: appendAnswer(huifu),
      isCollect: shoucang,
      id,
      voicePath,
      serverHost,
      userPhoto,
      workId: '',
      taskId: '',
      situatton,
    };
  };

export default modelExtend(model, {
  namespace: 'seekdetails',
  state: {
    currentId: '',
    currentData: {},
    name: '',
    isOpen: false,
    viewImageIndex: -1,
    isTask: false,
    isResultActive: false,
    resultViewImageIndex: -1,
    resultData: [],
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, action, query }) => {
        if (pathname === '/seekdetails') {
          const { name = '诉求详情', id = '', isTask } = query;
          if (action === 'PUSH') {
            dispatch({
              type: 'updateState',
              payload: {
                currentData: {},
                isOpen: false,
                viewImageIndex: -1,
                isTask: false,
                isResultActive: false,
                resultViewImageIndex: -1,
                resultData: [],
              },
            });
          }
          dispatch({
            type: 'updateState',
            payload: {
              name,
              currentId: id,
              isOpen: false,
              isTask,
            },
          });
          dispatch({
            type: 'query',
            payload: {
              workId: id,
            },
          });
        }
      });
    },
  },
  effects: {
    * query ({ payload }, { call, put, select }) {
      const { currentId = '' } = yield select(_ => _.seekdetails);
      const data = yield call(queryAppealContent, payload);
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            currentData: appendData(data),
          },
        });
        if (data.status === '5') {
          yield put({
            type: 'queryWorkData',
            payload: {
              dataId: currentId,
            },
          });
        }
      }
    },
    * queryWorkData ({ payload }, { call, put }) {
      const { data, success, message = '查询结果失败，请稍后再试' } = yield call(queryWorkFormData, payload);
      if (success) {
        yield put({
          type: 'updateState',
          payload: {
            resultData: data,
          },
        });
      } else {
        Toast.fail(message);
      }
    },
  },
});

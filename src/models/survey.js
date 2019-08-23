import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { routerRedux } from 'dva/router';
import { Toast } from 'components';
import { getSurvey, submitSurvey, submitSurveyInfo } from 'services/survey';
import { queryStreet } from 'services/queryappeal';

const appendChildren = (items) => {
    const result = [];
    items.map(item => {
      const { boxLabel, inputValue, score = 0 } = item;
      result.push({
        value: inputValue, label: boxLabel, score,
      });
    });
    return result;
  },
  appendItems = (datas = []) => {
    const result = [],
      values = {},
      issues = {};
    datas.map(data => {
      let { name = '', items = [], xtype = '', allowBlank = true, fieldLabel = '' } = data,
        pos = -1;
      if (name !== '' && xtype !== '' && items.length > 0) {
        const newItems = appendChildren(items);
        if ((pos = fieldLabel.indexOf('<font')) !== -1) {
          fieldLabel = fieldLabel.substr(0, pos);
        }
        result.push({
          title: fieldLabel,
          items: newItems,
          isRequired: !allowBlank,
          id: name,
          multiple: xtype === 'checkbox',
        });
        values[name] = [];
        if (!allowBlank) {
          issues[name] = fieldLabel;
        }
      }
    });
    return { lists: result, values, issues };
  },
  getSubmitValues = (values = {}) => {
    const result = [];
    Object.keys(values)
      .map(key => {
        result.push(values[key]);
      });
    return result;
  },

  getSubmitId = (conditionId) => {
    if (localStorage.getItem(conditionId)) {
      const session = localStorage.getItem(conditionId);
      return JSON.parse(session).submitId || '';
    }
    return undefined;
  },

  getDistrictData = (data = []) => {
    data.map(item => {
      item.value = item.label;
      if (item.children) {
        getDistrictData(item.children);
      }
    });
    return data;
  };

export default modelExtend(model, {
  namespace: 'survey',
  state: {
    lists: [],
    title: '',
    id: '',
    name: '',
    values: {},
    issues: {},
    isSubmit: false,
    condition: undefined,
    district: [],
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query }) => {
        if (pathname === '/survey') {
          const { id = '', conditionId } = query;
          dispatch({
            type: 'updateState',
            payload: {
              id,
              name: '问卷',
              title: '',
              values: {},
              lists: [],
              issues: {},
              isSubmit: false,
              condition: undefined,
            },
          });
          dispatch({
            type: 'query',
            payload: {
              id,
              conditionId,
            },
          });
        }
      });
    },
  },
  effects: {
    * query ({ payload }, { call, put }) {
      const { id = '', conditionId } = payload,
        { success, datas = {}, jumpRanking = false } = yield call(getSurvey, {
          pmk: id,
          conditionId,
          submitId: getSubmitId(conditionId),
        });
      if (success) {
        if (jumpRanking) {
          yield put(routerRedux.replace({
            pathname: 'rank',
            query: {
              submitId: getSubmitId(conditionId),
              conditionId,
            },
          }));
        } else {
          let { title = '', items = [], condition } = datas,
            {
              lists, values, issues,
            } = appendItems(items);
          yield put({
            type: 'updateState',
            payload: {
              lists,
              title,
              values,
              issues,
              condition,
            },
          });
        }
      }
    },
    * submitSurveyInfo ({ payload, callback }, { call, put }) {
      const { condtionData, dataId, sessionData, isRankingTitle } = payload;
      const { success, submitId } = yield call(submitSurveyInfo, { dataId, condtionData });
      if (success) {
        if (callback) callback();
        const session = { ...sessionData, submitId, isRankingTitle };
        localStorage.setItem(dataId, JSON.stringify(session));
      }
    },
    * sumbit ({ payload }, { call, put }) {
      yield put({
        type: 'updateSubmit',
        payload: {
          isSubmit: true,
        },
      });
      const { values, types = 'save', ...others } = payload;
      const result = yield call(submitSurvey, { types, datas: getSubmitValues(values), ...others });
      if (result.success) {
        yield put(routerRedux.goBack());
        yield put({
          type: 'updateSubmit',
          payload: {
            isSubmit: false,
          },
        });
        Toast.success('提交成功');
      } else {
        Toast.fail(result.message || '未知错误');
      }
    },
    * queryStreet ({ payload }, { call, put }) {
      const data = yield call(queryStreet);
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            district: getDistrictData(data.data),
          },
        });
      }
    },
  },
  reducers: {
    updateSubmit (state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
});

import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { model } from 'models/common'
import { routerRedux } from 'dva/router'
import { getSurvey, submitSurvey } from 'services/survey'

const appendChildren = (items) => {
    const result = []
    items.map(item => {
      const { boxLabel, inputValue, name } = item
      result.push({
        value: inputValue, label: boxLabel,
      })
    })
    return result
  },
  appendItems = (datas = []) => {
    const result = [],
      values = {},
      issues = {}
    datas.map(data => {
      let { name = '', items = [], xtype = '', allowBlank = true, fieldLabel = '' } = data,
        pos = -1
      if (name != '' && xtype != '' && items.length > 0) {
        const newItems = appendChildren(items)
        if ((pos = fieldLabel.indexOf('<font')) != -1) {
          fieldLabel = fieldLabel.substr(0, pos)
        }
        result.push({
          title: fieldLabel,
          items: newItems,
          isRequired: !allowBlank,
          id: name,
          multiple: xtype == 'checkbox',
        })
        values[name] = []
        if (!allowBlank) {
          issues[name] = fieldLabel
        }
      }
    })
    return { lists: result, values, issues }
  },
  getSubmitValues = (values = {}) => {
    const result = []
    Object.keys(values)
      .map(key => {
        result.push(values[key])
      })
    return result
  }

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
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query }) => {
        if (pathname === '/survey') {
          const { id = '' } = query
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
            },
          })
          dispatch({
            type: 'query',
            payload: {
              id,
            },
          })
        }
      })
    },
  },
  effects: {
    * query ({ payload }, { call, put, select }) {
      const { id = '' } = payload,
        { success, datas = {} } = yield call(getSurvey, { pmk: id })
      if (success) {
        let { title = '', items = [] } = datas, {
          lists, values, issues,
        } = appendItems(items)
        yield put({
          type: 'updateState',
          payload: {
            lists,
            title,
            values,
            issues,
          },
        })
      }
    },
    * sumbit ({ payload }, { call, put, select }) {
      yield put({
        type: 'updateSubmit',
        payload: {
          isSubmit: true,
        },
      })
      const { values, types = 'save' } = payload
      const result = yield call(submitSurvey, { types, datas: getSubmitValues(values) })
      if (result) {
        yield put(routerRedux.goBack())
        yield put({
          type: 'updateSubmit',
          payload: {
            isSubmit: false,
          },
        })
      }
    },
  },
  reducers: {
    updateSubmit (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
})

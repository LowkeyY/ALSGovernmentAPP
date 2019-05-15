import modelExtend from 'dva-model-extend'
import {model} from './common'
import {ListView} from 'antd-mobile'
import {queryAppealType, queryAppealList} from 'services/queryappeal'
import {queryPartyTabs, queryPartyData} from 'services/querylist'

const namespace = 'search',
  appendFilters = {
    appeal: [{
      'cntype': 'radio',
      'key': 'showType',
      'items': [{
        text: '全部诉求',
        value: 1,
      }, {
        text: '我的诉求',
        value: 2,
      }, {
        text: '收藏诉求',
        value: 3,
      }],
    }],
    startDate: [{
      'cntype': 'date',
      'key': 'startdate',
      'title': '开始日期',
    }],
    endDate: [{
      'cntype': 'date',
      'key': 'enddate',
      'title': '截止日期',
    }],
  },
  checkAppealData = (datas = []) => {
    const result = []
    if (datas.length > 0) {
      result.push({
        text: '全部',
        value: '_all',
      })
    }
    datas.map(data => {
      const {name = '', value} = data
      if (name && typeof(value) != 'undefined') {
        result.push({text: name, value})
      }
    })
    return result
  },
  appendDefaultFilterValues = (filters) => {//单选 添加默认值 (第一个)
    const result = {}
    filters.map(filter => {
      let {key = '', cntype = '', items = []} = filter,
        count = 0
      if (key != '' && cntype == 'radio' && items.length > 0) {
        items.map(item => {
          const {value = null} = item
          if (value != null && count == 0) {
            result[key] = [value]
            count++
          }
        })
      }
    })
    return result
  },
  checkLanmuData = (datas = []) => {
    const result = []
    if (datas.length > 1) {
      result.push({
        text: '全部',
        value: '_all',
      })
    }
    datas.map(data => {
      const {title = '', id = ''} = data
      if (title && typeof(id) != 'undefined') {
        result.push({text: title, value: id})
      }
    })
    return result
  },
  checkPostParams = (filterValues = {}) => {
    const result = {}
    Object.keys(filterValues)
      .map(key => {
        let value = filterValues[key]
        result[key] = cnIsArray(value) ? value.join(',') : value
      })
    return result
  },
  getInitState = () => ({
    filters: [],
    filterValues: {},
    isFilter: true,
    searchText: '',
    lists: [],
    router: 'lanmu',
    id: '',
    totalCount: 0
  }),
  getDefaultPaginations = () => ({
    current: 1,
    total: 0,
    size: 10,
  })

export default modelExtend(model, {
  namespace,
  state: {
    //初始参数
    ...getInitState(),
    scrollerTop: 0,
    paginations: getDefaultPaginations(),
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(({pathname, query, action}) => {
        if (pathname === `/${namespace}`) {
          const {router = 'lanmu', id = ''} = query
          if (action == 'PUSH') {
            dispatch({ //重置默认搜索参数
              type: 'updateState',
              payload: {
                ...getInitState(),
                router,
                id,
                scrollerTop: 0,
                paginations: getDefaultPaginations(),
              },
            })
            dispatch({
              type: 'query',
              payload: {
                router,
                id,
              },
            })
          }
        }
      })
    },
  },
  effects: {
    * query({payload}, {call, put, select}) {
      let {router, id} = payload,
        result = {},
        filters = []
      if (router == 'appeal') {
        result = yield call(queryAppealType)
        let {datas = '[]', success = false} = result
        if (success) {
          filters = [{
            'cntype': 'radio',
            'key': 'type',
            'items': checkAppealData(JSON.parse(datas)),
          }, ...appendFilters.appeal, ...appendFilters.startDate, ...appendFilters.endDate]
        }
      } else {
        result = yield call(queryPartyTabs, {dataId: id})
        let {data = [], tuijian = [], success = false} = result
        if (success) {
          filters = [{
            'cntype': 'radio',
            'key': 'lanmuId',
            'items': checkLanmuData([...data, ...tuijian]),
          }, ...appendFilters.startDate, ...appendFilters.endDate]
        }
      }
      yield put({
        type: 'updateState',
        payload: {
          filters,
          filterValues: appendDefaultFilterValues(filters),
        },
      })
    }
    ,
    * search({payload = {}}, {call, put, select}) {
      const {callback = ''} = payload
      const _this = yield select(_ => _[`${namespace}`]),
        {filterValues, id, router, searchText, paginations: {current, total, size}, lists} = _this,
        params = checkPostParams(filterValues),
        start = current
      if (router == 'appeal') {
        const result = yield call(queryAppealList, {...params, searchText, nowPage: start, showCount: size})
        const {data = [], success = false, totalCount} = result
        let newLists = []
        newLists = start == 1 ? data : [...lists, ...data]
        if (success) {
          yield put({
            type: 'updateState',
            payload: {
              totalCount,
              lists: newLists,
              paginations: {
                ..._this.paginations,
                total: totalCount * 1,
                current: start + 1,
              },
            },
          })
        }
        if (callback) {
          callback()
        }
      } else {
        const result = yield call(queryPartyData, {
          dataId: id,
          searchText,
          ...params,
          nowPage: start,
          showCount: size,
        })
        const {data = [], success = false, totalCount} = result
        let newLists = []
        newLists = start == 1 ? data : [...lists, ...data]
        if (success) {
          yield put({
            type: 'updateState',
            payload: {
              totalCount,
              lists: newLists,
              paginations: {
                ..._this.paginations,
                total: totalCount * 1,
                current: start + 1,
              },
            },
          })
        }
        if (callback) {
          callback()
        }
      }

    }
    ,
  },
  reducers: {},
})

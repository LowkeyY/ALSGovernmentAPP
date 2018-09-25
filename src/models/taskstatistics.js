import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { queryTaskStatistics } from 'services/querylist';
import { queryAppealList } from 'services/queryappeal';

const getDefaultPaginations = () => ({
    current: 1,
    total: 0,
    size: 10,
  }),
  namespace = 'taskstatistics';
export default modelExtend(model, {
  namespace: 'taskstatistics',
  state: {
    chartData: [],
    dataList: [],
    scrollerTop: 0,
    paginations: getDefaultPaginations(),
    showType: '4',
    reactList: []
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        let { pathname, query, action } = location;
        if (pathname.startsWith('/taskstatistics')) {
          if (action === 'PUSH') {
            dispatch({
              type: 'queryList',
            });
            // dispatch({
            //   type: 'querys'
            // });
          }
        }
      });
    },
  },
  effects: {
    * querys ({ payload }, { call, put, select }) {
      const data = yield call(queryTaskStatistics);
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            chartData: data.chartData,
          }
        });
      }
    },
    * queryList ({ payload }, { call, put, select }) {
      const data = yield call(queryTaskStatistics);
      if (data.success) {
        yield put({
          type: 'querys'
        });
        yield put({
          type: 'updateState',
          payload: {
            reactList: data.data,
            
          }
        });
      }
    },
    
    // * getReactList ({ payload = {} }, { call, put, select }) {
    //   const { callback = '', isRefresh = false } = payload,
    //     _this = yield select(_ => _[`${namespace}`]),
    //     { paginations: { current, total, size }, dataList, showType } = _this,
    //     start = isRefresh ? 1 : current;
    //   const result = yield call(queryAppealList, { nowPage: start, showCount: size, showType });
    //   if (result) {
    //     let { data = [], totalCount = 0 } = result,
    //       newLists = [];
    //     newLists = start === 1 ? data : [...dataList, ...data];
    //     yield put({
    //       type: 'updateState',
    //       payload: {
    //         paginations: {
    //           ..._this.paginations,
    //           total: totalCount * 1,
    //           current: start + 1
    //         },
    //         dataList: newLists
    //       },
    //     });
    //   }
    //   if (callback)
    //     callback();
    // },
  }
  
});

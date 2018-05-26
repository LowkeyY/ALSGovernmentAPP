
import {parse} from 'qs'
import modelExtend from 'dva-model-extend'
import { model } from 'models/common'
import { ListView } from 'antd-mobile';
var defalutClientHeight = document.documentElement.clientHeight;
const data=[
  {
    content: '学用结合，知心合一',
    time: '2018年4月5日',

  },
  {
    content: '习近平谈共青团工作：做青年友 不做青年"官"',
    time: '2018年4月5',

  },
  {
    content: '图文|博物馆何以重要？习近平“打卡”告诉你',
    time: '2018年4月5',

  },
  {
    content: '形成全方位深层次的政法改革新格局',
    time: '2018年4月5',

  },
  {
    content: '习近平强调的“命门”是什么',
    time: '2018年4月5日',

  },
  {
    content: '习近平谈共青团工作：做青年友 不做青年"官"',
    time: '2018年4月5',

  },
  {
    content: '图文|博物馆何以重要？习近平“打卡”告诉你',
    time: '2018年4月5',

  },
  {
    content: '形成全方位深层次的政法改革新格局',
    time: '2018年4月5',

  },


]
export default modelExtend(model, {
  namespace: 'patrylist',
  state:{
    defalutHeight: defalutClientHeight,
    dataSource: new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    }),
    currentData: [],
    isLoading: false,
    hasMore: true,
    pageIndex: 0,
    totalCount: 0,
    scrollerTop: 0,
    pagination: {
      0: 0
    },
    refreshing:false,
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(({pathname, query, action}) => {
        if (pathname === '/patrylist') {
          dispatch({ //重置默认搜索结果
            type: "updateState",
            payload: {
              defalutHeight: defalutClientHeight,
              dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
              }),
              currentData: [],
              isLoading: false,
              hasMore: true,
              pageIndex:1,
              totalCount: 0,
              scrollerTop: 0,
              pagination: {
                0: 0
              },
              refreshing:false,
            }
          })
          dispatch({
            type: "query",
            payload: {
              nowPage:1,
            },
          })
        }
      })
    },
  },
  effects: {
    * query({payload}, {call, put, select}) {
      let { pageIndex, hasMore,defaultPageType,currentData,dataSource} = yield select(state => state.patrylist);
      yield put({
        type: 'updateData',
        payload: {
          currentData: data,
          dataSource:dataSource.cloneWithRows(data),
          totalCount:13,
          hasMore: true,
          isLoading: false,
        },
      })
    }
  },

  reducers:{

    resetState(state, {payload}) {
      return {
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        }),
        currentData: [],
        isLoading: false,
        refreshing: false,
        hasMore: true,
        pageIndex: 1,
        totalCount: 0,
        scrollerTop: -1,
        pagination: {
          0: 0
        },
      }
    },
    updateData(state, {payload}) {

      return {
        ...state,
        ...payload
      }
    },

  }

})


import {parse} from 'qs'
import modelExtend from 'dva-model-extend'
import { model } from 'models/common'
import { ListView } from 'antd-mobile';
var defalutClientHeight = document.documentElement.clientHeight;
const data=[
  {
    content: '跟着党走能打胜仗，撸起袖子加油干',
    time: '2018年4月5',
    title:'新消息'
  },
  {
    content: '跟着党走能打胜仗，撸起袖子加油干',
    time: '2018年4月5',
    title:'新消息'
  },
  {
    content: '跟着党走能打胜仗，撸起袖子加油干',
    time: '2018年4月5',
    title:'新消息'
  },
  {
    content: '跟着党走能打胜仗，撸起袖子加油干',
    time: '2018年4月5',
    title:'新消息'
  },
  {
    content: '跟着党走能打胜仗，撸起袖子加油干',
    time: '2018年4月5',
    title:'新消息'
  },
  {
    content: '跟着党走能打胜仗，撸起袖子加油干',
    time: '2018年4月5',
    title:'新消息'
  },
  {
    content: '跟着党走能打胜仗，撸起袖子加油干',
    time: '2018年4月5',
    title:'新消息'
  },
  {
    content: '跟着党走能打胜仗，撸起袖子加油干',
    time: '2018年4月5',
    title:'新消息'
  },
  {
    content: '跟着党走能打胜仗，撸起袖子加油干',
    time: '2018年4月5',
    title:'新消息'
  },
  {
    content: '跟着党走能打胜仗，撸起袖子加油干',
    time: '2018年4月5',
    title:'新消息'
  },
  {
    content: '跟着党走能打胜仗，撸起袖子加油干',
    time: '2018年4月5',
    title:'新消息'
  },
  {
    content: '跟着党走能打胜仗，撸起袖子加油干',
    time: '2018年4月5',
    title:'新消息'
  },{
    content: '跟着党走能打胜仗，撸起袖子加油干',
    time: '2018年4月5',
    title:'新消息'
  },

]
export default modelExtend(model, {
  namespace: 'notice',
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
        if (pathname === '/notice') {
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
      let { pageIndex, hasMore,defaultPageType,currentData,dataSource} = yield select(state => state.notice);
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

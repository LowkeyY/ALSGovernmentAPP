
import {parse} from 'qs'
import modelExtend from 'dva-model-extend'
import { model } from 'models/common'
import { ListView } from 'antd-mobile';
var defalutClientHeight = document.documentElement.clientHeight;
const data=[
  {
    content: '马上就清理',
    time: '2018年4月5日',
    title:'请将花园路的小广告清理一下'
  },
  {
    content: '马上就清理',
    time: '2018年4月5日',
    title:'请将花园路的小广告清理一下'
  },
  {
    content: '马上就清理',
    time: '2018年4月5日',
    title:'请将花园路的小广告清理一下'
  },
  {
    content: '马上就清理',
    time: '2018年4月5日',
    title:'请将花园路的小广告清理一下'
  },
  {
    content: '马上就清理',
    time: '2018年4月5日',
    title:'请将花园路的小广告清理一下'
  },
  {
    content: '马上就清理',
    time: '2018年4月5日',
    title:'请将花园路的小广告清理一下'
  },
  {
    content: '马上就清理',
    time: '2018年4月5日',
    title:'请将花园路的小广告清理一下'
  },
  {
    content: '马上就清理',
    time: '2018年4月5日',
    title:'请将花园路的小广告清理一下'
  },
  {
    content: '马上就清理',
    time: '2018年4月5日',
    title:'请将花园路的小广告清理一下'
  },
  {
    content: '马上就清理',
    time: '2018年4月5日',
    title:'请将花园路的小广告清理一下'
  },
  {
    content: '马上就清理',
    time: '2018年4月5日',
    title:'请将花园路的小广告清理一下'
  },
  {
    content: '马上就清理',
    time: '2018年4月5日',
    title:'请将花园路的小广告清理一下'
  },{
    content: '马上就清理',
    time: '2018年4月5日',
    title:'请将花园路的小广告清理一下'
  },

]
export default modelExtend(model, {
  namespace: 'task',
  state:{
    selectedIndex:0,
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
        if (pathname === '/task') {
          dispatch({ //重置默认搜索结果
            type: "updateState",
            payload: {
              defalutHeight: defalutClientHeight,
              dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
              }),
              currentData: [],
              selectedIndex:0,
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
      let { pageIndex, hasMore,defaultPageType,currentData,dataSource} = yield select(state => state.task);
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

import {parse} from 'qs'
import modelExtend from 'dva-model-extend'
import { model } from 'models/common'
import { ListView } from 'antd-mobile';
import { queryPartyData,queryPartyTabs } from 'services/querylist'
var defalutClientHeight = document.documentElement.clientHeight;
const data=[
  {
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: '跟着党走能打胜仗，撸起袖子加油干',
    time: '2018年4月5',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: '跟着党走能打胜仗，撸起袖子加油干',
    time: '2018年4月5',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: '跟着党走能打胜仗，撸起袖子加油干',
    time: '2018年4月5',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: '跟着党走能打胜仗，撸起袖子加油干',
    time: '2018年4月5',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: '跟着党走能打胜仗，撸起袖子加油干',
    time: '2018年4月5',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: '跟着党走能打胜仗，撸起袖子加油干',
    time: '2018年4月5',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: '跟着党走能打胜仗，撸起袖子加油干',
    time: '2018年4月5',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: '跟着党走能打胜仗，撸起袖子加油干',
    time: '2018年4月5',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: '跟着党走能打胜仗，撸起袖子加油干',
    time: '2018年4月5',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: '跟着党走能打胜仗，撸起袖子加油干',
    time: '2018年4月5',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: '跟着党走能打胜仗，撸起袖子加油干',
    time: '2018年4月5',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: '跟着党走能打胜仗，撸起袖子加油干',
    time: '2018年4月5',
  },{
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: '跟着党走能打胜仗，撸起袖子加油干',
    time: '2018年4月5',
  },

]
export default modelExtend(model, {
  namespace: 'convenient',
  state:{
    defaultPageType:'43c756d4-6232-4a7b-8e8c-1957d90cfd94',
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
    bannerData:[
      {url:require('themes/images/banner/banner1.jpg')},
      {url:require('themes/images/banner/banner1.jpg')},
      {url:require('themes/images/banner/banner1.jpg')}
    ],
  },

  subscriptions: {
    setup({dispatch, history}) {
      history.listen(({pathname, query, action}) => {
        if (pathname === '/convenient') {
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
          dispatch({ //重置默认搜索结果
            type: "query",
            payload:{
              nowPage:1,
            }
          })

        }
      })
    },
  },
  effects: {
    * query({payload}, {call, put, select}){
      const { pageIndex, defaultPageType} = yield select(state => state.convenient);
      const data = yield call(queryPartyData, {
        pageType:defaultPageType,
        nowPage:pageIndex,
        ...payload
      });
      if(data){
        let { pageIndex, hasMore,defaultPageType,currentData,dataSource} = yield select(state => state.convenient);
        currentData = [...currentData, ...data.data];
        pageIndex = pageIndex + 1;
        hasMore = currentData.length < data.totalCount;
        dataSource = dataSource.cloneWithRows(currentData);
        yield put({
          type: 'updateData',
          payload: {
            currentData:currentData,
            dataSource:dataSource,
            totalCount:data.totalCount,
            pageIndex: pageIndex,
            hasMore: hasMore,
            isLoading: false,
            refreshing: false,
          },
        })
      }
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

import {parse} from 'qs'
import modelExtend from 'dva-model-extend'
import { model } from 'models/common'
import { ListView } from 'antd-mobile';
import { queryPartyData,queryPartyTabs } from 'services/querylist'
var defalutClientHeight = document.documentElement.clientHeight;
export default modelExtend(model, {
  namespace: 'patry',
  state:{
    defaultPageType:'46126b70-dbcf-47b4-9647-bf04db2a9054',
    selectedIndex:0,
    defalutHeight: defalutClientHeight,
    dataSource: new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    }),
    currentData: [],
    isLoading: false,
    hasMore: true,
    pageIndex:0,
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
        if (pathname === '/patry') {
          dispatch({ //重置默认搜索结果
            type: "updateState",
            payload: {
              defaultPageType:'46126b70-dbcf-47b4-9647-bf04db2a9054',
              selectedIndex:0,
              defalutHeight: defalutClientHeight,
              dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
              }),
              currentData: [],
              isLoading: false,
              hasMore: true,
              pageIndex:0,
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

    // * query({payload}, {call, put, select}){
    //   const { pageIndex, defaultPageType} = yield select(state => state.patry);
    //   const data = yield call(queryPartyData, {
    //     pageType:defaultPageType,
    //     nowPage:pageIndex+1,
    //     ...payload
    //   });
    //   if(data){
    //     let { pageIndex, hasMore,defaultPageType,currentData,dataSource} = yield select(state => state.patry);
    //     currentData = [...currentData, ...data.data];
    //     pageIndex = pageIndex + 1
    //     hasMore = currentData.length < data.totalCount;
    //     dataSource = dataSource.cloneWithRows(currentData);
    //     yield put({
    //       type: 'updateData',
    //       payload: {
    //         currentData:currentData,
    //         dataSource:dataSource,
    //         totalCount:data.totalCount,
    //         pageIndex: pageIndex,
    //         hasMore: hasMore,
    //         isLoading: false,
    //         refreshing: false,
    //       },
    //     })
    //   }
    //
    //   }
    },

  reducers:{
    resetState(state, {payload}) {
      return {
        ...state,
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        }),
        currentData: [],
        isLoading: false,
        hasMore: true,
        pageIndex:0,
        totalCount: 0,
        scrollerTop: -1,
        pagination: {
          0: 0
        },
        ...payload
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

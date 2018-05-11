import React from 'react'
import {connect} from 'dva';
import Nav from 'components/nav'
import { routerRedux } from 'dva/router';
import {SegmentedControl, WingBlank, WhiteSpace, ListView} from 'antd-mobile';
import Listviews from 'components/listviews';
import {message} from 'components/row'
import styles from './index.less'

const PrefixCls = 'task'


function Task({location, dispatch, task}) {
  const {name = ''} = location.query,
    {dataSource, isLoading, hasMore, pageIndex, scrollerTop, pagination, totalCount, refreshing, defalutHeight, selectedIndex} = task;
  const updateState = (payload) => {
      dispatch({
        type: 'task/updateState',
        payload
      });
    },

    onRefresh = () => {
      dispatch({
        type: 'task/updateData',
        payload: {
          refreshing: true
        }
      });
      dispatch({
        type: "task/resetState",
        payload: {
          currentData
        }

      });
    },
    updateScrollerTop = (scrollerTop) => {
      updateState({
        scrollerTop
      })
    },
    onEndReached = (event, st = 0) => {
      if (isLoading || !hasMore || (st < 100 && pageIndex > 0))
        return;
      const adds = {};
      if (!isNaN(st) && st > 0 && pageIndex > 0)
        adds[st] = pageIndex;
      updateState({
        isLoading: true,
        pagination: {
          ...pagination,
          ...adds
        }
      });
      dispatch({
        type: "task/query",
        payload: {
          nowPage: pageIndex,
        }

      })

    },
    handleChangeView = (e) => {
     dispatch({
       type:'task/updateState',
       payload:{
         selectedIndex:e.nativeEvent.selectedSegmentIndex
       }
     })

    },
    handlerTaskClick = () => {
      dispatch(routerRedux.push(
        {
          pathname:'taskdetails',
          query:{
            
          }
        }
      ))
    },
    getCurrentView = (index) => {
      switch (index){

        case 0 : {
          return (
            <Listviews {...listviewprops}/>
          )
        }
        case 1 : {
          return (
            <div></div>
          )
        }
      }
  },
    renderRow = (rowData, sectionID, rowID) => {
      return (
        message(rowData, sectionID, rowID, handlerTaskClick)
      );

    }
  const listviewprops = {
    refreshing,
    dataSource,
    isLoading,
    onRefresh,
    onEndReached,
    renderRow,
    defalutHeight,
    initialListSize: dataSource.getRowCount() || 10,
    scrollerTop,
    updateScrollerTop,
    pagination,
    totalCount,
    pageIndex
  }
  return (
    <div>
      <Nav title={name} dispatch={dispatch}/>
      <WhiteSpace size="md"/>
      <WingBlank size="md">
        <SegmentedControl
          selectedIndex={selectedIndex}
          onChange={handleChangeView}
          values={['未完成任务', '已完成任务']}
        />
      </WingBlank>
      <WhiteSpace size="md"/>
      {getCurrentView(selectedIndex)}
    </div>
  )
}

export default connect(({loading, task}) => ({
  loading,
  task
}))(Task)

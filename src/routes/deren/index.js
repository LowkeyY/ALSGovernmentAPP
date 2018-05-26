
import React from 'react'
import {connect} from 'dva';
import Nav from 'components/nav'
import Listviews from 'components/listviews';
import {message} from 'components/row'
import styles from './index.less'
const PrefixCls='deren'


function Deren({location,dispatch,deren}) {
  const {name=''}=location.query,
    {dataSource, isLoading, hasMore, pageIndex, scrollerTop, pagination, totalCount,refreshing,defalutHeight}=deren;
  console.log(dataSource)

  const updateState = (payload) => {
      dispatch({
        type: 'deren/updateState',
        payload
      });
    },

    onRefresh = () => {
      dispatch({
        type: 'deren/updateData',
        payload:{
          refreshing:true
        }
      });
      dispatch({
        type: "deren/resetState",
        payload:{
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
        type: "deren/query",
        payload:{
          nowPage:pageIndex,
        }

      })

    },
    handlerderenClick=()=>{
       alert()
    },
    renderRow=(rowData, sectionID, rowID)=>{
      return (
        message(rowData, sectionID, rowID,handlerderenClick)
      );

    }
  const listviewprops={
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
      <Listviews {...listviewprops}/>
    </div>
  )
}

export default connect(({loading,deren}) => ({
  loading,
  deren
}))(Deren)

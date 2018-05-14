
import React from 'react'
import {connect} from 'dva';
import { WhiteSpace } from 'antd-mobile';
import Nav from 'components/nav'
import Listviews from 'components/listviews';
import {listRows} from 'components/row'
import styles from './index.less'

const PrefixCls='tour'
function Tour({location,dispatch,tour}) {

  const {name=''}=location.query,
    {bannerData,dataSource, isLoading, hasMore, pageIndex, scrollerTop, pagination, totalCount,refreshing,defalutHeight}=tour

  const updateState = (payload) => {
      dispatch({
        type: 'tour/updateState',
        payload
      });
    },

    onRefresh = () => {
      dispatch({
        type: 'tour/updateData',
        payload:{
          refreshing:true
        }
      });
      dispatch({
        type: "tour/resetState",
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
        type: "tour/query",
        payload:{
          nowPage:pageIndex,
        }

      })

    },
    handlePartyListClick=(id)=>{
      dispatch(routerRedux.push({
        pathname: "/details",
        query: {
          id
        }
      }))
    },
    renderRow=(rowData, sectionID, rowID)=>{
      return (
        listRows(rowData, sectionID, rowID)
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
    <div className={styles[`${PrefixCls}-outer`]}>
      <Nav title={name} dispatch={dispatch}/>
      <WhiteSpace size="sm"/>
      <div>
        <Listviews {...listviewprops}/>
      </div>
    </div>
  )
}

export default connect(({loading,tour}) => ({
  loading,
  tour
}))(Tour)

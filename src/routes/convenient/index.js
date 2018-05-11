
import React from 'react'
import {connect} from 'dva';
import { WingBlank,WhiteSpace} from 'antd-mobile';
import Nav from 'components/nav'
import Banner from 'components/banner'
import Listviews from 'components/listviews';
import {listRows} from 'components/row'
import styles from './index.less'

const PrefixCls='convenient'
function Convenient({location,dispatch,convenient}) {

  const {name=''}=location.query,
    {bannerData,dataSource, isLoading, hasMore, pageIndex, scrollerTop, pagination, totalCount,refreshing,defalutHeight}=convenient

  const updateState = (payload) => {
    dispatch({
      type: 'convenient/updateState',
      payload
    });
  },

    onRefresh = () => {
      dispatch({
        type: 'convenient/updateData',
        payload:{
          refreshing:true
        }
      });
      dispatch({
        type: "convenient/resetState",
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
        type: "convenient/query",
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
          <Banner bannerData={bannerData}/>
          <Listviews {...listviewprops}/>
      </div>
    </div>
  )
}

export default connect(({loading,convenient}) => ({
  loading,
  convenient
}))(Convenient)

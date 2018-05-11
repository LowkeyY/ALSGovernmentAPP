import React from 'react'
import {connect} from 'dva';
import { routerRedux } from 'dva/router';
import { SegmentedControl, WingBlank,WhiteSpace,ListView} from 'antd-mobile';
import Nav from 'components/nav'
import Banner from 'components/banner'
import Listviews from 'components/listviews';
import {listRows} from 'components/row'
import styles from './index.less'

const PrefixCls='party'


function Patry({location,dispatch,patry,app}) {
  const {name=''}=location.query,
    {selectedIndex,bannerData,dataSource, isLoading, hasMore, pageIndex, scrollerTop, pagination, totalCount,refreshing,defalutHeight,currentData}=patry,
    {tabs}=app;
  const getTabsArr=(tabs)=>{
     const arr=[]
    tabs&&tabs.map((data)=>{
       arr.push(`${data.title}`)
    })
    return arr
  }

  const updateState = (payload) => {
    dispatch({
      type: 'patry/updateState',
      payload
    });
  }
  const handleChangeView = (e)=> {

    const index=e.nativeEvent.selectedSegmentIndex
    let pageType=tabs[index].id
    dispatch({
      type: 'patry/updateState',
      payload: {
        selectedIndex:e.nativeEvent.selectedSegmentIndex,
        defaultPageType:pageType,
        currentData:[],
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        }),
        pageIndex:1
      }
    })

    dispatch({
      type:'patry/query',
      payload:{
        nowPage:1,
      }
    })
  },
  onRefresh = () => {

    dispatch({
      type: "patry/resetState",
      payload:{
        refreshing:true,
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
      type: "patry/query",
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
        listRows(rowData, sectionID, rowID,handlePartyListClick)
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

  const getCurrentView=(selectedIndex=0)=>{

        return (
          <div>
            <Banner bannerData={bannerData}/>
            <Listviews {...listviewprops}/>
          </div>
        )
      }


  return (
    <div className={styles[`${PrefixCls}-outer`]}>
      <Nav title={name} dispatch={dispatch}/>
      <WhiteSpace size="md"/>
      <WingBlank size="md">
      <SegmentedControl
        selectedIndex={selectedIndex}
        onChange={ handleChangeView }
        values={getTabsArr(tabs)}
      />
      </WingBlank>
      <WhiteSpace size="md"/>
        <div>
          {getCurrentView(selectedIndex)}
        </div>
    </div>
  )
}

export default connect(({loading,patry,app}) => ({
  loading,
  patry,
  app
}))(Patry)

import React from 'react'
import { connect } from 'dva'
import Nav from 'components/nav'
import Listviews from 'components/listviews'
import { routerRedux } from 'dva/router'
import { message } from 'components/row'
import testDataObj from 'utils/datadangjian'
import { WingBlank, WhiteSpace, Tabs, SegmentedControl, List } from 'antd-mobile'
import styles from './index.less'

const PrefixCls = 'patrylist',
  Item = List.Item,
  Brief = Item.Brief,
  dangjianImages = [require('themes/images/patry/dxc.jpg'), require('themes/images/patry/ddy.jpg'), require('themes/images/patry/dls.jpg')]

function Patrylist ({ location, dispatch, patrylist }) {
  const { name = '', theIndex = 0 } = location.query,
    { dataSource, isLoading, hasMore, pageIndex, scrollerTop, pagination, totalCount, refreshing, defalutHeight } = patrylist
  console.log(dataSource)

  const updateState = (payload) => {
      dispatch({
        type: 'patrylist/updateState',
        payload,
      })
    },

    onRefresh = () => {
      dispatch({
        type: 'patrylist/updateData',
        payload: {
          refreshing: true,
        },
      })
      dispatch({
        type: 'patrylist/resetState',
        payload: {
          currentData,
        },

      })
    },
    updateScrollerTop = (scrollerTop) => {
      updateState({
        scrollerTop,
      })
    },
    onEndReached = (event, st = 0) => {
      if (isLoading || !hasMore || (st < 100 && pageIndex > 0)) {
        return
      }
      const adds = {}
      if (!isNaN(st) && st > 0 && pageIndex > 0) {
        adds[st] = pageIndex
      }
      updateState({
        isLoading: true,
        pagination: {
          ...pagination,
          ...adds,
        },
      })
      dispatch({
        type: 'patrylist/query',
        payload: {
          nowPage: pageIndex,
        },
      })

    },
    handlerPatrylistClick = (i) => {
      dispatch(routerRedux.push({
        pathname: 'patrydetails',
        query: {
          type: theIndex,
          index: i,
          name: name + '详情',
        },
      }))

    },
    renderRow = (rowData, sectionID, rowID) => {
      return (
        message(rowData, sectionID, rowID, handlerPatrylistClick)
      )

    },
    getIndexImg = (index = 0) => dangjianImages[index]
  const
    listviewprops = {
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
      pageIndex,
    },
    getLists = (testData) => {
      let isNew = false
      return (
        <List>
          {testData.map((_, i) => <Item
            arrow="horizontal"
            multipleLine
            onClick={handlerPatrylistClick.bind(null, i)}
            wrap
          >
            <div className={`${styles['row-message-title']} ${isNew ? 'news' : ''}`}>
              <h3>{_.title}</h3>
            </div>
            <div className={styles['row-message-content']}>{_.content}</div>
            <Brief>
              {_.time}
            </Brief>
          </Item>)
          }
        </List>
      )

    }

  return (
    <div>
      <Nav title={name} dispatch={dispatch}/>
      <div style={{ textAlign: 'center' }}>
        <img style={{ width: '95%', borderRadius: '30px' }} src={getIndexImg(theIndex)}/>
      </div>
      {getLists(testDataObj[theIndex])}
    </div>
  )
}

export default connect(({ loading, patrylist }) => ({
  loading,
  patrylist,
}))(Patrylist)

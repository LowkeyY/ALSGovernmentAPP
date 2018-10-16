import React from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import Nav from 'components/nav'
import ListView from 'components/listview'
import { WhiteSpace, List, Tabs, Tag, Toast, Badge } from 'components'
import { centerAppealRow } from 'components/row'
import styles from './index.less'

const PrefixCls = 'centertask',
  tabs = [
    { title: <Badge>办理中</Badge> },
    { title: <Badge>已办结</Badge> },
  ]

function CenterTask ({ location, dispatch, centertask }) {
  const { name = '' } = location.query,
    { paginations, scrollerTop, selectedIndex, dataList } = centertask
  const handleTabClick = (tab, index) => {
      dispatch({
        type: `${PrefixCls}/queryList`,
        payload: {
          selected: index,
          isRefresh: true,
        },
      })
    },
    onRefresh = (callback) => {
      dispatch({
        type: `${PrefixCls}/queryList`,
        payload: {
          callback,
          isRefresh: true,
        },
      })
    },
    onEndReached = (callback) => {
      dispatch({
        type: `${PrefixCls}/queryList`,
        payload: {
          callback,
        },
      })
    },
    onScrollerTop = (top) => {
      if (typeof top !== 'undefined' && !isNaN(top * 1)) {
        dispatch({
          type: `${PrefixCls}/updateState`,
          payload: {
            scrollerTop: top,
          },
        })
      }
    },
    handleCardClick = ({ id }) => {
      dispatch(routerRedux.push({
        pathname: '/centertaskdetails',
        query: {
          workId: id,
        },
      }))
    },
    getContents = (lists) => {
      const result = [],
        { current, total, size } = paginations,
        hasMore = (total > 0) && ((current > 1 ? current - 1 : 1) * size < total),
        layoutList = (<ListView layoutHeader={''}
                                dataSource={lists}
                                layoutRow={(rowData, sectionID, rowID) => centerAppealRow(rowData, sectionID, rowID, handleCardClick)}
                                onEndReached={onEndReached}
                                onRefresh={onRefresh}
                                hasMore={hasMore}
                                onScrollerTop={onScrollerTop.bind(null)}
                                scrollerTop={scrollerTop}
        />)
      for (let i = 0; i < tabs.length; i++) {
        if (i === selectedIndex) {
          result.push(<div>{layoutList}</div>)
        } else {
          result.push(<div/>)
        }
      }
      return result
    }
  return (
    <div>
      <Nav title={name} dispatch={dispatch}/>
      <Tabs
        initialPage={0}
        page={selectedIndex}
        tabs={tabs}
        swipeable={false}
        onChange={(tab, index) => {
        }}
        onTabClick={handleTabClick}
      >
        {dataList.length > 0 && getContents(dataList)}
      </Tabs>
    </div>
  )
}

export default connect(({ loading, centertask }) => ({
  loading,
  centertask,
}))(CenterTask)

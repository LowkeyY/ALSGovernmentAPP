import React from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import Nav from 'components/nav'
import ListView from 'components/listview'
import { List, WhiteSpace, SearchBar, Tabs, Card, WingBlank ,Layout} from 'components'
import { baseVoiceRow } from 'components/row'
import styles from './index.less'


const Item = List.Item,
  Brief = Item.Brief,{BaseLine} = Layout
function Basevoice ({ location, dispatch, basevoice }){

  const { name = '' } = location.query
  const PrefixCls = 'basevoice',
    { tabs, lists, selectedIndex,paginations,scrollerTop } = basevoice,
    handleTabItemClick = (data, index) => {
      dispatch({
        type: 'basevoice/updateState',
        payload: {
          selectedIndex:index,
        },
      })
      dispatch({
        type: 'basevoice/queryListview',
        payload: {
          selected: index,
          selectedIndex:index,
          isRefresh: true
        },
      })
    },
    onRefresh = (callback) => {
      dispatch({
        type: `${PrefixCls}/queryListview`,
        payload: {
          callback,
          isRefresh: true
        }
      })
    },
    onEndReached = (callback) => {
      dispatch({
        type: `${PrefixCls}/queryListview`,
        payload: {
          callback
        }
      })
    },
    onScrollerTop = (top) => {
      if (typeof top !='undefined' && !isNaN(top * 1))
        dispatch({
          type: `${PrefixCls}/updateState`,
          payload: {
            scrollerTop: top
          }
        })
    },
    getContents = (lists) => {
      const {current, total, size} = paginations,
        hasMore = (total > 0) && ((current > 1 ? current - 1 : 1) * size < total),
        result= []
      result.push(
        <ListView layoutHeader={''} dataSource={lists} layoutRow={baseVoiceRow}
                  onEndReached={onEndReached}
                  onRefresh={onRefresh} hasMore={hasMore}
                  onScrollerTop={onScrollerTop.bind(null)}
                  scrollerTop={scrollerTop}
        />
      )
      return result
    }

  return (
    <div>
      <Nav title={name} dispatch={dispatch}/>
      <WhiteSpace size="md"/>
      <Tabs
        // initialPage={0}
        page={selectedIndex}
        tabs={tabs}
        swipeable={false}
        onTabClick={handleTabItemClick}
      >
        <div>
          {lists.length>0&&getContents(lists)}
        </div>
      </Tabs>
    </div>
  )
}

export default connect(({ loading, basevoice }) => ({
  loading,
  basevoice,
}))(Basevoice)

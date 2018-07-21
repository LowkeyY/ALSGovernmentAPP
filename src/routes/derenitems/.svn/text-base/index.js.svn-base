import React from 'react'
import { connect } from 'dva'
import { WingBlank, WhiteSpace, Tabs, Badge, List, SearchBar,Layout } from 'components'
import Nav from 'components/nav'
import { routerRedux } from 'dva/router'
import Banner from 'components/banner'
import {layoutRow} from 'components/row'
import ListView from 'components/listview'
import styles from './index.less'
const PrefixCls = 'derenitems',
  Item = List.Item,
  Brief = Item.Brief,{BaseLine} = Layout

function Derenitems ({ location, dispatch, derenitems }) {
  const { name = '', selectedIndex = 0, tabs ,itemData,bannersData,paginations, scrollerTop,refreshId} = derenitems,

    onRefresh = (refreshId, callback) => {
      dispatch({
        type: `${PrefixCls}/queryListview`,
        payload: {
          refreshId,
          callback,
          isRefresh: true
        }
      })
    },
    onEndReached = (refreshId, callback) => {
      dispatch({
        type: `${PrefixCls}/queryListview`,
        payload: {
          refreshId,
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
    getContents = (lists,refreshId) => {
      const {current, total, size} = paginations,
        hasMore = (total > 0) && ((current > 1 ? current - 1 : 1) * size < total),
        result= []
      result.push(
        <ListView layoutHeader={''} dataSource={lists} layoutRow={(rowData, sectionID, rowID) => layoutRow(rowData, sectionID, rowID, handleItemOnclick)}
                  onEndReached={onEndReached.bind(null,refreshId)}
                  onRefresh={onRefresh.bind(null, refreshId)} hasMore={hasMore}
                  onScrollerTop={onScrollerTop.bind(null)}
                  scrollerTop={scrollerTop}
        />
      )
      return result
    },
    getBanners = () =>{
      bannersData&&bannersData.map(item => {
        item.url = item.image
      })
      return bannersData
    },
    handleTabClick = (data, index) => {
      const { externalUrl = '' ,title} = data;
      if (externalUrl != '' && externalUrl.startsWith('http')) {
        dispatch(routerRedux.push({
          pathname: 'iframe',
          query: {
            name:title,
            externalUrl: externalUrl,
          },
        }))
      }else {
        const { route = '', title = '' ,id} = data
        if (route == '') {
          dispatch({
            type: 'derenitems/updateState',
            payload: {
              refreshId:id
            },
          })
          dispatch({
            type: 'derenitems/queryListview',
            payload: {
              refreshId:id,
              selected: index,
              isRefresh: true
            },
          })
        }
      }

    },
    handleBannerClick = (data,index) => {
      const { externalUrl = '',title ,id , pathname='details'} = data;
      if (externalUrl != '' && externalUrl.startsWith('http')) {
        dispatch(routerRedux.push({
          pathname: 'iframe',
          query: {
            name:title,
            externalUrl: externalUrl,
          },
        }))
      }
      else {
        dispatch(routerRedux.push({
          pathname: `/${pathname}`,
          query: {
            name,
            dataId: id,
          },
        }))
      }
    },
    handleItemOnclick = ({ externalUrl = '', id, route = 'details' }) => {
      if (externalUrl != '' && externalUrl.startsWith('http')) {
        dispatch(routerRedux.push({
          pathname: 'iframe',
          query: {
            name,
            externalUrl: externalUrl,
          },
        }))
      } else {
        dispatch(routerRedux.push({
          pathname: `/${route}`,
          query: {
            name,
            dataId: id,
          },
        }))
      }
    }

  return (
    <div className={styles[`${PrefixCls}-outer`]}>
      <Nav title={name} dispatch={dispatch}/>
      {getBanners().length>0&&<Banner datas={getBanners()} handleClick={handleBannerClick}/>}
      <Tabs
        initialPage={0}
        page={selectedIndex}
        tabs={tabs}
        swipeable={false}
        useOnPan={tabs.length > 3}
        onTabClick={handleTabClick}
        renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3}/>}>
       <div>
         {itemData.length>0&&getContents(itemData,refreshId)}
       </div>
      </Tabs>
    </div>

  )
}

export default connect(({ loading, derenitems }) => ({
  loading,
  derenitems,
}))(Derenitems)

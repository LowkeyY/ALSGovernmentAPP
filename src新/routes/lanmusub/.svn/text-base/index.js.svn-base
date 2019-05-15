import React from 'react'
import { connect } from 'dva'
import Nav from 'components/nav'
import { routerRedux } from 'dva/router'
import { SegmentedControl, WingBlank, WhiteSpace, List, SearchBar } from 'components'
import Banner from 'components/banner/index'
import Iframes from 'components/ifream'
import Menu from 'components/menu/index'
import {layoutRow} from 'components/row'
import ListView from 'components/listview'
import styles from './index.less'

const PrefixCls = 'lanmusub',
  Item = List.Item,
  Brief = Item.Brief

function Comp ({ location, dispatch, lanmusub }) {
  const { bannerDatas, lists, name = '',paginations, scrollerTop } = lanmusub,
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
    },
    handleGridClick = ({ pathname, ...others }) => {
      dispatch(routerRedux.push({
        pathname: `/${pathname}`,
        query: {
          ...others,
        },
      }))
    },
    onRefresh = (callback) => {
      dispatch({
        type: `${PrefixCls}/queryListview`,
        payload: {
          callback,
          isRefresh:true
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
      if (typeof top !='undefined'&& !isNaN(top * 1))
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
          <ListView layoutHeader={''} dataSource={lists} layoutRow={(rowData, sectionID, rowID) => layoutRow(rowData, sectionID, rowID, handleItemOnclick)}
                    onEndReached={onEndReached}
                    onRefresh={onRefresh} hasMore={hasMore}
                    onScrollerTop={onScrollerTop.bind(null)}
                    scrollerTop={scrollerTop}
          />
        )

      return result
    },
    bannerProps = {
      datas: bannerDatas,
      handleClick: handleItemOnclick,
    },
    handleSearchClick = ({id = ''}) => {
      dispatch(routerRedux.push({
        pathname: `/search`,
        query: {
          router: PrefixCls,
          id
        },
      }))
    }
  return (
    <div>
      <Nav title={name} dispatch={dispatch}/>
      <SearchBar
        placeholder={`在${name || '此页面'}中搜索`}
        maxLength={20}
        onFocus={handleSearchClick.bind(this, lanmusub)}
      />
      {bannerDatas.length > 0 && <Banner {...bannerProps} />}
      <WhiteSpace size="xs"/>
      {lists.length > 0 && getContents(lists)}
    </div>
  )
}

export default connect(({ loading, lanmusub }) => ({
  loading,
  lanmusub,
}))(Comp)

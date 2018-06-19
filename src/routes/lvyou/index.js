import React from 'react'
import {connect} from 'dva'
import Nav from 'components/nav'
import {routerRedux} from 'dva/router'
import {SegmentedControl, WingBlank, WhiteSpace, List, SearchBar} from 'antd-mobile'
import Banner from 'components/banner/index'
import {layoutRow} from 'components/row'
import ListView from 'components/listview'
import Menu from 'components/menu/index'
import styles from './index.less'

const PrefixCls = 'lvyou',
  Item = List.Item,
  Brief = Item.Brief

function Lvyou({location, dispatch, lvyou}) {
  const {bannerDatas, lists, grids, name = '', isScroll, paginations, scrollerTop} = lvyou,
    handleItemOnclick = ({externalUrl = '', id = '', pathname = 'details'}) => {
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
          pathname: `/${pathname}`,
          query: {
            name,
            dataId: id,
          },
        }))
      }
    },
    handleGridClick = ({pathname, title, externalUrl = '', ...others}) => {
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
          pathname: `/${pathname}`,
          query: {
            name: title,
            ...others,
          },
        }))
      }
    },
    handleScroll = (e) => {
      if (e.target) {
        const scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop),
          curScroll = scrollTop > 0
        if (isScroll != curScroll) {
          dispatch({
            type: 'lvyou/updateState',
            payload: {
              isScroll: curScroll,
            },
          })
        }
      }
    },
    onRefresh = (params, callback) => {

      dispatch({
        type: `${PrefixCls}/queryListview`,
        payload: {
          ...params,
          callback,
          isRefresh: true
        }
      })
    },
    onEndReached = (params, callback) => {

      dispatch({
        type: `${PrefixCls}/queryListview`,
        payload: {
          ...params,
          callback
        }
      })
    },
    onScrollerTop = (top) => {
      if (top && !isNaN(top * 1))
        dispatch({
          type: `${PrefixCls}/updateState`,
          payload: {
            scrollerTop: top
          }
        })
    },
    getContents = (lists) => {
      const result = [], {title = '', id = '', items = []} = lists
      if (title != '' && items.length > 0) {

        const {current, total, size} = paginations,
          hasMore = (total > 0) && ((current > 1 ? current - 1 : 1) * size < total)

        result.push(
          <ListView layoutHeader={() => title} dataSource={items}
                    layoutRow={(rowData, sectionID, rowID) => layoutRow(rowData, sectionID, rowID, handleItemOnclick)}
                    onEndReached={onEndReached.bind(null, {id, title})}
                    onRefresh={onRefresh.bind(null, {id, title})} hasMore={hasMore}
                    onScrollerTop={onScrollerTop.bind(null)}
                    scrollerTop={scrollerTop}
          />
        )
      }
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
    <div onTouchStart={handleScroll} onTouchEnd={handleScroll}>
      <Nav title={name} dispatch={dispatch}/>
      <WhiteSpace size="md"/>
      <SearchBar
        placeholder={`在${name || '此页面'}中搜索`}
        maxLength={20}
        onFocus={handleSearchClick.bind(this, lvyou)}
      />
      {bannerDatas.length > 0 && <Banner {...bannerProps} />}
      <WhiteSpace size="sm"/>
      {grids.length > 0 && <Menu handleGridClick={handleGridClick} datas={grids}/>}
      <WhiteSpace size="sm"/>
      {lists.length > 0 && getContents(lists[0])}
    </div>
  )
}

export default connect(({loading, lvyou}) => ({
  loading,
  lvyou,
}))(Lvyou)

import React from 'react'
import {connect} from 'dva'
import Nav from 'components/nav'
import {routerRedux} from 'dva/router'
import {SegmentedControl, WingBlank, WhiteSpace, List, SearchBar} from 'components'
import Banner from 'components/banner/index'
import {layoutRow} from 'components/row'
import ListView from 'components/listview'
import Menu from 'components/menu/index'
import styles from './index.less'

const PrefixCls = 'deren',
  Item = List.Item,
  Brief = Item.Brief

function Comp({location, dispatch, deren}) {
  const {bannerDatas, lists, grids, name = '', paginations, scrollerTop} = deren,
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
    handleGridClick = ({pathname, title, ...others}) => {
      dispatch(routerRedux.push({
        pathname: `/${pathname}`,
        query: {
          name: title,
          ...others,
        },
      }))
    },

    // layoutRow = (rowData, sectionID, rowID) => {
    //   const {title = '', image = '', time = ''} = rowData
    //   return <Item className={styles[`${PrefixCls}-item`]}
    //                key={`${PrefixCls}-${sectionID}-${rowID}`}
    //                thumb={image || ''} multipleLine wrap arrow='horizontal'
    //                onClick={handleItemOnclick.bind(null, rowData)}>
    //     <span>{title}</span>
    //     <Brief>{time}</Brief>
    //   </Item>
    // },

    onRefresh = (params, callback) => {
      console.log(`${PrefixCls}-onRefresh`)
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
      console.log(`${PrefixCls}-onEndReached`)
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
          <ListView layoutHeader={() =>title} dataSource={items} layoutRow={(rowData, sectionID, rowID) => layoutRow(rowData, sectionID, rowID, handleItemOnclick)}
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
    }
  return (
    <div>
      <Nav title={name} dispatch={dispatch}/>
      {bannerDatas.length > 0 && <Banner {...bannerProps} />}
      <WhiteSpace size="sm"/>
      {grids.length > 0 && <Menu handleGridClick={handleGridClick} datas={grids} columnNum={4}/>}
      <WhiteSpace size="sm"/>
      {lists.length > 0 && getContents(lists[0])}
    </div>
  )
}

export default connect(({loading, deren}) => ({
  loading,
  deren,
}))(Comp)

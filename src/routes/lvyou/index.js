import React from 'react'
import { connect } from 'dva'
import Nav from 'components/nav'
import { routerRedux } from 'dva/router'
import { SegmentedControl, WingBlank, WhiteSpace, List, SearchBar } from 'antd-mobile'
import Banner from 'components/banner/index'
import PullToRefresh from 'components/pulltorefresh'
import Menu from 'components/menu/index'
import styles from './index.less'

const PrefixCls = 'lvyou',
  Item = List.Item,
  Brief = Item.Brief

function Lvyou ({ location, dispatch, lvyou }) {
  const { bannerDatas, lists, grids, name = '', isScroll } = lvyou,
    handleItemOnclick = ({ externalUrl = '', id = '', pathname = 'details' }) => {
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
    handleGridClick = ({ pathname, title, externalUrl = '', ...others }) => {
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
    getContents = (lists = []) => {
      const result = []
      lists.map((list, i) => {
        const { title = '', items = [] } = list
        if (title != '' && items.length > 0) {
          result.push(
            <List renderHeader={() => title}>
              {items.map((it, j) =>
                <Item className={styles[`${PrefixCls}-item`]}
                      thumb={it.image || ''} multipleLine wrap arrow='horizontal'
                      onClick={handleItemOnclick.bind(null, it)}>
                  <span>{it.title}</span> <Brief>{it.time}</Brief>
                </Item>)
              }
            </List>,
          )
        }
      })
      return result
    },
    bannerProps = {
      datas: bannerDatas,
      handleClick: handleItemOnclick,
    }

  return (
    <div onTouchStart={handleScroll} onTouchEnd={handleScroll}>
      <Nav title={name} dispatch={dispatch}/>
      <WhiteSpace size="md"/>
      <SearchBar
        placeholder="输入需要搜索的内容"
        onSubmit={value => console.log(value, 'onSubmit')}
        onClear={value => console.log(value, 'onClear')}
        onFocus={() => console.log('onFocus')}
        onBlur={() => console.log('onBlur')}
        onCancel={() => console.log('onCancel')}
        showCancelButton
        onChange={() => console.log('onChange')}
      />
      {bannerDatas.length > 0 && <Banner {...bannerProps} />}
      <WhiteSpace size="sm"/>
      {grids.length > 0 && <Menu handleGridClick={handleGridClick} datas={grids}/>}
      <WhiteSpace size="sm"/>
      {isScroll ?
        getContents(lists) :
        <PullToRefresh sibilingsHasBanner={true} autoHeight children={
          getContents(lists)
        }/>}
    </div>
  )
}

export default connect(({ loading, lvyou }) => ({
  loading,
  lvyou,
}))(Lvyou)

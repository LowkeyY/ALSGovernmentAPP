import React from 'react'
import { connect } from 'dva'
import Nav from 'components/nav'
import { routerRedux } from 'dva/router'
import { SegmentedControl, WingBlank, WhiteSpace, List, SearchBar } from 'components'
import Banner from 'components/banner/index'
import Menu from 'components/menu/index'
import styles from './index.less'

const PrefixCls = 'deren',
  Item = List.Item,
  Brief = Item.Brief

function Comp ({ location, dispatch, deren }) {
  const { bannerDatas, lists, grids, name = '' } = deren,
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
    handleGridClick = ({ pathname, title, ...others }) => {
      dispatch(routerRedux.push({
        pathname: `/${pathname}`,
        query: {
          name: title,
          ...others,
        },
      }))
    },
    getContents = (lists) => {
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
    <div>
      <Nav title={name} dispatch={dispatch}/>
      {bannerDatas.length > 0 && <Banner {...bannerProps} />}
      <WhiteSpace size="sm"/>
      {grids.length > 0 && <Menu handleGridClick={handleGridClick} datas={grids} columnNum={4}/>}
      <WhiteSpace size="sm"/>
      {lists.length > 0 && getContents(lists)}
    </div>
  )
}

export default connect(({ loading, deren }) => ({
  loading,
  deren,
}))(Comp)

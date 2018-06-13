import React from 'react'
import { connect } from 'dva'
import Nav from 'components/nav'
import { routerRedux } from 'dva/router'
import { SegmentedControl, WingBlank, WhiteSpace, List, SearchBar } from 'antd-mobile'
import Banner from 'components/banner/index'
import Iframes from 'components/ifream'
import Menu from 'components/menu/index'
import styles from './index.less'

const PrefixCls = 'lanmusub',
  Item = List.Item,
  Brief = Item.Brief

function Comp ({ location, dispatch, lanmusub }) {
  const { bannerDatas, lists, name = '' } = lanmusub,
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
    getContents = (lists) => {
      const result = []
      lists.map((it, i) => {
        const { id = '' } = it
        if (id != '') {
          result.push(
            <Item className={styles[`${PrefixCls}-item`]}
                  thumb={it.image || ''} multipleLine wrap arrow='horizontal'
                  onClick={handleItemOnclick.bind(null, it)}>
              <span>{it.title}</span> <Brief>{it.time}</Brief>
            </Item>)
        }
      })
      return result.length > 0 ? <List>{result}</List> : ''
    },
    bannerProps = {
      datas: bannerDatas,
      handleClick: handleItemOnclick,
    }

  return (
    <div>
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
      {lists.length > 0 && getContents(lists)}
    </div>
  )
}

export default connect(({ loading, lanmusub }) => ({
  loading,
  lanmusub,
}))(Comp)

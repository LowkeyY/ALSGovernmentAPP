import React from 'react'
import { connect } from 'dva'
import Nav from 'components/nav'
import { routerRedux } from 'dva/router'
import { SegmentedControl, WingBlank, WhiteSpace, List } from 'components'
import { getImages } from 'utils'
import { Layout } from 'components'
import Banner from 'components/banner'
import SearchHeader from 'components/searchheader'
import styles from './index.less'

const PrefixCls = 'ecology',
  Item = List.Item,
  Brief = Item.Brief

function Ecology ({ location, dispatch, ecology }) {
  const { name = '' } = location.query,
    { banners, data, lists } = ecology, { BaseLine } = Layout,
    getBannerDatas = (bannerDatas) => {
      bannerDatas && bannerDatas.map(item => {
        item.url = item.image
      })
      return bannerDatas
    },
    handleBannerClick = () => {

    },

    handleItemClick = ({ id, pathname = 'lanmusub', title, externalUrl = '', ...others }) => {
      console.log(others)
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
            id,
            ...others,
          },
        }))
      }
    },
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
    getContents = (lists = []) => {
      const result = []
      lists.map((list, i) => {
        const { title = '', items = [] } = list
        if (title != '' && items.length > 0) {
          result.push(
            <List key={list.id} renderHeader={() => title}>
              {items.map((it, j) =>
                <Item key={it.id} className={styles[`${PrefixCls}-item`]}
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
    getItemBox = (data = [], onClick) => {

      return <div>
        <div className={styles[`${PrefixCls}-itembox`]}>
          <div className={styles[`${PrefixCls}-itembox-left`]} onClick={onClick.bind(null, data[0])}>
            <img src={getImages(data[0] && data[0].image)} alt=""/>
            <span>{data[0] && data[0].title}</span>
          </div>
          <div className={styles[`${PrefixCls}-itembox-right`]}>
            <div className={styles[`${PrefixCls}-itembox-right-top`]} onClick={onClick.bind(null, data[1])}>
              <img src={getImages(data[1] && data[1].image)} alt=""/>
              <p>{data[1] && data[1].title}</p>
            </div>
            <div className={styles[`${PrefixCls}-itembox-right-bottom`]} onClick={onClick.bind(null, data[2])}>
              <img src={getImages(data[2] && data[2].image)} alt=""/>
              <p>{data[2] && data[2].title}</p>
            </div>
          </div>
        </div>
        <div className={styles[`${PrefixCls}-imgbox`]} onClick={onClick.bind(null, data[3])}>
          <img src={getImages(data[3] && data[3].image)} alt=""/>
        </div>
      </div>
    }
  return (
    <div>
      <Nav title={name} dispatch={dispatch}/>
      <WhiteSpace size="md"/>
      <SearchHeader children={<span style={{ color: 'green', fontSize: '16px' }}>绿色在线</span>}/>
      <Banner datas={getBannerDatas(banners)} handleClick={handleBannerClick}/>
      <div>{getItemBox(data, handleItemClick)}</div>
      <div>
        {getContents(lists)}
       </div>
      <BaseLine/>
    </div>
  )
}

export default connect(({ loading, ecology }) => ({
  loading,
  ecology,
}))(Ecology)

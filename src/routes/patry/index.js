import React from 'react'
import { connect } from 'dva'
import Nav from 'components/nav'
import { routerRedux } from 'dva/router'
import { WingBlank, WhiteSpace, List,Grid } from 'components'
import PullToRefresh from 'components/pulltorefresh'
import Menu from 'components/menu/index'
import { getImages } from 'utils'
import {layoutRow} from 'components/row'
import ListView from 'components/listview'
import Banner from 'components/banner/index'
import BannerBox from 'components/bannerbox/index'
import TitleBox from 'components/titlecontainer'
import styles from './index.less'

const Item = List.Item,
  Brief = Item.Brief
const PrefixCls = 'patry'


function Patry ({ location, dispatch, patry }) {
  const { name = '' } = location.query,
    { patryDate, patryList, isScroll,paginations, scrollerTop} = patry

  const getBannerDatas = () => {
      let bannerDatas = patryDate.slice(0, 4)
      bannerDatas.map(item => {
        item.url = item.image
      })
      return bannerDatas
    },
    getGridbox = () => {
      const GridboxDatas = patryDate.slice(4, 8)
      GridboxDatas.map((data, i) => {
        data.icon = data.image
        data.text = data.title
      })
      return GridboxDatas
    },
    getBannerBoxDatas = () => {
      let bannerDatas = patryDate.slice(8,patryDate.length-1)
      bannerDatas.map(item => {
        item.url = item.image
      })
      return bannerDatas
    },
    getFixBanner = () => {
      const bannerDatas = patryDate[patryDate.length - 1]
      if (bannerDatas) {
        return <div className={styles[`${PrefixCls}-fixbanner`]} onClick={handleFixBannerClick.bind(this, bannerDatas)}>
          <img src={getImages(bannerDatas.image)} alt=""/>
        </div>
      }
    },
      handleBannerClick = ({ id, title,route='lanmusub' }) => {
      dispatch(routerRedux.push({
        pathname: `/lanmusub`,
        query: {
          id,
          name: title,
        },
      }))
    },
    handleItemOnclick = ({externalUrl = '', id = '', route = 'details'}) => {
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
    handleGridbox = ({ id, title, route }) => {
      dispatch(routerRedux.push({
        pathname: `/${route}`,
        query: {
          id,
          name: title,
        },
      }))
    },

    handleFixBannerClick = ({ id, title, route=''}) => {
      dispatch(routerRedux.push({
        pathname: `/${route}`,
        query: {
          id,
          name: title,
        },
      }))

    },
    handleScroll = (e) => {
      if (e.target) {
        const ddst = document.documentElement.scrollTop,
          dbst = document.body.scrollTop,
          scrollTop = Math.max(ddst, dbst),
          curScroll = scrollTop > 0
        if (isScroll != curScroll) {
          dispatch({
            type: 'patry/updateState',
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
      if (typeof top !='undefined' && !isNaN(top * 1))
        dispatch({
          type: `${PrefixCls}/updateState`,
          payload: {
            scrollerTop: top
          }
        })
    },
    getContents = (patryList) => {
      const result = [], {title = '', id = '', items = []} = patryList
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
    }

  return (
    <div onTouchStart={handleScroll} onTouchEnd={handleScroll}>
      <Nav title={name} dispatch={dispatch}/>
      {getBannerDatas().length > 0 && <Banner datas={getBannerDatas()} handleClick={handleBannerClick}/>}
      <div className={styles[`${PrefixCls}-gridbox`]}>
        {
          getGridbox().length && getGridbox()
            .map((data, i) => {
              return <span key={data.id} onClick={handleGridbox.bind(this, data)}>
                <img src={data.image} alt=""/>
                <span>{data.title}</span>
              </span>
            })
        }
      </div>
      <div>{getFixBanner()}</div>
        <TitleBox title='专题学习'/>
      <div className={styles[`${PrefixCls}-bannerbox`]}>
        {getBannerBoxDatas().length > 0 && <BannerBox datas={getBannerBoxDatas()} handleClick={handleBannerClick}/>}
      </div>
      <div className={styles[`${PrefixCls}-container`]}>
        {patryList.length > 0 && getContents(patryList[0])}
      </div>
    </div>
  )
}

export default connect(({ loading, patry }) => ({
  loading,
  patry,
}))(Patry)

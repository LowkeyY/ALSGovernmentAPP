import React from 'react'
import { connect } from 'dva'
import Nav from 'components/nav'
import { routerRedux } from 'dva/router'
import { WingBlank, WhiteSpace } from 'antd-mobile'
import PatryItems from 'components/patryitems'
import Banner from 'components/banner/index'
import styles from './index.less'

const PrefixCls = 'patry'
const bannerData = [
  { url: require('themes/images/banner/banner6.jpg') },
  { url: require('themes/images/banner/banner6.jpg') },
  { url: require('themes/images/banner/banner6.jpg') },
]

const meun = [
  { name: '大宣讲', isArticle: 0, url: require('themes/images/patry/dxc.jpg') },
  { name: '大调研', isArticle: 1, url: require('themes/images/patry/ddy.jpg') },
  { name: '大落实', isArticle: 2, url: require('themes/images/patry/dls.jpg') },
]


function Patry ({ location, dispatch, patry }) {
  const { name = '' } = location.query

  const handleClick = ({ name, isArticle }) => {
    dispatch(routerRedux.push({
      pathname: 'patrylist',
      query:{
        name,
        theIndex: isArticle,
      }
    }))
  },
    handleBannerClick = (id) => {
      alert(id)
    }


  return (
    <div>
      <Nav title={name} dispatch={dispatch}/>
      <Banner datas={bannerData} handleClick={handleBannerClick}/>
      <div className={styles[`${PrefixCls}-container`]}>
        {meun && meun.map((data) => {
          return <PatryItems {...data} handle={handleClick.bind(null, data)}/>
        })}
      </div>
    </div>
  )
}

export default connect(({ loading, patry }) => ({
  loading,
  patry,
}))(Patry)

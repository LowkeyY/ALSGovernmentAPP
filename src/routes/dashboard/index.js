import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { routerRedux, Link } from 'dva/router'
import { Layout, WhiteSpace, Icon, List } from 'components'
import Menu from 'components/menu/index'
import styles from './index.less'
import { getLocalIcon } from 'utils'
import Banner from 'components/banner/index'
//import Banner from 'components/banner2/index'
import PullToRefresh from 'components/pulltorefresh'
import NoticeBar from 'components/cunovsnoticebar'

const PrefixCls = 'dashboard',
  Item = List.Item,
  Brief = List.Brief

function Dashboard ({ dashboard, loading, dispatch, app }) {
  const { Header, BaseLine } = Layout,
    headerProps = {
      dispatch,
    }, { bannerData, noticeDate, isScroll, grids } = dashboard, { isLogin } = app
  const handleGridClick = (pathname, name) => {//切换路由
      dispatch(routerRedux.push({
        pathname: `/${pathname}`,
        query: {
          name: name,
        },
      }))
    },
    handleNoticeClick = (id) => {
      alert(id)
    },
    handleImgClick = (id) => {
      alert(id)
    },
    handleBannerClick = (id) => {
      alert(id)
    },
    bannerProps = {
      datas: bannerData,
      handleImgClick: handleImgClick,
      handleClick: handleBannerClick,
    },
    handleScroll = (e) => {
      if (e.target) {
        const ddst = document.documentElement.scrollTop,
          dbst = document.body.scrollTop,
          scrollTop = Math.max(ddst, dbst),
          curScroll = scrollTop > 0
        if (isScroll != curScroll) {
          dispatch({
            type: 'dashboard/updateState',
            payload: {
              isScroll: curScroll,
            },
          })
        }
      }
    },
    getContent = () => {
      const childrens = [],
        result = []
      Array.from(new Array(20))
        .map((val, i) => {
          childrens.push(
            <Item arrow="horizontal" multipleLine>
              {`Title${i}`}
            </Item>,
          )
        })
      result.push(
        <Menu handleGridClick={handleGridClick} datas={grids}/>,
      )
/*      result.push(
        <List renderHeader={() => 'Basic Style'}>
          {childrens}
        </List>,
      )*/
      return result
    }
  return (
    <div className={styles[`${PrefixCls}-outer`]} onTouchStart={handleScroll} onTouchEnd={handleScroll}>
      <div className={styles[`${PrefixCls}-top`]}>
        <Header dispatch={dispatch} isLogin={isLogin}/>
        <WhiteSpace size="sm"/>
        {bannerData.length > 0 && <Banner {...bannerProps} />}
        <WhiteSpace size="sm"/>
        {noticeDate.length > 0 && <NoticeBar datas={noticeDate} handleClick={handleNoticeClick}/>}
      </div>
      <WhiteSpace size="sm"/>
      {isScroll ?
        getContent() :
        <PullToRefresh sibilingsHasBanner={true} children={
          getContent()
        }/>}
    </div>
  )
}

Dashboard.propTypes = {
  dashboard: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ dashboard, loading, app }) => ({ dashboard, loading, app }))(Dashboard)

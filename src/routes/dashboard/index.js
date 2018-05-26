import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { routerRedux, Link } from 'dva/router'
import { Layout ,WhiteSpace, Icon} from 'components'
import Menu from 'components/menu/index'
import styles from './index.less'
import { getLocalIcon } from 'utils'
import Banner from 'components/banner/index'
// import Banner2 from 'components/banner2/index'
import PullToRefresh from 'components/pulltorefresh'
import NoticeBar from 'components/cunovsnoticebar'

const PrefixCls = 'dashboard'

function Dashboard ({ dashboard, loading, dispatch, app }) {
  const { Header } = Layout,
    headerProps = {
      dispatch,
    }, { bannerData,noticeDate } = dashboard, { isLogin } = app;
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
    handleImgClick = (id) =>{
     alert(id)
  },
    handleBannerClick = (id) => {
     alert(id)
    }


  return (
    <div className={styles[`${PrefixCls}-outer`]}>
      <div className={styles[`${PrefixCls}-top`]}>
        <Header dispatch={dispatch} isLogin={isLogin}/>
        <WhiteSpace size="sm"/>
        <Banner datas={bannerData} handleImgClick={handleImgClick} handleClick={handleBannerClick}/>
        <WhiteSpace size="sm"/>
        <NoticeBar datas={noticeDate} handleClick={handleNoticeClick}/>
      </div>
      <WhiteSpace size="sm"/>
      <PullToRefresh children={
        <Menu handleGridClick={handleGridClick}/>
      }/>
    </div>
  )
}

Dashboard.propTypes = {
  dashboard: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ dashboard, loading, app }) => ({ dashboard, loading, app }))(Dashboard)

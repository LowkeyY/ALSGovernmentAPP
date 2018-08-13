import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { routerRedux, Link } from 'dva/router'
import { Layout, WhiteSpace, Icon, List } from 'components'
import Menu from 'components/menu/index'
import styles from './index.less'
import { getLocalIcon } from 'utils'
import Banner from 'components/banner/index'
import PullToRefresh from 'components/pulltorefresh'
import NoticeBar from 'components/cunovsnoticebar'
import HeadLine from 'components/headline'

const PrefixCls = 'dashboard',
  Item = List.Item,
  Brief = List.Brief

function Dashboard ({ dashboard, loading, dispatch, app }) {
  const { Header, BaseLine } = Layout,
    headerProps = {
      dispatch,
    }, { bannerDatas, noticeDatas, isScroll, grids,selectedIndex=0 } = dashboard, { isLogin } = app
  const handleGridClick_2 = ({ pathname, ...others }) => {//切换路由
      others.id = '25536211-52fd-4f66-b235-6d7a27b49f00'
      others.name = '守护'
      dispatch(routerRedux.push({
        pathname: `/lanmutabshouhu`,
        // pathname: `/${pathname}`,
        query: {
          ...others,
        },
      }))
    },
    handleGridClick = ({ pathname, ...others }) => {
      dispatch(routerRedux.push({
        pathname: `/${pathname}`,
        query: {
          ...others,
        },
      }))
    },
    handleDataClick = (data) => {
      dispatch(routerRedux.push({
        pathname: '/details',
        query: {
          dataId: data.id,
          name: '阿拉善头条',
        },
      }))
    },
    handleImgClick = (data) => {
      console.log('handleImgClick', data)
    },
    headLineProps = {
      bannerDatas: bannerDatas,
      handleClick: handleDataClick,
      datas:noticeDatas,
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
            <Item key={i} arrow="horizontal" multipleLine>
              {`Title${i}`}
            </Item>
          )
        })
      result.push(
        <Menu handleGridClick={handleGridClick} datas={grids}/>,
      )

      return result
    }
  return (
    <div className={styles[`${PrefixCls}-outer`]} onTouchStart={handleScroll} onTouchEnd={handleScroll}>
      <div className={styles[`${PrefixCls}-top`]}>
        <Header dispatch={dispatch} isLogin={isLogin}/>
        <HeadLine {...headLineProps} dispatch={dispatch} selectedIndex={selectedIndex} />
        <WhiteSpace size="xs"/>
      </div>
      <WhiteSpace size="xs"/>
        <div className={styles[`${PrefixCls}-outer-content`]}>{getContent()}</div>
    </div>
  )
}

Dashboard.propTypes = {
  dashboard: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ dashboard, loading, app }) => ({ dashboard, loading, app }))(Dashboard)

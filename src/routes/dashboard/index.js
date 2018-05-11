import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import {WhiteSpace} from 'antd-mobile';
import { routerRedux , Link} from 'dva/router';
import { Layout } from 'components'
import Menu from 'components/menu/index'
import styles from './index.less';
import {getLocalIcon} from 'utils'
import Banner from 'components/banner/index';

const PrefixCls='dashboard'
function Dashboard({
  dashboard,loading,dispatch
}) {
  const {Header} = Layout
  ,headerProps = {
      dispatch
  }
  ,{bannerData}=dashboard;
  const handleGridClick=(pathname,name)=>{//切换路由
    dispatch(routerRedux.push({
      pathname: `/${pathname}`,
      query:{
        name:name
      }
    }));

  }
  return (
    <div className={styles[`${PrefixCls}-outer`]}>
      <div className={styles[`${PrefixCls}-top`]}>
        <Header/>
        <WhiteSpace size="sm"/>
        <Banner bannerData={bannerData}/>
      </div>
      <WhiteSpace size="sm"/>
       <Menu handleGridClick={handleGridClick}/>
    </div>
  );
}

Dashboard.propTypes = {
  dashboard: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ dashboard, loading }) => ({ dashboard, loading }))(Dashboard)

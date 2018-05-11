import React from 'react'
import {NavBar,Icon,Button,List} from 'antd-mobile';
import {routerRedux} from 'dva/router';
import styles from './index.less';

const PrefixCls='nav'

function Nav(props) {

  const goBack = () => {
    props.dispatch(routerRedux.goBack())
  }
  return(
    <div>
      <div className={styles[`${PrefixCls}-header-box`]}>
        <div className={styles[`${PrefixCls}-header`]}>
          <NavBar
            leftContent="返回"
            onLeftClick={goBack}
            mode="dark"
            icon={<Icon type="left" />}
            rightContent={props.renderNavRight}
          >{props.title}</NavBar>
        </div>
      </div>
    </div>
  )
  Static.propTypes = {
    dispatch: PropTypes.func.isRequired,
    renderNavRight:PropTypes.func.isRequired
  };
  Static.defaultProps={
    renderNavRight:null,
    title:''
  }
}
export default Nav

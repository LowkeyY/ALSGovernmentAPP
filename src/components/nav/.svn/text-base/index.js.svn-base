import React from 'react'
import {NavBar,Icon,Button,List} from 'antd-mobile';
import {routerRedux} from 'dva/router';
import styles from './index.less';

const PrefixCls='nav'

function Nav(props) {

  const goBack = () => {
    props.dispatch(routerRedux.goBack())
    if(typeof props.navEvent ==='function'){
      props.navEvent()
  }
  }
  return(
    <div>
      <div className={styles[`${PrefixCls}-header-box`]}>
        <div className={styles[`${PrefixCls}-header`]}>
          <NavBar
            style={{background:props.color}}
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
    title:'',
    color:'#4eaaf7',
    navEvent:null
  }
}
export default Nav

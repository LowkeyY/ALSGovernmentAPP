import React from 'react';
import { Icon, Popover } from 'antd-mobile';
import { getImages, getLocalIcon } from 'utils';
import { routerRedux } from 'dva/router';
import styles from './header.less';

const PrefixCls = 'header';

class Header extends React.Component {
  state = {};

  handlerLogin () { // 登录
    this.props.dispatch(
      routerRedux.push({
        pathname: 'login',
      }),
    );
  }

  handlerGoMine () { // 退出登录
    this.props.dispatch(
      routerRedux.push({
        pathname: '/mine',
      }),
    );
  }

  renderLoginView (onClick) {
    return (
      <div onClick={onClick}>
        <img src={getImages(this.props.useravatar, 'user')} alt=""/>
      </div>
    );
  }

  renderNotLoginView (onClick) {
    return (
      <div className={styles[`${PrefixCls}-notlogin`]} onClick={onClick}>
        <Icon type={getLocalIcon('/dashboard/login.svg')} size="lg"/>
        登录
      </div>
    );
  }

  render () {
    const isLogin = this.props.isLogin;
    return (
      <div className={styles[`${PrefixCls}-logo-outer`]}>
        <img src={require('themes/images/logo.png')} alt=""/>
        <div className={styles[`${PrefixCls}-logo-user`]}>
          {
            isLogin ? this.renderLoginView(this.handlerGoMine.bind(this)) : this.renderNotLoginView(this.handlerLogin.bind(this))
          }
        </div>
      </div>
    );
  }
}

export default Header;


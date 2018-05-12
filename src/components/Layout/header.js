import React from 'react';
import styles from './header.less';
import {Icon, Popover} from 'antd-mobile';
import {getLocalIcon} from 'utils';
import { routerRedux, Link } from 'dva/router';

const PrefixCls = 'header', Item = Popover.Item;


class Header extends React.Component {

  state = {
    visible: false,
    selected: '',
  };



  onSelect = (opt) => {
    this.setState({
      visible: false,
      selected: opt.props.value,
    });
   switch (opt.props.value){
     case 0 : return;

     case 1 : this.handlerLoginOut()


   }
  };
  handleVisibleChange = (visible) => {
    this.setState({
      visible,
    });
  };

  handlerLogin (){ //登录
    this.props.dispatch(
      routerRedux.push({
        pathname:'login'
    })
    )
  }

  handlerLoginOut(){ //退出登录
    this.props.dispatch({
      type:'app/updateState',
      payload:{
        isLogin:false
      }
    })
  }

  renderLoginView() {
    let offsetX = -10;
    if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
      offsetX = -26;
    }
    return (
      <Popover mask
               overlayClassName="fortest"
               overlayStyle={{color: 'currentColor'}}
               visible={this.state.visible}
               overlay={[
                 (<Item key="4" value={0} data-seed="logId">
                   <div className={styles[`${PrefixCls}-iconbox`]}>
                     <Icon type={getLocalIcon('/dashboard/info.svg')}
                           size="sm"/>
                     <span>个人信息</span>
                   </div>
                 </Item>),
                 (<Item key="5" value={1} style={{whiteSpace: 'nowrap'}}>
                   <div className={styles[`${PrefixCls}-iconbox`]}>
                     <Icon type={getLocalIcon('/dashboard/loginout.svg')}
                           size="sm"/>
                     <span>退出登录</span>
                   </div>
                 </Item>),
               ]}
               align={{
                 overflow: {adjustY: 0, adjustX: 0},
                 offset: [offsetX, 15],
               }}
               onVisibleChange={this.handleVisibleChange}
               onSelect={this.onSelect}
      >
        <div style={{
          height: '100%',
          padding: '0 0.3rem',
          marginRight: '-0.3rem',
          display: 'flex',
          alignItems: 'center',
        }}
        >
          <Icon type={getLocalIcon('/dashboard/logined.svg')} size="lg"/>
        </div>
      </Popover>
    )
  }

  renderNotLoginView(onClick){
    return (
       <div className={styles[`${PrefixCls}-notlogin`]} onClick={onClick}>
         <Icon type={getLocalIcon('/dashboard/login.svg')} size="lg"/>
            登录
       </div>
    )
  }
  render() {
    const isLogin = this.props.isLogin

    return (
      <div className={styles[`${PrefixCls}-logo-outer`]}>
        <div className={styles['logo-box']}>
          <img src={require('themes/images/logo.png')} alt=""/>
          <span>
            {
              isLogin ? this.renderLoginView() : this.renderNotLoginView(this.handlerLogin.bind(this))
            }

      </span>
        </div>
      </div>
    );
  }

}

export default Header;


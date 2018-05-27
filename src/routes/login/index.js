import React from 'react';
import PropTypes from 'prop-types';
import {createForm} from 'rc-form';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {InputItem, WhiteSpace, WingBlank, Button, Flex, Toast, ActivityIndicator,Icon} from 'components';
import { getLocalIcon } from 'utils'
import {config} from 'utils';
import {_cg} from 'utils/cookie';
import styles from './index.less';
import user from 'themes/images/login/user.png'
import pwd from 'themes/images/login/锁.png'
import img from 'themes/images/login/loginicon.png'
import bg from 'themes/images/login/loginbg.png'

const PrefixCls = "login"

class Login extends React.Component {

  constructor(props) {
    super()
    this.state = {}

  }

  onSubmit = () => {
    this.props.form.validateFields({
      force: true
    }, (error) => {
      if (!error) {
        this.props.dispatch({
          type: 'login/login',
          payload: {
            ... this.props.form.getFieldsValue()
          }
        })
      } else {
        Toast.fail("请确认信息是否正确", 3);
      }
    });
  }

  moveInput = () => {//解决android键盘挡住input
    this.refs.span.scrollIntoView(true)
  }
  handlerVisitorsLogin=() => {
    this.props.dispatch(
      routerRedux.push({
        pathname:'/'
      })
    )
  }

  render() {
    console.log(this.props.login.buttonState)
    const {getFieldProps, getFieldError} = this.props.form,
      userKey = "usrMail",
      powerKey = "usrPwd";
    return (
      <div className={styles[`${PrefixCls}-container`]} style={{backgroundImage: "url(" + bg + ")"}}>
        <div className={styles[`${PrefixCls}-form`]}>
          <form ref="form">
            <WingBlank size="md">
              <InputItem placeholder="用户名"
                         onFocus={this.moveInput.bind(this)}
                         {...getFieldProps(userKey, {
                           initialValue: _cg(userKey), rules: [{required: true, message: '用户名必须输入'}, {
                             min: 2, message:
                               '用户名小于2个字符'
                           }]
                         })} clear error={!!getFieldError(userKey)} onErrorClick={() => {
                Toast.fail(getFieldError(userKey));
              }}>
                <div style={{
                  backgroundImage: 'url(' + user + ')',
                  backgroundSize: 'cover',
                  height: '22px',
                  width: '22px'
                }}/>
              </InputItem>
            </WingBlank>
            <WingBlank size="md">
              <WhiteSpace size="sm"/>
              <InputItem
                type="password"
                placeholder="密码"
                onFocus={this.moveInput.bind(this)}
                {...getFieldProps(powerKey, {
                  initialValue: this.props.login.loadPwd, rules: [{required: true, message: '密码必须输入'}, {
                    min: 1, message:
                      '密码小于1个字符'
                  }]
                })}
                clear
                error={!!getFieldError(powerKey)}
                onErrorClick={() => {
                  Toast.fail(getFieldError(powerKey));
                }}>
                <div style={{
                  backgroundImage: 'url(' + pwd + ')',
                  backgroundSize: 'cover',
                  height: '22px',
                  width: '22px'
                }}/>
              </InputItem>
              <WhiteSpace size="lg"/>
              <WhiteSpace size="lg"/>
            </WingBlank>
            <WingBlank size="md">
              {
                this.props.login.buttonState ? (
                  <Button type="primary"  className="am-button-borderfix"
                          onClick={this.onSubmit.bind(this)}>
                    登录
                  </Button>
                ) : <Button loading type="primary" className="am-button-borderfix" disabled={true}>
                  <span style={{color: '#108ee9'}}>登录中...</span>
                </Button>
              }
            </WingBlank>
            <span ref="span"></span>
            <WhiteSpace size="lg"/>
            <WingBlank size="md">
              <Flex>
                <Flex.Item>
                  <Button type="ghost" className="am-button-borderfix">
                    <span style={{color: '#108ee9'}}>注册</span>
                  </Button>
                </Flex.Item>
                <Flex.Item>
                  <Button type="ghost" className="am-button-borderfix" onClick={this.handlerVisitorsLogin}>
                    <span style={{color: '#108ee9'}}>返回</span>
                  </Button>
                </Flex.Item>
              </Flex>
            </WingBlank>
          </form>
          <div className={styles[`${PrefixCls}-phonelogin`]}>
            <Icon type={getLocalIcon('/others/phone.svg')} size='md'/>
            <span>手机验证码登录</span>
          </div>
        </div>
      </div>
    )
  }
};


export default connect(({login, loading, agreement, app}) => ({
  login,
  loading,
  agreement,
  app
}))(createForm()(Login));

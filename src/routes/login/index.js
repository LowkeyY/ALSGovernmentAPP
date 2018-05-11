import React from 'react';
import PropTypes from 'prop-types';
import {createForm} from 'rc-form';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {InputItem, WhiteSpace, WingBlank, Button, Checkbox, Flex, Toast,ActivityIndicator } from 'antd-mobile';
import {config} from 'utils';
import {_cg} from 'utils/cookie';
import styles from './index.less';
import user from 'themes/images/login/user.png'
import pwd from 'themes/images/login/锁.png'
import img from 'themes/images/login/loginicon.png'
import bg from 'themes/images/login/loginbg.png'
const PrefixCls = "login" , AgreeItem = Checkbox.AgreeItem

class Login extends React.Component {
  // const handleLogin = () =>{
  //   dispatch(routerRedux.push({pathname:"/"}))
  // };
  // const handleDisabled =()=>{
  //   dispatch({
  //     type:'login/disabled'
  //   });
  //   return login
  // };
  constructor(props) {
    super()
    this.state = {
      isAgreement: true,
    }

  }

  handleDisabled() {
    this.setState({
      isAgreement: !this.state.isAgreement
    })
  }

  onSubmit = () => {
    this.props.form.validateFields({
      force: true
    }, (error) => {
      if (!error) {
        this.props.dispatch({
          type: 'login/login',
          payload:{
            ... this.props.form.getFieldsValue()
          }
        })
      } else {
        Toast.fail("请确认信息是否正确", 3);
      }
    });
  }
  goAgreement=(e)=>{
    this.props.dispatch(
      routerRedux.push({
        pathname: "/agreement",
      })
    )
  }
  moveInput = () => {//解决android键盘挡住input
    this.refs.span.scrollIntoView(true)
  }

  render() {
    const {getFieldProps, getFieldError} = this.props.form,
      userKey = "usrMail",
      powerKey = "usrPwd";
    return (
      <div className={styles[`${PrefixCls}-container`]} style={{backgroundImage:"url("+bg+")"}}>
        <div className={styles[`${PrefixCls}-form`]}>
          <form ref="form">
            <WingBlank size="lg">
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
            <WingBlank size="lg">
              <WhiteSpace size="sm"/>
              <InputItem
                type="password"
                placeholder="密码"
                onFocus={this.moveInput.bind(this)}
                {...getFieldProps(powerKey, {
                  initialValue:this.props.login.loadPwd, rules: [{required: true, message: '密码必须输入'}, {
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
              <WhiteSpace size="sm"/>
              <div className={styles[`${PrefixCls}-check`]}>
                <Flex>
                  <Flex.Item>
                    <AgreeItem data-seed="logId" onChange={this.handleDisabled.bind(this)}>
                            <span onClick={(e) => {
                              // e.preventDefault();
                            }}><span ref="span" className={styles[`${PrefixCls}-agreement`]}><span>我已阅读并同意</span></span>
                            </span>
                    </AgreeItem>
                  </Flex.Item>
                </Flex>
                <span className={styles[`${PrefixCls}-agreement-text`]}
                      onClick={this.goAgreement.bind(this)}
                >《用户保密协议》</span>
              </div>
              <WhiteSpace size="sm"/>
            </WingBlank>
            <WingBlank size="lg">
              {
                this.props.login.isLogin?(
                  <Button  type="primary" className="am-button-borderfix" disabled={this.state.isAgreement}
                            onClick={this.onSubmit.bind(this)}>
                    登录
                  </Button>
                ):<Button  loading type="ghost" className="am-button-borderfix" disabled={true}>
                  登录
                </Button>
              }
            </WingBlank>
          </form>
        </div>
      </div>
    )
  }
};


export default connect(({login, loading,agreement}) => ({
  login,
  loading,
  agreement
}))(createForm()(Login));

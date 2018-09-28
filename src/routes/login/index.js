import React from 'react';
import PropTypes from 'prop-types';
import { createForm } from 'rc-form';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { InputItem, WhiteSpace, WingBlank, Button, Toast, ActivityIndicator, Icon } from 'components';
import { getLocalIcon } from 'utils';
import { config } from 'utils';
import { _cg } from 'utils/cookie';
import styles from './index.less';
import user from 'themes/images/login/user.png';
import pwd from 'themes/images/login/锁.png';
import img from 'themes/images/login/loginicon.png';
import bg from 'themes/images/login/loginbg.png';
import phone from 'themes/images/login/phone.png';
import code from 'themes/images/login/code.png';

const PrefixCls = 'login';
let timer;

class Login extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      loginType: true,
      isCodeSending: false,
      count: 60,
      isDisabled: false,
    };
  }

  onSubmit = () => {
    this.props.form.validateFields({
      force: true,
    }, (error) => {
      if (!error) {
        this.props.dispatch({
          type: 'login/login',
          payload: {
            ...this.props.form.getFieldsValue(),
          },
        });
      } else {
        Toast.fail('请确认信息是否正确', 3);
      }
    });
  }
  onPhoneSubmit = () => {
    this.props.form.validateFields({
      force: true,
    }, (error) => {
      if (!error) {
        this.props.dispatch({
          type: 'login/PhoneLogin',
          payload: {
            ...this.props.form.getFieldsValue(),
          },
        });
      } else {
        Toast.fail('请确认信息是否正确', 3);
      }
    });
  }
  onValidateCodeClick= () => {
    this.props.form.validateFields(['phoneNum'], {
      force: true,

    }, (error) => {
      if (!error) {
        this.setState({
          isCodeSending: true,
          isDisabled: true,
        });
        this.startCountDown();
        this.props.dispatch({
          type: 'login/SendValidateCode',
          payload: {
            ...this.props.form.getFieldsValue(),
          },
        });
      } else {
        Toast.fail('请输入正确的手机号', 3);
      }
    });
  }
  moveInput = () => { // 解决android键盘挡住input
    this.refs.button.scrollIntoView(true);
  }

  handleBack = () => {
    this.props.dispatch(
      routerRedux.goBack()
    );
  }

  handleLogin = () => {
    this.setState({
      loginType: false,
    });
  }

  handlePhoneLogin = () => {
    this.setState({
      loginType: true,
    });
  }


  countDown = () => {
    this.setState({
      count: --this.state.count,
    });
    if (this.state.count < 1) {
      clearInterval(timer);
      this.setState({
        isCodeSending: false,
        isDisabled: false,
        count: 60,
      });
    }
  }
  startCountDown = () => {
    const that = this;
    timer = setInterval(() => {
      that.countDown();
    }, 1000);
  }


  render () {
    const { getFieldProps, getFieldError } = this.props.form,
      userKey = 'usrMail',
      powerKey = 'usrPwd',
      phoneKey = 'phoneNum',
      codeKey = 'inputCode';
    return (
      <div className={styles[`${PrefixCls}-container`]} style={{ backgroundImage: `url(${bg})` }}>
        <div className={styles[`${PrefixCls}-container-goback`]} onClick={this.handleBack}>
          <Icon type={getLocalIcon('/login/goback.svg')} />
        </div>
        {
          this.state.loginType
            ?
              <div className={styles[`${PrefixCls}-phoneform`]}>
              <form>
                  <WingBlank size="md">
                  <div className={styles[`${PrefixCls}-phoneform-phonebox`]}>
                      <InputItem
                      placeholder="手机号"
                      type="number"
                      onChange={this.phoneValidSuccess}
                      onFocus={this.moveInput.bind(this)}
                      {...getFieldProps(phoneKey, {
                        initialValue: _cg(phoneKey),
                        rules: [
                          { required: true, message: '手机号必须输入' },
                          { pattern: /^[1][3,4,5,7,8][0-9]{9}$/, message: '请输入正确的手机号' },
                        ],
                      })}
                      clear
                      error={!!getFieldError(phoneKey)}
                      onErrorClick={() => {
                        Toast.fail(getFieldError(phoneKey));
                      }}
                    >
                      <div style={{
                        backgroundImage: `url(${phone})`,
                        backgroundSize: 'cover',
                        height: '22px',
                        width: '22px',
                      }}
                        />
                    </InputItem>
                    </div>
                </WingBlank>
                  <WingBlank size="md">
                  <WhiteSpace size="sm" />
                  <div className={styles[`${PrefixCls}-phoneform-codebox`]}>
                      <InputItem
                      type="text"
                      placeholder="验证码"
                      onFocus={this.moveInput.bind(this)}
                      {...getFieldProps(codeKey, {
                        initialValue: this.props.login.loadPwd,
                        rules: [{ required: true, message: '验证码必须输入' }, {
                          min: 1,
                          message:
                            '验证码不小于4个字符',
                        }],
                      })}
                    >
                      <div style={{
                        backgroundImage: `url(${code})`,
                        backgroundSize: 'cover',
                        height: '22px',
                        width: '22px',
                      }}
                        />
                    </InputItem>
                      <div className={styles[`${PrefixCls}-codebox-button`]}>
                      <Button type="ghost"
                          inline
                          size="small"
                          style={{ marginRight: '4px', color: '#4eaaf7' }}
                          onClick={this.onValidateCodeClick}
                          disabled={this.state.isDisabled}
                        >
                          {
                          this.state.isCodeSending ?
                            <span>{`${this.state.count}s重新获取`}</span>
                            :
                            <span>获取验证码</span>
                        }
                        </Button>
                    </div>
                    </div>
                  <WhiteSpace size="lg" />
                </WingBlank>
                  <WingBlank size="md">
                  {
                    this.props.login.buttonState ? (
                      <Button type="primary"
                        className="am-button-borderfix"
                        onClick={this.onPhoneSubmit.bind(this)}
                      >
                        登录
                      </Button>
                    ) : <Button loading type="primary" className="am-button-borderfix" disabled>
                      <span style={{ color: '#fff' }}>登录中...</span>
                    </Button>
                  }
                </WingBlank>
                  <WhiteSpace size="lg" />
                  <WhiteSpace size="lg" />
                  <WhiteSpace size="lg" />
                  <WingBlank size="md" />
                  <div ref="button" className={styles[`${PrefixCls}-phonelogin`]} onClick={this.handleLogin}>
                  <Icon type={getLocalIcon('/login/user.svg')} size="md" />
                  <span>用户名密码登录</span>
                </div>
                </form>
            </div>
            :
            <div className={styles[`${PrefixCls}-form`]}>
                <form>
                <WingBlank size="md">
                    <InputItem placeholder="用户名"
                    name="phoneNum"
                    onFocus={this.moveInput.bind(this)}
                    {...getFieldProps(userKey, {
                      initialValue: _cg(userKey),
                      rules: [{ required: true, message: '用户名必须输入' }, {
                        min: 2,
                        message:
                                   '用户名小于2个字符',
                      }],
                    })}
                    clear
                    error={!!getFieldError(userKey)}
                    onErrorClick={() => {
                      Toast.fail(getFieldError(userKey));
                    }}
                  >
                    <div style={{
                      backgroundImage: `url(${user})`,
                      backgroundSize: 'cover',
                      height: '22px',
                      width: '22px',
                    }}
                      />
                  </InputItem>
                  </WingBlank>
                <WingBlank size="md">
                    <WhiteSpace size="sm" />
                    <InputItem
                    type="password"
                    placeholder="密码"
                    onFocus={this.moveInput.bind(this)}
                    {...getFieldProps(powerKey, {
                      initialValue: this.props.login.loadPwd,
                      rules: [{ required: true, message: '密码必须输入' }, {
                        min: 1,
                        message:
                          '密码小于1个字符',
                      }],
                    })}
                    clear
                    error={!!getFieldError(powerKey)}
                    onErrorClick={() => {
                      Toast.fail(getFieldError(powerKey));
                    }}
                  >
                    <div style={{
                      backgroundImage: `url(${pwd})`,
                      backgroundSize: 'cover',
                      height: '22px',
                      width: '22px',
                    }}
                      />
                  </InputItem>
                    <WhiteSpace size="lg" />
                  </WingBlank>
                <WingBlank size="md">
                    {
                    this.props.login.buttonState ? (
                      <Button type="primary"
                        className="am-button-borderfix"
                        onClick={this.onSubmit.bind(this)}
                      >
                        登录
                      </Button>
                    ) : <Button loading type="primary" className="am-button-borderfix" disabled>
                      <span style={{ color: '#fff' }}>登录中...</span>
                    </Button>
                  }
                  </WingBlank>
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <WingBlank size="md" />
                <div ref="button" className={styles[`${PrefixCls}-phonelogin`]} onClick={this.handlePhoneLogin}>
                    <Icon type={getLocalIcon('/login/phone.svg')} size="md" />
                    <WhiteSpace size="lg" />
                    <WhiteSpace size="lg" />
                    <WhiteSpace size="lg" />
                    <span>手机验证码登录</span>
                  </div>
              </form>
              </div>
        }

      </div>
    );
  }
}


export default connect(({ login, loading, app }) => ({
  login,
  loading,
  app,
}))(createForm()(Login));

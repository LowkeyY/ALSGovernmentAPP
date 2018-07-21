import React from 'react'
import ReactDOM from 'react-dom'
import {Icon} from 'components'
import {getLocalIcon} from 'utils'
import classNames from 'classnames'
import styles from './index.less'

const PrefixCls = 'sign'

class SignIn extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isSign:false
    }
  }
  getWeek = () =>{
    const week = "周" + "日一二三四五六".charAt(new Date().getDay());
    return week
  }
  componentWillMount () {

  }
  handleSignClick=() =>{
    this.setState({
      isSign:!this.state.isSign
    })
  }

  render () {
    return (
      <div className={styles[`${PrefixCls}-outer`]}>
        <div className={styles[`${PrefixCls}-outer-signbox`]}  onClick={this.handleSignClick}>
          <div className={styles[`${PrefixCls}-outer-signbox-week`]}>
            {this.getWeek()}
          </div>
          <div className={styles[`${PrefixCls}-outer-signbox-sign`]}>
            {this.state.isSign?<Icon style={{marginLeft:'5px'}} type={getLocalIcon('/others/signed.svg')}/>:'签到'}
          </div>
          <div
            className={classNames(styles[`${PrefixCls}-outer-signbox-signed`],{[styles.signActive]:this.state.isSign})}>
            <Icon type={getLocalIcon('/others/sign.svg')}/>
          </div>
        </div>
      </div>
    )

  }

}

export default SignIn

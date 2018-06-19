
import React from 'react'
import {connect} from 'dva';
import { WhiteSpace } from 'antd-mobile';
import Nav from 'components/nav'
import Listviews from 'components/listviews';
import {listRows} from 'components/row'
import styles from './index.less'

const PrefixCls='legal'
function Legal({location,dispatch,legal}) {

  const {name=''}=location.query


  return (
    <div className={styles[`${PrefixCls}-outer`]}>
      <Nav title={name} dispatch={dispatch}/>
      <WhiteSpace size="sm"/>
    </div>
  )
}

export default connect(({loading,legal}) => ({
  loading,
  legal
}))(Legal)

import React from 'react'
import {connect} from 'dva';
import {WhiteSpace} from 'antd-mobile';
import Nav from 'components/nav'
import Baseline from 'components/baseline'
import styles from './index.less'

const PrefixCls ='details'
function Details({location,dispatch,details}) {
  const {name=''}=location.query,
    {currentData:{content,title,date}}=details
 const getContents = () => {
    return {
      __html: content
    };
  };
  return (
    <div>
      <Nav title={name} dispatch={dispatch}/>
      <div className={styles[`${PrefixCls}-outer`]}>
          <div className={styles[`${PrefixCls}-outer-title`]}>
            {title}
          </div>
        <div className={styles[`${PrefixCls}-outer-date`]}>{date}</div>
        <WhiteSpace size="sm"/>
        <div className={styles[`${PrefixCls}-outer-content`]}>
          <div dangerouslySetInnerHTML={ getContents() } />
        </div>
      </div>
      <Baseline />
    </div>
  )
}

export default connect(({loading,details}) => ({
  loading,
  details
}))(Details)

import React from 'react'
import {connect} from 'dva';
import Nav from 'components/nav'
import styles from './index.less'

const PrefixCls ='warning'
function Warning({location,dispatch,warning}) {
 const {name=''}=location.query
  return (
    <div>
      <Nav title={name} dispatch={dispatch}/>
       <div className={styles[`${PrefixCls}-outer`]}>
          <div className={styles[`${PrefixCls}-outer-info`]}>
            一键报警，我们帮您
          </div>

       </div>
    </div>
  )
}

export default connect(({loading,warning}) => ({
  loading,
  warning
}))(Warning)

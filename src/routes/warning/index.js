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
/*
* 警务/非警务
*
*
*
*1、报警类型（最好可选，加入其它或者可添加）
2、简单描述（针对问题简单的进行描述）
3、拍摄现场（针对现场进行拍照取证，并提交用户点击按钮的时间）
4、所在位置（实现出获取到的位置，供用户修改，与系统自动提交的位置并行，互不影响）
5、匿名报警（对外公布信息时，不显示用户信息而已）
*/

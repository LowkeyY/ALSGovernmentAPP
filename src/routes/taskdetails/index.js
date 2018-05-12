import {Component} from 'react'
import ReactDOM from 'react-dom';
import {connect} from 'dva';
import { Icon, WhiteSpace} from 'antd-mobile';
import ChartRoom from 'components/chatroom'
import Nav from 'components/nav'
import { getLocalIcon } from 'utils';
import styles from './index.less'

const PrefixCls = 'taskdetails'
function TaskDetails({location,dispatch,taskdetails}) {
  const {name=''}=location.query
  return (
    <div>
      <Nav title='任务详情' dispatch={dispatch}/>
      <div className={styles[`${PrefixCls}-outer`]}>
         <div className={styles[`${PrefixCls}-outer-title`]}>
              清理小广告
         </div>
        <div className={styles[`${PrefixCls}-outer-content`]}>
            <Icon type={getLocalIcon('/others/task.svg')} size="md"/>
          <span>【任务详情】</span>
        </div>
        <div className={styles[`${PrefixCls}-outer-details`]}>
          撒旦法是打发斯蒂芬第三方就肯定会是范德萨科技峰会上点击返回
        </div>
          <div className={styles[`${PrefixCls}-outer-chat`]}>
            <Icon type={getLocalIcon('/others/chat.svg')} size="md"/>
            <span className={styles[`${PrefixCls}-outer-details-title`]}>【任务汇报】</span>
          </div>
      </div>
      <ChartRoom dispatch={dispatch}/>
    </div>
  )
}

export default connect(({loading,taskdetails}) => ({
  loading,
  taskdetails
}))(TaskDetails)

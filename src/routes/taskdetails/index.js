import {Component} from 'react'
import ReactDOM from 'react-dom';
import {connect} from 'dva';
import { Icon, WhiteSpace,Accordion,Button} from 'components';
import ChartRoom from 'components/chatroom'
import Nav from 'components/nav'
import { getLocalIcon } from 'utils';
import styles from './index.less'

const PrefixCls = 'taskdetails'
function TaskDetails({location,dispatch,taskdetails}) {

  const {name=''}=location.query,
    {chartArr,val,isDisabled} = taskdetails

 const onSubmit = (text) => {
    var obj = {
      msgType:0,
      content:text
    }
    chartArr.push(obj)
    dispatch({
      type:'taskdetails/updateState',
      payload:{
        chartArr:chartArr,
        val:'',
        isDisabled:true
      }
    })
  }

  const props={
    dispatch,
    chartArr,
    val,
    isDisabled,
    onSubmit
  }
  return (
    <div>
      <Nav title='任务详情' dispatch={dispatch}/>
      <div className={styles[`${PrefixCls}-outer`]}>
         <div className={styles[`${PrefixCls}-outer-title`]}>
              公安局信息员收到信息请回复。
         </div>
        <Accordion  className={styles[`${PrefixCls}-outer-taskdetails`]} >
          <Accordion.Panel header={
            <div className={styles[`${PrefixCls}-outer-taskdetails-title`]} >
              <Icon type={getLocalIcon('/others/task.svg')} size="md"/>
              <span>【任务详情】</span>
            </div>
          } >
            <span className={styles[`${PrefixCls}-outer-taskdetails-content`]}>
               诺日公派出所，刚收到乌力吉牧民反馈，有一辆新疆籍越野车向你辖区驶去，请关注，并及时汇报情况。
            </span>
          </Accordion.Panel>
        </Accordion>
        <div className={styles[`${PrefixCls}-outer-control`]}>
          <Button type="primary" inline size="small" style={{ marginRight: '4px' }}>接受</Button>
          <Button type="primary" inline size="small" style={{ marginRight: '4px' }}>发布任务</Button>
          <Button type="primary" inline size="small" style={{ marginRight: '4px' }}>取消</Button>
        </div>
          <div className={styles[`${PrefixCls}-outer-chat`]}>
            <Icon type={getLocalIcon('/others/chat.svg')} size="md"/>
            <span className={styles[`${PrefixCls}-outer-details-title`]}>【任务汇报】</span>
          </div>
      </div>
      <ChartRoom {...props}/>
    </div>
  )
}

export default connect(({loading,taskdetails}) => ({
  loading,
  taskdetails
}))(TaskDetails)

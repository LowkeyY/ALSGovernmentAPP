import React from 'react'
import {connect} from 'dva'
import {WhiteSpace, Icon, Checkbox, List, Button, Toast} from 'components'
import {getLocalIcon} from 'utils'
import {routerRedux} from 'dva/router';
import TitleBox from 'components/titlecontainer'
import Nav from 'components/nav'
import styles from './index.less'

const newsList = [],
  CheckboxItem = Checkbox.CheckboxItem,
  PrefixCls = 'volunteerdetails',
  getContents = (content) => {
    return {
      __html: content,
    }
  },
  layoutChildren = (items = [], onClick) => {
    const result = []
    items.map((item, index) => {
      const {id = '', name = '', info = ''} = item
      result.push(
        <CheckboxItem key={id} onChange={() => onClick(id)} multipleLine>
          {name}
          <List.Item.Brief>
            <div dangerouslySetInnerHTML={getContents(info)}/>
          </List.Item.Brief>
        </CheckboxItem>
      )
    })
    return result
  }, testData = {
    users: [{id: '1', title: 'XXX', content: '至难原因'},
      {id: '2', title: 'XXX', content: '至难原因'},
      {id: '3', title: 'XXX', content: '至难原因'}]
  }

function VolunteerDetails({location, dispatch, volunteerdetails}) {
  console.log(volunteerdetails)
  const {name = ''} = location.query,
    {currentSelected = [], currentData = {}, userInfos = []} = volunteerdetails,
    handleClick = (key) => {
      dispatch({
        type: `${PrefixCls}/updateState`, payload: {
          currentSelected: [...currentSelected, key]
        }
      })
    },
    handleSubmits = () => {
      if (currentSelected.length > 0) {
        Toast.success('感谢您的参与。', 2)
        dispatch(routerRedux.goBack())
      } else {
        Toast.info('请选择帮扶对象。', 2)
      }
    }
  const {address = '', baomingS = '', baomingE = '', dept = '', startDate = '', endDate = '', image = '', info = ''} = currentData
  return (
    <div>
      <Nav title={name} dispatch={dispatch}/>
      <WhiteSpace size="md"/>
      <div className={styles[`${PrefixCls}-container`]}>
        <img src={image || require('./1.png')} alt=""/>
        <div className={styles[`${PrefixCls}-container-content`]}>
          <div className={styles[`${PrefixCls}-container-content-item`]}>
            <Icon type={getLocalIcon('/others/position.svg')} size='xxs'/>
            <span className={styles[`${PrefixCls}-container-content-item-before`]}>活动地点</span>
            <span className={styles[`${PrefixCls}-container-content-item-after`]}>{address}</span>
          </div>
          <div className={styles[`${PrefixCls}-container-content-item`]}>
            <Icon type={getLocalIcon('/others/time.svg')} size='xxs'/>
            <span className={styles[`${PrefixCls}-container-content-item-before`]}>活动时间</span>
            <span className={styles[`${PrefixCls}-container-content-item-after`]}>{startDate + "-" + endDate}</span>
          </div>
          <div className={styles[`${PrefixCls}-container-content-item`]}>
            <Icon type={getLocalIcon('/others/time.svg')} size='xxs'/>
            <span className={styles[`${PrefixCls}-container-content-item-before`]}>报名时间</span>
            <span className={styles[`${PrefixCls}-container-content-item-after`]}>{baomingS + "-" + baomingE}</span>
          </div>
          <div className={styles[`${PrefixCls}-container-content-item`]}>
            <Icon type={getLocalIcon('/others/people.svg')} size='xxs'/>
            <span className={styles[`${PrefixCls}-container-content-item-before`]}>报名人数</span>
            <span className={styles[`${PrefixCls}-container-content-item-after`]}>{10}</span>
          </div>
        </div>
        <TitleBox title='活动详情'/>
        <div className={styles[`${PrefixCls}-container-details`]}>
          {<div style={{padding: '0 10px'}} dangerouslySetInnerHTML={getContents(info)}/>}
        </div>
        <TitleBox title='帮扶对象'/>
        {layoutChildren(userInfos, handleClick)}
        <TitleBox title='单位详情'/>
        {<div style={{padding: '10px'}}>{dept}</div>}
        <div style={{height: '100px'}}></div>
        <div style={{position: 'fixed', bottom: 0, width: '100%'}}>
          <List>{<Button type="primary" onClick={handleSubmits}>我要参与</Button>}</List>
        </div>
      </div>
    </div>
  )
}

export default connect(({loading, volunteerdetails}) => ({
  loading,
  volunteerdetails
}))(VolunteerDetails)

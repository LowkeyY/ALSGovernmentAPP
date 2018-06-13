import React from 'react'
import { connect } from 'dva'
import { WingBlank, WhiteSpace, Tabs, SegmentedControl, Badge, List, Eventlisten } from 'components'
import Ifreams from 'components/ifream'
import Nav from 'components/nav'
import HawkButton from 'components/hawkbutton'
import { routerRedux } from 'dva/router'
import Banner from 'components/banner'
import styles from './index.less'
import { baseURL, privateApi } from 'utils/config'

const { wanggequ, guiji } = privateApi,
  PrefixCls = 'guard',
  tabs = [
    { title: <Badge>网格区</Badge> },
    { title: <Badge>轨迹位置</Badge> },
    { title: <Badge>任务管理</Badge> },
  ],
  Item = List.Item,
  Brief = Item.Brief

function Guard ({ location, dispatch, guard }) {

  const { name = '' } = location.query, { selectedIndex = 0, scrollerTop = 0, appentParam = '', taskList,dataList ,segmentedIndex, pageType } = guard
  const handlerTaskClick = ({ taskId, taskInfo, taskTitle }) => {
      dispatch(routerRedux.push(
        {
          pathname: 'taskdetails',
          query: {
            taskId,
            taskInfo,
            taskTitle,
          },
        },
      ))
    },
    handleItemClick = ({id}) => {
      dispatch(routerRedux.push({
        pathname: '/seekdetails',
        query: {
          id,
        },
      }))
    },
 getShstate = (shtate,state) => {
    if(shtate=='0'){
      return <span style={{ color: '#ccb820' }}>●正在审核</span>
    }else if(shtate=='2'){
      return <span style={{ color: 'red' }}>●拒办</span>
    }else {
      return getStatus(state)
    }
  },
  getStatus = (status) => {
    switch (status) {
      case '0' :
        return <span style={{ color: '#ccb820' }}>●待审核</span>
      case '1' :
      case '2' :
      case '3' :
      case '4' :
        return <span style={{ color: 'green' }}>●处理中</span>
      case '5' :
        return <span style={{ color: '#000' }}>●已完成</span>
    }
  },
    getCurrentView = (index) => {
      switch (index) {
        case 0 : {
          let isNew = false
          return (
            <List>
              {taskList && taskList.map(_ => {
                return <Item
                  multipleLine
                  onClick={handlerTaskClick.bind(null, _)}
                  wrap
                  extra={<Badge text={_.noViewCount>0?_.noViewCount:''} />}
                  align="top"
                >
                  <div className={`${styles[`${PrefixCls}-message-title`]} ${isNew ? 'news' : ''}`}>
                    <h3>{_.taskTitle}</h3>
                  </div>
                  <div className={styles[`${PrefixCls}-message-content`]}>{_.content}</div>
                  <Brief>
                    {_.taskInfo}
                  </Brief>
                </Item>
              })
              }
            </List>
          )
        }
        case 1 : {
          let isNew = false
          return (
            <List>
              {taskList && taskList.map(_ => {
                return <Item
                  multipleLine
                  onClick={handlerTaskClick.bind(null, _)}
                  wrap
                  extra={<Badge text={_.noViewCount>0?_.noViewCount:''} overflowCount={99} />}
                  align="top"
                >
                  <div className={`${styles[`${PrefixCls}-message-title`]} ${isNew ? 'news' : ''}`}>
                    <h3>{_.taskTitle}</h3>
                  </div>
                  <div className={styles[`${PrefixCls}-message-content`]}>{_.content}</div>
                  <Brief>
                    {_.taskInfo}
                  </Brief>
                </Item>
              })
              }
            </List>
          )
        }
        case 2 : {
          return (
            <List>
              {
                dataList && dataList.map((data) => {
                  const { content, createDate, state,shState } = data
                  return <Item
                    className={styles[`${PrefixCls}-item`]}
                    multipleLine
                    onClick={handleItemClick.bind(this,data)}
                  >
                    {content}
                    <div className={styles[`${PrefixCls}-item-status`]}>
                      <span>{createDate}</span>
                      <span>{getShstate(shState,state)}</span>
                    </div>
                  </Item>
                })
              }
            </List>
          )
        }
      }

      return ''
    },
    handleChangeView = (e) => {
    if(e.nativeEvent.selectedSegmentIndex==2){
      dispatch({
        type: 'guard/getAppelList',
        payload: {
          selected: e.nativeEvent.selectedSegmentIndex
        },
      })
    }else {
      dispatch({
        type: 'guard/getTaskList',
        payload: {
          selected: e.nativeEvent.selectedSegmentIndex,
        },
      })
    }
    },
    handleTabClick = (e, i) => {
      dispatch({
        type: 'guard/updateState',
        payload: {
          scrollerTop: e,
          selectedIndex: i,
          appentParam: '',
        },
      })
    },
    handleNavClick = (route = 'warning', name = '我要反馈') => {
      dispatch(routerRedux.push({
        pathname: `/warning`,
        query: {
          name,
        },
      }))
    },
    renderNav = () => {
      return (
        <span onClick={handleNavClick}>我要反馈</span>
      )
    },
    onCnevent = (arg) => {
      const { userId = '', targetId = 1 } = arg
      if (userId != '') {
        dispatch({
          type: 'guard/updateState',
          payload: {
            selectedIndex: targetId,
            appentParam: userId,
          },
        })
      }
    }
  return (
    <div>
      <Nav title={name} dispatch={dispatch} renderNavRight={renderNav(guard)}/>
      <Tabs
        initialPage={selectedIndex}
        page={selectedIndex}
        tabs={tabs}
        swipeable={false}
        onTabClick={handleTabClick}
      >
        <div>
          <Ifreams src={`${baseURL + wanggequ}`} dispatch={dispatch}/>
        </div>
        <div style={{position:'relative'}}>
          <Ifreams src={`${baseURL + guiji + (appentParam == '' ? '' : '?userId=' + appentParam)}`}
                   dispatch={dispatch}/>
          <HawkButton/>
        </div>
        <div>
          <WhiteSpace size="md"/>
          <SegmentedControl
            selectedIndex={segmentedIndex}
            onChange={handleChangeView}
            values={['未完成', '已完成', '反馈']}
          />
          <WhiteSpace size="md"/>
          {getCurrentView(segmentedIndex)}
        </div>
      </Tabs>
      <Eventlisten willCallback={onCnevent}/>
    </div>

  )
}

export default connect(({ loading, guard }) => ({
  loading,
  guard,
}))(Guard)

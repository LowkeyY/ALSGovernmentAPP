import React from 'react'
import { connect } from 'dva'
import { WingBlank, WhiteSpace, Tabs, SegmentedControl, Badge, List, Eventlisten, Toast } from 'components'
import Ifreams from 'components/ifream'
import Nav from 'components/nav'
import HawkButton from 'components/hawkbutton'
import ListView from 'components/listview'
import { routerRedux } from 'dva/router'
import Banner from 'components/banner'
import {taskRow,reactRow} from 'components/row'
import styles from './index.less'
import { config, cookie } from 'utils'

const { baseURL, privateApi, userTag } = config,
  { iframeUrlwanggequ, iframeUrlguiji, sumbitUrlPositions } = privateApi,
  { userid: userTagUserId } = userTag,
  { _cg } = cookie,
  PrefixCls = 'guard',
  tabs = [
    { title: <Badge>网格区</Badge> },
    { title: <Badge>轨迹位置</Badge> },
    { title: <Badge>任务管理</Badge> },
  ],
  Item = List.Item,
  Brief = Item.Brief

function Guard ({ location, dispatch, guard, app }) {

  const { name = '' } = location.query,
    { selectedIndex = 0, scrollerTop = 0, appentParam = '', taskList, dataList, segmentedIndex, pageType,paginations} = guard,
    { guiji = {} } = app,
    { serverId = '', entityId = '', guijiId = '' } = guiji

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
    handleItemClick = ({ id }) => {
      dispatch(routerRedux.push({
        pathname: '/seekdetails',
        query: {
          id,
          name:'反馈详情'
        },
      }))
    },

    onRefresh = (callback) => {
      dispatch({
        type: `${PrefixCls}/getTaskList`,
        payload: {
          callback,
          isRefresh:true
        }
      })
    },
    onEndReached = (callback) => {
      dispatch({
        type: `${PrefixCls}/getTaskList`,
        payload: {
          callback
        }
      })
    },
    onScrollerTop = (top) => {
      if (typeof top !='undefined' && !isNaN(top * 1))
        dispatch({
          type: `${PrefixCls}/updateState`,
          payload: {
            scrollerTop: top
          }
        })
    },
    getCurrentView = (index) => {
      const {current, total, size} = paginations,
        hasMore = (total > 0) && ((current > 1 ? current - 1 : 1) * size < total)
      switch (index) {
        case 0 : {
          return (
           <div  className={styles[`${PrefixCls}-message-outer`]}>
             <ListView layoutHeader={''} dataSource={taskList} layoutRow={(rowData,sectionID,rowID)=>taskRow(rowData, sectionID, rowID,handlerTaskClick )}
                       onEndReached={onEndReached}
                       onRefresh={onRefresh} hasMore={hasMore}
                       onScrollerTop={onScrollerTop.bind(null)}
                       scrollerTop={scrollerTop}
             />
           </div>
          )
        }
        case 1 : {
          return (
            <ListView layoutHeader={''} dataSource={taskList} layoutRow={(rowData,sectionID,rowID)=>taskRow(rowData, sectionID, rowID,handlerTaskClick )}
                      onEndReached={onEndReached}
                      onRefresh={onRefresh} hasMore={hasMore}
                      onScrollerTop={onScrollerTop.bind(null)}
                      scrollerTop={scrollerTop}
            />
          )
        }
        case 2 : {
          return (
            <ListView layoutHeader={''} dataSource={dataList} layoutRow={(rowData,sectionID,rowID)=>reactRow(rowData, sectionID, rowID,handleItemClick )}
                      onEndReached={onEndReached}
                      onRefresh={onRefresh} hasMore={hasMore}
                      onScrollerTop={onScrollerTop.bind(null)}
                      scrollerTop={scrollerTop}
            />
          )
        }
      }

      return ''
    },
    handleChangeView = (e) => {
      if (e.nativeEvent.selectedSegmentIndex == 2) {
        dispatch({
          type: 'guard/getAppelList',
          payload: {
            selected: e.nativeEvent.selectedSegmentIndex,
            isRefresh: true
          },
        })
      } else {
        dispatch({
          type: 'guard/getTaskList',
          payload: {
            selected: e.nativeEvent.selectedSegmentIndex,
            isRefresh: true
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
    handleNavClick = (route = 'warning', name = '我要反馈',isFankui=true) => {
      dispatch(routerRedux.push({
        pathname: `/warning`,
        query: {
          name,
          isFankui
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
    },
    handleGuijiClick = (callback) => {
      let canStart = (guijiId == '')
      const onSuccess = () => {
          console.log('handleGuijiClick - onSuccess')
          dispatch({
            type: 'app/guiji',
            payload: {
              type: canStart ? 'start' : 'end',
              guijiId,
            },
          })
          callback()
          Toast.success(canStart ? '开始记录轨迹。' : '结束记录轨迹。')
        },
        onFail = (err) => {
          console.log('handleGuijiClick - onFail', err, canStart, guijiId)
          callback()
          if (!canStart) {
            dispatch({
              type: 'app/guiji',
              payload: {
                type: 'end',
                guijiId,
              },
            })
          }
          Toast.offline('请开启手机定位权限，否则无法记录轨迹。')
        }
      if (canStart) {
        cnStartJiluguiji(serverId, entityId, onSuccess.bind(this), onFail.bind(this), {
          key: _cg(userTagUserId),
          url: `${baseURL + sumbitUrlPositions}`,
        }, 1000)
      } else {
        onSuccess()
        cnStopJiluguiji()
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
          <Ifreams src={`${baseURL + iframeUrlwanggequ}`} dispatch={dispatch}/>
        </div>
        <div style={{ position: 'relative' }}>
          <Ifreams src={`${baseURL + iframeUrlguiji + (appentParam == '' ? '' : '?userId=' + appentParam)}`}
                   dispatch={dispatch}/>
          {serverId != '' && entityId != '' ?
            <HawkButton btnStatus={guijiId != ''} handleClick={handleGuijiClick}/> : ''}
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

export default connect(({ loading, guard, app }) => ({
  loading,
  guard,
  app,
}))(Guard)

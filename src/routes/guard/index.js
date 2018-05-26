import React from 'react'
import { connect } from 'dva'
import { WingBlank, WhiteSpace, Tabs, SegmentedControl, Badge,List } from 'components'
import Nav from 'components/nav'
import { routerRedux } from 'dva/router';
import Banner from 'components/banner'
import styles from 'components/row/index.less'

const PrefixCls = 'guard',
 tabs=[
   { title: <Badge >我的位置</Badge> },
   { title: <Badge>我的轨迹</Badge> },
   { title: <Badge>我的任务</Badge> },
 ],
  Item = List.Item,
  Brief = Item.Brief,
  testData = [
    {
      content: '马上就处理',
      time: '2018年4月5日',
      title: '我是乌力吉苏木巴特尔，我的草场上，有一辆新疆牌照的越野车，离开京新高速公路行驶，向诺日公方向驶去',
    },
    {
      content: '马上就清理',
      time: '2018年4月5日',
      title: '请将花园路的小广告清理一下',
    },
    {
      content: '马上就清理',
      time: '2018年4月5日',
      title: '请将花园路的小广告清理一下',
    },
    {
      content: '马上就清理',
      time: '2018年4月5日',
      title: '请将花园路的小广告清理一下',
    },
  ]

function Guard ({ location, dispatch, guard }) {

  const { name = '' } = location.query, { selectedIndex = 0, scrollerTop = 0 } = guard
  const defaultImg = require('themes/images/shouhu/1.jpg'),
    defaultImg2 = require('themes/images/shouhu/2.jpg'),
    handlerTaskClick = () => {
      dispatch(routerRedux.push(
        {
          pathname:'taskdetails',
          query:{

          }
        }
      ))
    },
    getCurrentView = (index) => {

        switch (index) {
          case 0 : {
            let isNew = false;
            return (
              <List>
                {testData.map(_ => <Item
                  arrow="horizontal"
                  multipleLine
                  onClick={handlerTaskClick}
                  wrap
                >
                  <div className={`${styles[`${PrefixCls}-message-title`]} ${isNew ? 'news' : ''}`}>
                    <h3>{_.title}</h3>
                  </div>
                  <div className={styles[`${PrefixCls}-message-content`]}>{_.content}</div>
                  <Brief>
                    {_.time}
                  </Brief>
                </Item>)
                }
              </List>
            )
          }
          case 1 : {
            return (
              <div></div>
            )
          }
        }

      return ''
    },
    handleChangeView = (e) => {
      dispatch({
        type: 'guard/updateState',
        payload: {
          selectedIndex: e.nativeEvent.selectedSegmentIndex,
        },
      })
    },
    handleTabClick = (e) => {
      dispatch({
        type: 'guard/updateState',
        payload: {
          scrollerTop : e,
        },
      })
    }
  return (
    <div>
      <Nav title={name} dispatch={dispatch}/>
      <Tabs
        initialPage={0}
        tabs={tabs}
        onChange={(tab, index) => { console.log('onChange', index, tab); }}
        onTabClick={handleTabClick}
      >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
            <img style={{ width: '100%' }} src={defaultImg}/>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
            <img style={{ width: '100%' }} src={defaultImg2}/>
          </div>
          <div>
            <WhiteSpace size="md"/>
            <SegmentedControl
              selectedIndex={selectedIndex}
              onChange={handleChangeView}
              values={['未完成任务', '已完成任务']}
            />
            <WhiteSpace size="md"/>
            {getCurrentView(selectedIndex)}
          </div>
      </Tabs>
    </div>

  )
}

export default connect(({ loading, guard }) => ({
  loading,
  guard,
}))(Guard)

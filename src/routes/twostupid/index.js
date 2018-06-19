import React from 'react'
import { connect } from 'dva'
import { WhiteSpace, Tabs, Card } from 'components'
import Nav from 'components/nav'
import PullToRefresh from 'components/pulltorefresh'
import Layout from 'components'
import styles from './index.less'


const PrefixCls = 'twostupid', { BaseLine } = Layout

function Twostupid ({ location, dispatch, twostupid }) {
  const { name = '' } = location.query,
    { selectedIndex, tabs, dataList } = twostupid

  const handleTabItemClick = (data, index) => {
      dispatch({
        type: 'twostupid/querySelect',
        payload: {
          selected: index,
          ...data
        },
      })

    },
    layoutItem = (data) => {
      return data && data.map((item, i) => {
         return <div key={item.id}  className={styles[`${PrefixCls}-outer`]}>
            <Card>
              <Card.Header
                title="问题类型"
                extra={<span>{item.wentifenlei}</span>}
              />
              <Card.Body>
                <div>{item.neirong}</div>
              </Card.Body>
            </Card>
          </div>
      })
    }
  return (
    <div>
      <Nav title={name} dispatch={dispatch}/>
      <WhiteSpace size="md"/>
      <Tabs
        initialPage={0}
        page={selectedIndex}
        tabs={tabs}
        swipeable={false}
        onTabClick={handleTabItemClick}
        renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} />}
      >
        <div>
          {layoutItem(dataList)}
        </div>
      </Tabs>
    </div>
  )
}

export default connect(({ loading, twostupid }) => ({
  loading,
  twostupid,
}))(Twostupid)

import React from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import Nav from 'components/nav'
import PullToRefresh from 'components/pulltorefresh'
import { List, WhiteSpace, SearchBar, Tabs, Card, WingBlank ,Layout} from 'components'
import { baseVoice } from 'components/row'
import styles from './index.less'


const Item = List.Item,
  Brief = Item.Brief,{BaseLine} = Layout
function Basevoice ({ location, dispatch, basevoice }){

  const { name = '' } = location.query
  const PrefixCls = 'basevoice',
    { tabs, lists, selectedIndex } = basevoice,
    handleTabItemClick = (data, index) => {
      dispatch({
        type: 'basevoice/query',
        payload: {
          selected: index,
          types: data.id,
        },
      })

    },
    handleCardClick = (id) => {

    },
    layoutInputItem = (others) => {
      const { bumen, zeren, dingban, shixian, fangshi, xiaohao, sumu } = others
      return <Item>
        <div className={styles[`${PrefixCls}-card-items`]}>
          <span>交办部门：</span>{bumen}<br/>
          <span>责任人：</span>{zeren}<br/>
          <span>盯办人:</span>{dingban}<br/>
          <span>完成时限：</span>{shixian}<br/>
          <span>解决方式：</span>{fangshi}<br/>
          <span>销号情况：</span>{xiaohao}<br/>
        </div>
      </Item>
    },
    layoutItem = (data) => {
      const { yijian, ...others } = data,
        result = []
      if (yijian != '') {
        result.push(<WhiteSpace/>)
        result.push(
          <Card full={true}>
            <Card.Header title={<span className={styles[`${PrefixCls}-card-title`]}>{yijian}</span>}/>
            <Card.Body>
              {layoutInputItem(others)}
            </Card.Body>
          </Card>)
        result.push(<WhiteSpace/>)
      }
      return result
    }

  return (
    <div>
      <Nav title={name} dispatch={dispatch}/>
      <WhiteSpace size="md"/>
      <Tabs
        // initialPage={0}
        page={selectedIndex}
        tabs={tabs}
        swipeable={false}
        onTabClick={handleTabItemClick}
      >
        <WingBlank size="sm">
          <PullToRefresh sibilingsHasBanner={true} children={lists && lists.map((data, index) => {
            return <div key={data.id}>
              {layoutItem(data, handleCardClick)}
            </div>
          })}/>
        </WingBlank>
      </Tabs>
    </div>
  )
}

export default connect(({ loading, basevoice }) => ({
  loading,
  basevoice,
}))(Basevoice)

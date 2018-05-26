import React from 'react'
import { connect } from 'dva'
import Nav from 'components/nav'
import { routerRedux } from 'dva/router'
import { SegmentedControl, WingBlank, WhiteSpace, List, SearchBar } from 'antd-mobile'
import newsList from 'utils/datalvyou'
import styles from './index.less'
const PrefixCls="";
function Ecology ({ location, dispatch, ecology }) {
  const { name = '' } = location.query,
    handleItemOnclick = (index) => {
      dispatch(routerRedux.push({
        pathname: '/test',
        query: {
          name: '绿色详情'
        },
      }))
    },
    defaultImg = require('themes/images/lvse/default.png'),
    Item = List.Item,
    Brief = Item.Brief
  return (
    <div>
      <Nav title={name} dispatch={dispatch}/>
      <WhiteSpace size="md"/>
      <SearchBar
        placeholder="输入需要搜索的内容"
        onSubmit={value => console.log(value, 'onSubmit')}
        onClear={value => console.log(value, 'onClear')}
        onFocus={() => console.log('onFocus')}
        onBlur={() => console.log('onBlur')}
        onCancel={() => console.log('onCancel')}
        showCancelButton
        onChange={() => console.log('onChange')}
      />
      <div style={{ width: '100%', textAlign: 'center' }}>
        <img style={{ width: '98%' }} src={defaultImg}/>
      </div>
      <List renderHeader={() => '焦点关注'}>
        {newsList.map((
          { title = '', images = [] },
          index,
        ) =>
          <Item onClick={handleItemOnclick.bind(null, index)}>
            <div style={{ display: 'flex' }}>
              <div style={{ flex: 2 , minWidth: '20%'}}>
                <img style={{ width: '100%', height: '100%' }} src={images[0]}/>
              </div>
              <div style={{ flex: 8, paddingLeft: '15px' }}>
                <span>{title}</span>
              </div>
            </div>
          </Item>)}
      </List>
    </div>
  )
}

export default connect(({ loading, ecology }) => ({
  loading,
  ecology,
}))(Ecology)

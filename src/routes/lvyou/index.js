import React from 'react'
import { connect } from 'dva'
import Nav from 'components/nav'
import { routerRedux } from 'dva/router'
import Iframes from 'components/ifream'
import styles1 from './index.less'

const PrefixCls = 'lvyou'

function Lvyou ({ location, dispatch, lvyou }) {
  const { name = '' } = location.query;
  return (
    <div>
      <Nav title={name} dispatch={dispatch}/>
      <Iframes src='http://m.Zyalxa.icoc.bz/' />
    </div>

  )
}

export default connect(({ loading, lvyou }) => ({
  loading,
  lvyou,
}))(Lvyou)


import React from 'react'
import {connect} from 'dva';
import Nav from 'components/nav'

function Mine({location,dispatch,mine}) {
  const {name=''}=location.query
  return (
    <div>
      <Nav title='我的' dispatch={dispatch}/>
      <div>我的</div>
    </div>
  )
}

export default connect(({loading,mine}) => ({
  loading,
  mine
}))(Mine)

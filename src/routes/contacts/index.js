import React from 'react'
import {connect} from 'dva';
import Nav from 'components/nav'

function Contacts({location,dispatch,contacts}) {
  const {name=''}=location.query
  return (
    <div>
      <Nav title={name} dispatch={dispatch}/>
      <div>sdf</div>
    </div>
  )
}

export default connect(({loading,contacts}) => ({
  loading,
  contacts
}))(Contacts)

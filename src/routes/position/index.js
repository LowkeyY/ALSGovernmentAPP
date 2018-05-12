import React from 'react'
import {connect} from 'dva';
import Nav from 'components/nav'
import Ifreams from 'components/ifream'


function Position({location,dispatch,position}) {
  const {name=''}=location.query,
    {src}=position,_stamp = `?stamp=${new Date().getTime()}`
  return (
    <div>
      <Nav title={name} dispatch={dispatch}/>
      <Ifreams  dispatch={dispatch} src={`${src}${_stamp}`}/>
    </div>
  )
}

export default connect(({loading,position}) => ({
  loading,
  position
}))(Position)

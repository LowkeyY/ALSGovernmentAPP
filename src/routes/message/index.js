import React from 'react'
import {connect} from 'dva';
import MessageItem from 'components/messageitem'
import Nav from 'components/nav'

function Message({location,dispatch,message}) {
  const {name=''}=location.query
  return (
    <div>
      <Nav title={name} dispatch={dispatch}/>
      <div>
        <MessageItem dispatch={dispatch}/>
      </div>
    </div>
  )
}

export default connect(({loading,message}) => ({
  loading,
  message
}))(Message)

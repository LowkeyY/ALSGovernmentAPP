import React from 'react'
import {connect} from 'dva';
import Nav from 'components/nav'

function Route({location,dispatch,route}) {


   const getLocation = () => {
      
    }


  const {name=''}=location.query
  return (
    <div>
      <Nav title={name} dispatch={dispatch}/>
      {getLocation()}
    </div>
  )
}

export default connect(({loading,route}) => ({
  loading,
  route
}))(Route)

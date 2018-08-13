import React from 'react'
import { connect } from 'dva'
import Nav from 'components/nav'
import Ifreams from 'components/ifream'


function Position ({ location, dispatch, position }) {
  const { name = '' } = location.query,
    { src } = position,
    _stamp = `?stamp=${new Date().getTime()}`
  return (
    <div>
      <Nav title={name} dispatch={dispatch}/>
      <Ifreams dispatch={dispatch}
               src={'https://v.qq.com/txp/iframe/player.html?origin=https%3A%2F%2Fmp.weixin.qq.com&vid=k0656allm9j&autoplay=false&full=true&show1080p=false'}/>
    </div>
  )
}

export default connect(({ loading, position }) => ({
  loading,
  position,
}))(Position)

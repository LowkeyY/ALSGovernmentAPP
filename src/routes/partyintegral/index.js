import React from 'react'
import { connect } from 'dva'
import { WhiteSpace } from 'components'
import NoMessage from 'components/nomessage'
import Nav from 'components/nav'
import styles from './index.less'


const PrefixCls = 'partyintegral'

function Partyintegral ({ location, dispatch, partyintegral }) {
  const { name = ''} = location.query

  return (
    <div >
      <Nav title={name} dispatch={dispatch}/>
      <WhiteSpace size="md"/>
      <NoMessage />
    </div>
  )
}

export default connect(({ loading, partyintegral }) => ({
  loading,
  partyintegral,
}))(Partyintegral)

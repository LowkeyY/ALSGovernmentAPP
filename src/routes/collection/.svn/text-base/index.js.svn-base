import React from 'react'
import { connect } from 'dva'
import { WhiteSpace } from 'components'
import Nav from 'components/nav'
import styles from './index.less'


const PrefixCls = 'integral'

function Integral ({ location, dispatch, integral }) {
  const { name = ''} = location.query

    return (
    <div>
      <Nav title={name} dispatch={dispatch}/>
      <WhiteSpace size="md"/>

    </div>
  )
}

export default connect(({ loading, integral }) => ({
  loading,
  integral,
}))(Integral)

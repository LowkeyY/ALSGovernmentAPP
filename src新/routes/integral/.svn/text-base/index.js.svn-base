import React from 'react'
import { connect } from 'dva'
import { WhiteSpace } from 'components'
import Nav from 'components/nav'
import IntegralCard from 'components/integralcard'
import styles from './index.less'


const PrefixCls = 'integral'

function Integral ({ location, dispatch, integral }) {
  const { name = '积分商城' } = location.query
  const handleItmeClick = () => {
    alert('积分不足')
  }
  return (
    <div>
      <Nav title={name} dispatch={dispatch}/>
      <div className={styles[`${PrefixCls}-outer`]}>
        <div className={styles[`${PrefixCls}-outer-head`]}>
            <span>我的积分</span>
            <span className={styles[`${PrefixCls}-outer-head-coin`]}>{`${0}金币`}</span>
        </div>
        <div className={styles[`${PrefixCls}-outer-title`]}>
            <span>积分兑换</span>
        </div>
        <div className={styles[`${PrefixCls}-outer-container`]}>
          <IntegralCard onClick={handleItmeClick}/>
        </div>
      </div>
    </div>
  )
}

export default connect(({ loading, integral }) => ({
  loading,
  integral,
}))(Integral)

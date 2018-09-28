import React from 'react';
import { connect } from 'dva';
import { WhiteSpace } from 'components';
import Nav from 'components/nav';
import NoMessage from 'components/nomessage';
import styles from './index.less';


const PrefixCls = 'payment';

function Payment ({ location, dispatch, payment }) {
  const { name = '缴费记录' } = location.query;

  return (
    <div>
      <Nav title={name} dispatch={dispatch} />
      <WhiteSpace size="md" />
      <NoMessage />
    </div>
  );
}

export default connect(({ loading, payment }) => ({
  loading,
  payment,
}))(Payment);

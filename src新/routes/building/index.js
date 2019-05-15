import React from 'react';
import { connect } from 'dva';
import { WhiteSpace } from 'components';
import Nav from 'components/nav';

const Building = ({ dispatch, building }) => {
  return (
    <div>
      <Nav dispatch={dispatch} />
      <div style={{ width: '100%', height: '100%', overflow: 'hidden' }} >
        <img style={{ width: '100%', height: '100vh' }} src={require('../../themes/images/others/building.png')} alt="" />
      </div>
    </div>
  );
};
export default connect(({ loading, building }) => ({
  loading,
  building,
}))(Building);

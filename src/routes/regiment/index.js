import React from 'react';
import { connect } from 'dva';
import Menu from 'components/menu/index';
import Nav from 'components/nav';
import CnMenu from 'components/CnMenu';
import { handleGridClick } from 'utils/commonevent';
import bg from '../../themes/images/default/bg.png';
import styles from './index.less';

const PrefixCls = 'regiment';

function Regiment ({ location, dispatch, regiment }) {
  const { grids } = regiment,
    { name = '' } = location.query;

  return (
    <div className={styles[`${PrefixCls}-outer`]} style={{ backgroundImage: `url(${bg})` }}>
      <Nav title={name} dispatch={dispatch} color={'transparent'} />
      {
        grids.length > 0 &&
        <div className={styles[`${PrefixCls}-outer-child`]}>
          <CnMenu handleGridClick={handleGridClick} dispatch={dispatch} datas={grids} />
        </div>
      }
    </div>

  );
}

export default connect(({ loading, regiment }) => ({
  loading,
  regiment,
}))(Regiment);

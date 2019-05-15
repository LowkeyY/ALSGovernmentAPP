import React from 'react';
import { connect } from 'dva';
import { WhiteSpace } from 'components';
import { routerRedux } from 'dva/router';
import Nav from 'components/nav';
import SpecialBox from 'components/specailbox';
import { handleListClick } from 'utils/commonevent';
import { getTitle } from 'utils';
import styles from './index.less';

const PrefixCls = 'personnellist';

function PersonnelList ({ location, dispatch, personnellist }) {
  const { name = '' } = location.query,
    { dataList = [] } = personnellist,
    handleItemClick = ({ id }) => {
      dispatch(routerRedux.push({
        pathname: '/seekdetails',
        query: {
          id,
        },
      }));
    };
  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <Nav title={getTitle(name)} dispatch={dispatch} />
      <WhiteSpace size="md" />
      <div className={styles[`${PrefixCls}-outer`]}>
        {
          dataList.length > 0 && dataList.map((data) => {
            return <SpecialBox datas={data} dispatch={dispatch} handleClick={handleListClick} />;
          })
        }
      </div>
    </div>
  );
}

export default connect(({ loading, personnellist }) => ({
  loading,
  personnellist,
}))(PersonnelList);

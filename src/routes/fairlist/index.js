import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, List } from 'components';
import { routerRedux } from 'dva/router';
import Nav from 'components/nav';
import NoMessage from 'components/nomessage';
import styles from './index.less';

const PrefixCls = 'fairlist',
  Item = List.Item;
const getShstate = (text) => {
  if (text === '未审核') {
    return <span style={{ color: '#cc2020' }} >{`●${text}`}</span >;
  } else if (text === '审核通过') {
    return <span style={{ color: '#00cf04' }} >{`●${text}`}</span >;
  } else if (text === '审核未通过') {
    return <span style={{ color: '#a2a699' }} >{`●${text}`}</span >;
  } else if (text === '补充材料') {
    return <span style={{ color: '#cfc603' }} >{`●${text}`}</span >;
  }
};

function FairList ({ location, dispatch, fairlist }) {
  const { name = '我的预约' } = location.query,
    { dataList } = fairlist,
    handleItemClick = ({ SHIXIANGID }) => {
      dispatch(routerRedux.push({
        pathname: '/fairdetails',
        query: {
          id: SHIXIANGID,
        },
      }));
    };
  return (
    <div >
      <Nav title={name} dispatch={dispatch} />
      <div className={styles[`${PrefixCls}-outer`]} >
        <List >
          {
            dataList.length > 0 ?
              dataList.map((data, i) => {
                const { AUDIT_STATE, CRATE_DATE, SHIXIANGMINGCHENG, SHIXIANGID } = data;
                return (<Item
                  key={i}
                  className={styles[`${PrefixCls}-item`]}
                  multipleLine
                  onClick={handleItemClick.bind(this, data)}
                >
                  {SHIXIANGMINGCHENG}
                  <div className={styles[`${PrefixCls}-item-status`]} >
                    <span >{CRATE_DATE}</span >
                    <span >{getShstate(AUDIT_STATE)}</span >
                  </div >
                </Item >);
              })
              :
              <NoMessage />
          }
        </List >
      </div >
    </div >
  );
}

export default connect(({ loading, fairlist }) => ({
  loading,
  fairlist,
}))(FairList);

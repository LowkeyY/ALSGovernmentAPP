import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, List } from 'components';
import { routerRedux } from 'dva/router';
import Nav from 'components/nav';
import NoMessage from 'components/nomessage';
import styles from './index.less';

const PrefixCls = 'lawyerassistance',
  Item = List.Item;
const getShstate = (text) => {
  if (text === '未审核') {
    return <span style={{ color: '#cc2020' }}>{`●${text}`}</span>;
  } else if (text === '审核通过') {
    return <span style={{ color: '#00cf04' }}>{`●${text}`}</span>;
  } else if (text === '审核未通过') {
    return <span style={{ color: '#a2a699' }}>{`●${text}`}</span>;
  }
};

function LawyerAssistance ({ location, dispatch, lawyerassistance }) {
  const { name = '我的申请' } = location.query,
    { dataList } = lawyerassistance,
    handleItemClick = ({ LEGALAID_ID }) => {
      dispatch(routerRedux.push({
        pathname: '/lawyerdetails',
        query: {
          id: LEGALAID_ID,
        },
      }));
    };
  return (
    <div>
      <Nav title={name} dispatch={dispatch} />
      <div className={styles[`${PrefixCls}-outer`]}>
        <List>
          {
            dataList.length > 0 ?
              dataList.map((data, i) => {
                const { AUDIT_STATE, crate_date, SHENQINGANJIANLEIXING } = data;
                return (<Item
                  key={i}
                  className={styles[`${PrefixCls}-item`]}
                  multipleLine
                  onClick={handleItemClick.bind(this, data)}
                >
                  {SHENQINGANJIANLEIXING}
                  <div className={styles[`${PrefixCls}-item-status`]}>
                    <span>{crate_date}</span>
                    <span>{getShstate(AUDIT_STATE)}</span>
                  </div>
                </Item>);
              })
              :
              <NoMessage />
          }
        </List>
      </div>
    </div>
  );
}

export default connect(({ loading, lawyerassistance }) => ({
  loading,
  lawyerassistance,
}))(LawyerAssistance);

import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, List } from 'components';
import { routerRedux } from 'dva/router';
import Nav from 'components/nav';
import styles from './index.less';
import NoMessage from 'components/nomessage';

const PrefixCls = 'myappeal',
  Item = List.Item,
  Brief = Item.Brief;
const getShstate = (shtate, state) => {
    if (shtate == '0') {
      return <span style={{ color: '#ccb820' }}>●正在审核</span>;
    } else if (shtate == '2') {
      return <span style={{ color: '#9c9595' }}>●不在办理范围</span>;
    }
    return getStatus(state);
  },

  getStatus = (status) => {
    switch (status) {
      case '0' :
        return <span style={{ color: '#ccb820' }}>●待审核</span>;
      case '1' :
      case '2' :
      case '3' :
      case '4' :
      case '6' :
      case '7' :
        return <span style={{ color: '#29ad2e' }}>●处理中</span>;
      case '5' :
        return <span style={{ color: '#d45b5b' }}>●已完成</span>;
    }
  };

function Myappeal ({ location, dispatch, myappeal }) {
  const { name = '我的诉求' } = location.query,
    { dataList = [] } = myappeal,
    handleItemClick = ({ id }) => {
      dispatch(routerRedux.push({
        pathname: '/seekdetails',
        query: {
          id,
        },
      }));
    };
  return (
    <div>
      <Nav title={name} dispatch={dispatch} />
      <WhiteSpace size="md" />
      <List>
        {
          dataList.length > 0 ?
            dataList.map((data) => {
              const { content, createDate, state, shState } = data;
              return (<Item
                className={styles[`${PrefixCls}-item`]}
                multipleLine
                onClick={handleItemClick.bind(this, data)}
              >
                {content}
                <div className={styles[`${PrefixCls}-item-status`]}>
                  <span>{createDate}</span>
                  <span>{getShstate(shState, state)}</span>
                </div>
              </Item>);
            })
            :
            <NoMessage />
        }
      </List>
    </div>
  );
}

export default connect(({ loading, myappeal }) => ({
  loading,
  myappeal,
}))(Myappeal);

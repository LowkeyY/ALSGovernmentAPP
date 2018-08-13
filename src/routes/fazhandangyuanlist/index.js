import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, List, Badge } from 'components';
import { routerRedux } from 'dva/router';
import Nav from 'components/nav';
import styles from './index.less';

const PrefixCls = 'fazhandangyuanlist',
  Item = List.Item,
  Brief = Item.Brief;

function Comp ({ location, dispatch, fazhandangyuanlist }) {
  const { name = '' } = location.query,
    { items = [] } = fazhandangyuanlist,
    handleItemClick = (data) => {
      dispatch(routerRedux.push({
        pathname: '/fazhandangyuan',
        query: {
          ...data,
        },
      }));
    },
    
    getColors = (status) => {
      switch (status) {
        case 0:
          return '#f19736';
        case 10:
          return '#1ab73c';
        case 20:
          return '#dc1919';
        default:
          return 'red';
      }
    },
    handleNavClick = () => {
      dispatch(routerRedux.push({
        pathname: '/fazhandangyuan',
        query: {
          // id,
        },
      }));
    },
    renderNav = () => {
      return (
        <span onClick={handleNavClick}>添加</span>
      );
    };
  return (
    <div>
      <Nav title={name} dispatch={dispatch} renderNavRight={renderNav()} />
      <List>
        {items.length > 0 && items.map(item => {
          const { userName = '', userTag = '', statusText = '', status = '', ...others } = item;
          return (
            <Item
              arrow="horizontal"
              multipleLine
              onClick={handleItemClick.bind(null, others)}
              extra={<Badge
                text={statusText}
                style={{
                  padding: '0 4px',
                  backgroundColor: getColors(status * 1),
                  borderRadius: 2,
                  color: '#fff',
                }}
              />}
            >
              <span>{userName}</span>
              <Brief>{userTag}</Brief>
            </Item>
          );
        })}
      </List>
    </div>
  );
}

export default connect(({ loading, fazhandangyuanlist }) => ({
  loading,
  fazhandangyuanlist,
}))(Comp);

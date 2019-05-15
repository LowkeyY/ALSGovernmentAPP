import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, List } from 'components';
import Nav from 'components/nav';
import { routerRedux, Link } from 'dva/router';
import { notaryRow } from 'components/row';
import { interceptStr } from 'utils';

const PrefixCls = 'fazhandangyuanstep',
  Item = List.Item;

function Comp ({ location, dispatch, fazhandangyuanstep }) {
  const { name = '', index = 0 } = location.query,
    { items } = fazhandangyuanstep;
  const handleClick = (data) => {
      const { startSortId = '', endSortId = '', liuchengId = '', subject = '', isLastStep = false } = data;
      dispatch(routerRedux.push({
        pathname: '/fazhandangyuanlist',
        query: {
          startSortId,
          endSortId,
          liuchengId,
          isLastStep,
          name: interceptStr(subject)
        },
      }));
    },
    renderNav = () => {
      return (
        <div onClick={handleAddClick}>添加</div>
      );
    },
    handleAddClick = () => {
      dispatch(routerRedux.push({
        pathname: '/fazhandangyuan',
      }));
    };
  return (
    <div>
      <Nav title={name} dispatch={dispatch} renderNavRight={renderNav()} />
      <List className="my-list">
        {items && items.map((data, index) => {
          return <Item onClick={handleClick.bind(null, data)} key={index}>{data.subject}</Item>;
        })}
      </List>
    </div>
  );
}

export default connect(({ loading, fazhandangyuanstep }) => ({
  loading,
  fazhandangyuanstep,
}))(Comp);

import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, Tabs, Badge, List, Icon } from 'components';
import { getLocalIcon } from 'utils';
import Nav from 'components/nav';
import NoContent from 'components/nocontent';
import { routerRedux } from 'dva/router';
import styles from './index.less';

const PrefixCls = 'volunteer',
  Item = List.Item,
  Brief = Item.Brief;


function Volunteer ({ location, dispatch, volunteer }) {
  const { name = '', lists } = volunteer;

  const handleItemOnclick = ({ id, title, pathname = 'volunteerdetails' }) => {
      dispatch(routerRedux.push({
        pathname: `/${pathname}`,
        query: {
          name,
          dataId: id,
        },
      }));
    },
    activeList = (lists, handleItemOnclick) => {
      const result = [];
      lists && lists.map((list, i) => {
        result.push(
          <div className={styles[`${PrefixCls}-list`]}>
            <Item className={styles[`${PrefixCls}-box`]}
                  thumb={list.image || ''}
                  multipleLine
                  wrap
                  onClick={handleItemOnclick.bind(null, list)}
            >
              <span>{list.title}</span>
              <Brief>
                <p className={styles[`${PrefixCls}-item`]}>
                  <span><Icon type={getLocalIcon('/others/number.svg')} size="xxs"/></span>
                  <span>{`${list.baomingrenshu || 0}人`}</span>
                </p>
                <p className={styles[`${PrefixCls}-item`]}>
                  <span><Icon type={getLocalIcon('/others/position.svg')} size="xxs"/></span>
                  <span>{list.address}</span>
                </p>
              </Brief>
            </Item>
            <div className={styles[`${PrefixCls}-list-state`]}>{list.state}</div>
          </div>,
        );
      });
      return <List>{result}</List>;
    },
    getContent = () => {
      return lists && lists.length > 0 ? <List>{activeList(lists, handleItemOnclick)}</List> : <NoContent/>;
    };

  return (
    <div className={styles[`${PrefixCls}-outer`]}>
      <Nav title={name} dispatch={dispatch}/>
      {getContent()}
    </div>
  );
}

export default connect(({ loading, volunteer }) => ({
  loading,
  volunteer,
}))(Volunteer);

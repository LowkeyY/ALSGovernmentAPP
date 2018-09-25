import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, Tabs, Badge, List, Icon } from 'components';
import { getLocalIcon } from 'utils';
import Nav from 'components/nav';
import { routerRedux } from 'dva/router';
import styles from './index.less';

let tabDefaultIndex = 0;
const PrefixCls = 'volunteer',
  Item = List.Item,
  Brief = Item.Brief;


function Volunteer ({ location, dispatch, volunteer }) {
  const { name = '', selectedIndex = 0, grids, lists } = volunteer;
  
  const handleItemOnclick = ({ id, title, name = '公益活动', pathname = 'volunteerdetails' }) => {
      dispatch(routerRedux.push({
        pathname: `/${pathname}`,
        query: {
          name,
          dataId: id
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
                  <span><Icon type={getLocalIcon('/others/number.svg')} size="xxs" /></span>
                  <span>{`${list.baomingrenshu || 0}人`}</span>
                </p>
                <p className={styles[`${PrefixCls}-item`]}>
                  <span><Icon type={getLocalIcon('/others/position.svg')} size="xxs" /></span>
                  <span>{list.address}</span>
                </p>
              </Brief>
            </Item>,
            <div className={styles[`${PrefixCls}-list-state`]}>{list.state}</div>
          </div>
        );
      });
      return <List>{result}</List>;
    },
    
    handleTabClick = (data, index) => {
      dispatch({
        type: 'volunteer/updateState',
        payload: {
          type: index + 1
        }
      });
      dispatch({
        type: 'volunteer/querySelect',
        payload: {
          ...data,
          selected: index
        },
      });
    },
    
    getContent = () => {
      return <List>{activeList(lists, handleItemOnclick)}</List>;
    };
  
  return (
    <div className={styles[`${PrefixCls}-outer`]}>
      <Nav title={name} dispatch={dispatch} />
      <Tabs tabs={grids}
            initialPage={selectedIndex}
            swipeable={false}
            onChange={(tab, index) => {
              handleTabClick(tab, index);
            }}
            onTabClick={(tab, index) => {
              handleTabClick(tab, index);
            }}
      >
        {getContent()}
      </Tabs>
    </div>
  );
}

export default connect(({ loading, volunteer }) => ({
  loading,
  volunteer,
}))(Volunteer);

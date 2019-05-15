import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, Badge, List, Icon, Tabs } from 'components';
import { getLocalIcon } from 'utils';
import Nav from 'components/nav';
import { routerRedux } from 'dva/router';
import NoMessage from 'components/nomessage';
import defaultImg from './bg.png'
import styles from './index.less';

const PrefixCls = 'communitylist',
  Item = List.Item,
  Brief = Item.Brief,
  tabs = [
    { title: '社区活动' },
    { title: '我参与的' },
  ];

function CommunityList ({ location, dispatch, communitylist }) {
  const { name = '', dataList = [], selectedIndex } = communitylist;

  const activeList = (lists, handleItemOnclick) => {
      const result = [];
      lists && lists.map((list, i) => {
        result.push(
          <div className={styles[`${PrefixCls}-listbox`]}>
            <Item className={styles[`${PrefixCls}-box`]}
                  thumb={list.img || defaultImg}
                  multipleLine
                  wrap
                  onClick={handleItemOnclick.bind(null, list)}
            >
              <span>{list.title}</span>
              <Brief>
                <p className={styles[`${PrefixCls}-item`]}>
                  <span><Icon type={getLocalIcon('/others/position.svg')} size="xxs"/></span>
                  <span>{list.hddd}</span>
                </p>
                <p className={styles[`${PrefixCls}-item`]}>
                  {list.hdsj}
                </p>
              </Brief>
            </Item>
            <div className={styles[`${PrefixCls}-list-state`]}>{`报名人数${list.bmrs}`}</div>
          </div>,
        );
      });
      return <List>{result}</List>;
    },
    handleItemOnclick = ({ id, title, name = '社区活动', pathname = 'communitydetails' }) => {
      if (selectedIndex === 0) {
        dispatch(routerRedux.push({
          pathname: `/${pathname}`,
          query: {
            name,
            dataId: id,
          },
        }));
      } else {
        dispatch(routerRedux.push({
          pathname: '/communityjoin',
          query: {
            name,
            id,
          },
        }));
      }
    },
    handleTabClick = (data, index) => {
      dispatch({
        type: 'communitylist/updateState',
        payload: {
          type: index + 1,
        },
      });
      dispatch({
        type: 'communitylist/querySelect',
        payload: {
          ...data,
          selected: index,
        },
      });
    },
    getContent = () => {
      return <List>{activeList(dataList, handleItemOnclick)}</List>;
    };

  return (
    <div className={styles[`${PrefixCls}-outer`]}>
      <Nav title={name} dispatch={dispatch}/>
      <Tabs tabs={tabs}
            initialPage={selectedIndex}
            swipeable={false}
            onChange={(tab, index) => {
              handleTabClick(tab, index);
            }}

      >
        <div>
          <WhiteSpace size="xs"/>
          {dataList.length > 0 ? getContent() : <NoMessage/>}
        </div>
      </Tabs>
    </div>
  );
}

export default connect(({ loading, communitylist }) => ({
  loading,
  communitylist,
}))(CommunityList);

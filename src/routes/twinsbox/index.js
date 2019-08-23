/* eslint-disable react/prop-types,no-shadow */
import React from 'react';
import { connect } from 'dva';
import Nav from 'components/nav';
import { WhiteSpace } from 'components';
import { twinsRow } from 'components/row';
import ListView from 'components/listview';
import { handleListClick } from 'utils/commonevent';
import styles from './index.less';

const PrefixCls = 'twinsbox';

function TwinsBox ({ location, dispatch, twinsbox }) {
  const { lists, name = '', paginations, scrollerTop } = twinsbox,
    onRefresh = (callback) => {
      dispatch({
        type: `${PrefixCls}/queryListview`,
        payload: {
          callback,
          isRefresh: true,
        },
      });
    },
    onEndReached = (callback) => {
      dispatch({
        type: `${PrefixCls}/queryListview`,
        payload: {
          callback,
        },
      });
    },
    onScrollerTop = (top) => {
      if (typeof top !== 'undefined' && !isNaN(top * 1)) {
        dispatch({
          type: `${PrefixCls}/updateState`,
          payload: {
            scrollerTop: top,
          },
        });
      }
    },
    getContents = (lists) => {
      const { current, total, size } = paginations,
        hasMore = (total > 0) && ((current > 1 ? current - 1 : 1) * size < total),
        result = [];
      result.push(
        <ListView
          layoutHeader={''}
          dataSource={lists}
          layoutRow={(rowData, sectionID, rowID) => twinsRow(rowData, sectionID, rowID, handleListClick, dispatch, name)}
          onEndReached={onEndReached}
          onRefresh={onRefresh}
          hasMore={hasMore}
          onScrollerTop={onScrollerTop.bind(null)}
          scrollerTop={scrollerTop}
        />,
      );

      return result;
    };

  return (
    <div >
      <Nav title={name} dispatch={dispatch} />
      <WhiteSpace />
      <div className={styles[`${PrefixCls}-outer`]} >
        {lists.length > 0 && getContents(lists)}
      </div >
    </div >
  );
}

export default connect(({ loading, twinsbox }) => ({
  loading,
  twinsbox,
}))(TwinsBox);

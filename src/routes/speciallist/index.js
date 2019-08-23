/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'dva';
import Nav from 'components/nav';
import { WhiteSpace } from 'components';
import { specialRow, sceneryRow } from 'components/row';
import ListView from 'components/listview';
import { handleBannerClick, handleListClick } from 'utils/commonevent';
import styles from './index.less';

const PrefixCls = 'speciallist';

function SpecialList ({ location, dispatch, speciallist }) {
  const { lists, name = '', paginations, scrollerTop } = speciallist,
    { scenery } = location.query,
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
    getContents = (data) => {
      const { current, total, size } = paginations,
        hasMore = (total > 0) && ((current > 1 ? current - 1 : 1) * size < total);
      return (
        <ListView
          layoutHeader={''}
          dataSource={data}
          layoutRow={(rowData, sectionID, rowID) => {
            if (scenery === 'true') {
              return sceneryRow(rowData, sectionID, rowID, handleListClick, dispatch, name);
            }
            return specialRow(rowData, sectionID, rowID, handleListClick, dispatch, name);
          }}
          onEndReached={onEndReached}
          onRefresh={onRefresh}
          hasMore={hasMore}
          onScrollerTop={onScrollerTop.bind(null)}
          scrollerTop={scrollerTop}
        />
      );
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

export default connect(({ loading, speciallist }) => ({
  loading,
  speciallist,
}))(SpecialList);

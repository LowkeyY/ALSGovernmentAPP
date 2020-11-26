import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, List, SearchBar } from 'components';
import { routerRedux } from 'dva/router';
import Nav from 'components/nav';
import ListView from 'components/listview';
import { powerRow } from 'components/row';
import styles from './index.less';

const PrefixCls = 'powerlist';

function PowerList ({ location, dispatch, powerlist }) {
  const { name = '' } = location.query,
    { scrollerTop = 0, dataList, paginations = {} } = powerlist,
    handlerPowerClick = ({ id }) => {
      dispatch(routerRedux.push(
        {
          pathname: 'powerdetails',
          query: {
            id,
          },
        },
      ));
    },
    onRefresh = (callback) => {
      dispatch({
        type: `${PrefixCls}/getList`,
        payload: {
          callback,
          isRefresh: true,
        },
      });
    },
    onEndReached = (callback) => {
      dispatch({
        type: `${PrefixCls}/getList`,
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
    handlerSearchClick = (e) => {
      dispatch(routerRedux.push(
        {
          pathname: 'powersearch',
        },
      ));
    },
    handlerCancleClick = () => {
      dispatch({
        type: 'powerlist/getList',
      });
    },
    getCurrentView = () => {
      const { current, total, size } = paginations,
        hasMore = (total > 0) && ((current > 1 ? current - 1 : 1) * size < total);
      return (
        <ListView
          layoutHeader={''}
          dataSource={dataList}
          layoutRow={(rowData, sectionID, rowID) => powerRow(rowData, sectionID, rowID, handlerPowerClick)}
          onEndReached={onEndReached}
          onRefresh={onRefresh}
          hasMore={hasMore}
          onScrollerTop={onScrollerTop.bind(null)}
          scrollerTop={scrollerTop}
        />
      );
    };
  return (
    <div>
      <Nav title={name} dispatch={dispatch} />
      <div>
        <SearchBar
          placeholder="查询"
          onFocus={handlerSearchClick}
          showCancelButton
          cancelText={<span>重置</span>}
          onCancel={handlerCancleClick}
        />
      </div>
      <div className={styles[`${PrefixCls}-message-outer`]}>
        {getCurrentView()}
      </div>
    </div>
  );
}

export default connect(({ loading, powerlist }) => ({
  loading,
  powerlist,
}))(PowerList);

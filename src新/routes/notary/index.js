import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, Card } from 'components';
import Nav from 'components/nav';
import { notaryRow } from 'components/row';
import ListView from 'components/listview';
import Layout from 'components';

const PrefixCls = 'notary', 
  { BaseLine } = Layout;
function notary ({ location, dispatch, notary }) {
  const { name = '', index = 0 } = location.query,
    { lists, paginations, scrollerTop } = notary,
    onRefresh = (callback) => {
      dispatch({
        type: `${PrefixCls}/queryListview`,
        payload: {
          callback,
          isRefresh: true
        }
      });
    },
    onEndReached = (callback) => {
      dispatch({
        type: `${PrefixCls}/queryListview`,
        payload: {
          callback
        }
      });
    },
    onScrollerTop = (top) => {
      if (typeof top !== 'undefined' && !isNaN(top * 1)) {
        dispatch({
          type: `${PrefixCls}/updateState`,
          payload: {
            scrollerTop: top
          }
        }); 
      }
    },
    getContents = (lists) => {
      const { current, total, size } = paginations,
        hasMore = (total > 0) && ((current > 1 ? current - 1 : 1) * size < total),
        result = [];
      result.push(
        <ListView layoutHeader={''}
          dataSource={lists}
          layoutRow={notaryRow}
          onEndReached={onEndReached}
          onRefresh={onRefresh}
          hasMore={hasMore}
          onScrollerTop={onScrollerTop.bind(null)}
          scrollerTop={scrollerTop}
        />
      );

      return result;
    };
  return (
    <div>
      <Nav title={name} dispatch={dispatch} />
      <div>
        {lists.length > 0 && getContents(lists)}
      </div>
    </div>
  );
}

export default connect(({ loading, notary }) => ({
  loading,
  notary,
}))(notary);

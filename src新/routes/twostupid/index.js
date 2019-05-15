import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, Tabs } from 'components';
import Nav from 'components/nav';
import ListView from 'components/listview';
import { twoStupidRow } from 'components/row';
import Layout from 'components';


const PrefixCls = 'twostupid', 
  { BaseLine } = Layout;

function Twostupid ({ location, dispatch, twostupid }) {
  const { name = '' } = location.query,
    { selectedIndex, tabs, dataList = [], refreshValue, paginations, scrollerTop } = twostupid;
  const handleTabItemClick = (data, index) => {
      const { value = '' } = data;
      dispatch({
        type: 'twostupid/updateState',
        payload: {
          refreshValue: value,
          selected: index,
        },
      });
      dispatch({
        type: 'twostupid/queryListview',
        payload: {
          refreshValue: value,
          selected: index,
          isRefresh: true
        },
      });
    },

    onRefresh = (refreshValue, callback) => {
      dispatch({
        type: `${PrefixCls}/queryListview`,
        payload: {
          refreshValue,
          callback,
          isRefresh: true
        }
      });
    },
    onEndReached = (refreshValue, callback) => {
      dispatch({
        type: `${PrefixCls}/queryListview`,
        payload: {
          refreshValue,
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
    getContents = (lists, refreshValue) => {
      const { current, total, size } = paginations,
        hasMore = (total > 0) && ((current > 1 ? current - 1 : 1) * size < total),
        result = [];
      result.push(
        <ListView layoutHeader={''}
          dataSource={lists}
          layoutRow={twoStupidRow}
          onEndReached={onEndReached.bind(null, refreshValue)}
          onRefresh={onRefresh.bind(null, refreshValue)}
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
      <WhiteSpace size="md" />
      <Tabs
        initialPage={0}
        page={selectedIndex}
        tabs={tabs}
        swipeable={false}
        onTabClick={handleTabItemClick}
        renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} />}
      >
        <div>
          {dataList.length > 0 && getContents(dataList, refreshValue)}
        </div>
      </Tabs>
    </div>
  );
}

export default connect(({ loading, twostupid }) => ({
  loading,
  twostupid,
}))(Twostupid);

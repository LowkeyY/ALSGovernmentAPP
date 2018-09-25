import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, List } from 'components';
import { routerRedux } from 'dva/router';
import Nav from 'components/nav';
import ListView from 'components/listview';
import { layoutRow } from 'components/row';
import styles from './index.less';
import { handleListClick } from 'utils/commonevent';
import NoMessage from 'components/nomessage';
import Img from './patrymaplist.png';

const PrefixCls = 'patrymaplist',
  Item = List.Item,
  Brief = Item.Brief;

function PatryMapList ({ location, dispatch, patrymaplist }) {
  const { name = '阿拉善左旗' } = location.query,
    { scrollerTop = 0, dataList, paginations = {} } = patrymaplist,
    handlerTaskClick = ({ taskId, taskInfo, taskTitle }) => {
      dispatch(routerRedux.push(
        {
          pathname: 'taskdetails',
          query: {
            taskId,
            taskInfo,
            taskTitle,
          },
        },
      ));
    },
    onRefresh = (callback) => {
      dispatch({
        type: `${PrefixCls}/querylist`,
        payload: {
          callback,
          isRefresh: true
        }
      });
    },
    onEndReached = (callback) => {
      dispatch({
        type: `${PrefixCls}/querylist`,
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
    getCurrentView = () => {
      const { current, total, size } = paginations,
        hasMore = (total > 0) && ((current > 1 ? current - 1 : 1) * size < total);
      return (
        
        <ListView
          layoutHeader={''}
          dataSource={dataList}
          layoutRow={(rowData, sectionID, rowID) => layoutRow(rowData, sectionID, rowID, handleListClick, dispatch, name)}
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
      <div className={styles[`${PrefixCls}-imgbox`]}>
        <img src={Img} alt="" />
      </div>
      <div className={styles[`${PrefixCls}-message-outer`]}>
        {getCurrentView()}
      </div>
    </div>
  );
}

export default connect(({ loading, patrymaplist }) => ({
  loading,
  patrymaplist,
}))(PatryMapList);

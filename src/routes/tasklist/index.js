import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, List } from 'components';
import { routerRedux } from 'dva/router';
import Nav from 'components/nav';
import ListView from 'components/listview';
import { taskRow } from 'components/row';
import styles from './index.less';

const PrefixCls = 'tasklist';

function TaskList ({ location, dispatch, tasklist }) {
  const { name = '' } = location.query,
    { scrollerTop = 0, taskList, paginations = {} } = tasklist,
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
        type: `${PrefixCls}/getTaskList`,
        payload: {
          callback,
          isRefresh: true
        }
      });
    },
    onEndReached = (callback) => {
      dispatch({
        type: `${PrefixCls}/getTaskList`,
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
          dataSource={taskList}
          layoutRow={(rowData, sectionID, rowID) => taskRow(rowData, sectionID, rowID, handlerTaskClick)}
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
      <div className={styles[`${PrefixCls}-message-outer`]}>
        {getCurrentView()}
      </div>
    </div>
  );
}

export default connect(({ loading, tasklist }) => ({
  loading,
  tasklist,
}))(TaskList);

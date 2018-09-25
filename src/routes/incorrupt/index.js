import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, Tabs, List, Layout } from 'components';
import Nav from 'components/nav';
import { layoutRow } from 'components/row';
import ListView from 'components/listview';
import { getImages } from 'utils';
import styles from './index.less';
import { handleListClick } from 'utils/commonevent';

const PrefixCls = 'incorrupt';

function Incorrupt ({ location, dispatch, incorrupt }) {
  const { name = '', index = 0 } = location.query,
    { gridList, selectedIndex, dataList, paginations, scrollerTop, refreshId } = incorrupt;
  
  const onRefresh = (refreshId, callback) => {
      dispatch({
        type: `${PrefixCls}/queryListview`,
        payload: {
          refreshId,
          callback,
          isRefresh: true,
        },
      });
    },
    onEndReached = (refreshId, callback) => {
      dispatch({
        type: `${PrefixCls}/queryListview`,
        payload: {
          refreshId,
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
    getContents = (lists, refreshId) => {
      const { current, total, size } = paginations,
        hasMore = (total > 0) && ((current > 1 ? current - 1 : 1) * size < total),
        result = [];
      result.push(
        <ListView layoutHeader={''} dataSource={lists}
                  layoutRow={(rowData, sectionID, rowID) => layoutRow(rowData, sectionID, rowID, handleListClick, dispatch, name)}
                  onEndReached={onEndReached.bind(null, refreshId)}
                  onRefresh={onRefresh.bind(null, refreshId)} hasMore={hasMore}
                  onScrollerTop={onScrollerTop.bind(null)}
                  scrollerTop={scrollerTop}
        />,
      );
      return result;
    },
    getCurrentView = () => <div>{getContents(dataList)}</div>,
    handleTabClick = (data, index) => {
      const { externalUrl = '', title = '' } = data;
      if (externalUrl !== '' && externalUrl.startsWith('http')) {
        if (cnOpen) {
          cnOpen(externalUrl);
        } else {
          dispatch(routerRedux.push({
            pathname: 'iframe',
            query: {
              name: title,
              externalUrl: externalUrl,
            },
          }));
        }
      }else {
        const { route = '', id } = data;
        dispatch({
          type: 'incorrupt/updateState',
          payload: {
            refreshId: id,
          },
        });
        dispatch({
          type: 'incorrupt/queryListview',
          payload: {
            refreshId: id,
            selected: index,
            isRefresh: true,
          },
        });
      }
    };
  return (
    <div>
      <Nav title={name} dispatch={dispatch} />
      <div className={styles[`${PrefixCls}-outer`]}>
        
        <div className={styles[`${PrefixCls}-fiximg`]}>
          <img src={require('./jiandu.jpg')} alt="" />
        </div>
        <Tabs
          initialPage={0}
          page={selectedIndex}
          tabs={gridList}
          swipeable={false}
          onTabClick={handleTabClick}
        >
          {getCurrentView()}
        </Tabs>
      </div>
    </div>
  );
}

export default connect(({ loading, incorrupt }) => ({
  loading,
  incorrupt,
}))(Incorrupt);

import React from 'react';
import { connect } from 'dva';
import { WingBlank, WhiteSpace, Tabs, Badge, List, SearchBar, Layout } from 'components';
import Nav from 'components/nav';
import { routerRedux } from 'dva/router';
import { layoutRow } from 'components/row';
import ListView from 'components/listview';
import Banner from 'components/banner';
import { handleBannerClick, handleListClick } from 'utils/commonevent';
import styles from './index.less';

const PrefixCls = 'lanmutabshouhu';

function Comp ({ location, dispatch, lanmutabshouhu, app }) {
  const { name = '', selectedIndex = 0, grids, lists, bannerDatas, paginations, scrollerTop, refreshId } = lanmutabshouhu,
    { noViewCount = 0 } = app,
    onRefresh = (refreshId, callback) => {
      dispatch({
        type: `${PrefixCls}/queryListview`,
        payload: {
          refreshId,
          callback,
          isRefresh: true
        }
      });
    },
    onEndReached = (refreshId, callback) => {
      dispatch({
        type: `${PrefixCls}/queryListview`,
        payload: {
          refreshId,
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
    getContents = (lists, refreshId) => {
      const { current, total, size } = paginations,
        hasMore = (total > 0) && ((current > 1 ? current - 1 : 1) * size < total),
        result = [];
      result.push(
        <ListView layoutHeader={''}
          dataSource={lists}
          layoutRow={(rowData, sectionID, rowID) => layoutRow(rowData, sectionID, rowID, handleListClick, dispatch, name)}
          onEndReached={onEndReached.bind(null, refreshId)}
          onRefresh={onRefresh.bind(null, refreshId)}
          hasMore={hasMore}
          onScrollerTop={onScrollerTop.bind(null)}
          scrollerTop={scrollerTop}
        />
      );
      return result;
    },
    getTabs = () => {
      const result = [];
      grids.map((grid, i) => {
        const { title = '' } = grid;
        if (title !== '') {
          result.push({ ...grid });
        }
      });
      return result;
    },
    getCurrentView = () => <div>{lists.length > 0 && getContents(lists, refreshId)}</div>,
    handleTabClick = (data, index) => {
      const { route = '', title = '', id } = data;
      if (route === '') {
        dispatch({
          type: 'lanmutabshouhu/updateState',
          payload: {
            refreshId: id
          },
        });
        dispatch({
          type: 'lanmutabshouhu/queryListview',
          payload: {
            refreshId: id,
            selected: index,
            isRefresh: true
          },
        });
      } else {
        dispatch(routerRedux.push({
          pathname: `/${route}`,
          query: {
            name: title,
            id,
          },
        }));
      }
    },
    bannerProps = {
      datas: bannerDatas,
      dispatch,
      handleClick: (data) => {
      
      },
    };
  return (
    <div className={styles[`${PrefixCls}-outer`]}>
      <Nav title={name} dispatch={dispatch} />
      <Banner {...bannerProps} />
      <div className={styles[`${PrefixCls}-tabbox`]}>
        <Tabs
          initialPage={0}
          page={selectedIndex}
          tabs={getTabs()}
          swipeable={false}
          onTabClick={handleTabClick}
        >
          {getCurrentView()}
        </Tabs>
        <div className={styles[`${PrefixCls}-tabbox-count`]}>{noViewCount * 1 > 0 ?
          <Badge text={noViewCount * 1} overflowCount={99} /> : ''}</div>
      </div>
    </div>
  );
}

export default connect(({ loading, lanmutabshouhu, app }) => ({
  loading,
  lanmutabshouhu,
  app
}))(Comp);

import React from 'react';
import { connect } from 'dva';
import { WingBlank, WhiteSpace, Tabs, Badge, List, SearchBar } from 'components';
import Nav from 'components/nav';
import { routerRedux } from 'dva/router';
import Banner from 'components/banner';
import { layoutRow } from 'components/row';
import ListView from 'components/listview';
import styles from './index.less';
import { handleGridClick, handleTopLineClick, handleListClick } from 'utils/commonevent';

const PrefixCls = 'derenitems',
  Item = List.Item;

function Derenitems ({ location, dispatch, derenitems }) {
  const { name = '', selectedIndex = 0, tabs, itemData, bannersData, paginations, scrollerTop, refreshId } = derenitems,
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
    getBanners = () => {
      bannersData && bannersData.map(item => {
        item.url = item.image;
      });
      return bannersData;
    },
    handleTabClick = (data, index) => {
      const { externalUrl = '', title } = data;
      if (externalUrl !== '' && externalUrl.startsWith('http')) {
        if (cnOpen) {
          cnOpen(externalUrl);
        } else {
          dispatch(routerRedux.push({
            pathname: 'iframe',
            query: {
              name: title,
              externalUrl,
            },
          }));
        }
      } else {
        const { route = '', title = '', id } = data;
        if (route === '') {
          dispatch({
            type: 'derenitems/updateState',
            payload: {
              refreshId: id
            },
          });
          dispatch({
            type: 'derenitems/queryListview',
            payload: {
              refreshId: id,
              selected: index,
              isRefresh: true
            },
          });
        }
      }
    },
    handleBannerClick = (data, index) => {
      const { externalUrl = '', title, id, pathname = 'details' } = data;
      if (externalUrl !== '' && externalUrl.startsWith('http')) {
        if (cnOpen) {
          cnOpen(externalUrl);
        } else {
          dispatch(routerRedux.push({
            pathname: 'iframe',
            query: {
              name: title,
              externalUrl,
            },
          }));
        }
      } else {
        dispatch(routerRedux.push({
          pathname: `/${pathname}`,
          query: {
            name,
            dataId: id,
          },
        }));
      }
    };
  
  return (
    <div className={styles[`${PrefixCls}-outer`]}>
      <Nav title={name} dispatch={dispatch} />
      {getBanners().length > 0 && <Banner datas={getBanners()} handleClick={handleBannerClick} />}
      <Tabs
        initialPage={0}
        page={selectedIndex}
        tabs={tabs}
        swipeable={false}
        useOnPan={tabs.length > 3}
        onTabClick={handleTabClick}
        renderTabBar={props => <Tabs.DefaultTabBar {...props} page={4} />}
      >
        <div>
          {itemData.length > 0 && getContents(itemData, refreshId)}
        </div>
      </Tabs>
    </div>
  
  );
}

export default connect(({ loading, derenitems }) => ({
  loading,
  derenitems,
}))(Derenitems);

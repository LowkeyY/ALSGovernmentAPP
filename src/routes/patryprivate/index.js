import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, Tabs, List, SearchBar } from 'components';
import Nav from 'components/nav';
import { routerRedux } from 'dva/router';
import Banner from 'components/banner';
import { layoutRow } from 'components/row';
import ListView from 'components/listview';
import { handleBannerClick, handleListClick } from 'utils/commonevent';
import styles from './index.less';

const PrefixCls = 'patryprivate';

function Patryprivate ({ location, dispatch, patryprivate }) {
  const { name = '', selectedIndex = 0, tabs, itemData, bannersData, paginations, scrollerTop, refreshId } = patryprivate,
    onRefresh = (refreshId, callback) => {
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
        <ListView layoutHeader={''}
                  dataSource={lists}
                  layoutRow={(rowData, sectionID, rowID) => layoutRow(rowData, sectionID, rowID, handleListClick, dispatch, name)}
                  onEndReached={onEndReached.bind(null, refreshId)}
                  onRefresh={onRefresh.bind(null, refreshId)}
                  hasMore={hasMore}
                  onScrollerTop={onScrollerTop.bind(null)}
                  scrollerTop={scrollerTop}
        />,
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
        dispatch(routerRedux.push({
          pathname: 'iframe',
          query: {
            name: title,
            externalUrl,
          },
        }));
      } else {
        const { route = '', title = '', id } = data;
        if (route === '') {
          dispatch({
            type: 'patryprivate/updateState',
            payload: {
              refreshId: id,
              scrollerTop: 0,
            },
          });
          dispatch({
            type: 'patryprivate/queryListview',
            payload: {
              refreshId: id,
              selected: index,
              isRefresh: true,
            },
          });
        }
      }
    },
    handleDonationClick = () => {
      dispatch(routerRedux.push({
        pathname: '/opinion',
        query: {
          name: '意见反馈',
          isPatry: true,
        },
      }));
    },
    renderNav = () => {
      return (<div onClick={handleDonationClick}>意见反馈</div>);
    };

  return (
    <div className={styles[`${PrefixCls}-outer`]}>
      <Nav title={name} dispatch={dispatch} renderNavRight={renderNav()} />
      {getBanners().length > 0 &&
      <Banner datas={getBanners()} dispatch={dispatch} name={name} handleClick={handleBannerClick} />}
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

export default connect(({ loading, patryprivate }) => ({
  loading,
  patryprivate,
}))(Patryprivate);

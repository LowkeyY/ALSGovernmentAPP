import React from 'react';
import { connect } from 'dva';
import { WingBlank, WhiteSpace, Tabs, Badge, List, SearchBar } from 'components';
import Nav from 'components/nav';
import { getImages } from 'utils';
import { routerRedux } from 'dva/router';
import { layoutRow } from 'components/row';
import ListView from 'components/listview';
import Banner from 'components/banner';
import styles from './index.less';

const PrefixCls = 'threebig',
  Item = List.Item,
  Brief = Item.Brief;

function Threebig ({ location, dispatch, threebig }) {
  const { name = '', selectedIndex = 0, tabs, itemData, bannersData, fixData, paginations, scrollerTop, refreshId } = threebig,
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
    getContents = (lists, refreshId, fixData, selectedIndex) => {
      const { current, total, size } = paginations,
        hasMore = (total > 0) && ((current > 1 ? current - 1 : 1) * size < total),
        result = [];
      if (selectedIndex != 0) {
        result.push(
          getFixColumn(fixData)
        );
      }
      result.push(
        <ListView layoutHeader={''}
          dataSource={lists}
          layoutRow={(rowData, sectionID, rowID) => layoutRow(rowData, sectionID, rowID, handleItemOnclick)}
          onEndReached={onEndReached.bind(null, refreshId)}
          onRefresh={onRefresh.bind(null, refreshId)}
          hasMore={hasMore}
          onScrollerTop={onScrollerTop.bind(null)}
          scrollerTop={scrollerTop}
        />
      );
      return result;
    },
    handleFixImgClick = ({ id, title, route }) => {
      dispatch(routerRedux.push({
        pathname: `/${route}`,
        query: {
          id,
          name: title,
        },
      }));
    },
    handleFixItemClick = ({ id, title, route }) => {
      dispatch(routerRedux.push({
        pathname: `/${route}`,
        query: {
          id,
          name: title,
        },
      }));
    },
    getFixColumn = (fixData) => {
      if (Array.isArray(fixData)) {
        const result = [];
        if (fixData.length == 2) {
          fixData.map((data, i) => {
            result.push(<div key={data.id} className={styles[`${PrefixCls}-items`]} onClick={handleFixItemClick.bind(this, data)}>
              <img src={getImages(data.image)} alt="" />
              <span>{data.title}</span>
            </div>);
          });

          return (<div className={styles[`${PrefixCls}-fixBox`]} >
            {result}
          </div>);
        } else if (fixData.length == 1) {
          return fixData.map((data, i) => {
            return (<span key={data.id} className={styles[`${PrefixCls}-fiximg`]} onClick={handleFixImgClick.bind(this, data)}>
              <img src={getImages(data.image)} alt="" />
            </span>);
          });
        } 
        return '';
      }
    },
    getBanners = () => {
      bannersData && bannersData.map(item => {
        item.url = item.image;
      });
      return bannersData;
    },
    handleTabClick = (data, index) => {
      const { externalUrl = '', title, id = '' } = data;
      if (externalUrl != '' && externalUrl.startsWith('http')) {
        dispatch(routerRedux.push({
          pathname: 'iframe',
          query: {
            name: title,
            externalUrl,
          },
        }));
      } else {
        if (index != 0) {
          dispatch({
            type: 'threebig/updateState',
            payload: {
              refreshId: id
            },
          });
          dispatch({
            type: 'threebig/queryListview',
            payload: {
              refreshId: id,
              selected: index,
              isRefresh: true
            },
          });
          dispatch({
            type: 'threebig/queryOthers',
            payload: {
              id,
            },
          });
        }
        dispatch({
          type: 'threebig/updateState',
          payload: {
            refreshId: id
          },
        });
        dispatch({
          type: 'threebig/queryListview',
          payload: {
            refreshId: id,
            selected: index,
            isRefresh: true
          },
        });
      }
    },
    handleBannerClick = (data, index) => {
      const { externalUrl = '', title, id, pathname = 'details' } = data;
      if (externalUrl != '' && externalUrl.startsWith('http')) {
        dispatch(routerRedux.push({
          pathname: 'iframe',
          query: {
            name: title,
            externalUrl,
          },
        }));
      } else {
        dispatch(routerRedux.push({
          pathname: `/${pathname}`,
          query: {
            name,
            dataId: id,
          },
        }));
      }
    },
    handleItemOnclick = ({ pathname = 'details', id }) => {
      dispatch(routerRedux.push({
        pathname: `/${pathname}`,
        query: {
          name,
          dataId: id,
        },
      }));
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
        onTabClick={handleTabClick}
        renderTabBar={props => <Tabs.DefaultTabBar {...props} page={2} />}
      >
        <div>
          {itemData.length > 0 && getContents(itemData, refreshId, fixData, selectedIndex)}
        </div>
      </Tabs>
    </div>

  );
}

export default connect(({ loading, threebig }) => ({
  loading,
  threebig,
}))(Threebig);

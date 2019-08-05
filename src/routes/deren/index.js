import React from 'react';
import { connect } from 'dva';
import Nav from 'components/nav';
import { routerRedux } from 'dva/router';
import { SegmentedControl, WingBlank, WhiteSpace, List, SearchBar } from 'components';
import Banner from 'components/banner/index';
import { multipleRow } from 'components/multipleRow';
import ListView from 'components/listview';
import { handleGridClick, handleBannerClick, handleListClick } from 'utils/commonevent';
import FixBanner from 'components/fixBanner';
import { getDefaultBg } from 'utils';
import styles from './index.less';

const PrefixCls = 'deren';

function Comp ({ location, dispatch, deren }) {
  const { bannerDatas, lists, grids, name = '', paginations, scrollerTop, fixBanner } = deren,
    handleItemOnclick = ({ externalUrl = '', id = '', route = 'details' }) => {
      if (externalUrl != '' && externalUrl.startsWith('http')) {
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
          pathname: `/${route}`,
          query: {
            name,
            dataId: id,
          },
        }));
      }
    },
    onRefresh = (params, callback) => {
      console.log(`${PrefixCls}-onRefresh`);
      dispatch({
        type: `${PrefixCls}/queryListview`,
        payload: {
          ...params,
          callback,
          isRefresh: true,
        },
      });
    },
    onEndReached = (params, callback) => {
      console.log(`${PrefixCls}-onEndReached`);
      dispatch({
        type: `${PrefixCls}/queryListview`,
        payload: {
          ...params,
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
    getContents = (lists) => {
      const result = [],
        { title = '', id = '', items = [] } = lists;
      if (title !== '' && items.length > 0) {
        const { current, total, size } = paginations,
          hasMore = (total > 0) && ((current > 1 ? current - 1 : 1) * size < total);
        result.push(
          <ListView
            layoutHeader={() => title}
            dataSource={items}
            layoutRow={(rowData, sectionID, rowID) => multipleRow(rowData, sectionID, rowID, handleListClick, dispatch, name)}
            onEndReached={onEndReached.bind(null, { id, title })}
            onRefresh={onRefresh.bind(null, { id, title })}
            hasMore={hasMore}
            onScrollerTop={onScrollerTop.bind(null)}
            scrollerTop={scrollerTop}
          />,
        );
      }
      return result;
    },
    getFixedItem = () => {
      return grids && grids.map(item => (
        <div
          key={item.id}
          className={styles.twinsOuter}
          onClick={handleGridClick.bind(null, item, dispatch)}
        >
          <div className={styles.img}>
            <div className={styles.image}
                 style={{ backgroundImage: `url(${getDefaultBg(item.icon)})` }}>
            </div>
          </div>
          <div className={styles.twinsTitle}>
            {item.title}
          </div>
        </div>
      ));
    },

    bannerProps = {
      datas: bannerDatas,
      handleClick: handleItemOnclick,
    };
  return (
    <div>
      <Nav title={name} dispatch={dispatch} />
      {bannerDatas.length > 0 && <Banner {...bannerProps} />}
      <div className={styles.grid}>{grids.length > 0 &&
      getFixedItem()
      }</div>
      <div>
        {fixBanner.length > 0 && fixBanner.map((item, i) =>
          <FixBanner
            key={i}
            datas={item}
            dispatch={dispatch}
            handleClick={handleGridClick}
          />)
        }
      </div>
      <WhiteSpace size='xs'/>
      {lists.length > 0 && getContents(lists[0])}
    </div>
  );
}

export default connect(({ loading, deren }) => ({
  loading,
  deren,
}))(Comp);

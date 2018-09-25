import React from 'react';
import { connect } from 'dva';
import Nav from 'components/nav';
import { routerRedux } from 'dva/router';
import { WhiteSpace } from 'antd-mobile';
import Banner from 'components/banner/index';
import { layoutRow } from 'components/row';
import ListView from 'components/listview';
import Menu from 'components/menu/index';
import { handleGridClick, handleBannerClick, handleListClick } from 'utils/commonevent';
import styles from './index.less';

const PrefixCls = 'lvyou';

function Lvyou ({ location, dispatch, lvyou }) {
  const { bannerDatas, lists, grids, name = '', isScroll, paginations, scrollerTop } = lvyou,
    handleScroll = (e) => {
      if (e.target) {
        const scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop),
          curScroll = scrollTop > 0;
        if (isScroll !== curScroll) {
          dispatch({
            type: 'lvyou/updateState',
            payload: {
              isScroll: curScroll,
            },
          });
        }
      }
    },
    onRefresh = (params, callback) => {
      dispatch({
        type: `${PrefixCls}/queryListview`,
        payload: {
          ...params,
          callback,
          isRefresh: true
        }
      });
    },
    onEndReached = (params, callback) => {
      dispatch({
        type: `${PrefixCls}/queryListview`,
        payload: {
          ...params,
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
      const result = [],
        { title = '', id = '', items = [] } = lists;
      if (title !== '' && items.length > 0) {
        const { current, total, size } = paginations,
          hasMore = (total > 0) && ((current > 1 ? current - 1 : 1) * size < total);
        
        result.push(
          <ListView layoutHeader={() => title}
                    dataSource={items}
                    layoutRow={(rowData, sectionID, rowID) => layoutRow(rowData, sectionID, rowID, handleListClick, dispatch, name)}
                    onEndReached={onEndReached.bind(null, { id, title })}
                    onRefresh={onRefresh.bind(null, { id, title })}
                    hasMore={hasMore}
                    onScrollerTop={onScrollerTop.bind(null)}
                    scrollerTop={scrollerTop}
          />
        );
      }
      return result;
    },
    bannerProps = {
      datas: bannerDatas,
      handleClick: handleBannerClick,
      dispatch: dispatch,
      name
    },
    handleSearchClick = ({ id = '' }) => {
      dispatch(routerRedux.push({
        pathname: '/search',
        query: {
          router: PrefixCls,
          id
        },
      }));
    };
  
  return (
    <div onTouchStart={handleScroll} onTouchEnd={handleScroll}>
      <Nav title={name} dispatch={dispatch} />
      {bannerDatas.length > 0 && <Banner {...bannerProps} />}
      <div className={styles[`${PrefixCls}-grids`]}>
        {grids.length > 0 && <Menu handleGridClick={handleGridClick} dispatch={dispatch} datas={grids} />}
      </div>
      <WhiteSpace size="xs" />
      {lists.length > 0 && getContents(lists[0])}
    </div>
  );
}

export default connect(({ loading, lvyou }) => ({
  loading,
  lvyou,
}))(Lvyou);

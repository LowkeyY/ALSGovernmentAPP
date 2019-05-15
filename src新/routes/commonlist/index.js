import React from 'react';
import { connect } from 'dva';
import { WingBlank, WhiteSpace, SearchBar } from 'components';
import { layoutRow } from 'components/row';
import ListView from 'components/listview';
import Nav from 'components/nav';
import { routerRedux } from 'dva/router';
import Banner from 'components/banner';
import Menu from 'components/menu/index';
import { handleGridClick, handleBannerClick, handleListClick } from 'utils/commonevent';
import styles from './index.less';

const PrefixCls = 'commonlist';
const CommonList = ({ loading, location, dispatch, commonlist, app }) => {
  const { isLogin } = app;
  const { name = '' } = location.query, 
    { grids, paginations, scrollerTop, refreshId, banners, lists } = commonlist;
  const onRefresh = (params, callback) => {
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
    handleSearchClick = ({ id = '' }) => {
      dispatch(routerRedux.push({
        pathname: '/search',
        query: {
          router: PrefixCls,
          id
        },
      }));
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
    };
  return (
    <div>
      <Nav title={name} dispatch={dispatch} />
      <SearchBar placeholder={`在${name || '此页面'}中搜索`}
        maxLength={20}
        onFocus={handleSearchClick.bind(this, commonlist)}
      />
      {banners.length > 0 && <Banner datas={banners} dispatch={dispatch} name={name} handleClick={handleBannerClick} />
      }
      <div className={styles[`${PrefixCls}-grids`]}>
        {grids.length > 0 &&
        <Menu handleGridClick={handleGridClick} columnNum={3} isLogin={isLogin} dispatch={dispatch} datas={grids} />}
      </div>
      {lists.length > 0 && getContents(lists[0])}
    </div>
  );
};

export default connect(({ loading, commonlist, app }) => ({
  loading,
  commonlist,
  app
}))(CommonList);

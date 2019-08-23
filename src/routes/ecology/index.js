import React from 'react';
import { connect } from 'dva';
import Nav from 'components/nav';
import { routerRedux } from 'dva/router';
import { SegmentedControl, WingBlank, WhiteSpace, List, SearchBar, Layout } from 'components';
import { getImages, getDefaultBg } from 'utils';
import { layoutRow } from 'components/row';
import ListView from 'components/listview';
import Banner from 'components/banner';
import { handleGridClick, handleBannerClick, handleListClick } from 'utils/commonevent';
import styles from './index.less';

const PrefixCls = 'ecology';

function Ecology ({ location, dispatch, ecology }) {
  const { name = '' } = location.query,
    { banners, grids, lists, paginations, scrollerTop } = ecology,
    getBannerDatas = (bannerDatas) => {
      bannerDatas && bannerDatas.map(item => {
        item.url = item.image;
      });
      return bannerDatas;
    },
    onRefresh = (params, callback) => {
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
    getContents = (lists = []) => {
      const result = [],
        { title = '', id = '', items = [] } = lists;
      if (title !== '' && items.length > 0) {
        const { current, total, size } = paginations,
          hasMore = (total > 0) && ((current > 1 ? current - 1 : 1) * size < total);
        result.push(
          <ListView
            layoutHeader={() => title}
            dataSource={items}
            layoutRow={(rowData, sectionID, rowID) => layoutRow(rowData, sectionID, rowID, handleListClick, dispatch, name)}
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
            <div
              className={styles.image}
              style={{ backgroundImage: `url(${getDefaultBg(item.icon)})` }}
            />
          </div>
          <div className={styles.twinsTitle}>
            {item.title}
          </div>
        </div>
      ));
    },
    handleSearchClick = ({ id = '' }) => {
      dispatch(routerRedux.push({
        pathname: '/search',
        query: {
          router: PrefixCls,
          id,
        },
      }));
    };
  return (
    <div>
      <Nav title={name} dispatch={dispatch} />
      <SearchBar
        placeholder={`在${name || '此页面'}中搜索`}
        maxLength={20}
        onFocus={handleSearchClick.bind(this, ecology)}
      />
      {
        banners.length ?
          <Banner datas={getBannerDatas(banners)} dispatch={dispatch} name={name} handleClick={handleBannerClick} />
          :
          null
      }
      <div className={styles.grid}>{grids.length > 0 &&
      getFixedItem()
      }</div>
      <WhiteSpace size="xs" />
      <div>
        {lists.length > 0 && getContents(lists[0])}
      </div>
    </div>
  );
}

export default connect(({ loading, ecology }) => ({
  loading,
  ecology,
}))(Ecology);

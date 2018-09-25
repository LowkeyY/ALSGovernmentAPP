import React from 'react';
import { connect } from 'dva';
import Nav from 'components/nav';
import { routerRedux } from 'dva/router';
import { SegmentedControl, WingBlank, WhiteSpace, List, SearchBar } from 'components';
import Banner from 'components/banner/index';
import { layoutRow } from 'components/row';
import ListView from 'components/listview';
import { handleBannerClick, handleListClick } from 'utils/commonevent';
import styles from './index.less';

const PrefixCls = 'lanmusub',
  Item = List.Item;

function Comp ({ location, dispatch, lanmusub }) {
  const { bannerDatas, lists, name = '', paginations, scrollerTop } = lanmusub,
    onRefresh = (callback) => {
      dispatch({
        type: `${PrefixCls}/queryListview`,
        payload: {
          callback,
          isRefresh: true
        }
      });
    },
    onEndReached = (callback) => {
      dispatch({
        type: `${PrefixCls}/queryListview`,
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
    getContents = (lists) => {
      const { current, total, size } = paginations,
        hasMore = (total > 0) && ((current > 1 ? current - 1 : 1) * size < total),
        result = [];
      result.push(
        <ListView layoutHeader={''}
                  dataSource={lists}
                  layoutRow={(rowData, sectionID, rowID) => layoutRow(rowData, sectionID, rowID, handleListClick, dispatch, name)}
                  onEndReached={onEndReached}
                  onRefresh={onRefresh}
                  hasMore={hasMore}
                  onScrollerTop={onScrollerTop.bind(null)}
                  scrollerTop={scrollerTop}
        />
      );
      
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
    <div>
      <Nav title={name} dispatch={dispatch} />
      <SearchBar
        placeholder={`在${name || '此页面'}中搜索`}
        maxLength={20}
        onFocus={handleSearchClick.bind(this, lanmusub)}
      />
      {bannerDatas.length > 0 && <Banner {...bannerProps} />}
      <WhiteSpace size="xs" />
      {lists.length > 0 && getContents(lists)}
    </div>
  );
}

export default connect(({ loading, lanmusub }) => ({
  loading,
  lanmusub,
}))(Comp);

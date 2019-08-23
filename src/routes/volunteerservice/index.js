/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'dva';
import { WingBlank, WhiteSpace, Tabs, Badge, List, SearchBar } from 'components';
import Nav from 'components/nav';
import { routerRedux } from 'dva/router';
import { multipleRow } from 'components/multipleRow';
import ListView from 'components/listview';
import Banner from 'components/banner';
import { handleListClick, handleBannerClick } from 'utils/commonevent';
import { getDefaultBg, getLocalIcon } from 'utils';
import styles from './index.less';

const PrefixCls = 'volunteerservice';

function Comp ({ location, dispatch, volunteerservice }) {
  const { name = '', lists, bannerDatas, grids, paginations, scrollerTop, refreshId } = volunteerservice,
    handleFiexdItemOnclick = ({ route, id, title, active }) => {
      if (route) {
        dispatch(routerRedux.push({
          pathname: `/${route}`,
          query: {
            name: title,
            id,
            active,
          },
        }));
      }
    },
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
    getContents = (data) => {
      const { current, total, size } = paginations,
        hasMore = (total > 0) && ((current > 1 ? current - 1 : 1) * size < total),
        result = [],
        { title = '', items } = data;
      if (items.length > 0) {
        result.push(
          <ListView
            layoutHeader={() => title}
            titleIcon={getLocalIcon('/others/voluteer.svg')}
            dataSource={items}
            layoutRow={(rowData, sectionID, rowID) => multipleRow(rowData, sectionID, rowID, handleListClick, dispatch, name)}
            onEndReached={onEndReached.bind(null, refreshId)}
            onRefresh={onRefresh.bind(null, refreshId)}
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
          className={styles[`${PrefixCls}-twins-outer`]}
          onClick={handleFiexdItemOnclick.bind(null, item)}
        >
          <div className={styles[`${PrefixCls}-twins-outer-img`]}>
            <div
              className={styles[`${PrefixCls}-twins-outer-img-image`]}
              style={{ backgroundImage: `url(${getDefaultBg(item.icon)})` }}
            />
          </div>
          <div className={styles[`${PrefixCls}-twins-title`]}>
            {item.title}
          </div>
        </div>
      ));
    },
    getCurrentView = () => {
      const result = [];
      if (bannerDatas.length > 0) {
        const props = {
          datas: bannerDatas,
          handleClick: (data) => handleBannerClick(data, dispatch),
        };
        result.push(<Banner {...props} />);
      }
      result.push(<div className={styles[`${PrefixCls}-gridbox`]}>{getFixedItem()}</div>);
      if (lists.length > 0) result.push(getContents(lists[0]));
      return <div>{result}</div>;
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
    <div className={styles[`${PrefixCls}-outer`]}>
      <Nav title={name} dispatch={dispatch} />
      <SearchBar
        placeholder={`在${lists && lists[0] && lists[0].title || '此页面'}中搜索`}
        maxLength={20}
        onFocus={handleSearchClick.bind(this, volunteerservice)}
      />
      {getCurrentView()}
    </div>

  );
}

export default connect(({ loading, volunteerservice }) => ({
  loading,
  volunteerservice,
}))(Comp);

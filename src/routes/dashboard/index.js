/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Layout, WhiteSpace, Icon, List } from 'components';
import Menu from 'components/menu/index';
import { getLocalIcon } from 'utils';
import { multipleRow } from 'components/multipleRow';
import ListView from 'components/listview';
import HeadLine from 'components/headline';
import { handleGridClick, handleTopLineClick, handleListClick } from 'utils/commonevent';
import styles from './index.less';
import NoContent from '../../components/nocontent';

const PrefixCls = 'dashboard';

function Dashboard ({ dashboard, loading, dispatch, app }) {
  const { Header } = Layout,
    { bannerDatas, isScroll, grids, selectedIndex = 0, weath, dataList, scrollerTop, newsData } = dashboard,
    { isLogin, users: { useravatar } } = app;
  const { users: { usertype } } = app;
  const getWeather = (weaths) => {
      const { date = '', type = '', notice = '', fl = '', fx = '', high = '', low = '' } = weaths;
      const info = `${date} ${type} ${notice}`,
        temperature = `${high}~${low} ${fl} ${fx}`;
      const arr = [{ text: info }, { text: temperature }];
      return arr;
    },
    handleMoreCilck = (newsData = {}) => {
      const { id = '' } = newsData;
      dispatch(routerRedux.push({
        pathname: '/lanmusub',
        query: {
          name: '动态新闻',
          id,
        },
      }));
    },
    headLineProps = {
      bannerDatas,
      handleClick: handleTopLineClick,
    },
    handleScroll = (e) => {
      if (e.target) {
        const ddst = document.documentElement.scrollTop,
          dbst = document.body.scrollTop,
          scrollTop = Math.max(ddst, dbst),
          curScroll = scrollTop > 0;
        if (isScroll !== curScroll) {
          dispatch({
            type: 'dashboard/updateState',
            payload: {
              isScroll: curScroll,
            },
          });
        }
      }
    },
    getContent = () => (
      <Menu
        handleGridClick={handleGridClick}
        dispatch={dispatch}
        datas={grids}
        columnNum={5}
        isLogin={isLogin}
        usertype={usertype}
      />
    ),

    onRefresh = (params, callback) => {
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
    renderFooter = () => (
      <div
        className={styles[`${PrefixCls}-outer-footer`]}
        onClick={handleMoreCilck.bind(null, newsData)}
      >
        >>点击查看更多
      </div>
    ),
    getContents = (patryList, dispatch) => {
      const result = [],
        { title = '', id = '', items = [] } = patryList;
      if (title !== '' && items.length > 0) {
        result.push(
          <ListView
            dataSource={items}
            layoutRow={(rowData, sectionID, rowID) => multipleRow(rowData, sectionID, rowID, handleListClick, dispatch, title)}
            onRefresh={onRefresh.bind(null, { id, title })}
            hasMore={false}
            hasFooter={false}
            onScrollerTop={onScrollerTop.bind(null)}
            scrollerTop={scrollerTop}
            layoutFooter={renderFooter}
          />,
        );
      }
      return result;
    };

  return (
    <div className={styles[`${PrefixCls}-outer`]} onTouchStart={handleScroll} onTouchEnd={handleScroll}>
      <div className={styles[`${PrefixCls}-top`]}>
        <Header dispatch={dispatch} isLogin={isLogin} useravatar={useravatar} />
        <HeadLine {...headLineProps} dispatch={dispatch} selectedIndex={selectedIndex} datas={getWeather(weath)} />
      </div>
      <div className={styles[`${PrefixCls}-outer-content`]}>{getContent()}</div>
      <WhiteSpace size="xs" />
      <div className={styles[`${PrefixCls}-container`]}>
        {loading ? <NoContent isLoading={loading} /> : dataList.length > 0 && getContents(dataList[0], dispatch)}
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  dashboard: PropTypes.object,
  loading: PropTypes.object,
};

export default connect(({ dashboard, loading, app }) => ({
  dashboard,
  loading: loading.effects[`${PrefixCls}/query`],
  app,
}))(Dashboard);

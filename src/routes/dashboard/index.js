import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Layout, WhiteSpace, Icon, List } from 'components';
import Menu from 'components/menu/index';
import styles from './index.less';
import { getLocalIcon } from 'utils';
import { layoutRow } from 'components/row';
import ListView from 'components/listview';
import TitleBox from 'components/titlecontainer';
import HeadLine from 'components/headline';
import { handleGridClick, handleTopLineClick, handleListClick } from 'utils/commonevent';

const PrefixCls = 'dashboard',
  Item = List.Item

function Dashboard ({ dashboard, loading, dispatch, app }) {
  const { Header } = Layout,
    { bannerDatas, isScroll, grids, selectedIndex = 0, weath, newsList, scrollerTop, newsData } = dashboard, { isLogin } = app, { headTitle = '动态新闻' } = newsData;
  
  const getWeather = (weath) => {
      const { date = '', type = '', notice = '', fl = '', fx = '', high = '', low = '' } = weath;
      const info = `${date} ${type} ${notice}`,
        temperature = `${high}~${low} ${fl} ${fx}`;
      const arr = [{ text: info }, { text: temperature }];
      return arr;
    },
    handleMoreCilck = (newsData = {}) => {
      const { id = '', headTitle = '' } = newsData;
      dispatch(routerRedux.push({
        pathname: `/lanmusub`,
        query: {
          name: '动态新闻',
          id,
        },
      }));
    },
    headLineProps = {
      bannerDatas: bannerDatas,
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
    getContent = () => {
      const childrens = [],
        result = [];
      Array.from(new Array(20))
        .map((val, i) => {
          childrens.push(
            <Item key={i} arrow="horizontal" multipleLine>
              {`Title${i}`}
            </Item>,
          );
        });
      result.push(
        <Menu handleGridClick={handleGridClick} dispatch={dispatch} datas={grids} columnNum={4} isCarousel={true} />,
      );
      
      return result;
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
    getContents = (patryList, dispatch) => {
      const result = [],
        { title = '', id = '', items = [] } = patryList;
      if (title !== '' && items.length > 0) {
        result.push(
          <ListView
            dataSource={items}
            layoutRow={(rowData, sectionID, rowID) => layoutRow(rowData, sectionID, rowID, handleListClick, dispatch, title)}
            onRefresh={onRefresh.bind(null, { id, title })}
            hasMore={false}
            onScrollerTop={onScrollerTop.bind(null)}
            scrollerTop={scrollerTop}
          />,
        );
      }
      return result;
    };
  return (
    <div className={styles[`${PrefixCls}-outer`]} onTouchStart={handleScroll} onTouchEnd={handleScroll}>
      <div className={styles[`${PrefixCls}-top`]}>
        <Header dispatch={dispatch} isLogin={isLogin} />
        <HeadLine {...headLineProps} dispatch={dispatch} selectedIndex={selectedIndex} datas={getWeather(weath)} />
      </div>
      <div className={styles[`${PrefixCls}-outer-content`]}>{getContent()}</div>
      <WhiteSpace size='xs' />
      <TitleBox title={headTitle} more={true} handleClick={handleMoreCilck.bind(null, newsData)} />
      <div className={styles[`${PrefixCls}-container`]}>
        {newsList.length > 0 && getContents(newsList[0], dispatch)}
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  dashboard: PropTypes.object,
  loading: PropTypes.object,
};

export default connect(({ dashboard, loading, app }) => ({ dashboard, loading, app }))(Dashboard);

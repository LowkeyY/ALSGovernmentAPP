import React from 'react';
import { connect } from 'dva';
import Nav from 'components/nav';
import { routerRedux } from 'dva/router';
import { SegmentedControl, WingBlank, WhiteSpace, List, SearchBar } from 'components';
import Banner from 'components/banner/index';
import { layoutRow } from 'components/row';
import ListView from 'components/listview';
import Menu from 'components/menu/index';
import { handleGridClick, handleBannerClick, handleListClick } from 'utils/commonevent';
import styles from './index.less';

const PrefixCls = 'legalservice',
  Item = List.Item,
  Brief = Item.Brief;

function Comp ({ location, dispatch, legalservice }) {
  const { bannerDatas, lists, grids: { gridsItem = [], fixedLanmu = {} }, name = '', paginations, refreshId, scrollerTop } = legalservice,
    handleItemOnclick = ({ externalUrl = '', id = '', route = 'details' }) => {
      if (externalUrl !== '' && externalUrl.startsWith('http')) {
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
    handleFiexdItemOnclick = ({ route, id, title }) => {
      if (route) {
        dispatch(routerRedux.push({
          pathname: `/${route}`,
          query: {
            name: title,
            id,
          },
        }));
      }
    },
    getContents = (item) => {
      const result = [],
        { current, total, size } = paginations,
        hasMore = (total > 0) && ((current > 1 ? current - 1 : 1) * size < total);
      result.push(
        <ListView
          layoutHeader={''}
          dataSource={item}
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
    bannerProps = {
      datas: bannerDatas,
      handleClick: handleItemOnclick,
    };
  return (
    <div className={styles[`${PrefixCls}-outer`]} >
      <Nav title={name} dispatch={dispatch} />
      {bannerDatas.length > 0 && <Banner {...bannerProps} />}
      {gridsItem.length > 0 &&
      <Menu handleGridClick={handleGridClick} columnNum={4} dispatch={dispatch} datas={gridsItem} />}
      <WhiteSpace size="xs" />
      {
        fixedLanmu !== {} ?
          <List >
            <Item className={styles[`${PrefixCls}-fixeditem`]}
                  thumb={fixedLanmu.image || ''}
                  multipleLine
                  wrap
                  arrow="horizontal"
                  onClick={handleFiexdItemOnclick.bind(null, fixedLanmu)}
            >
              <span >{fixedLanmu.title}</span ><Brief >{fixedLanmu.infos}</Brief >
            </Item >
          </List >
          :
          null
      }
      {lists.length > 0 && getContents(lists)}
    </div >
  );
}

export default connect(({ loading, legalservice }) => ({
  loading,
  legalservice,
}))(Comp);

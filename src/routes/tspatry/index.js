import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import BannerBox from 'components/bannerbox/index';
import { WingBlank, WhiteSpace, Tabs, Badge, List } from 'components';
import TitleBox from 'components/titlecontainer';
import { layoutRow } from 'components/row';
import ListView from 'components/listview';
import Nav from 'components/nav';
import { handleGridClick, handleListClick } from 'utils/commonevent';

const PrefixCls = 'tspatry';
const TsPatry = ({ loading, location, dispatch, tspatry }) => {
  const { name = '' } = location.query,
    { bannerDatas, grids, gridsitem, selectedIndex, selectedItemIndex, paginations, scrollerTop, refreshId, itemData } = tspatry;
  const handleItemTabClick = (data, index) => {
      const { externalUrl = '', title } = data;
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
        const { route = '', title = '', id } = data;

        dispatch({
          type: 'tspatry/updateState',
          payload: {
            refreshId: id,
          },
        });
        dispatch({
          type: 'tspatry/queryListview',
          payload: {
            refreshId: id,
            itemSelected: index,
            isRefresh: true,
          },
        });
      }
    },
    handleTabClick = (data, index) => {
      const { id } = data;
      if (index === grids.length - 1) {
        dispatch({
          type: 'tspatry/queryItems',
          payload: {
            id,
            selected: index,
            isRefresh: true,
          },
        });

        return;
      }
      const { externalUrl = '', title } = data;
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
        const {id } = data;

        dispatch({
          type: 'tspatry/updateState',
          payload: {
            refreshId: id,
            scrollerTop: 0,
          },
        });
        dispatch({
          type: 'tspatry/queryListview',
          payload: {
            refreshId: id,
            selected: index,
            isRefresh: true,
          },
        });
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
    getItemContents = (lists, refreshId) => {
      const { current, total, size } = paginations,
        hasMore = (total > 0) && ((current > 1 ? current - 1 : 1) * size < total),
        result = [];
      result.push(
        <ListView
          layoutHeader={''}
          dataSource={lists}
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
    getContents = (lists, refreshId) => {
      if (selectedIndex === grids.length - 1) {
        return (
          <Tabs tabs={gridsitem}
                initialPage={selectedItemIndex}
                swipeable={false}
                onTabClick={(tab, index) => {
                  handleItemTabClick(tab, index);
                }}
          >
            <div>{itemData.length > 0 && getItemContents(lists, refreshId)}</div>
          </Tabs>
        );
      }
      const { current, total, size } = paginations,
        hasMore = (total > 0) && ((current > 1 ? current - 1 : 1) * size < total),
        result = [];
      result.push(
        <ListView
          layoutHeader={''}
          dataSource={lists}
          layoutRow={(rowData, sectionID, rowID) => layoutRow(rowData, sectionID, rowID, handleListClick, dispatch, name)}
          onEndReached={onEndReached.bind(null, refreshId)}
          onRefresh={onRefresh.bind(null, refreshId)}
          hasMore={hasMore}
          onScrollerTop={onScrollerTop.bind(null)}
          scrollerTop={scrollerTop}
        />,
      );
      return result;
    };
  return (
    <div>
      <Nav title={name} dispatch={dispatch} />
      <TitleBox title="专题活动" />
      {bannerDatas.length > 0 && <BannerBox dispatch={dispatch} datas={bannerDatas} handleClick={handleGridClick} />}
      <Tabs
        initialPage={0}
        page={selectedIndex}
        tabs={grids}
        swipeable={false}
        onChange={handleTabClick}
      >
        <div>{itemData.length > 0 && getContents(itemData, refreshId)}</div>
      </Tabs>
    </div>
  );
};

export default connect(({ loading, tspatry }) => ({
  loading,
  tspatry,
}))(TsPatry);

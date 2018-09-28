import React from 'react';
import { connect } from 'dva';
import Nav from 'components/nav';
import styles from './index.less';
import { routerRedux } from 'dva/router';
import { liveRow, eventRow } from 'components/row';
import ListView from 'components/listview';
import { Tabs, WhiteSpace, Grid, Icon, SearchBar } from 'components';
import Tile from 'components/tile';
import { doDecode } from 'utils';
import { getLocalIcon } from 'utils';
import { handleGridClick, handleListClick } from 'utils/commonevent';


const Colors = ['greenyellow', 'lightskyblue', '#e8e862', '#f178d7'],
  getCurrentColor = (i) => (i > Colors.length ? Colors[i % Colors.length] : Colors[i]),
  PrefixCls = 'livelihood';

function Livelihood ({ location, dispatch, livelihood }) {
  const { name = '' } = location.query,
    { tabs, tips, selectIndex, paginations, scrollerTop, refreshId, lists } = livelihood,
    handleTabClick = (data, index) => {
      const { externalUrl = '', title } = data;
      if (externalUrl !== '' && externalUrl.startsWith('http')) {
        dispatch(routerRedux.push({
          pathname: 'iframe',
          query: {
            name: title,
            externalUrl,
          },
        }));
      } else {
        const { route = '', title = '', id } = data;
        dispatch({
          type: 'livelihood/updateState',
          payload: {
            refreshId: id,
            selectIndex: index
          },
        });
        dispatch({
          type: 'livelihood/queryitems',
          payload: {
            dataId: id,
            selected: index,
            isRefresh: true,
          },
        });
      }
    },
    renderContent = (tips) => {
      return tips && tips.map((item, i) => {
        return (
          <Tile
            items={item}
            colors={getCurrentColor(i)}
            handleClick={handleGridClick}
            dispatch={dispatch}
          />
        );
      });
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
    getContents = (lists, selectIndex) => {
      if (selectIndex === 1) {
        const result = [],
          { id = '', items = [] } = lists;
        if (items.length > 0) {
          const { current, total, size } = paginations,
            hasMore = (total > 0) && ((current > 1 ? current - 1 : 1) * size < total);
          
          result.push(
            <ListView
              dataSource={items}
              layoutRow={(rowData, sectionID, rowID) => eventRow(rowData, sectionID, rowID, handleListClick, dispatch, name)}
              onEndReached={onEndReached.bind(null, { id })}
              onRefresh={onRefresh.bind(null, { id })}
              hasMore={hasMore}
              onScrollerTop={onScrollerTop.bind(null)}
              scrollerTop={scrollerTop}
            />
          );
        }
        return result;
      } 
      const result = [],
        { title = '', id = '', items = [] } = lists;
      if (title !== '' && items.length > 0) {
        const { current, total, size } = paginations,
          hasMore = (total > 0) && ((current > 1 ? current - 1 : 1) * size < total);
          
        result.push(
          <ListView layoutHeader={() => title}
            dataSource={items}
            layoutRow={(rowData, sectionID, rowID) => liveRow(rowData, sectionID, rowID, handleListClick, dispatch, name)}
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
      <div className={styles[`${PrefixCls}-outer`]}>
        <div>
          <Tabs
            initialPage={selectIndex}
            tabs={tabs}
            swipeable={false}
            onTabClick={handleTabClick}
          >
            <div>
              {selectIndex === 1 ? <div>{lists.length > 0 && getContents(lists[0], selectIndex)}</div> :
              <div className={styles[`${PrefixCls}-outer-container`]}>
                  {renderContent(tips)}
                </div>}
              {selectIndex === 0 ? <div> {lists.length > 0 && getContents(lists[0], selectIndex)}</div> : ''}
            </div>
          </Tabs>
          <WhiteSpace />
        </div>
      </div>
    </div>
  );
}

export default connect(({ loading, livelihood }) => ({
  loading,
  livelihood,
}))(Livelihood);

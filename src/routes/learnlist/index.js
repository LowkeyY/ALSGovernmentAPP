import React from 'react';
import { connect } from 'dva';
import { WingBlank, WhiteSpace, Tabs, Badge, List, SearchBar, Layout } from 'components';
import Nav from 'components/nav';
import Iframes from 'components/ifream';
import { layoutRow } from 'components/row';
import ListView from 'components/listview';
import { routerRedux } from 'dva/router';
import Banner from 'components/banner';
import { doDecode } from 'utils';
import styles from './index.less';

const PrefixCls = 'learnlist',
  Item = List.Item,
  Brief = Item.Brief;
function Comp ({ location, dispatch, learnlist }) {
  const { name = '', selectedIndex = 0, grids, lists, bannerDatas, paginations, scrollerTop, refreshId } = learnlist,
    handleItemOnclick = ({ externalUrl = '', id, pathname = 'details', infos = '{}' }) => {
      let primaryParams = {};
      try {
        primaryParams = doDecode(infos);
      } catch (e) {
      }
      if (primaryParams.route && primaryParams.id) {
        pathname = primaryParams.route;
        id = primaryParams.id;
      }
      if (externalUrl != '' && externalUrl.startsWith('http')) {
        dispatch(routerRedux.push({
          pathname: 'iframe',
          query: {
            name,
            externalUrl,
          },
        }));
      } else {
        dispatch(routerRedux.push({
          pathname: `/${pathname}`,
          query: {
            name,
            id,
            dataId: id,
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
          isRefresh: true
        }
      });
    },
    onEndReached = (refreshId, callback) => {
      dispatch({
        type: `${PrefixCls}/queryListview`,
        payload: {
          refreshId,
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
    getContents = (lists, refreshId) => {
      const { current, total, size } = paginations,
        hasMore = (total > 0) && ((current > 1 ? current - 1 : 1) * size < total),
        result = [];
      result.push(
        <ListView layoutHeader={''}
          dataSource={lists}
          layoutRow={(rowData, sectionID, rowID) => layoutRow(rowData, sectionID, rowID, handleItemOnclick)}
          onEndReached={onEndReached.bind(null, refreshId)}
          onRefresh={onRefresh.bind(null, refreshId)}
          hasMore={hasMore}
          onScrollerTop={onScrollerTop.bind(null)}
          scrollerTop={scrollerTop}
        />
      );
      return result;
    },
    // getContents = (lists) => {
    //   const result = []
    //   lists.map((list, i) => {
    //     const { id = '' } = list
    //     if (id != '') {
    //       result.push(
    //         <Item className={styles[`${PrefixCls}-item`]}
    //               thumb={list.image || ''} multipleLine wrap arrow='horizontal'
    //               onClick={handleItemOnclick.bind(null, list)}>
    //           <span>{list.title}</span><Brief>{list.time}</Brief>
    //         </Item>,
    //       )
    //     }
    //   })
    //   return <List>{result}</List>
    // },
    getIfream = (src) => {
      return <Iframes src={src} dispatch={dispatch} />;
    },
    getTabs = () => {
      const result = [];
      grids.map((grid, i) => {
        const { title = '' } = grid;
        if (title != '') {
          result.push({ ...grid });
        }
      });
      return result;
    },
    getCurrentView = () => {
      const { externalUrl = '' } = grids[selectedIndex] || {};
      const result = [];
      if (bannerDatas.length > 0) {
        const props = {
          datas: bannerDatas,
          handleClick: (data) => {
            selectedIndex;
          },
        };
        result.push(<Banner {...props} />);
      }
      result.push(externalUrl == '' ? getContents(lists) : getIfream(externalUrl));
      return <div>{result}</div>;
    },
    handleTabClick = (data, index) => {
      const { externalUrl = '', id } = data;
      dispatch({
        type: 'learnlist/updateState',
        payload: {
          selectedIndex: index,
        },
      });
      if (externalUrl == '') {
        dispatch({
          type: 'learnlist/updateState',
          payload: {
            refreshId: id
          },
        });
        dispatch({
          type: 'learnlist/queryListview',
          payload: {
            refreshId: id,
            selected: index,
            isRefresh: true
          },
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
    };
  return (
    <div className={styles[`${PrefixCls}-outer`]}>
      <Nav title={name} dispatch={dispatch} />
      <SearchBar placeholder={`在${name || '此页面'}中搜索`}
        maxLength={20}
        onFocus={handleSearchClick.bind(this, learnlist)}
      />
      <Tabs
        initialPage={0}
        page={selectedIndex}
        tabs={getTabs()}
        swipeable={false}
        onTabClick={handleTabClick}
      >
        <div>
          {getCurrentView()}
        </div>
      </Tabs>
    </div>

  );
}

export default connect(({ loading, learnlist }) => ({
  loading,
  learnlist,
}))(Comp);

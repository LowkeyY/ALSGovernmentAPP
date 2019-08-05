import React from 'react';
import { connect } from 'dva';
import { WingBlank, WhiteSpace, Tabs, Badge, List, SearchBar } from 'components';
import Nav from 'components/nav';
import { routerRedux } from 'dva/router';
import { layoutRow } from 'components/row';
import ListView from 'components/listview';
import Banner from 'components/banner';
import styles from './index.less';
import { handleListClick, handleBannerClick } from 'utils/commonevent';

const PrefixCls = 'lanmutab',
  Item = List.Item,
  Brief = Item.Brief;

function Comp ({ location, dispatch, lanmutab }) {
  const { name = '', selectedIndex = 0, grids, lists, bannerDatas, fixedLanmu, paginations, scrollerTop, refreshId } = lanmutab,
    handleItemOnclick = ({ externalUrl = '', id, route = 'details' }) => {
      if (externalUrl !== '' && externalUrl.startsWith('http')) {
        dispatch(routerRedux.push({
          pathname: 'iframe',
          query: {
            name,
            externalUrl,
          },
        }));
      } else {
        dispatch(routerRedux.push({
          pathname: `/${route}`,
          query: {
            name,
            id,
            dataId: id,
          },
        }));
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
    getContents = (lists, grids) => {
      const { current, total, size } = paginations,
        hasMore = (total > 0) && ((current > 1 ? current - 1 : 1) * size < total),
        result = [];
      if (selectedIndex == 0) {
        result.push(
          <ListView layoutHeader={''}
                    dataSource={lists}
                    layoutRow={(rowData, sectionID, rowID) => layoutRow(rowData, sectionID, rowID, handleListClick, dispatch, name)}
                    onEndReached={onEndReached.bind(null, refreshId)}
                    onRefresh={onRefresh.bind(null, refreshId)}
                    hasMore={hasMore}
                    onScrollerTop={onScrollerTop.bind(null)}
                    scrollerTop={scrollerTop}
          />,
        );
      } else {
        lists.map((list, i) => {
          const { id = '' } = list;
          if (id !== '') {
            result.push(
              <Item key={id}
                    className={styles[`${PrefixCls}-item`]}
                    thumb={list.image || ''}
                    multipleLine
                    wrap
                    arrow="horizontal"
                    onClick={handleItemOnclick.bind(null, list)}
              >
                <span>{list.title}</span><Brief>{list.time}</Brief>
              </Item>,
            );
          }
        });
      }

      return result;
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
    getFixedItem = () => {
      const result = [];
      if (Object.keys(fixedLanmu).length > 0 && fixedLanmu.title) {
        result.push(<WhiteSpace size="sm" style={{ backgroundColor: '#ddd' }}/>);
        result.push(<List>
          <Item className={styles[`${PrefixCls}-fixeditem`]}
                thumb={fixedLanmu.image || ''}
                multipleLine
                wrap
                arrow="horizontal"
                onClick={handleFiexdItemOnclick.bind(null, fixedLanmu)}
          >
            <span>{fixedLanmu.title}</span><Brief>{fixedLanmu.infos}</Brief>
          </Item>
        </List>);
        result.push(<WhiteSpace size="sm" style={{ backgroundColor: '#ddd' }}/>);
      }
      return result;
    },
    getCurrentView = () => {
      const result = [];
      if (selectedIndex == 0 && bannerDatas.length > 0) {
        const props = {
          datas: bannerDatas,
          handleClick: (data) => handleBannerClick(data),
        };
        result.push(<Banner {...props} />);
        result.push(getFixedItem());
      }
      result.push(getContents(lists, grids));
      return <div>{result}</div>;
    },
    handleTabClick = (data, index) => {
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
        if (route === '') {
          dispatch({
            type: 'lanmutab/updateState',
            payload: {
              refreshId: id
            },
          });
          dispatch({
            type: 'lanmutab/queryListview',
            payload: {
              refreshId: id,
              selected: index,
              isRefresh: true
            },
          });
        }
      }
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
      <Nav title={name} dispatch={dispatch}/>
      <SearchBar
        placeholder={`在${name || '此页面'}中搜索`}
        maxLength={20}
        onFocus={handleSearchClick.bind(this, lanmutab)}
      />
      <Tabs
        initialPage={0}
        page={selectedIndex}
        tabs={getTabs()}
        swipeable={false}
        onTabClick={handleTabClick}
      >
        {getCurrentView()}
      </Tabs>
    </div>

  );
}

export default connect(({ loading, lanmutab }) => ({
  loading,
  lanmutab,
}))(Comp);

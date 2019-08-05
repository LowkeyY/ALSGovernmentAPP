import React from 'react';
import { connect } from 'dva';
import { WingBlank, WhiteSpace, Tabs, Badge, List, SearchBar, Accordion, Icon } from 'components';
import Nav from 'components/nav';
import { routerRedux } from 'dva/router';
import Banner from 'components/banner';
import { layoutRow } from 'components/row';
import ListView from 'components/listview';
import { getLocalIcon } from 'utils';
import styles from './index.less';
import TitleBox from 'components/titlecontainer';
import { handleGridClick, handleTopLineClick, handleListClick } from 'utils/commonevent';

const PrefixCls = 'derenitems';

function Derenitems ({ location, dispatch, derenitems }) {
  const { name = '', selectedIndex = 0, tabs, grids, itemData, bannersData, paginations, scrollerTop, refreshId } = derenitems,
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
    getContents = (lists, refreshId) => {
      const { current, total, size } = paginations,
        hasMore = (total > 0) && ((current > 1 ? current - 1 : 1) * size < total),
        result = [];
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
      return result;
    },
    getBanners = () => {
      bannersData && bannersData.map(item => {
        item.url = item.image;
      });
      return bannersData;
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
            type: 'derenitems/updateState',
            payload: {
              refreshId: id,
            },
          });
          dispatch({
            type: 'derenitems/queryListview',
            payload: {
              refreshId: id,
              selected: index,
              isRefresh: true,
            },
          });
        } else {
          dispatch(routerRedux.push({
            pathname: `/${route}`,
            query: {
              name: title,
              id,
            },
          }));
        }
      }
    },
    handleBannerClick = (data, index) => {
      const { externalUrl = '', title, id, pathname = 'details' } = data;
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
          pathname: `/${pathname}`,
          query: {
            name,
            dataId: id,
          },
        }));
      }
    },
    handlerClick = ({ route = '', title, externalUrl = '', infos = '', ...others }) => {
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
          pathname: '/derenitems',
          query: {
            name: title,
            ...others,
          },
        }));
      }
    },
    getPartyBranch = (grids) => (
      <Accordion accordion openAnimation={{}} className="my-accordion">
        <Accordion.Panel header={
          <span className={styles.party}>
            <Icon type={getLocalIcon('/others/party.svg')}/>
            <span>党支部</span>
          </span>
        }>
          <List className="my-list">
            {grids.map(item => (
              <List.Item key={item.id} onClick={handlerClick.bind(null, item)}>{item.title}</List.Item>
            ))}
          </List>
        </Accordion.Panel>
      </Accordion>
    );

  return (
    <div className={styles[`${PrefixCls}-outer`]}>
      <Nav title={name} dispatch={dispatch}/>
      <WhiteSpace size="xs"/>
      {getBanners().length > 0 && <Banner datas={getBanners()} handleClick={handleBannerClick}/>}
      {grids.length > 0 && getPartyBranch(grids)}
      <WhiteSpace size="xs"/>
      {
        tabs.length > 1 ?
          <Tabs
            initialPage={0}
            page={selectedIndex}
            tabs={tabs}
            swipeable={false}
            useOnPan={tabs.length > 3}
            onTabClick={handleTabClick}
            renderTabBar={props => <Tabs.DefaultTabBar {...props} page={4}/>}
          >
            <div>
              {itemData.length > 0 && getContents(itemData, refreshId)}
            </div>
          </Tabs>
          :
          null
      }
      {
        tabs.length === 1 &&
        <div>
          <TitleBox title={tabs[0].title || '动态新闻'}/>
          {itemData.length > 0 && getContents(itemData, refreshId)}
        </div>
      }
    </div>

  );
}

export default connect(({ loading, derenitems }) => ({
  loading,
  derenitems,
}))(Derenitems);

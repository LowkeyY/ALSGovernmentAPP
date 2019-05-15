
import React from 'react';
import { connect } from 'dva';
import { WingBlank, WhiteSpace, Tabs, Badge, List, SearchBar } from 'components';
import Nav from 'components/nav';
import { routerRedux } from 'dva/router';
import Banner from 'components/banner';
import styles from './index.less';

const PrefixCls = 'lanmutab',
  Item = List.Item,
  Brief = Item.Brief;

function Camel ({ location, dispatch, camel }) {
  const { name = '', selectedIndex = 0, tabs, itemData, bannersData, tabItems } = camel,
    getContents = (derenitems) => {
      const result = [];
      itemData.map((list, i) => {
        const { id = '', title, infos, image } = list;
        if (id != '') {
          result.push(
            <Item className={styles[`${PrefixCls}-fixeditem`]}
              thumb={image || ''}
              multipleLine
              wrap
              arrow="horizontal"
              onClick={handleItemOnclick.bind(null, list)}
            >
              <span>{title}</span><Brief>{infos}</Brief>
            </Item>
          );
        }
      });
      return <List>{result}</List>;
    },
    handleTabClick = (data, index) => {
      const { externalUrl = '', title } = data;

      if (externalUrl != '' && externalUrl.startsWith('http')) {
        dispatch(routerRedux.push({
          pathname: 'iframe',
          query: {
            name: title,
            externalUrl,
          },
        }));
      } else {
      // dispatch({
      //   type: 'camel/query',
      //   payload: {
      //     ...data,
      //   },
      // })
      }
    },
    handleTabItemClick = (data, index) => {
      dispatch({
        type: 'camel/querySelect',
        payload: {
          ...data,
          selected: index,
        },
      });
    },
    getBanners = () => {
      bannersData && bannersData.map(item => {
        item.url = item.image;
      });
      return bannersData;
    },
    handleBannerClick = (data, index) => {
      const { externalUrl = '', title, id, pathname = 'details' } = data;
      if (externalUrl != '' && externalUrl.startsWith('http')) {
        dispatch(routerRedux.push({
          pathname: 'iframe',
          query: {
            name: title,
            externalUrl,
          },
        }));
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
    handleItemOnclick = ({ pathname = 'details', id }) => {
      dispatch(routerRedux.push({
        pathname: `/${pathname}`,
        query: {
          name,
          dataId: id,
        },
      }));
    };
  return (
    <div className={styles[`${PrefixCls}-outer`]}>
      <Nav title={name} dispatch={dispatch} />
      <Tabs
        initialPage={0}
        // page={selectedIndex}
        tabs={tabs}
        swipeable={false}
        onTabClick={handleTabClick}
      >
        <div>
          {getBanners().length > 0 && <Banner datas={getBanners()} handleClick={handleBannerClick} />}
          <Tabs
            initialPage={0}
            // page={selectedIndex}
            swipeable={false}
            tabs={tabItems}
            // onChange={handleTabItemClick}
            onTabClick={handleTabItemClick}
            renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} />}
          >
            {getContents(itemData)}
          </Tabs>
        </div>
      </Tabs>
    </div>

  );
}

export default connect(({ loading, camel }) => ({
  loading,
  camel,
}))(Camel);

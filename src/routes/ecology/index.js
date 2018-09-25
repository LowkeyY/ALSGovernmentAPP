import React from 'react';
import { connect } from 'dva';
import Nav from 'components/nav';
import { routerRedux } from 'dva/router';
import { SegmentedControl, WingBlank, WhiteSpace, List, SearchBar } from 'components';
import { getImages } from 'utils';
import { Layout } from 'components';
import { layoutRow } from 'components/row';
import ListView from 'components/listview';
import Banner from 'components/banner';
import styles from './index.less';
import bg from '../../themes/images/others/greenbg.png';
import { handleGridClick, handleBannerClick, handleListClick } from 'utils/commonevent';

const PrefixCls = 'ecology',
  Item = List.Item

function Ecology ({ location, dispatch, ecology }) {
  const { name = '' } = location.query,
    { banners, data, lists, paginations, scrollerTop } = ecology,
    getBannerDatas = (bannerDatas) => {
      bannerDatas && bannerDatas.map(item => {
        item.url = item.image;
      });
      return bannerDatas;
    },
    handleItemClick = ({ id, pathname = 'lanmusub', title, externalUrl = '', ...others }) => {
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
          pathname: `/${pathname}`,
          query: {
            name: title,
            id,
            ...others,
          },
        }));
      }
    },
    onRefresh = (params, callback) => {
      console.log(`${PrefixCls}-onRefresh`);
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
      console.log(`${PrefixCls}-onEndReached`);
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
    getContents = (lists = []) => {
      const result = [],
        { title = '', id = '', items = [] } = lists;
      if (title != '' && items.length > 0) {
        const { current, total, size } = paginations,
          hasMore = (total > 0) && ((current > 1 ? current - 1 : 1) * size < total);
        result.push(
          <ListView layoutHeader={() => title}
            dataSource={items}
            layoutRow={(rowData, sectionID, rowID) => layoutRow(rowData, sectionID, rowID, handleListClick, dispatch, name)}
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
    getItemBox = (data = [], onClick) => {
      return (<div>
        <div className={styles[`${PrefixCls}-itembox`]} style={{ backgroundImage: `url(${bg})` }}>
          <div className={styles[`${PrefixCls}-itembox-left`]} onClick={onClick.bind(null, data[0])}>
            <img src={getImages(data[0] && data[0].image)} alt="" />
            <span>{data[0] && data[0].title}</span>
          </div>
          <div className={styles[`${PrefixCls}-itembox-right`]}>
            <div className={styles[`${PrefixCls}-itembox-right-top`]} onClick={onClick.bind(null, data[1])}>
              <img src={getImages(data[1] && data[1].image)} alt="" />
              <p>{data[1] && data[1].title}</p>
            </div>
            <div className={styles[`${PrefixCls}-itembox-right-bottom`]} onClick={onClick.bind(null, data[2])}>
              <img src={getImages(data[2] && data[2].image)} alt="" />
              <p>{data[2] && data[2].title}</p>
            </div>
          </div>
        </div>
        <div className={styles[`${PrefixCls}-imgbox`]} onClick={onClick.bind(null, data[3])}>
          <img src={getImages(data[3] && data[3].image)} alt="" />
        </div>
      </div>);
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
      <SearchBar
        placeholder={`在${name || '此页面'}中搜索`}
        maxLength={20}
        onFocus={handleSearchClick.bind(this, ecology)}
      />
      <Banner datas={getBannerDatas(banners)} dispatch={dispatch} name={name} handleClick={handleBannerClick} />
      <div>{getItemBox(data, handleItemClick)}</div>
      <WhiteSpace size="xs" />
      <div>
        {lists.length > 0 && getContents(lists[0])}
      </div>
    </div>
  );
}

export default connect(({ loading, ecology }) => ({
  loading,
  ecology,
}))(Ecology);

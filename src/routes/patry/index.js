/* global document */
import React from 'react';
import { connect } from 'dva';
import Nav from 'components/nav';
import { routerRedux } from 'dva/router';
import { WingBlank, WhiteSpace, List, Grid } from 'components';
import Menu from 'components/menu/index';
import { getImages } from 'utils';
import { layoutRow } from 'components/row';
import ListView from 'components/listview';
import Banner from 'components/banner/index';
import TitleBox from 'components/titlecontainer';
import { doDecode } from 'utils';
import styles from './index.less';
import { handleBannerClick, handleListClick } from 'utils/commonevent';

const Item = List.Item,
  PrefixCls = 'patry';


function Patry ({ location, dispatch, patry }) {
  const { name = '', id } = location.query,
    { patryDate, patryList, isScroll, scrollerTop } = patry;
  const getInfo = (info) => {
      if (info) {
        try {
          return doDecode(info);
        } catch (e) {
        }
      }
      return {};
    },
    getBannerDatas = (data = []) => {
      let bannerDatas = [];
      data.map((item, index) => {
        const { id = '', title = '', route = '', infos = '', ...others } = item;
        let { type } = getInfo(infos);
        if (type === 'banner') {
          bannerDatas.push({
            url: item.image,
            id,
            title,
            ...others,
            route,
            infos,
          });
        }
      });
      return bannerDatas.length > 0 ? bannerDatas : [];
    },
    getGridbox = (data = []) => {
      let gridDatas = [];
      data.map((item, index) => {
        const { id = '', route = '', image = '', infos = '', ...others } = item;
        let { type } = getInfo(infos);
        if (type === 'grids') {
          gridDatas.push({
            id,
            route: route || '',
            icon: image || '',
            ...others,
          });
        }
      });
      return gridDatas.length > 0 ? gridDatas : [];
    },

    handleFixBannerClick = ({ id, title, route = '' }) => {
      dispatch(routerRedux.push({
        pathname: `/${route}`,
        query: {
          id,
          name: title,
        },
      }));
    },
    getFixBanner = (data) => {
      return data.map(item => {
        const { infos = '' } = item;
        let { type } = getInfo(infos);
        if (type === 'fixPic') {
          return (
            <div>
              <TitleBox title="专题栏目"/>
              <div className={styles[`${PrefixCls}-fixbanner`]} onClick={handleFixBannerClick.bind(this, item)}>
                <img src={getImages(item.image)} alt=""/>
              </div>
            </div>
          );
        }
      });
    },

    handleGridbox = ({ pathname, title, externalUrl = '', infos = '', ...others }) => {
      console.log(pathname);
      if (externalUrl !== '' && externalUrl.startsWith('http') && pathname === '') {
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
        };
      } else {
        dispatch(routerRedux.push({
          pathname: `/${pathname}`,
          query: {
            name: title,
            externalUrl,
            ...others,
          },
        }));
      }
    },
    handleScroll = (e) => {
      if (e.target) {
        const ddst = document.documentElement.scrollTop,
          dbst = document.body.scrollTop,
          scrollTop = Math.max(ddst, dbst),
          curScroll = scrollTop > 0;
        if (isScroll !== curScroll) {
          dispatch({
            type: 'patry/updateState',
            payload: {
              isScroll: curScroll,
            },
          });
        }
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
    handleMoreCilck = (id, title) => {
      dispatch(routerRedux.push({
        pathname: '/lanmusub',
        query: {
          name: title,
          id,
        },
      }));
    },
    getContents = (patryList) => {
      const result = [],
        { title = '', id = '', items = [] } = patryList;
      if (title !== '' && items.length > 0) {
        result.push(
          <div>
            <TitleBox title={title} more handleClick={handleMoreCilck.bind(null, id, title)}/>
            <ListView
              dataSource={items}
              layoutRow={(rowData, sectionID, rowID) => layoutRow(rowData, sectionID, rowID, handleListClick, dispatch, name)}
              onRefresh={onRefresh.bind(null, { id, title })}
              hasMore={false}
              onScrollerTop={onScrollerTop.bind(null)}
              scrollerTop={scrollerTop}
            />
          </div>,
        );
      }
      return result;
    };

  return (
    <div onTouchStart={handleScroll} onTouchEnd={handleScroll}>
      <Nav title={name} dispatch={dispatch}/>
      {getBannerDatas(patryDate).length > 0 &&
      <Banner datas={getBannerDatas(patryDate)} dispatch={dispatch} handleClick={handleBannerClick}/>}
      <div>
        {getGridbox(patryDate).length > 0 &&
        <Menu handleGridClick={handleGridbox} columnNum={4} datas={getGridbox(patryDate)} isCarousel
              dispatch={dispatch}/>}
      </div>
      <div>{getFixBanner(patryDate)}</div>
      <div className={styles[`${PrefixCls}-container`]}>
        {patryList.length > 0 && getContents(patryList[0])}
      </div>
    </div>
  );
}

export default connect(({ loading, patry }) => ({
  loading,
  patry,
}))(Patry);

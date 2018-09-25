import React from 'react';
import { connect } from 'dva';
import Nav from 'components/nav';
import Banner from 'components/banner/index';
import { WingBlank, WhiteSpace, Tabs, List, Layout } from 'components';
import { layoutRow } from 'components/row';
import ListView from 'components/listview';
import { handleBannerClick, handleListClick } from 'utils/commonevent';
import styles from './index.less';

const PrefixCls = 'patrylist',
  Item = List.Item;

function Patrylist ({ location, dispatch, patrylist }) {
  const { name = '' } = location.query,
    { lists, paginations, scrollerTop } = patrylist,
    getBannerDatas = () => {
      let banners = [];
      
      for (let i = 0; i < lists.length; i++) {
        let obj = {};
        if (lists[i].image !== '') {
          obj.url = lists[i].image;
          obj.id = lists[i].id;
          banners.push(obj);
        }
      }
      return banners.slice(0, 4);
    },
    onRefresh = (callback) => {
      dispatch({
        type: `${PrefixCls}/queryListview`,
        payload: {
          callback,
          isRefresh: true
        }
      });
    },
    onEndReached = (callback) => {
      dispatch({
        type: `${PrefixCls}/queryListview`,
        payload: {
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
    getContents = (lists) => {
      const { current, total, size } = paginations,
        hasMore = (total > 0) && ((current > 1 ? current - 1 : 1) * size < total),
        result = [];
      result.push(
        <ListView
          layoutHeader={''}
          dataSource={lists}
          layoutRow={(rowData, sectionID, rowID) => {
            return layoutRow(rowData, sectionID, rowID, handleListClick, dispatch, name);
          }}
          onEndReached={onEndReached}
          onRefresh={onRefresh}
          hasMore={hasMore}
          onScrollerTop={onScrollerTop.bind(null)}
          scrollerTop={scrollerTop}
        />
      );
      
      return result;
    };
  
  return (
    <div>
      <Nav title={name} dispatch={dispatch} />
      <div style={{ textAlign: 'center' }}>
        {getBannerDatas().length > 0 ?
          <Banner datas={getBannerDatas()} dispatch={dispatch} name={name} handleClick={handleBannerClick} /> :
          <div />}
      </div>
      {lists.length > 0 && getContents(lists)}
    </div>
  );
}

export default connect(({ loading, patrylist }) => ({
  loading,
  patrylist,
}))(Patrylist);

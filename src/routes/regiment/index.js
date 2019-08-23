/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'dva';
import Nav from 'components/nav';
import Banner from 'components/banner';
import CnMenu from 'components/CnMenu';
import ListView from 'components/listview';
import { WhiteSpace } from 'components';
import { multipleRow } from 'components/multipleRow';
import { handleGridClick, handleBannerClick, handleListClick } from 'utils/commonevent';
import styles from './index.less';

const PrefixCls = 'regiment';

function Regiment ({ location, dispatch, regiment }) {
  const { grids, bannerDatas, lists, paginations, scrollerTop } = regiment,
    { name = '' } = location.query,
    bannerProps = {
      datas: bannerDatas,
      handleClick: handleBannerClick,
      dispatch,
      name,
      height: '20vh',
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
    getContents = (data) => {
      const { title = '', id = '', items = [] } = data;
      if (title !== '' && items.length > 0) {
        const { current, total, size } = paginations,
          hasMore = (total > 0) && ((current > 1 ? current - 1 : 1) * size < total);
        return (
          <ListView
            dataSource={items}
            layoutRow={(rowData, sectionID, rowID) => multipleRow(rowData, sectionID, rowID, handleListClick, dispatch, name)}
            onEndReached={onEndReached.bind(null, { id, title })}
            onRefresh={onRefresh.bind(null, { id, title })}
            hasMore={hasMore}
            onScrollerTop={onScrollerTop.bind(null)}
            scrollerTop={scrollerTop}
          />
        );
      }
    };
  return (
    <div className={styles.outer}>
      <Nav title={name} dispatch={dispatch} />
      <div className={styles.container}>
        {bannerDatas.length > 0 && <div style={{ border: '1px solid #ddd' }}><Banner {...bannerProps} /></div>}
        <WhiteSpace />
        {
          grids.length > 0 &&
          <div className={styles[`${PrefixCls}-outer-child`]}>
            <CnMenu handleGridClick={handleGridClick} dispatch={dispatch} datas={grids} />
          </div>
        }
        <WhiteSpace />
        {lists.length > 0 && getContents(lists[0])}
      </div>
    </div>

  );
}

export default connect(({ loading, regiment }) => ({
  loading,
  regiment,
}))(Regiment);

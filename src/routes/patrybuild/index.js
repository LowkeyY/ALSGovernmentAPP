import React from 'react';
import { connect } from 'dva';
import { WingBlank, WhiteSpace, } from 'components';
import { layoutRow } from 'components/row';
import ListView from 'components/listview';
import Nav from 'components/nav';
import Banner from 'components/banner';
import Menu from 'components/menu/index';
import { handleGridClick, handleBannerClick, handleListClick } from 'utils/commonevent';

const PrefixCls = 'patrybuild';
const PatryBuild = ({ loading, location, dispatch, patrybuild }) => {
  
  const { name = '' } = location.query, { grids, paginations, scrollerTop, refreshId, banners, lists } = patrybuild;
 
  const  onRefresh = (params, callback) => {
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
    getContents = (lists) => {
      const result = [],
        { title = '', id = '', items = [] } = lists;
      if (title !== '' && items.length > 0) {
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
    };
  return (
    <div>
      <Nav title={name} dispatch={dispatch} />
      {banners.length > 0 && <Banner datas={banners} dispatch={dispatch} name={name} handleClick={handleBannerClick} />
      }
      <div>
        {grids.length > 0 && <Menu handleGridClick={handleGridClick} columnNum={4} dispatch={dispatch} datas={grids} />}
      </div>
      {lists.length > 0 && getContents(lists[0])}
    </div>
  );
};

export default connect(({ loading, patrybuild }) => ({
  loading,
  patrybuild,
}))(PatryBuild);

import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import Nav from 'components/nav';
import { List, WhiteSpace, SearchBar, Tabs, Layout } from 'components';
import { layoutRow } from 'components/row';
import TitleBox  from 'components/titlecontainer'
import ListView from 'components/listview';
import { handleListClick } from 'utils/commonevent';

function News ({ location, dispatch, news }) {
  const { name = '' } = location.query,
    { banners, lists, paginations, scrollerTop, refreshId } = news,
    
    getvideo = (data) => {
      return data && data.map(data => {
        return (
          <video key={data.id} width="100%" preload="none" poster={data.videoView} src={data.videoSrc}
                 controlsList="nodownload" controls="controls" />
        );
      });
    };
  const PrefixCls = 'news',
    Item = List.Item,
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
      const result = [],
        { title = '', id = '' } = lists;
      const { current, total, size } = paginations,
        hasMore = (total > 0) && ((current > 1 ? current - 1 : 1) * size < total);
      result.push(
        <ListView layoutHeader={title}
                  dataSource={lists}
                  layoutRow={(rowData, sectionID, rowID) => layoutRow(rowData, sectionID, rowID, handleListClick, dispatch, name,false)}
                  onEndReached={onEndReached.bind(null, refreshId)}
                  onRefresh={onRefresh.bind(null, refreshId)}
                  hasMore={hasMore}
                  onScrollerTop={onScrollerTop.bind(null)}
                  scrollerTop={scrollerTop}
        />
      );
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
      <SearchBar
        placeholder={`在${name || '此页面'}中搜索`}
        maxLength={20}
        onFocus={handleSearchClick.bind(this, news)}
      />
      <TitleBox title="最新新闻" />
      <div>
        {getvideo(banners)}
      </div>
      <TitleBox title="往期新闻" />
      <div>
        <div>{lists.length > 0 && getContents(lists, refreshId)}</div>
      </div>
    </div>
  );
}

export default connect(({ loading, news }) => ({
  loading,
  news,
}))(News);

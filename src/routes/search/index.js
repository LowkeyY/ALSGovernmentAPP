import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { SearchBar, WhiteSpace, WingBlank, Button, Icon, NavBar, Tag } from 'components';
import { Flex } from 'components';
import { getLocalIcon, getImages } from 'utils';
import { layoutFilters } from './layout';
import { layoutRow, appealList } from 'components/row';
import ListView from 'components/listview';
import StatusBox from 'components/statusbox';
import TitleBox from 'components/titlecontainer';
import styles from './index.less';

const PrefixCls = 'search';

function Comp ({ location, search, loading, app, dispatch }) {
  const { router = '' } = location.query;
  const { filters, filterValues, isFilter, searchText, lists, paginations, scrollerTop, totalCount } = search,
    { isLogin } = app,
    getDefaultPaginations = () => ({
      current: 1,
      total: 0,
      size: 10,
    }),
    updateSearchText = (value) => {
      dispatch({
        type: `${PrefixCls}/updateState`,
        payload: {
          searchText: value
        }
      });
    }, 
    updateIsSearch = (isFilter) => {
      dispatch({
        type: `${PrefixCls}/updateState`,
        payload: {
          isFilter,
          paginations: getDefaultPaginations()
        }
      });
      if (!isFilter) {
        dispatch({
          type: `${PrefixCls}/search`
        });
      }
    }, 
    goBack = () => {
      dispatch(routerRedux.goBack());
    }, 
    handleFilterClick = (key, value) => {
      const newValue = { ...filterValues };
      if (value == null) { delete newValue[key]; } else { newValue[key] = [value]; }
      dispatch({
        type: `${PrefixCls}/updateState`,
        payload: {
          filterValues: newValue
        }
      });
    },
    handleCardClick = ({ id }) => {
      dispatch({
        type: 'seekdetails/updateState',
        payload: {
          isTask: false
        },
      });
      dispatch(routerRedux.push({
        pathname: '/seekdetails',
        query: {
          id,
        },
      }));
    },

    handleCollectClick = (data) => {
      dispatch({
        type: `${PrefixCls}/collent`,
        payload: {
          ...data,
        },
      });
    },


    handleItemOnclick = ({ name = '', externalUrl = '', id = '', pathname = 'details' }) => {
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
            dataId: id,
          },
        }));
      }
    },
    onRefresh = (params, callback) => {
      dispatch({
        type: `${PrefixCls}/search`,
        payload: {
          ...params,
          callback,
          isRefresh: true
        }
      });
    },
    onEndReached = (callback) => {
      dispatch({
        type: `${PrefixCls}/search`,
        payload: {
          callback,
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
        { current, total, size } = paginations,
        hasMore = (total > 0) && ((current > 1 ? current - 1 : 1) * size < total);
      if (router === 'appeal') {
        result.push(
          <ListView layoutHeader={''}
            dataSource={lists}
            layoutRow={(rowData, sectionID, rowID) => appealList(rowData, sectionID, rowID, isLogin, handleCardClick, handleCollectClick)}
            onEndReached={onEndReached}
            hasMore={hasMore}
            onScrollerTop={onScrollerTop.bind(null)}
            scrollerTop={scrollerTop}
          />
        );
      } else {
        result.push(
          <ListView layoutHeader={''}
            dataSource={lists}
            layoutRow={(rowData, sectionID, rowID) => layoutRow(rowData, sectionID, rowID, handleItemOnclick)}
            onEndReached={onEndReached}
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
      {isFilter ?
        (<div className={styles[`${PrefixCls}-outer`]}>
          <WingBlank />
          <SearchBar value={searchText}
            placeholder={'请输入搜索内容'}
            onClear={updateSearchText.bind(null, '')}
            onSubmit={updateIsSearch.bind(null, false)}
            onChange={updateSearchText}
            onCancel={goBack}
            focused
            showCancelButton
          />
          <WingBlank />
          <div className={`${PrefixCls}-filter`}>
            <TitleBox title="选择条件" />
            {layoutFilters(filters, filterValues, handleFilterClick)}
          </div>
          <WhiteSpace />
        </div>)
        : (
          <div className={styles[`${PrefixCls}-outer`]}>
            <WingBlank />
            <div className={styles[`${PrefixCls}-searchbox`]}>
              <div className={styles[`${PrefixCls}-searchbox-header`]}>
                <SearchBar value={searchText}
                  onCancel={goBack}
                  onFocus={updateIsSearch.bind(null, true)}
                  showCancelButton
                />
                <TitleBox title={`本次搜索共${totalCount}条记录！`} />
              </div>
            </div>
            <WingBlank />
            <div>
              <div>
                {lists.length > 0 && getContents(lists)}
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
}

Comp.propTypes = {
  search: PropTypes.object.isRequired,
  loading: PropTypes.object,
};

export default connect(({ search, app, loading }) => ({
  search,
  loading,
  app
}))(Comp);

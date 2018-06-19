import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {SearchBar, WhiteSpace, WingBlank, Button, Icon, NavBar, Tag} from 'components'
import {Flex} from 'components'
import {getLocalIcon, getImages} from 'utils'
import {layoutFilters} from './layout'
import {layoutRow} from 'components/row'
import ListView from 'components/listview'
import StatusBox from 'components/statusbox'
import TitleBox from 'components/titlecontainer'
import styles from './index.less'

const PrefixCls = "search"

function Comp({location, search, loading, dispatch}) {
  const {router = ''} = location.query
  const {filters, filterValues, isFilter, searchText, lists, paginations, scrollerTop, totalCount} = search,
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
      })
    }, updateIsSearch = (isFilter) => {
      dispatch({
        type: `${PrefixCls}/updateState`,
        payload: {
          isFilter: isFilter,
          paginations: getDefaultPaginations()
        }
      })
      if (!isFilter)
        dispatch({
          type: `${PrefixCls}/search`
        })
    }, goBack = () => {
      dispatch(routerRedux.goBack())
    }, handleFilterClick = (key, value) => {
      const newValue = {...filterValues}
      if (value == null)
        delete newValue[key]
      else
        newValue[key] = [value]
      dispatch({
        type: `${PrefixCls}/updateState`,
        payload: {
          filterValues: newValue
        }
      })
    },
    handleCardClick = ({id}) => {
      dispatch({
        type: 'seekdetails/updateState',
        payload: {
          isTask: false
        },
      })
      dispatch(routerRedux.push({
        pathname: '/seekdetails',
        query: {
          id,
        },
      }))
    },
    stopPropagation = (e) => {
      e.stopPropagation()
    },
    getShtate = () => {
      return <StatusBox bg='#9c9595' status='不在办理范围'/>
    },
    getStatus = (status) => {
      switch (status) {
        case '0' :
          return <StatusBox bg='#f5b90c' status='待审核'/>
        case '1' :
        case '2' :
        case '3' :
        case '4' :
          return <StatusBox bg='#29ad2e' status='处理中'/>
        case '5' :
          return <StatusBox bg='#d45b5b' status='已完成'/>
      }
    },
    handleCollectClick = (data) => {
      dispatch({
        type: `${PrefixCls}/collent`,
        payload: {
          ...data,
        },
      })
    },
    getImagesPage = (images, cls = '') => {
      if (cnIsArray(images) && images.length) {
        let i = 0
        return (
          <div className={styles[`${cls}-attrs`]}>
            {images.map((src, i) => i < 2 ?
              <div key={i} className={styles[`${cls}-attrs-img`]}
                   style={{backgroundImage: 'url(' + src + ')'}}></div> : '')}
          </div>
        )
      }
      return ''
    },
    appealRow = (rowData, sectionID, rowID) => {
      const {username, createDate, positions, title, state, content, images, answers, isCollect, id, shState, userPhoto} = rowData,
        cls = `${PrefixCls}-card`
      return (
        <div key={id} className={styles[cls]} onClick={handleCardClick.bind(null, rowData)}>
          <div className={styles[`${cls}-info`]}>
            <img src={getImages(userPhoto, 'user')} alt=""/>
            <div className={styles[`${cls}-info-details`]}>
              <div className={styles[`${cls}-info-details-name`]}>{username}</div>
              <div className={styles[`${cls}-info-details-others`]}>
                <div className={styles[`${cls}-info-details-others-date`]}>
                  <span>{createDate}</span>
                </div>
                <div className={styles[`${cls}-info-details-others-pos`]}>
                  <span>{positions}</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles[`${cls}-content-status`]} onClick={stopPropagation}>
            <span style={{color: '#1ab99d'}}>当前状态:<span>{shState == '2' ? getShtate() : getStatus(state)}</span></span>
            <span>
            <Tag selected={isCollect} onChange={handleCollectClick.bind(null, rowData)}>
            <Icon type={getLocalIcon('/others/collectionblack.svg')}/>
              {isCollect ? <span className={styles[`${cls}-content-status-collection`]}>已收藏</span>
                : <span className={styles[`${cls}-content-status-collection`]}>收藏</span>}
                </Tag>
          </span>
          </div>
          <div className={styles[`${cls}-content`]}>
            <div className={styles[`${cls}-content-title`]}>{title}</div>
            <div className={styles[`${cls}-content-content`]}>
              <span style={{color: '#1ab99d'}}>问：</span>
              {content}
            </div>
          </div>
          {getImagesPage(images, cls)}
        </div>
      )
    },
    handleItemOnclick = ({name = '', externalUrl = '', id = '', pathname = 'details'}) => {
      if (externalUrl != '' && externalUrl.startsWith('http')) {
        dispatch(routerRedux.push({
          pathname: 'iframe',
          query: {
            name,
            externalUrl: externalUrl,
          },
        }))
      } else {
        dispatch(routerRedux.push({
          pathname: `/${pathname}`,
          query: {
            name,
            dataId: id,
          },
        }))
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
      })
    },
    onEndReached = (callback) => {
      dispatch({
        type: `${PrefixCls}/search`,
        payload: {
          callback,
        }
      })
    },
    onScrollerTop = (top) => {
      if (top && !isNaN(top * 1))
        dispatch({
          type: `${PrefixCls}/updateState`,
          payload: {
            scrollerTop: top
          }
        })
    },
    getContents = (lists) => {
      const result = [], {current, total, size} = paginations,
        hasMore = (total > 0) && ((current > 1 ? current - 1 : 1) * size < total)
      if (router === 'appeal') {
        result.push(
          <ListView layoutHeader={''} dataSource={lists} layoutRow={appealRow}
                    onEndReached={onEndReached}
                    hasMore={hasMore}
                    onScrollerTop={onScrollerTop.bind(null)}
                    scrollerTop={scrollerTop}
          />
        )
      } else {
        result.push(
          <ListView layoutHeader={''} dataSource={lists}
                    layoutRow={(rowData, sectionID, rowID) => layoutRow(rowData, sectionID, rowID, handleItemOnclick)}
                    onEndReached={onEndReached}
                    hasMore={hasMore}
                    onScrollerTop={onScrollerTop.bind(null)}
                    scrollerTop={scrollerTop}
          />
        )
      }
      return result
    }
  return (
    <div>
      {isFilter ?
        (<div className={styles[`${PrefixCls}-outer`]}>
          <WingBlank/>
          <SearchBar value={searchText}
                     placeholder={"请输入搜索内容"}
                     onClear={updateSearchText.bind(null, '')}
                     onSubmit={updateIsSearch.bind(null, false)}
                     onChange={updateSearchText}
                     onCancel={goBack}
                     focused={true}
                     showCancelButton={true}/>
          <WingBlank/>
          <div className={`${PrefixCls}-filter`}>
            <TitleBox title='选择条件'/>
            {layoutFilters(filters, filterValues, handleFilterClick)}
          </div>
          <WhiteSpace/>
        </div>)
        : (
          <div className={styles[`${PrefixCls}-outer`]}>
            <WingBlank/>
            <div className={styles[`${PrefixCls}-searchbox`]}>
              <div className={styles[`${PrefixCls}-searchbox-header`]}>
                <SearchBar value={searchText}
                           onCancel={goBack}
                           onFocus={updateIsSearch.bind(null, true)}
                           showCancelButton={true}/>
                <TitleBox title={`本次搜索共${totalCount}条记录！`}/>
              </div>
            </div>
            <WingBlank/>
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

export default connect(({search, loading}) => ({
  search,
  loading
}))(Comp);

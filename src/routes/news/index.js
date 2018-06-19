import React from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import Nav from 'components/nav'
import Tags from 'components/tags'
import { List, WhiteSpace, SearchBar, Tabs, Layout } from 'components'
import {layoutRow} from 'components/row'
import ListView from 'components/listview'
import Ifreams from 'components/ifream'
import styles from './index.less'

let isPlay = false
const Item = List.Item, { BaseLine } = Layout

function News ({ location, dispatch, news }) {
  const { name = '' } = location.query,
    { banners, tuijian, tabs, selectedIndex, lists, paginations, scrollerTop ,refreshId} = news,

    getvideo = (data) => {
      return data&&data.map(data=>{
     return (
       <video key={data.id} width='100%' loop poster={data.videoView} src={data.videoSrc} controls="controls"></video>
     )
   })

  }
  const PrefixCls = 'news',
    Item = List.Item,
    Brief = Item.Brief,
    handleItemOnclick = ({ externalUrl = '', id, pathname = 'details' }) => {
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
    handleTabClick = (data, index) => {
      const { route = '', title = '' ,id} = data
      dispatch({
        type: 'news/updateState',
        payload: {
          refreshId:id
        },
      })
      dispatch({
        type: 'news/queryListview',
        payload: {
          refreshId:id,
          selected: index,
          isRefresh: true
        },
      })

    },

    onRefresh = (refreshId, callback) => {
      dispatch({
        type: `${PrefixCls}/queryListview`,
        payload: {
          refreshId,
          callback,
          isRefresh: true
        }
      })
    },
    onEndReached = (refreshId, callback) => {

      dispatch({
        type: `${PrefixCls}/queryListview`,
        payload: {
          refreshId,
          callback
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
    getContents = (lists,refreshId) => {
      const result = [], {title = '', id = ''} = lists
        const {current, total, size} = paginations,
          hasMore = (total > 0) && ((current > 1 ? current - 1 : 1) * size < total)
        result.push(
          <ListView layoutHeader={''} dataSource={lists} layoutRow={(rowData, sectionID, rowID) => layoutRow(rowData, sectionID, rowID, handleItemOnclick)}
                    onEndReached={onEndReached.bind(null, refreshId)}
                    onRefresh={onRefresh.bind(null, refreshId)} hasMore={hasMore}
                    onScrollerTop={onScrollerTop.bind(null)}
                    scrollerTop={scrollerTop}
          />
        )
      return result
    },
    handleSearchClick = ({id=''}) => {
      dispatch(routerRedux.push({
        pathname: `/search`,
        query: {
          router: PrefixCls,
          id
        },
      }))
    }
  return (
    <div>
      <Nav title={name} dispatch={dispatch}/>
      <WhiteSpace size="md"/>
      <SearchBar
        placeholder={`在${name || '此页面'}中搜索`}
        maxLength={20}
        onFocus={handleSearchClick.bind(this,news)}
      />
      <WhiteSpace size="md"/>
      <Tabs
        initialPage={0}
        page={selectedIndex}
        tabs={tabs}
        swipeable={false}
        onTabClick={handleTabClick}
      >
        <div>
         <div>
           {getvideo(banners)}
         </div>
          <div>{lists.length > 0 && getContents(lists,refreshId)}</div>
        </div>
      </Tabs>
    </div>
  )
}

export default connect(({ loading, news }) => ({
  loading,
  news,
}))(News)

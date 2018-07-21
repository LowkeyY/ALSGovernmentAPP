import React from 'react'
import { connect } from 'dva'
import { WhiteSpace ,Tabs,List,Layout} from 'components'
import Banner from 'components/banner'
import Nav from 'components/nav'
import { routerRedux } from 'dva/router'
import {layoutRow} from 'components/row'
import ListView from 'components/listview'
import { getImages } from 'utils'
import styles from './index.less'


const PrefixCls = 'incorrupt', Item = List.Item, Brief = Item.Brief

function Incorrupt ({ location, dispatch,incorrupt }) {
  const { name = '', index = 0 } = location.query,
    {gridList,fixColumn,selectedIndex,dataList,banners,paginations, scrollerTop,refreshId} = incorrupt

   const getFixColumn = ({image=''}) => {

    return  <div className={styles[`${PrefixCls}-fixcolumn`]} onClick={handleFixColumnClick.bind(this,fixColumn)}>
      <img src={getImages(image)} alt=""/>
    </div>
   },
     handleFixColumnClick = ({ id, title, route='patrylist'}) => {
       dispatch(routerRedux.push({
         pathname: `/${route}`,
         query: {
           id,
           name: title,
         },
       }))

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
       if (typeof top !='undefined' && !isNaN(top * 1))
         dispatch({
           type: `${PrefixCls}/updateState`,
           payload: {
             scrollerTop: top
           }
         })
     },
     getContents = (lists,refreshId) => {
       const {current, total, size} = paginations,
         hasMore = (total > 0) && ((current > 1 ? current - 1 : 1) * size < total),
         result= []
       result.push(
         <ListView layoutHeader={''} dataSource={lists} layoutRow={(rowData, sectionID, rowID) => layoutRow(rowData, sectionID, rowID, handleItemOnclick)}
                   onEndReached={onEndReached.bind(null,refreshId)}
                   onRefresh={onRefresh.bind(null, refreshId)} hasMore={hasMore}
                   onScrollerTop={onScrollerTop.bind(null)}
                   scrollerTop={scrollerTop}
         />
       )
       return result
     },
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
     handleBannerClick = (data,index) => {
       const { externalUrl = '',title ,id , pathname='details'} = data;
       if (externalUrl != '' && externalUrl.startsWith('http')) {
         dispatch(routerRedux.push({
           pathname: 'iframe',
           query: {
             name:title,
             externalUrl: externalUrl,
           },
         }))
       }
       else {
         dispatch(routerRedux.push({
           pathname: `/${pathname}`,
           query: {
             name,
             dataId: id,
           },
         }))
       }
     },
     getCurrentView = () => <div>{getContents(dataList)}</div>,
     handleTabClick = (data, index) => {
       const { route = '', title = '' ,id} = data
       dispatch({
         type: 'incorrupt/updateState',
         payload: {
           refreshId:id
         },
       })
       dispatch({
         type: 'incorrupt/queryListview',
         payload: {
           refreshId:id,
           selected: index,
           isRefresh: true
         },
       })

     }
  return (
    <div>
      <Nav title={name} dispatch={dispatch}/>
      <div className={styles[`${PrefixCls}-outer`]}>
        {banners.length>0&&<Banner datas={banners} handleClick={handleBannerClick}/>}
        <div className={styles[`${PrefixCls}-fiximg`]}>
          <img src={require('./jiandu.jpg')} alt=""/>
        </div>
        <div>{fixColumn&&getFixColumn(fixColumn,handleFixColumnClick)}</div>
        <Tabs
          initialPage={0}
          page={selectedIndex}
          tabs={gridList}
          swipeable={false}
          onTabClick={handleTabClick}
        >
          {getCurrentView()}
        </Tabs>
      </div>
    </div>
  )
}

export default connect(({ loading, incorrupt }) => ({
  loading,
  incorrupt,
}))(Incorrupt)

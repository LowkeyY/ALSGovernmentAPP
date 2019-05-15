import React from 'react'
import { connect } from 'dva'
import { WingBlank, WhiteSpace, Tabs, Badge, List, SearchBar ,Layout,Modal} from 'components'
import Nav from 'components/nav'
import Iframes from 'components/ifream'
import {layoutRow} from 'components/row'
import ListView from 'components/listview'
import { routerRedux } from 'dva/router'
import Banner from 'components/banner'
import TitleBox from 'components/titlecontainer'
import { getImages } from 'utils'
import { doDecode } from 'utils'
import SignIn from 'components/sign'
import styles from './index.less'

const PrefixCls = 'commonlist',
  Item = List.Item,
  Brief = Item.Brief
function Comp ({ location, dispatch, commonlist ,app}) {
  const { name = '', selectedIndex = 0, grids, lists, bannerDatas,paginations, scrollerTop,refreshId,dataItems } = commonlist,
    { isLogin } = app,
    handleItemOnclick = ({ externalUrl = '', id,title='',route='details', infos = '{}' }) => {
      let primaryParams = {}
      try {
        primaryParams = doDecode(infos)
      } catch (e) {
      }
      if (primaryParams.route && primaryParams.id) {
        pathname = primaryParams.route
        id = primaryParams.id
      }
      if (externalUrl != '' && externalUrl.startsWith('http')) {
        dispatch(routerRedux.push({
          pathname: 'iframe',
          query: {
            name:title,
            externalUrl: externalUrl,
          },
        }))
      } else {
        dispatch(routerRedux.push({
          pathname: `/${route}`,
          query: {
            name,
            id,
            dataId: id,
          },
        }))
      }
    },
    handleEntryOnclick = ({ externalUrl = '', id,title='',route='details' }) => {
     if(route==='fazhandangyuan'){
       if (isLogin) {
         dispatch(routerRedux.push({
           pathname: `/${route}`,
           query: {
             name:title,
             id,
             dataId: id,
           },
         }))
       } else {
         Modal.alert('您还没登陆', '登录后才可进入', [
           { text: '稍后再说', onPress: () => console.log('cancel') },
           {
             text: '立刻登陆',
             onPress: () =>
               dispatch(routerRedux.push({
                 pathname: '/login',
               })),
           },
         ])
       }
     }else {
       if (externalUrl != '' && externalUrl.startsWith('http')) {
         dispatch(routerRedux.push({
           pathname: 'iframe',
           query: {
             name:title,
             externalUrl: externalUrl,
           },
         }))
       } else {
         dispatch(routerRedux.push({
           pathname: `/${route}`,
           query: {
             name:title,
             id,
             dataId: id,
           },
         }))
       }
     }
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
    getContents = (lists,infos,refreshId) => {
      const {current, total, size} = paginations,
        hasMore = (total > 0) && ((current > 1 ? current - 1 : 1) * size < total),
        result= []
      result.push(
        <ListView layoutHeader={()=>infos} dataSource={lists} layoutRow={(rowData, sectionID, rowID) => layoutRow(rowData, sectionID, rowID, handleItemOnclick)}
                  onEndReached={onEndReached.bind(null,refreshId)}
                  onRefresh={onRefresh.bind(null, refreshId)} hasMore={hasMore}
                  onScrollerTop={onScrollerTop.bind(null)}
                  scrollerTop={scrollerTop}
        />
      )
      return result
    },
    // getContents = (lists) => {
    //   const result = []
    //   lists.map((list, i) => {
    //     const { id = '' } = list
    //     if (id != '') {
    //       result.push(
    //         <Item className={styles[`${PrefixCls}-item`]}
    //               thumb={list.image || ''} multipleLine wrap arrow='horizontal'
    //               onClick={handleItemOnclick.bind(null, list)}>
    //           <span>{list.title}</span><Brief>{list.time}</Brief>
    //         </Item>,
    //       )
    //     }
    //   })
    //   return <List>{result}</List>
    // },

    getIfream = (src) => {
      return <Iframes src={src} dispatch={dispatch}/>
    },
    getTabs = () => {
      const result = []
      grids.map((grid, i) => {
        const { title = '' } = grid
        if (title != '') {
          result.push({ ...grid })
        }
      })
      return result
    },
    getEntrance = (dataItems) => {
      if (Array.isArray(dataItems)) {
       return dataItems&&dataItems.map((data,index)=>{
          const {image,infos=''} = data
          return (
            <div key={index}>
              {
                infos!=''?<TitleBox title={infos}/>:''
              }
              <div className={styles[`${PrefixCls}-entrance`]} onClick={handleEntryOnclick.bind(null,data)}>
                <img src={getImages(data.image)} alt=""/>
              </div>
            </div>
          )
        })
      }
    },
    getCurrentView = (selectedIndex) => {
      const { externalUrl = '' ,infos=''} = grids[selectedIndex] || {}
      const result = []
      if (bannerDatas.length > 0) {
        const props = {
          datas: bannerDatas,
          handleClick: (data) => {
            selectedIndex
          },
        }
        result.push(<Banner {...props}/>)
      }

      if(selectedIndex*1==0){
        result.push(<SignIn/>)
      }
      result.push(getEntrance(dataItems))
      if(selectedIndex*1!=1){
        result.push(externalUrl == '' ? getContents(lists,infos) : getIfream(externalUrl))
      }
      return <div>{result}</div>
    },
    handleTabClick = (data, index) => {
      const { externalUrl = '' ,id} = data
      dispatch({
        type: 'commonlist/updateState',
        payload: {
          selectedIndex: index,
        },
      })
      if (externalUrl == '') {
        dispatch({
          type: 'commonlist/updateState',
          payload: {
            refreshId:id
          },
        })
        dispatch({
          type: 'commonlist/queryListview',
          payload: {
            refreshId:id,
            selected: index,
            isRefresh: true
          },
        })
      }
      dispatch({
        type:'commonlist/queryOthers',
        payload:{
         id
        }
      })
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
    <div className={styles[`${PrefixCls}-outer`]}>
      <Nav title={name} dispatch={dispatch}/>
      <SearchBar placeholder={`在${name || '此页面'}中搜索`}
                 maxLength={20}
                 onFocus={handleSearchClick.bind(this,commonlist)}/>
      <Tabs
        initialPage={0}
        page={selectedIndex}
        tabs={getTabs()}
        swipeable={false}
        onTabClick={handleTabClick}
      >
        <div>
          {getCurrentView(selectedIndex)}
        </div>
      </Tabs>
    </div>

  )
}

export default connect(({ loading, commonlist ,app}) => ({
  loading,
  commonlist,
  app
}))(Comp)

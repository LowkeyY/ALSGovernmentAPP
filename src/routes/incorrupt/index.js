import React from 'react'
import { connect } from 'dva'
import { WhiteSpace ,Tabs,List,Layout} from 'components'
import Banner from 'components/banner'
import Nav from 'components/nav'
import { routerRedux } from 'dva/router'
import { getImages } from 'utils'
import styles from './index.less'


const PrefixCls = 'incorrupt', { BaseLine } = Layout,Item = List.Item, Brief = Item.Brief

function Incorrupt ({ location, dispatch,incorrupt }) {
  const { name = '', index = 0 } = location.query,
    {gridList,fixColumn,selectedIndex,dataList,banners} = incorrupt

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
     getContents = (lists) => {
       const result = []
       lists.map((list, i) => {
         const { id = '' } = list
         if (id != '') {
           result.push(
             <Item key ={i} className={styles[`${PrefixCls}-item`]}
                   thumb={list.image || ''} multipleLine wrap arrow='horizontal'
                   onClick={handleItemOnclick.bind(null, list)}>
               <span>{list.title}</span><Brief>{list.time}</Brief>
             </Item>,
           )
         }
       })
       return <List>{result}</List>
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
     getCurrentView = () => <div>{getContents(dataList)} <BaseLine/></div>,
     handleTabClick = (data, index) => {
       const { route = '', title = '' ,id} = data
         dispatch({
           type: 'incorrupt/querySelect',
           payload: {
             ...data,
             selected: index,
           },
         })

     }
  return (
    <div>
      <Nav title={name} dispatch={dispatch}/>
      <WhiteSpace size="md"/>
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

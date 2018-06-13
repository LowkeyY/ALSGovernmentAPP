import React from 'react'
import { connect } from 'dva'
import { WingBlank, WhiteSpace, Tabs, Badge, List, SearchBar,Layout } from 'components'
import Nav from 'components/nav'
import { routerRedux } from 'dva/router'
import Banner from 'components/banner'
import styles from './index.less'
const PrefixCls = 'lanmutab',
  Item = List.Item,
  Brief = Item.Brief,{BaseLine} = Layout

function Derenitems ({ location, dispatch, derenitems }) {
  const { name = '', selectedIndex = 0, tabs ,itemData,bannersData} = derenitems,
    getContents = (derenitems) => {
      const result = []
      itemData.map((list, i) => {
        const { id = '',title,time,image} = list
        if (id != '') {
          result.push(
            <Item className={styles[`${PrefixCls}-item`]}
                  thumb={image || ''} multipleLine wrap arrow='horizontal'
                  onClick={handleItemOnclick.bind(null, list)}>
              <span>{title}</span><Brief>{time}</Brief>
            </Item>
          )
        }
      })
      return <List>{result}</List>
    },
    getBanners = () =>{
      bannersData&&bannersData.map(item => {
        item.url = item.image
      })
      return bannersData
    },
    handleTabClick = (data, index) => {
      const { externalUrl = '' ,title} = data;
      if (externalUrl != '' && externalUrl.startsWith('http')) {
        dispatch(routerRedux.push({
          pathname: 'iframe',
          query: {
            name:title,
            externalUrl: externalUrl,
          },
        }))
      }else {
        dispatch({
          type: 'derenitems/querySelect',
          payload: {
            ...data,
            selected: index,
          },
        })
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
    handleItemOnclick = ({pathname='details',id}) => {
      dispatch(routerRedux.push({
        pathname: `/${pathname}`,
        query: {
          name,
          dataId: id,
        },
      }))
    }

  return (
    <div className={styles[`${PrefixCls}-outer`]}>
      <Nav title={name} dispatch={dispatch}/>
      {getBanners().length>0&&<Banner datas={getBanners()} handleClick={handleBannerClick}/>}
      <Tabs
        initialPage={0}
        page={selectedIndex}
        tabs={tabs}
        swipeable={false}
        onTabClick={handleTabClick}
        renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3}/>}>
       <div>
         {getContents(itemData)}
         <BaseLine/>
       </div>
      </Tabs>
    </div>

  )
}

export default connect(({ loading, derenitems }) => ({
  loading,
  derenitems,
}))(Derenitems)

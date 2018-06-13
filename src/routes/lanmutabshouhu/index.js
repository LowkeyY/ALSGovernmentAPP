import React from 'react'
import { connect } from 'dva'
import { WingBlank, WhiteSpace, Tabs, Badge, List, SearchBar ,Layout} from 'components'
import Nav from 'components/nav'
import { routerRedux } from 'dva/router'
import Banner from 'components/banner'
import styles from './index.less'

const PrefixCls = 'lanmutabshouhu',
  Item = List.Item,
  Brief = Item.Brief,
  {BaseLine} = Layout

function Comp ({ location, dispatch, lanmutabshouhu }) {
  const { name = '', selectedIndex = 0, grids, lists, bannerDatas } = lanmutabshouhu,
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
    getContents = (lists) => {
      const result = []
      lists.map((list, i) => {
        const { id = '' } = list
        if (id != '') {
          result.push(
            <Item className={styles[`${PrefixCls}-item`]}
                  thumb={list.image || ''} multipleLine wrap arrow='horizontal'
                  onClick={handleItemOnclick.bind(null, list)}>
              <span>{list.title}</span><Brief>{list.time}</Brief>
            </Item>,
          )
        }
      })
      return <List>{result}</List>
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
    getCurrentView = () => <div>{getContents(lists)} <BaseLine/></div>,
    handleTabClick = (data, index) => {
      const { route = '', title = '' ,id} = data
      if (route == '') {
        dispatch({
          type: 'lanmutabshouhu/querySelect',
          payload: {
            ...data,
            selected: index,
          },
        })
      } else {
        dispatch(routerRedux.push({
          pathname: `/${route}`,
          query: {
            name,
            id,
          },
        }))
      }
    },
    handleNavClick = ({id,name,route='guard',selectd='2'}) => {
      dispatch(routerRedux.push({
        pathname: `/${route}`,
        query: {
          name,
          id,
          selectd
        },
      }))
    },
    renderNav = (lanmutabshouhu) => {
     return grids.map((data) => {
        if(data.route=='guard'){
          return <span onClick={handleNavClick.bind(this,lanmutabshouhu)}>任务管理</span>
        }
      })
    },
    bannerProps = {
      datas: bannerDatas,
      handleClick: (data) => {
        console.log(data)
      },
    }
  return (
    <div className={styles[`${PrefixCls}-outer`]} >
      <Nav title={name} dispatch={dispatch} renderNavRight={renderNav(lanmutabshouhu)}/>
      <Banner {...bannerProps}/>
      <Tabs
        initialPage={0}
        page={selectedIndex}
        tabs={getTabs()}
        swipeable={false}
        onTabClick={handleTabClick}
      >
        {getCurrentView()}
      </Tabs>
    </div>

  )
}

export default connect(({ loading, lanmutabshouhu }) => ({
  loading,
  lanmutabshouhu,
}))(Comp)

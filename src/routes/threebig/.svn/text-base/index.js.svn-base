import React from 'react'
import { connect } from 'dva'
import { WingBlank, WhiteSpace, Tabs, Badge, List, SearchBar, Layout } from 'components'
import Nav from 'components/nav'
import { getImages } from 'utils'
import { routerRedux } from 'dva/router'
import Banner from 'components/banner'
import styles from './index.less'

const PrefixCls = 'threebig',
  Item = List.Item,
  Brief = Item.Brief, { BaseLine } = Layout

function Threebig ({ location, dispatch, threebig }) {
  const { name = '', selectedIndex = 0, tabs, itemData, bannersData, fixData } = threebig,
    getContents = (threebig, fixData,selectedIndex) => {

      const result = []
      itemData.map((list, i) => {
        const { id = '', title, time, image } = list
        if (id != '') {
          result.push(
            <Item key={id} className={styles[`${PrefixCls}-item`]}
                  thumb={image || ''} multipleLine wrap arrow='horizontal'
                  onClick={handleItemOnclick.bind(null, list)}>
              <span>{title}</span><Brief>{time}</Brief>
            </Item>,
          )
        }
      })
      return <List>{selectedIndex>0?getFixColumn(fixData):''}{result}</List>
    },
    handleFixImgClick = ({ id, title, route }) => {
      dispatch(routerRedux.push({
        pathname: `/${route}`,
        query: {
          id,
          name: title,
        },
      }))
    },
    handleFixItemClick = ({ id, title, route } ) => {
      dispatch(routerRedux.push({
        pathname: `/${route}`,
        query: {
          id,
          name: title,
        },
      }))
    },
    getFixColumn = (fixData) => {
      if (Array.isArray(fixData)) {
        const result = []
        if (fixData.length == 2) {
          fixData.map((data, i) => {
            result.push(<div key={data.id} className={styles[`${PrefixCls}-items`]} onClick={handleFixItemClick.bind(this,data)}>
              <img src={getImages(data.image)} alt=""/>
              <span>{data.title}</span>
            </div>)
          })

          return (<div className={styles[`${PrefixCls}-fixBox`]} >
            {result}
            </div>)
        } else if (fixData.length == 1) {
          return fixData.map((data, i) => {
            return (<span key={data.id} className={styles[`${PrefixCls}-fiximg`]} onClick={handleFixImgClick.bind(this,data)}>
              <img src={getImages(data.image)} alt=""/>
            </span>)
          })
        } else {
          return ''
        }
      }
    },
    getBanners = () => {
      bannersData && bannersData.map(item => {
        item.url = item.image
      })
      return bannersData
    },
    handleTabClick = (data, index) => {
      const { externalUrl = '', title, id = '' } = data
      if (externalUrl != '' && externalUrl.startsWith('http')) {
        dispatch(routerRedux.push({
          pathname: 'iframe',
          query: {
            name: title,
            externalUrl: externalUrl,
          },
        }))
      } else {
        if (index != 0) {
          dispatch({
            type: 'threebig/querySelect',
            payload: {
              ...data,
              selected: index,
            },
          })
          dispatch({
            type: 'threebig/queryOthers',
            payload: {
              id,
            },
          })
        }
        dispatch({
          type: 'threebig/querySelect',
          payload: {
            ...data,
            selected: index,
          },
        })
      }

    },
    handleBannerClick = (data, index) => {
      const { externalUrl = '', title, id, pathname = 'details' } = data
      if (externalUrl != '' && externalUrl.startsWith('http')) {
        dispatch(routerRedux.push({
          pathname: 'iframe',
          query: {
            name: title,
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
    handleItemOnclick = ({ pathname = 'details', id }) => {
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
      {getBanners().length > 0 && <Banner datas={getBanners()} handleClick={handleBannerClick}/>}
      <Tabs
        initialPage={0}
        page={selectedIndex}
        tabs={tabs}
        swipeable={false}
        onTabClick={handleTabClick}
        renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3}/>}>
        <div>
          {getContents(itemData, fixData,selectedIndex)}
          <BaseLine/>
        </div>
      </Tabs>
    </div>

  )
}

export default connect(({ loading, threebig }) => ({
  loading,
  threebig,
}))(Threebig)

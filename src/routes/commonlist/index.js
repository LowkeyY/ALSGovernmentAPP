import React from 'react'
import { connect } from 'dva'
import { WingBlank, WhiteSpace, Tabs, Badge, List, SearchBar ,Layout} from 'components'
import Nav from 'components/nav'
import Iframes from 'components/ifream'
import { routerRedux } from 'dva/router'
import Banner from 'components/banner'
import { doDecode } from 'utils'
import styles from './index.less'

const PrefixCls = 'commonlist',
  Item = List.Item,
  Brief = Item.Brief,{BaseLine} = Layout

function Comp ({ location, dispatch, commonlist }) {
  const { name = '', selectedIndex = 0, grids, lists, bannerDatas } = commonlist,
    handleItemOnclick = ({ externalUrl = '', id, pathname = 'details', infos = '{}' }) => {
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
            name,
            externalUrl: externalUrl,
          },
        }))
      } else {
        dispatch(routerRedux.push({
          pathname: `/${pathname}`,
          query: {
            name,
            id,
            dataId: id,
          },
        }))
      }
    },
    handleFiexdItemOnclick = ({ route, id, title }) => {
      if (route) {
        dispatch(routerRedux.push({
          pathname: `/${route}`,
          query: {
            name: title,
            id,
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
    getCurrentView = () => {
      const { externalUrl = '' } = grids[selectedIndex] || {}
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
      result.push(externalUrl == '' ? getContents(lists) : getIfream(externalUrl))
      return <div>{result}</div>
    },
    handleTabClick = (data, index) => {
      const { externalUrl = '' } = data
      dispatch({
        type: 'commonlist/updateState',
        payload: {
          selectedIndex: index,
        },
      })
      if (externalUrl == '') {
        dispatch({
          type: 'commonlist/querySelect',
          payload: {
            ...data,
            selected: index,
          },
        })
      }
    }
  return (
    <div className={styles[`${PrefixCls}-outer`]}>
      <Nav title={name} dispatch={dispatch}/>
      <SearchBar
        placeholder="输入需要搜索的内容"
        onSubmit={value => console.log(value, 'onSubmit')}
        onClear={value => console.log(value, 'onClear')}
        onFocus={() => console.log('onFocus')}
        onBlur={() => console.log('onBlur')}
        onCancel={() => console.log('onCancel')}
        showCancelButton
        onChange={() => console.log('onChange')}
      />
      <Tabs
        initialPage={0}
        page={selectedIndex}
        tabs={getTabs()}
        swipeable={false}
        onTabClick={handleTabClick}
      >
        <div>
          {getCurrentView()}
          <BaseLine/>
        </div>
      </Tabs>
    </div>

  )
}

export default connect(({ loading, commonlist }) => ({
  loading,
  commonlist,
}))(Comp)

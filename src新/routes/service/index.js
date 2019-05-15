import React from 'react'
import { connect } from 'dva'
import { WhiteSpace, Badge, List, SearchBar } from 'components'
import Menu from 'components/menu/index'
import Nav from 'components/nav'
import { taskRow, reactRow } from 'components/row'
import { routerRedux } from 'dva/router'
import styles from './index.less'
import Banner from 'components/banner/index'
import TitleBox from 'components/titlecontainer'
import { config, cookie } from 'utils'
import { handleBannerClick } from 'utils/commonevent'

const PrefixCls = 'service'

function Service ({ location, dispatch, service, app }) {
  const { name = '' } = location.query
  const { grids } = service
  const { noViewCount = 0 } = app,
    handleGridClick = ({ route = '', title, externalUrl = '', ...others }) => {
      if (externalUrl !== '' && externalUrl.startsWith('http')) {
        dispatch(routerRedux.push({
          pathname: 'iframe',
          query: {
            name: title,
            externalUrl,
          },
        }))
      } else {
        dispatch(routerRedux.push({
          pathname: `/${route}`,
          query: {
            name: title,
            ...others,
          },
        }))
      }
    },
    handleSearchClick = ({ id = '' }) => {
      dispatch(routerRedux.push({
        pathname: '/search',
        query: {
          router: PrefixCls,
        },
      }))
    }
  return (
    <div className={styles[`${PrefixCls}-outer`]}>
      <Nav title={name} dispatch={dispatch}/>
      <SearchBar
        placeholder='搜索'
        maxLength={20}
        onFocus={handleSearchClick.bind(this, service)}
      />
      {grids.length > 0 &&
      <Menu handleGridClick={handleGridClick} columnNum={4} dispatch={dispatch} datas={grids}/>}
    </div>

  )
}

export default connect(({ loading, service, app }) => ({
  loading,
  service,
  app,
}))(Service)

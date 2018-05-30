import React from 'react'
import NProgress from 'nprogress'
import PropTypes from 'prop-types'
import {connect} from 'dva'
import {routerRedux} from 'dva/router'
import {classnames, config, getLocalIcon} from 'utils'
import {Loader, TabBar, Icon} from 'components'
import './app.less'

let lastHref
const App = ({children, dispatch, app, loading, location}) => {
  let {pathname} = location
  const {spinning , tabBars} = app
  pathname = pathname.startsWith('/') ? pathname : `/${pathname}`
  pathname = pathname.endsWith('/index.html') ? '/' : pathname //Android配置首页自启动
  const href = window.location.href,
    menusArray = [];
  tabBars.map(_ => {
    menusArray.push(_.route)
  })

  cnSetStatusBarStyle(pathname)
  if (lastHref !== href) {
    NProgress.start()
    if (!loading.global) {
      NProgress.done()
      lastHref = href
    }
  }

  if (pathname !== '/' && menusArray.length && !menusArray.includes(pathname)) {
    return (<div>
      <Loader spinning={loading.effects[`${pathname.startsWith('/') ? pathname.substr(1) : pathname}/query`]}/>
      {children}
    </div>)
  }

  return (
    <div className='tabbarbox'>
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
        hidden={false}
      >
        {tabBars.map((_, index) => {
          const props = Object.assign({
            key: index,
            selectedIcon: _.icon,
            selected: pathname === _.route,
            onPress: () => {
              dispatch(routerRedux.push(_.route))
            },
          }, _)
          props.icon = <div style={{
            width: '0.44rem',
            height: '0.44rem',
            background: `url(${props.icon}) center center /  0.42rem 0.42rem no-repeat`,
          }}
          />
          {/*<Icon type={getLocalIcon(props.icon)}/>*/
          }
          props.selectedIcon = <div style={{
            width: '0.44rem',
            height: '0.44rem',
            background: `url(${props.selectedIcon}) center center /  0.42rem 0.42rem no-repeat`,
          }}
          />
          return (
            <TabBar.Item {...props}>
              {/*{index!==0? <Loader spinning={spinning} />:null}*/}
              {children}
            </TabBar.Item>
          )
        })}
      </TabBar>
    </div>
  )
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({app, loading}) => ({app, loading}))(App)

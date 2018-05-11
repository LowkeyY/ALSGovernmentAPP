import React from 'react'
import NProgress from 'nprogress'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { routerRedux } from 'dva/router';
import { classnames, config , getLocalIcon} from 'utils'
import { Loader } from '../components'
import './app.less'
const App = ({ children, dispatch, app, loading, location }) => {
  let { pathname } = location
  const {spinning}=app
  pathname = pathname.startsWith('/') ? pathname : `/${pathname}`;
  pathname = pathname.endsWith('/index.html') ? "/" : pathname; //Android配置首页自启动
  const href = window.location.href

   return (
     <div>
       {/*<Loader spinning={spinning} />*/}
       {children}
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

export default connect(({ app, loading }) => ({ app, loading }))(App)

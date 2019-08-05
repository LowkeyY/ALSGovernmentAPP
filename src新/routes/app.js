import React from 'react';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { classnames, config, getLocalIcon } from 'utils';
import { Loader, TabBar, Icon, Modal } from 'components';
import './app.less';


let lastHref,
  isFirst = true,
  startWebSocket = ({ userid = '' }) => {
    const { wsURL = '' } = config;
    cnGetWebSocket(wsURL, userid);
  },
  progessStart = false;
const App = ({ children, dispatch, app, loading, location }) => {
  let { pathname } = location;
  const { spinning = false, tabBars, users, updates: { upgraded = false, urls = '', appVerSion = '', updateInfo = '' }, showModal, noViewCount = 0 } = app;
  pathname = pathname.startsWith('/') ? pathname : `/${pathname}`;
  pathname = pathname.endsWith('/index.html') ? '/' : pathname; // Android配置首页自启动
  const href = window.location.href,
    menusArray = [];
  tabBars.map(_ => {
    menusArray.push(_.route);
  });

  cnSetStatusBarStyle(pathname);
  startWebSocket(users);
  if (lastHref !== href || loading.global) {
    NProgress.start();
    progessStart = true;
    if (!loading.global) {
      lastHref = href;
    }
  }
  if (!loading.global && progessStart) {
    progessStart = false;
    NProgress.done();
  }
  const getContent = (content) => {
      return (
        <div
          style={{ maxHeight: '60vh', overflowY: 'scroll', textAlign: 'left' }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      );
    },
    update = (url, upgraded) => {
      if (upgraded) {
        return (<Modal
          visible
          transparent
          maskClosable={false}
          title="当前版本过低"
          footer={[{ text: '立刻升级', onPress: () => cnUpdate(url) }]}
        >
          <div>
            <div>{`请升级${appVerSion}版本后继续访问`}</div>
            {getContent(updateInfo)}
          </div>
        </Modal>);
      }
      if (isFirst) {
        Modal.alert(`版本更新(${appVerSion})`, getContent(updateInfo), [
          {
            text: '暂不升级',
            onPress: () => dispatch({
              type: 'app/updateState',
              payload: {
                showModal: false,
              },
            }),
            style: 'default',
          },
          { text: '立刻升级', onPress: () => cnUpdate(url) },
        ]);
        isFirst = false;
      }
    };
  return (<div>
    <Loader spinning={loading.effects[`${pathname.startsWith('/') ? pathname.substr(1) : pathname}/query`]}/>
    {children}
    {showModal ? update(urls, upgraded) : ''}
  </div>);

};

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.object,
};

export default connect(({ app, loading }) => ({ app, loading }))(App);

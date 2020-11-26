import React from 'react';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import UpdateBar from 'components/updatebar';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { classnames, config, getLocalIcon } from 'utils';
import { Loader, TabBar, Icon, Modal } from 'components';
import './app.less';


let lastHref,
  isFirst = true,
  currentDownloadProgress = 0,
  startWebSocket = ({ userid = '' }) => {
    const { wsURL = '' } = config;
    cnGetWebSocket(wsURL, userid);
  },
  progessStart = false;
const App = ({ children, dispatch, app, loading, location }) => {
  let { pathname } = location;
  const { tabBars, users, updates: { upgraded = false, appUrl = '', urls = '', appVerSion = '', updateInfo = '' }, showModal, noViewCount = 0, showUpdate, percentage } = app;
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
    if (pathname !== '/mine') {
      NProgress.start();
      progessStart = true;
      if (!loading.global) {
        lastHref = href;
      }
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
    updateSuccess = () => {
      dispatch({
        type: 'app/updateState',
        payload: {
          showUpdate: false,
          percentage: 0,
        },
      });
    },
    updateError = () => {
      dispatch({
        type: 'app/updateState',
        payload: {
          showUpdate: false,
          percentage: 0,
        },
      });
    },
    progress = (e) => {
      if (e.lengthComputable) {
        let num = ((e.loaded / e.total) * 100).toFixed();
        if (num != currentDownloadProgress) {
          currentDownloadProgress = num;
          dispatch({
            type: 'app/updateState',
            payload: {
              percentage: num,
            },
          });
        }
      }
    },
    handerUpdate = () => {
      dispatch({
        type: 'app/updateState',
        payload: {
          showUpdate: true,
        },
      });
      if (cnIsAndroid()) {
        cnUpdateByDownloadAPK({
          fileUrl: appUrl,
        }, updateSuccess, updateError, progress);
      } else if (cnIsiOS()) {
        cnUpdate(urls);
      }
    },
    update = (url, upgraded) => {
      if (upgraded && url !== '') {
        return (<Modal
          visible
          transparent
          maskClosable={false}
          title="当前版本过低"
          footer={[{
            text: '立刻升级',
            onPress: () => handerUpdate(),
          }]}
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
          {
            text: '立刻升级',
            onPress: () => handerUpdate(),
          },
        ]);
        isFirst = false;
      }
    },
    getDot = (pathname, noViewCount) => {
      if (pathname === '/mine' && noViewCount > 0) {
        return true;
      }
      return false;
    };
  if (pathname !== '/' && menusArray.length && !menusArray.includes(pathname)) {
    return (
      <div>
        <Loader spinning={loading.effects[`${pathname.startsWith('/') ? pathname.substr(1) : pathname}/query`]} />
        {children}
        <UpdateBar show={showUpdate} percentage={percentage} />
      </div>
    );
  }
  return (
    <div className="tabbarbox">
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
        hidden={false}
        prerenderingSiblingsNumber={3}
      >
        {tabBars.map((_, index) => {
          const props = Object.assign({
            key: index,
            selectedIcon: _.icon,
            selected: pathname === _.route,
            dot: getDot(_.route, noViewCount),
            onPress: () => {
              const { appends = {}, route } = _;
              dispatch(routerRedux.push({
                  pathname: route,
                  query: {
                    ...appends,
                  },
                },
              ));
            },
          }, _);
          props.icon = (
            <div
              key={index}
              style={{
                width: '0.44rem',
                height: '0.44rem',
                background: `url(${props.icon}) center center /  0.42rem 0.42rem no-repeat`,
              }}
            />
          );
          { /* <Icon type={getLocalIcon(props.icon)}/> */
          }
          props.selectedIcon = (
            <div
              key={index}
              style={{
                width: '0.44rem',
                height: '0.44rem',
                background: `url(${props.selectedIcon}) center center /  0.42rem 0.42rem no-repeat`,
              }}
            />
          );
          return (
            <TabBar.Item {...props}>
              {pathname === _.route ? children : ''}
            </TabBar.Item>
          );
        })}
      </TabBar>
      {showModal ? update(appUrl, upgraded) : ''}
      <UpdateBar show={showUpdate} percentage={percentage} />
      <div className="env" />
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.object,
};

export default connect(({ app, loading }) => ({ app, loading }))(App);

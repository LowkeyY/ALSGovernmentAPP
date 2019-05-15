import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Layout, WhiteSpace, Icon, List, WingBlank, Modal } from 'components';
import Grid from 'components/grid';
import styles from './index.less';
import { routerRedux } from 'dva/router';
import { getLocalIcon } from 'utils';
import { layoutRow } from 'components/row';
import Weather from 'components/weather';
import bg from '../../themes/images/others/indexBg.png';
import HeadLine from 'components/headline';
import { handleGridClick, handleTopLineClick, handleListClick } from 'utils/commonevent';

const PrefixCls = 'dashboard',
  Item = List.Item;

function Dashboard ({ dashboard, loading, dispatch, app }) {
  const { Header } = Layout,
    { bannerDatas, isScroll, grids, selectedIndex = 0, weath } = dashboard,
    { isLogin, users: { useravatar } } = app;
  const getWeather = (weath) => {
      const { date = '', type = '', notice = '', fl = '', fx = '', high = '', low = '' } = weath;
      const info = `${date} ${type} ${notice}`,
        temperature = `${high}~${low} ${fl} ${fx}`;
      const arr = [{ text: info }, { text: temperature }];
      return arr;
    },
    headLineProps = {
      bannerDatas,
      handleClick: handleTopLineClick,
    },
    handleScroll = (e) => {
      if (e.target) {
        const ddst = document.documentElement.scrollTop,
          dbst = document.body.scrollTop,
          scrollTop = Math.max(ddst, dbst),
          curScroll = scrollTop > 0;
        if (isScroll !== curScroll) {
          dispatch({
            type: 'dashboard/updateState',
            payload: {
              isScroll: curScroll,
            },
          });
        }
      }
    },
    handleNewGridClick = ({ route = '', title = '', id = '' }, isLogin) => {
      if (!isLogin && (route === 'integralhome' || route === 'lanmutabshouhu')) {
        Modal.alert('您还没登陆', '请登陆后查看积分', [
          { text: '稍后再说', onPress: () => console.log('cancel') },
          {
            text: '立刻登陆',
            onPress: () =>
              dispatch(routerRedux.push({
                pathname: '/login',
              })),
          },
        ]);
      } else {
        dispatch(routerRedux.push({
          pathname: `/${route}`,
          query: {
            name: title,
            id,
          },
        }));
      }
    };
  return (
    <div className={styles[`${PrefixCls}-outer`]} onTouchStart={handleScroll} onTouchEnd={handleScroll}>
      <div className={styles[`${PrefixCls}-outer-top`]} style={{ backgroundImage: `url(${bg})` }}>
        <Header dispatch={dispatch} isLogin={isLogin} useravatar={useravatar} />
        <div className={styles[`${PrefixCls}-outer-top-banner`]}>
          <HeadLine {...headLineProps} dispatch={dispatch} selectedIndex={selectedIndex} />
        </div>
      </div>
      <WhiteSpace/>
      <WingBlank>
        <Weather datas={getWeather(weath)}/>
      </WingBlank>
      <WhiteSpace size="lg"/>
      <div className={styles[`${PrefixCls}-outer-grids`]}>
        {grids && grids.map((data, i) => {
          return <Grid key={i} datas={data} handleClick={handleNewGridClick} dispatch={dispatch} isLogin={isLogin}/>;
        })}
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  dashboard: PropTypes.object,
  loading: PropTypes.object,
};

export default connect(({ dashboard, loading, app }) => ({ dashboard, loading, app }))(Dashboard);

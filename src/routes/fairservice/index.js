/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import Nav from 'components/nav';
import Banner from 'components/banner/index';
import Menu from 'components/menu/index';
import { handleGridClick, handleBannerClick } from 'utils/commonevent';
import styles from './index.less';

const PrefixCls = 'fairservice';

function FairService ({ location, dispatch, fairservice, app }) {
  const { bannerDatas, grids, name = '' } = fairservice,
    { isLogin } = app,
    bannerProps = {
      datas: bannerDatas,
      handleClick: handleBannerClick,
      dispatch,
      name,
      height: cnhtmlWidth / 2,
    },

    getPathname = (type) => {
      if (type === 'fair') {
        return 'fairlist';
      }
      if (type === 'lawyer') {
        return 'lawyerassistance';
      }
      if (type === 'mediate') {
        return 'mediatelist';
      }
      return null;
    },

    handleClick = () => {
      const { pageType = '' } = location.query;
      dispatch(routerRedux.push({
        pathname: `/${getPathname(pageType)}`,
      }));
    },

    getNavTitle = (type) => {
      if (type === 'fair') {
        return '我的预约';
      }
      if (type === 'lawyer') {
        return '我的申请';
      }
      if (type === 'mediate') {
        return '我的调解';
      }
      return null;
    },

    renderNav = () => {
      const { pageType = '' } = location.query;
      return (
        isLogin ?
          <div onClick={handleClick}>{getNavTitle(pageType)}</div>
          :
          null
      );
    };

  return (
    <div className={styles[`${PrefixCls}-outer`]}>
      <Nav title={name} dispatch={dispatch} renderNavRight={renderNav()} />
      {bannerDatas.length > 0 && <Banner {...bannerProps} />}
      <div className={styles[`${PrefixCls}-grids`]}>
        {grids.length > 0 &&
        <Menu handleGridClick={handleGridClick} isLogin={isLogin} columnNum={2} dispatch={dispatch} datas={grids} />}
      </div>
    </div>
  );
}

export default connect(({ loading, fairservice, app }) => ({
  loading,
  fairservice,
  app,
}))(FairService);

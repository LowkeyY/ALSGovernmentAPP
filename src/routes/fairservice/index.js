import React from 'react';
import { connect } from 'dva';
import Nav from 'components/nav';
import { WhiteSpace } from 'antd-mobile';
import Banner from 'components/banner/index';
import Menu from 'components/menu/index';
import { handleGridClick, handleBannerClick } from 'utils/commonevent';
import styles from './index.less';

const PrefixCls = 'fairservice';

function FairService ({ location, dispatch, fairservice }) {
  const { bannerDatas, grids, name = '' } = fairservice,

    bannerProps = {
      datas: bannerDatas,
      handleClick: handleBannerClick,
      dispatch,
      name,
    };
  return (
    <div>
      <Nav title={name} dispatch={dispatch}/>
      {bannerDatas.length > 0 && <Banner {...bannerProps} />}
      <div className={styles[`${PrefixCls}-grids`]}>
        {grids.length > 0 && <Menu handleGridClick={handleGridClick} columnNum={2} dispatch={dispatch} datas={grids} />}
      </div>
    </div>
  );
}

export default connect(({ loading, fairservice }) => ({
  loading,
  fairservice,
}))(FairService);

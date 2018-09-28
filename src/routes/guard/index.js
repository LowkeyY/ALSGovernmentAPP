import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, Badge, List, Toast } from 'components';
import Menu from 'components/menu/index';
import Nav from 'components/nav';
import { taskRow, reactRow } from 'components/row';
import { routerRedux } from 'dva/router';
import styles from './index.less';
import Banner from 'components/banner/index';
import TitleBox from 'components/titlecontainer';
import { config, cookie } from 'utils';
import { handleBannerClick } from 'utils/commonevent';

const PrefixCls = 'guard';

function Guard ({ location, dispatch, guard, app }) {
  const { name = '' } = location.query,
    { grids, bannerDatas } = guard,
    { noViewCount = 0 } = app,
    handleGridClick = ({ route = '', title, externalUrl = '', ...others }) => {
      if (externalUrl !== '' && externalUrl.startsWith('http')) {
        dispatch(routerRedux.push({
          pathname: 'iframe',
          query: {
            name: title,
            externalUrl,
          },
        }));
      } else {
        dispatch(routerRedux.push({
          pathname: `/${route}`,
          query: {
            name: title,
            ...others,
          },
        }));
      }
    };
  return (
    <div>
      <Nav title={name} dispatch={dispatch} />
      <TitleBox title="系统通知" />
      <div>
        {bannerDatas.length > 0 ?
          <Banner datas={bannerDatas} handleClick={handleBannerClick} dispatch={dispatch} name={name} hasTitle />
          :
          <div className={styles[`${PrefixCls}-notice`]}>暂无通知</div>
        }
      </div>
      <TitleBox title="任务系统" />
      {grids.length > 0 &&
      <Menu handleGridClick={handleGridClick} columnNum={3} dispatch={dispatch} datas={grids} />}
      <div className={styles[`${PrefixCls}-tabbox-count`]}>{noViewCount * 1 > 0 ?
        <Badge text={noViewCount * 1} overflowCount={99} /> : ''}</div>
    </div>
  
  );
}

export default connect(({ loading, guard, app }) => ({
  loading,
  guard,
  app
}))(Guard);

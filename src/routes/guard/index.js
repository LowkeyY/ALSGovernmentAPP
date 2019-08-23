/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, Badge, List, Toast } from 'components';
import Menu from 'components/menu/index';
import Nav from 'components/nav';
import { taskRow, reactRow } from 'components/row';
import { config, cookie } from 'utils';
import { handleListClick, handleGridClick } from 'utils/commonevent';
import guardBg from '../../themes/images/others/guardBg.jpg';
import styles from './index.less';


const PrefixCls = 'guard';

function Guard ({ location, dispatch, guard, app }) {
  const { name = '' } = location.query,
    { grids, noticeData, noticeGird } = guard,
    { noViewCount = 0 } = app;
  return (
    <div className={styles[`${PrefixCls}-outer`]} style={{ backgroundImage: `url(${guardBg})` }}>
      <Nav title={name} dispatch={dispatch} />
      {
        JSON.stringify(noticeData) !== '{}' ?
          <div className={styles[`${PrefixCls}-notice`]}>
            <div className={styles[`${PrefixCls}-notice-title`]}>系统<br />通知</div>
            <div
              className={styles[`${PrefixCls}-notice-content`]}
              onClick={handleListClick.bind(this, noticeData, dispatch, noticeData.title)}
            >
              {noticeData && noticeData.title}
            </div>
            <div
              className={styles[`${PrefixCls}-notice-more`]}
              onClick={(e) => handleGridClick(noticeGird, dispatch, false, '', e)}
            >
              >>更多
            </div>
          </div>
          :
          null
      }
      <WhiteSpace size="lg" />
      <WhiteSpace size="lg" />
      {
        grids.length > 0 &&
        <Menu handleGridClick={handleGridClick} columnNum={3} dispatch={dispatch} datas={grids} />
      }
      <div className={styles[`${PrefixCls}-tabbox-count`]}>{noViewCount * 1 > 0 ?
        <Badge text={noViewCount * 1} overflowCount={99} /> : ''}</div>
    </div>

  );
}

export default connect(({ loading, guard, app }) => ({
  loading,
  guard,
  app,
}))(Guard);

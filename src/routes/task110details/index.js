import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, Icon, Button } from 'components';
import Nav from 'components/nav';
import { getLocalIcon } from 'utils';
import styles from './index.less';
import TitleBox from 'components/titlecontainer';

const PrefixCls = 'task110Details';

function Task110Details ({ location, dispatch, task110Details }) {
  
  const { currentData } = task110Details, { name } = location.query,
    { city, miaoshu, creatDate, title, tels, province, creatUserId, stree_number, creatUser, district, stree, id } = currentData,
    handlereplyClick = (id, status) => {
      dispatch({
        type: 'task110Details/reply110Task',
        payload: {
          ztId: id,
          text: status
        }
      });
    };
  return (
    <div>
      <Nav title={name} dispatch={dispatch} />
      <div className={styles[`${PrefixCls}-outer`]}>
        <TitleBox title={'任务信息'} />
        <div className={styles[`${PrefixCls}-info`]}>
          <div className={styles[`${PrefixCls}-info-title`]}>{title}</div>
          <div className={styles[`${PrefixCls}-info-date`]}>
            <span>创建人：{creatUser}</span>
            <span>{creatDate}</span>
          </div>
          <div className={styles[`${PrefixCls}-info-phone`]} onClick={(e) => e.stopPropagation()}>
            <span>联系电话：{tels}</span>
            <a href={`tel:${tels}`}>
              <Icon type={getLocalIcon('/others/call.svg')} size="lg" /></a></div>
          <div
            className={styles[`${PrefixCls}-info-address`]}>{`地址：${province} ${city} ${stree} ${stree_number} ${district}`}</div>
        </div>
        <WhiteSpace />
        <TitleBox title={'任务描述'} />
        <div className={styles[`${PrefixCls}-details`]}>{miaoshu}</div>
        <div className={styles[`${PrefixCls}-button`]}>
          <Button
            type="ghost"
            inline
            onClick={handlereplyClick.bind(this,id,'接受转投')}
            size="small"
            style={{ borderColor: 'green', color: 'green', marginRight: '20px' }}>
            接受转投
          </Button>
          <Button
            type="ghost"
            inline
            onClick={handlereplyClick.bind(this,id,'不接受转投')}
            size="small"
            style={{ borderColor: 'red', color: 'red' }}>
            不接受转投
          </Button>
        </div>
      </div>
    </div>
  );
}

export default connect(({ loading, task110Details }) => ({
  loading,
  task110Details,
}))(Task110Details);

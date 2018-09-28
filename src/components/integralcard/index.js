
import React from 'react';
import styles from './index.less';

const PrefixCls = 'integralcard';
function IntegralCard (props) {
  return (
    <div className={styles[`${PrefixCls}-outer`]} onClick={props.onClick}>
      <div className={styles[`${PrefixCls}-outer-imgbox`]}>
        <img src={require('./lvyou.png')} alt="" />
      </div>
      <div className={styles[`${PrefixCls}-outer-info`]}>
        <div className={styles[`${PrefixCls}-outer-info-title`]}>买钱必读</div>
        <div className={styles[`${PrefixCls}-outer-info-coin`]}>
          <span className={styles[`${PrefixCls}-outer-info-coin-details`]}>{`${200}金币`}</span>
          <span className={styles[`${PrefixCls}-outer-info-coin-button`]}>兑换</span>
        </div>
      </div>
    </div>
  );
}
export default IntegralCard;

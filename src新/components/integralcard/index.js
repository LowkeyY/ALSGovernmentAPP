import React from 'react';
import styles from './index.less';

const PrefixCls = 'integralcard';

function IntegralCard (props) {
  return (
    <div className={styles[`${PrefixCls}-outer`]} onClick={props.onClick.bind(this,props)}>
      <div className={styles[`${PrefixCls}-outer-imgbox`]}
           style={{ backgroundImage: `url(${props.goodsPhoto})` }}
      >
      </div>
      <div className={styles[`${PrefixCls}-outer-info`]}>
        <div className={styles[`${PrefixCls}-outer-info-title`]}>{props.goodsName}</div>
        <div className={styles[`${PrefixCls}-outer-info-coin`]}>
          <span className={styles[`${PrefixCls}-outer-info-coin-details`]}>{`${props.goodsJiFen}金币`}</span>
          <span className={styles[`${PrefixCls}-outer-info-coin-button`]}>{`库存:${props.goodsKuCun}`}</span>
        </div>
      </div>
    </div>
  );
}

export default IntegralCard;

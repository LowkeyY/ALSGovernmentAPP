import React from 'react';
import styles from './index.less';

const PrefixCls = 'seekreply';

function SeekReply (props) {
  return (
    <div key={props.date} className={styles[`${PrefixCls}-outer`]} >
      <div className={styles[`${PrefixCls}-outer-title`]} >
        {`${props.position}:`}
      </div >
      <p >{props.contents}</p >
      <div className={styles[`${PrefixCls}-outer-date`]} >
        {props.date}
      </div >
    </div >
  );
}

export default SeekReply;

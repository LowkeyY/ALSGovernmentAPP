import React from 'react';
import styles from './index.less';

const PrefixCls = 'partymemberstitle';

function PartyMembersTitle (props) {
  return (
    <div className={styles[`${PrefixCls}-title`]}>{props.title}</div>
  );
}

export default PartyMembersTitle;

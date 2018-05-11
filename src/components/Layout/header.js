import React from 'react';
import styles from './header.less';
import {Icon} from 'antd-mobile';
import { getLocalIcon } from 'utils';
const PrefixCls='header'
function Header() {
  return (
    <div className={styles[`${PrefixCls}-logo-outer`]}>
     <div className={styles['logo-box']}>
       <img src={require('themes/images/logo.png')} alt=""/>
       <span>
        <Icon type={getLocalIcon('/dashboard/QRcode.svg')} size="lg"/>
      </span>
     </div>
    </div>
  );
}
export default Header;


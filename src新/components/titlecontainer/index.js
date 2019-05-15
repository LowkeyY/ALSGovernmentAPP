import React from 'react';
import { List } from 'antd-mobile';
import { routerRedux } from 'dva/router';
import styles from './index.less';

const PrefixCls = 'titlebox';

function TitleBox (props) {
  return (
    <List className={styles[`${PrefixCls}-list`]}>
      <List.Item extra={props.more ? <div onClick={props.handleClick}>更多></div> : ''}><span
        className={styles[`${PrefixCls}-title`]}
      />{props.title}
      </List.Item>
    </List>
  );
  
  Static.defaultProps = {
    title: '',
    more: false,
    handleClick: null
  };
}

export default TitleBox;

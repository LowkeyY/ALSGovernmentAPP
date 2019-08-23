import React from 'react';
import { List, Icon } from 'antd-mobile';
import { getLocalIcon } from 'utils';
import classNames from 'classnames';
import styles from './index.less';

const PrefixCls = 'titlebox';

function TitleBox (props) {
  return (
    <List className={styles[`${PrefixCls}-list`]} >
      <List.Item
        thumb={props.icon && <Icon type={getLocalIcon(props.icon)} color="#ddd" />}
                 extra={props.more ? <div onClick={props.handleClick} >更多></div > : null} ><span
        className={classNames({ [styles.icon]: !props.icon })}
      />
        {props.title}
      </List.Item >
    </List >
  );

}

export default TitleBox;

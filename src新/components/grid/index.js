/* eslint-disable no-undef */
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'components';
import { getLocalIcon } from 'utils';
import styles from './index.less';

const PrefixCls = 'grid';

const Grid = (props) => {
  const { image = '', title = '', tag = {}, content = '', route = '', id = '' } = props.datas;
  return (
    <div className={styles[`${PrefixCls}-outer`]}
         style={{ backgroundImage: `url(${image})` }}
         onClick={props.handleClick.bind(null, props.datas, props.isLogin)}
    >
      <div className={styles[`${PrefixCls}-outer-tag`]} style={{ background: tag.color }}>
        {tag.label}
      </div>
      <div className={styles[`${PrefixCls}-outer-container`]}>
        <div className={styles[`${PrefixCls}-outer-container-title`]}>{title}</div>
        <div className={styles[`${PrefixCls}-outer-container-content`]}>{content}</div>
      </div>
    </div>
  );
};

Grid.defaultProps = {};
Grid.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default Grid;

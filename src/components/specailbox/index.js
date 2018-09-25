/* eslint-disable no-undef */
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'components';
import { getLocalIcon } from 'utils';
import styles from './index.less';

const PrefixCls = 'specialbox';

const SpecialBox = (props) => {
  const { datas: { image = '', title }, dispatch, name } = props;
  return (
    <div className={styles[`${PrefixCls}-outer`]} onClick={props.handleClick.bind(this, props.datas, dispatch, title)}>
      <div className={styles[`${PrefixCls}-outer-img`]}>
        <div className={styles[`${PrefixCls}-outer-img-image`]} style={{ backgroundImage: `url(${image})` }}>
        </div>
      </div>
    </div>
  );
};

SpecialBox.defaultProps = {};
SpecialBox.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default SpecialBox;

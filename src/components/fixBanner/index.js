/* eslint-disable no-undef */
/**
 * @author Lowkey
 * @date 2019/06/05 10:44:39
 * @Description:
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'components';
import { getLocalIcon } from 'utils';
import bg from './read.png';
import book from './book.png';
import foot from './font.png';
import styles from './index.less';

const PrefixCls = 'fixBanner';

const FixBanner = (props) => {
  const { datas: { image = '', title }, dispatch, name } = props;
  return (
    <div className={styles[`${PrefixCls}-outer`]} onClick={props.handleClick.bind(this, props.datas, dispatch, title)}>
      <div className={styles[`${PrefixCls}-outer-img`]}>
        <div className={styles[`${PrefixCls}-outer-img-image`]} style={{ backgroundImage: `url(${bg})` }}/>
      </div>
      <div className={styles[`${PrefixCls}-animation`]}>
        <img src={book} alt=""/>
      </div>
      <div className={styles[`${PrefixCls}-title`]}>
        <img src={foot} alt=""/>
      </div>
    </div>
  );
};

FixBanner.defaultProps = {};
FixBanner.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default FixBanner;

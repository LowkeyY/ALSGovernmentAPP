/* eslint-disable no-undef */
/**
 * @author Lowkey
 * @date 2018/2/18
 * @Description:
 */
import React from 'react';
import { Icon } from 'components/index';
import PropTypes from 'prop-types';
import styles from './index.less';
import { getLocalIcon } from 'utils';
import { routerRedux } from 'dva/router';

const PrefixCls = 'photoheader';

class PhotoHeader extends React.Component {
  constructor (props) {
    super();

  }

  render () {
    const hanleBackClick = () => {
      this.props.dispatch(routerRedux.goBack());
    };

    return (
      <div className={styles[`${PrefixCls}-transparentouter`]}>
        <div className={styles[`${PrefixCls}-transparentouter-backBtn`]} onClick={hanleBackClick}>
          <Icon style={{ verticalAlign: 'middle' }} type='left' color='#fff'/>
        </div>
        <div className={styles[`${PrefixCls}-transparentouter-rightBtn`]}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

PhotoHeader.defaultProps = {
  name: '',
  children: null,
};
PhotoHeader.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
export default PhotoHeader;

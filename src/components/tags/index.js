import React from 'react';
import { Icon, SearchBar } from 'antd-mobile';
import { connect } from 'dva';
import Hottag from './component/hottag';
import styles from './index.less';
import { getLocalIcon } from 'utils';

const PrefixCls = 'tags';

class Tags extends React.Component {
  constructor () {
    super();
    this.state = {
      enter: true,
    };
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  toggleDropdown () {
    this.setState({
      enter: !this.state.enter,
    });
  }

  render () {
    const { hotwords, ...props } = this.props,
      length = hotwords.length,
      icon = `/page/${this.state.enter ? 'dropdown.svg' : 'dropup.svg'}`,
      isShowEnd = this.state.enter ? 'none' : '',
      isShowBtn = length > 12 ? '' : 'none',
      isShowSecond = length > 6 ? '' : 'none';

    return (
      <div className={styles[`${PrefixCls}-container`]}>
        <div className={styles[`${PrefixCls}-container-head`]}>
          {hotwords.slice(0, 6)
            .map((_, i) => <Hottag key={i} {..._} {...props} />)}
          <div style={{ display: isShowBtn }}
            onClick={this.toggleDropdown}
            className={styles[`${PrefixCls}-dropdownBtn`]}
          >
            <Icon type={getLocalIcon(icon)} size="xs" />
          </div>
        </div>
        <div style={{ display: isShowSecond }} className={styles[`${PrefixCls}-container-second`]}>
          {hotwords.slice(6, 12)
            .map((_, i) => <Hottag key={i} {..._} {...props} />)}
        </div>
        <div style={{ display: isShowEnd }} className={styles[`${PrefixCls}-container-end`]}>
          {hotwords.slice(12)
            .map((_, i) => <Hottag key={i} {..._} {...props} />)}
        </div>
      </div>
    );
  }
}
export default Tags;

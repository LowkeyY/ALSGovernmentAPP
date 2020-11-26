import React from 'react';
import classNames from 'classnames';
import { Icon } from 'antd-mobile';
import styles from './index.less';

const PrefixCls = 'hawkbutton';

class HawkButton extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  componentWillMount () {

  }

  handleClick = () => {
    this.setState({
      isLoading: true,
    });
    const callback = () => {
      this.setState({
        isLoading: false,
      });
    };
    if (this.props.handleClick) {
      this.props.handleClick(callback.bind(this));
    } else {
      setTimeout(callback, 1000);
    }
  };

  render () {
    const text = this.props.btnStatus ? '结束记录' : '开始记录',
      color = this.props.btnStatus ? 'red' : '#108ee9',
      { isLoading } = this.state;
    return (
      <div className={styles[`${PrefixCls}-outer`]} onClick={this.handleClick}>
        <div className={classNames(styles[`${PrefixCls}-outer-button`], { [styles.active]: this.props.btnStatus })}
             style={{ background: color }}>
          {isLoading ? <Icon type="loading"/> : text}
        </div>
      </div>
    );
  }

  static defaultProps = {
    btnStatus: false,
  };
}

export default HawkButton;

import React, { Component } from 'react';
import { Progress, Modal } from 'components';
import PropTypes from 'prop-types';
import styles from './index.less';


class UpdateBar extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isSmall: false,
    };
  }

  onClose = () => {
    this.setState({
      isSmall: true,
    });
  };

  onOpen = () => {
    this.setState({
      isSmall: false,
    });
  };

  renderTitle = (pos, sep) => pos > 0 ? (sep === true ? ' - ' : '') + pos + '%' : '';

  renderBox = (percentage) => {
    return this.state.isSmall ?
      <div className={styles.outer} onClick={this.onOpen}>
        <div className={styles.content}>
          <div>正在下载</div>
          <div>{this.renderTitle(percentage)}</div>
        </div>
        <Progress barStyle={{ borderColor: '#00a500' }} percent={percentage} position="normal" />
      </div>
      :
      (
        <Modal
          visible={!this.state.isSmall}
          transparent
          maskClosable={false}
          title={`正在下载${this.renderTitle(percentage, true)}`}
          footer={[{
            text: '后台下载',
            onPress: () => this.onClose(),
          }]}
        >
          <div>
            <Progress
              barStyle={{ border: '6px solid #00a500' }}
              percent={percentage}
              position="normal"
            />
          </div>
        </Modal>
      );
  };

  render () {
    const { percentage, show } = this.props;
    return (
      show ?
        this.renderBox(percentage)
        :
        null
    );
  }
}

UpdateBar.propTypes = {
  percentage: PropTypes.number.isRequired,
};
UpdateBar.defaultProps = {
  percentage: 0,
  show: false,
};


export default UpdateBar;

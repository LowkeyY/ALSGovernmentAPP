/**
 * @author Lowkey
 * @date 2018/10/10
 * @Description:
 */

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { getOffsetTopByBody } from 'utils';
import loading from './loading.gif';
import styles from './index.less';

class NoContent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      height: cnhtmlHeight,
    };
  }

  componentDidMount () {
    const element = ReactDOM.findDOMNode(this.lv);
    const currentHeight = getOffsetTopByBody(element);
    this.setState((state) => ({
      height: state.height - currentHeight,
    }));
  }

  render () {
    return (
      <div ref={el => this.lv = el} className={styles.outer} style={{ height: this.state.height }} >
        <img style={{ width: '60px' }} src={this.props.isLoading ? loading : this.props.images} alt="" />
        <p className={styles.content} >{this.props.isLoading ? '加载中...' : this.props.context}</p >
      </div >
    );
  }
}


NoContent.defaultProps = {
  images: require('./img.png'),
  context: '暂无内容',
  isLoading: false
};
NoContent.propTypes = {
  images: PropTypes.string,
  context: PropTypes.string,
};
export default NoContent;

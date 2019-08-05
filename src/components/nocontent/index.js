/**
 * @author Lowkey
 * @date 2018/10/10
 * @Description:
 */

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { getOffsetTopByBody } from 'utils';

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
    this.setState({
      height: cnhtmlHeight - currentHeight,
    });
  }

  render () {
    return (
      <div ref={el => this.lv = el} style={{ textAlign: 'center', paddingTop: '50px', height: this.state.height }}>
        <img style={{ width: '60px' }} src={this.props.images} alt="" />
        <p>{this.props.context}</p>
      </div>
    );
  }
}


NoContent.defaultProps = {
  images: require('./img.png'),
  context: '暂无内容',
};
NoContent.propTypes = {
  images: PropTypes.string,
  context: PropTypes.string,
};
export default NoContent;

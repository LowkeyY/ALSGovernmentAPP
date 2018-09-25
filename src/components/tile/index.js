import React from 'react';
import styles from './index.less';
import PropTypes from 'prop-types';

const PrefixCls = 'tlie';

class Tile extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }
  
  componentWillMount () {
  
  }
  
  render () {
    const { items, colors = '' } = this.props;
    const { image = '', title = '' } = items,
      appendStyle = {};
    if (colors) {
      appendStyle.backgroundColor = colors;
    }
    return (
      <div key={items.id} className={styles[`${PrefixCls}-outer-item`]} style={appendStyle}
           onClick={this.props.handleClick.bind(null, items, this.props.dispatch)}>
        <img src={image} alt="" />
        <span>{title}</span>
      </div>
    );
    
  }
  
}

Tile.propTypes = {
  handleClick: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
};
Tile.defaultProps = {
  items: [],
  colors: ''
};

export default Tile;

import React from 'react'
import { Carousel } from 'antd-mobile'
import ReactDOM from 'react-dom'
import styles from './index.less'

const PrefixCls = 'tlie'

class Tile extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillMount () {

  }

  layoutItem (data, color = '') {
    const { image = defaultImage, title = '' } = data,
      appendStyle = {}
    if (color) {
      appendStyle.backgroundColor = color
    }
    return (
      <div key={data.id} className={styles[`${PrefixCls}-outer-item`]} style={appendStyle}
           onClick={this.props.handleClick.bind(null, data)}>
        <img src={image} alt=""/>
        <span>{title}</span>
      </div>
    )
  }


  render () {
    const { items = [], parents = {}, colors = '' } = this.props,
      { id = '' } = parents
    return (
      <div id={id} className={styles[`${PrefixCls}-outer`]}>
        {items.map(item => this.layoutItem(item, colors))}
      </div>
    )

  }

}

export default Tile

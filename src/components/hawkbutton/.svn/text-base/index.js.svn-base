import React from 'react'
import styles from './index.less'

const PrefixCls = 'hawkbutton'

class HawkButton extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      btnStatus:false,
      color:false
    }
  }

  componentWillMount () {

  }
  handleClick = () => {
    this.setState({
      btnStatus:!this.state.btnStatus,
      color:!this.state.color
    })
  }

  render () {
   const style = this.state.color,
     text=this.state.btnStatus?'结束':'开始',
     color=this.state.color?'red':'#108ee9'
    return (
      <div className={styles[`${PrefixCls}-outer`]} onClick={this.handleClick}>
        <div className={styles[`${PrefixCls}-outer-button`]} style={{background:color}}>
          {text}
        </div>
      </div>
    )

  }

}

export default HawkButton

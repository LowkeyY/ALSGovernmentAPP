import { PullToRefresh, Button } from 'antd-mobile'
import ReactDOM from 'react-dom'
import {getOffsetTopByBody} from 'utils'

class Comp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      refreshing: false,
      down: true,
      height: document.documentElement.clientHeight,
    }
  }

  componentDidMount () {
    if(this.props.sibilingsHasBanner){//判断是否有banner默认false
      window.addEventListener('resize',()=>{
        const el = ReactDOM.findDOMNode(this.ptr)
        const hei =cnhtmlHeight - getOffsetTopByBody(el)-cnhtmlSize
        setTimeout(() => this.setState({
          height: hei,
        }), 0)
      })
    }else {
      const el = ReactDOM.findDOMNode(this.ptr)
      const hei =cnhtmlHeight - getOffsetTopByBody(el)-cnhtmlSize
      setTimeout(() => this.setState({
        height: hei,
      }), 0)
    }

  }

  render () {
    return (<PullToRefresh
      ref={el => this.ptr = el}
      style={{
        height: this.state.height,
        overflow: 'auto',
      }}
      indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
      direction={this.state.down ? 'down' : 'up'}
      refreshing={this.state.refreshing}
      onRefresh={() => {
        this.setState({ refreshing: true })
        setTimeout(() => {
          this.setState({ refreshing: false })
        }, 1000)
      }}
    >
      {this.props.children || ''}
    </PullToRefresh>)
  }

  static defaultProps = {
    sibilingsHasBanner:false
  }
}

export default Comp

import { PullToRefresh, Button } from 'antd-mobile'
import ReactDOM from 'react-dom'

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
    window.addEventListener('resize',()=>{
      const el = ReactDOM.findDOMNode(this.ptr)
      const hei =cnhtmlHeight - ReactDOM.findDOMNode(this.ptr).offsetTop-cnhtmlSize
      setTimeout(() => this.setState({
        height: hei,
      }), 0)
    })

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
}

export default Comp

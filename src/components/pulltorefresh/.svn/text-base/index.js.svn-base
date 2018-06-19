import { PullToRefresh, Button } from 'antd-mobile'
import ReactDOM from 'react-dom'
import { getOffsetTopByBody } from 'utils'
let timer;
class Comp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      refreshing: false,
      down: true,
      height: document.documentElement.clientHeight
    }
  }

  componentDidMount () {
    let el
    if (this.ptr && (el = ReactDOM.findDOMNode(this.ptr))) {
      if (this.props.sibilingsHasBanner) {//判断是否有banner默认false
        window.addEventListener('resize', () => {
          const hei = cnhtmlHeight - getOffsetTopByBody(el) - cnhtmlSize
       if(this._isMounted){
         setTimeout(() => this.setState({
           height: hei,
         }), 100)
       }
        })
      } else {
        const hei = cnhtmlHeight - getOffsetTopByBody(el) - cnhtmlSize
         if(this._isMounted){
           setTimeout(() => this.setState({
             height: hei,
           }), 100)
         }
      }
    }
  }
  componentWillMount(){
    this._isMounted = true
  }
  componentWillUnmount () {
    this._isMounted = false
  }

  render () {
    return (<PullToRefresh
      ref={el => this.ptr = el}
      style={this.props.autoHeight ? {
        height: '100%',
        overflow: 'scroll',
      } : {
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
    sibilingsHasBanner: false,
    autoHeight: false,
  }
}

export default Comp

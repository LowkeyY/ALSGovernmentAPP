import ReactDOM from 'react-dom'

class Comp extends React.Component {

  constructor (props) {
    super(props)
    this.onMessage = this.onMessage.bind(this)
    this.onCnevent = this.onCnevent.bind(this)
  }

  onMessage (message) {
    const { data = {} } = message, { type = '', userId = '' } = data
    if (type === 'shouhu' && userId != '') {
      this.props.willCallback(data)
    }
  }

  onCnevent () {
    const { __type = '', ...others } = (cneventParam || {})
    if (__type === 'wsmessage') {
      this.props.willCallback(others)
    }
  }

  componentDidMount () {
    window.addEventListener('message', this.onMessage)
    window.addEventListener('cnevent', this.onCnevent)
  }

  componentWillUnmount () {
    window.removeEventListener('message', this.onMessage)
    window.removeEventListener('cnevent', this.onCnevent)
  }

  render () {
    return (<div></div>)
  }

  static defaultProps = {
    willCallback: () => {
    },
  }
}

export default Comp

import ReactDOM from 'react-dom'
import React from 'react'
import { Loader } from 'components'
class Iframes extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      height: document.documentElement.clientHeight - 45,
      isLoading:false
    }
  }
  componentWillMount () {
     this.setState({
       isLoading:true
     })
  }

  componentDidMount () {
    const dispatch = this.props.dispatch
    const ifream = ReactDOM.findDOMNode(this.lv)
    const ifream2 = document.getElementById('cnComponentIfream')
    setTimeout((jh) => {
      if (ifream) {
        const hei = document.documentElement.clientHeight - ifream.offsetTop
        this.setState({
          height: hei,
        })
      }
    }, 0)

    ifream.onload =  () =>{
      this.setState({
        isLoading:false
      })
    }
  }q

  render () {

    return (
     <div>
       <iframe id="cnComponentIfream" ref={el => this.lv = el} src={this.props.src}
               style={{ width: '100%', height: this.state.height, border: 0 }}>
       </iframe>
       <Loader spinning={this.state.isLoading}/>
     </div>
    )
  }
}

export default Iframes

import ReactDOM from 'react-dom';
import React from 'react';

class Iframes extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      height: document.documentElement.clientHeight - 45,
    };
  }

  componentDidMount() {
    const dispatch = this.props.dispatch
    const ifream = ReactDOM.findDOMNode(this.lv)
    const ifream2=document.getElementById('ifream')
    const header=ifream2.contentWindow.document.getElementsByClassName('index-top-conus').item(0)
    setTimeout(() => {
      if (ReactDOM.findDOMNode(this.lv)) {
        const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).offsetTop;
        this.setState({
          height: hei,
        })
      }
    }, 0);

    ifream.onload = function () {
      dispatch({
        type: 'app/updateState',
        payload: {
          spinning: false
        }
      })
    }
  }

  render() {

    return (
      <iframe id="ifream" ref={el => this.lv = el} src={this.props.src}
              style={{width: "100%", height: this.state.height, border: 0}}>
      </iframe>
    );
  }
}

export default Iframes;

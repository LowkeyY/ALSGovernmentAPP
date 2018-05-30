import {Component} from 'react'
import ReactDOM from 'react-dom';
import {connect} from 'dva';
import styles from './index.less'
import {ReceiveBubble,ReplyBubble , ReceiveImgBubble} from './chatbubble/index'
import InputBox from 'components/inputbox'

const PrefixCls = 'chatroom'

class ChatRoom  extends Component {

  constructor(props){
    super()
    this.state={
      height:''
    }

  }
  componentDidMount(){
    setTimeout(() => {
      if (ReactDOM.findDOMNode(this.lv)) {
        const currentHeight = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).offsetTop;
        this.setState({
          height: currentHeight,
        })
      }
    },0);
  }

  render(){
    return(
      <div>
        <div className={styles[`${PrefixCls}-outer`]} ref={ el => this.lv = el } style={{height:this.state.height}}>
          <div className={styles[`${PrefixCls}-outer-content`]}>
            <ReceiveImgBubble userIcon=""/>
            <ReceiveBubble userIcon=""/>
            <ReceiveBubble userIcon=""/>
            <ReplyBubble userIcon=""/>
            <ReceiveBubble userIcon=""/>
            <ReplyBubble userIcon=""/>
            <ReplyBubble userIcon=""/>
            <ReplyBubble userIcon=""/>
            <ReceiveBubble userIcon=""/>
            <ReplyBubble userIcon=""/>
            <ReceiveBubble userIcon=""/>
          </div>
          <InputBox />
        </div>
      </div>

    )
  }
}

export default ChatRoom

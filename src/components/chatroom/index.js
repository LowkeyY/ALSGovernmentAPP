import {Component} from 'react'
import ReactDOM from 'react-dom';
import {connect} from 'dva';
import styles from './index.less'
import {ReceiveBubble,ReplyBubble , ReceiveImgBubble } from './chatbubble/index'
import ReceiveVoiceBubble from './chatbubble/ReceiveVoiceBubble'
import ReplyVoiceBubble from './chatbubble/ReplyVoiceBubble'
import InputBox from 'components/inputbox'
const PrefixCls = 'chatroom'

class ChatRoom  extends Component {

  constructor(props){
    super(props)
    this.state={
      height:0,
    }

  }
  componentDidMount(){
    setTimeout(() => {
      if (ReactDOM.findDOMNode(this.lv)) {
        const currentHeight = cnhtmlHeight - ReactDOM.findDOMNode(this.lv).offsetTop;
        this.setState({
          height: currentHeight,
        })
      }
    },0);
  }


  render(){
    const props={
      onSubmit:this.props.onSubmit,
      val:this.props.val,
      dispatch:this.props.dispatch,
      isDisabled:this.props.isDisabled
    }
    return(
      <div>
        <div className={styles[`${PrefixCls}-outer`]} ref={ el => this.lv = el } style={{height:this.state.height}}>
          <div className={styles[`${PrefixCls}-outer-content`]}>
            {/*<ReceiveImgBubble userIcon="" />*/}
            {/*<ReplyBubble userIcon="" content={''}/>*/}
            {/*<ReplyBubble userIcon="" content={''}/>*/}
            {/*<ReplyBubble userIcon="" content={''}/>*/}
            {this.props.chartArr&&this.props.chartArr.map((data,i)=> {
                      return   <ReplyBubble userIcon="" content={data.content}/>
            })}
          </div>
          <div style={{clear:'both'}}></div>
          <InputBox {...props}/>
        </div>
      </div>
    )
  }
}

export default ChatRoom

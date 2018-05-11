import {Component} from 'react'
import ReactDOM from 'react-dom';
import {connect} from 'dva';
import Nav from 'components/nav'
import styles from './index.less'
import {ReceiveBubble,ReplyBubble} from 'components/chatbubble'
import InputBox from 'components/inputbox'

const PrefixCls = 'messageroom'

class Messageroom  extends Component {

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
     console.log(this.state.height)
     const {name=''}=this.props.location.query
      return(
        <div>
          <Nav title='勒布朗·詹姆斯' dispatch={this.props.dispatch}/>
          <div className={styles[`${PrefixCls}-outer`]} ref={ el => this.lv = el } style={{height:this.state.height}}>
            <div className={styles[`${PrefixCls}-outer-content`]}>
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

export default connect(({loading,messageroom}) => ({
  loading,
  messageroom
}))(Messageroom)

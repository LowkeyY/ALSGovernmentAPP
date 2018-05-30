import React from 'react'
import styles from './index.less'
import { getImages, getErrorImg } from 'utils'
import {Css3Loading,LoadingFail} from 'components/loading'
import Voice from '../voice'


const PrefixCls = 'bubble'
class ReceiveVoiceBubble extends React.Component {
  constructor(props){
    super(props)
    this.state={
      listening:false
    }
  }
  handleVoiceClick = (e) =>{
   this.setState({
     listening:!this.state.listening
   })
  }

  render(){
  return (
    <div className={styles[`${PrefixCls}-left`]}>
    <span className={styles[`${PrefixCls}-left-iconbox`]}>
        <img src={getImages('', 'user')}/>
    </span>
      <div className={styles[`${PrefixCls}-left-contentbox`]} style={{paddingLeft:'15px'}} onClick={this.handleVoiceClick}>
        <Voice wave={this.state.listening} isLeft={true}/>
      </div>
      <div className={styles[`${PrefixCls}-left-loading`]}><Css3Loading/></div>
      <audio preload="auto" src="" ></audio>
    </div>
  )
  }
}

export default ReceiveVoiceBubble

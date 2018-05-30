import React from 'react'
import styles from './index.less'
import { Flex, WhiteSpace } from 'components'
import { getImages, getErrorImg } from 'utils'
import {Css3Loading,LoadingFail} from 'components/loading'
import Voice from '../voice'


const PrefixCls = 'bubble'
class ReplyVoiceBubble extends React.Component{
 constructor (props){
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
     <div className={styles[`${PrefixCls}-right`]}>
    <span className={styles[`${PrefixCls}-right-iconbox`]}>
        <img src={getImages('', 'user')}/>
    </span>
       <div className={styles[`${PrefixCls}-right-contentbox`]} style={{paddingRight:'15px'}} onClick={this.handleVoiceClick}>
         <Voice wave={this.state.listening} isLeft={false}/>
       </div>
       <div className={styles[`${PrefixCls}-right-loading`]}><Css3Loading/></div>
     </div>
   )
 }
}

export default ReplyVoiceBubble

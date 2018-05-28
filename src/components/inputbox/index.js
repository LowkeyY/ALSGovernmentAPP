import {Component} from 'react'
import styles from './index.less'
import {Button, Icon} from 'antd-mobile';
import {getLocalIcon} from 'utils';
import ReactDOM from 'react-dom';

const PrefixCls = 'inputbox'
var int,stop

class InputBox extends Component {
  constructor() {
    super()
    this.state = {
      isRecording: false,
      onRecording: false,
      unit: 0,
      bits: 0,
      minutes: 0,
      isDisabled:true
    }
  }

  addSeconds() {//计时器
    const {unit, bits, minutes} = this.state;
    this.setState({
      unit: unit + 1
    })
    if (unit >= 9) {
      this.setState({
        unit: 0,
        bits: bits + 1
      })
    }
    if (bits >= 6) {
      this.setState({
        bits: 0,
        minutes: minutes + 1
      })
    }

  }

  startTimer() {//启动计时器
    const that = this
    int = setInterval(function () {
      that.addSeconds()
    }, 1000)
  }

  recording() {
    this.setState({
      isRecording: !this.state.isRecording
    })
  }

  onRecording(e) {

    const that = this
    stop= setTimeout(function () {//延迟1s执行
      that.setState({
        onRecording: true
      })
      that.startTimer()
    },1000)

  }

  stopRecording(e) {

    this.setState({
      onRecording: false,
      unit: 0,
      bits: 0,
      minutes: 0
    })
    clearInterval(int)
    clearTimeout(stop)
  }

  handleTextInputChanges() {
    const input = ReactDOM.findDOMNode(this.lv)
    if(input.value!==''){
       this.setState({
         isDisabled:false
       })

    }
}

textInputFocus() {
  this.setState({
    isRecording: false
  })
}

  render() {
    const display = this.state.isRecording ? 'block' : 'none',
      isOnRecording = this.state.onRecording,
      {unit, bits, minutes} = this.state,
      voiceSvg = this.state.isRecording?'voice-o':'voice'

    return (
      <div className={styles[`${PrefixCls}-outer`]}>
        <form action="">
        <div className={styles[`${PrefixCls}-outer-inputbox`]}>
          <input type="text" ref={ el => this.lv = el }
                 onChange={this.handleTextInputChanges.bind(this)}
                 onFocus={this.textInputFocus.bind(this)}

          />
          <div>
            <Button type="primary" size="small" inline disabled={this.state.isDisabled}
                    style={{padding: '0 8px', height: '35px', lineHeight: '35px'}}>发送</Button>
          </div>
        </div>
        <div className={styles[`${PrefixCls}-outer-mediabox`]}>
           <span onClick={this.recording.bind(this)}>
             <Icon type={getLocalIcon(`/media/${voiceSvg}.svg`)} size="md"/>
           </span>
          <span className={styles[`${PrefixCls}-outer-mediabox-photo`]}>
            <input type="file"
                   accept="image/*"
                   multiple="multiple"
            />
            <Icon type={getLocalIcon('/media/photo.svg')} size="md"/>
          </span>
          <span><Icon type={getLocalIcon('/media/camera.svg')} size="md"/></span>
        </div>
        <div className={styles[`${PrefixCls}-outer-recording`]} style={{display: display}}>
          <div className={styles[`${PrefixCls}-outer-recording-box`]}>
            <div className={styles[`${PrefixCls}-outer-recording-box-timer`]}>
              {
                isOnRecording
                  ?
                  <span>
                   <b>····</b>
                    {`${minutes}:${bits}${unit}`}
                    <b>····</b>
                   </span>
                  :
                  <span>按住说话</span>
              }

            </div>
            <div
              className={styles[`${PrefixCls}-outer-recording-box-voice`]}
              onTouchStart={this.onRecording.bind(this)}
              onTouchEnd={this.stopRecording.bind(this)}
            >
           <span>
              <Icon type={getLocalIcon('/media/voice-white.svg')} size="lg"/>
           </span>
            </div>
          </div>
        </div>
        </form>
      </div>
    )
  }
}

export default InputBox

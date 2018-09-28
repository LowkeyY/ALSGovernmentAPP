import { Component } from 'react';
import styles from './index.less';
import { Button, Icon } from 'antd-mobile';
import { getLocalIcon } from 'utils';
import ReactDOM from 'react-dom';

const PrefixCls = 'inputbox';
let int,
  stop;

class InputBox extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isRecording: false,
      onRecording: false,
      unit: 0,
      bits: 0,
      minutes: 0,
      mediaFile: '',
      mediaFileUrl: '',
      mediaFileLength: '',
    };
  }

  addSeconds () { // 计时器
    const { unit, bits, minutes } = this.state;
    this.setState({
      unit: unit + 1,
    });
    if (unit >= 9) {
      this.setState({
        unit: 0,
        bits: bits + 1,
      });
    }
    if (bits >= 6) {
      this.setState({
        bits: 0,
        minutes: minutes + 1,
      });
    }
  }

  startTimer () { // 启动计时器
    const that = this;
    int = setInterval(() => {
      that.addSeconds();
    }, 1000);
  }

  recording () {
    this.setState({
      isRecording: !this.state.isRecording,
    });
  }

  mediaFileOnSuccess (blob, params) {
    const { name = '', timers = 5, nativeURL = '' } = params;
    this.props.handlerSubmit({
      msgType: 2,
      content: {
        file: blob,
        url: nativeURL,
        timers,
      },
    });
  }

  mediaFileOnError (error) {
    console.log(error);
  }

  onRecording (e) {
    window.getSelection ? window.getSelection()
      .removeAllRanges() : document.selection.empty();
    const that = this;
    console.log('---- onRecording!!!');
    this.setState({
      onRecording: true,
    });
    stop = setTimeout(() => { // 延迟1s执行
      console.log(this.state);
      const { onRecording } = this.state;
      if (onRecording === true) {
        let mediaFile = cnStartRecord('', this.mediaFileOnSuccess.bind(this), this.mediaFileOnError.bind(this));
        this.setState({
          mediaFile,
        });
        this.startTimer();
      }
    }, 300);
  }

  stopRecording (e) {
    window.getSelection ? window.getSelection()
      .removeAllRanges() : document.selection.empty();
    let { unit, bits, minutes, mediaFile, mediaFileLength } = this.state,
      updates = {};
    console.log('---- stopRecording!!!', 'mediaFile:', mediaFile);
    if (mediaFile) {
      mediaFile.timers = mediaFileLength = (minutes * 60 + bits * 10 + unit);
      mediaFile = cnStopRecord(this.state.mediaFile);
      updates.mediaFile = mediaFile;
      updates.mediaFileLength = mediaFileLength;
    }
    this.setState({
      onRecording: false,
      unit: 0,
      bits: 0,
      minutes: 0,
      mediaFile,
      ...updates,
    });
    clearInterval(int);
    clearTimeout(stop);
    this.setState({
      isRecording: false,
    });
  }

  onImageFilesChange (e) {
    const { target = '' } = e;
    if (target) {
      const { files } = target;
      this.props.handlerSubmit({
        msgType: 1,
        content: files[0],
      });
      target.value = '';
    }
  }

  handleCameraSubmit (bolb) {
    this.props.handlerSubmit({
      msgType: 1,
      content: bolb,
    });
  }

  handleTextSubmit () {
    const input = ReactDOM.findDOMNode(this.lv);
    if (input.value != '') {
      this.props.handlerSubmit({
        content: input.value,
      });
      input.value = '';
    }
    return false;
  }

  handleFocus () {
    this.setState({
      isRecording: false,
    });
  }

  handleDivClick () {
    let { unit, bits, minutes, mediaFile, mediaFileLength, onRecording } = this.state,
      updates = {};

    if (onRecording) {
      console.log('---- stopRecording!!!', 'mediaFile:', mediaFile);
      if (mediaFile) {
        mediaFile.timers = mediaFileLength = (minutes * 60 + bits * 10 + unit);
        mediaFile = cnStopRecord(this.state.mediaFile);
        updates.mediaFile = mediaFile;
        updates.mediaFileLength = mediaFileLength;
      }
      this.setState({
        onRecording: false,
        unit: 0,
        bits: 0,
        minutes: 0,
        mediaFile,
        ...updates,
      });
      clearInterval(int);
      clearTimeout(stop);
    }
  }

  render () {
    const display = this.state.isRecording ? 'block' : 'none',
      isOnRecording = this.state.onRecording,
      { unit, bits, minutes } = this.state,
      voiceSvg = this.state.isRecording ? 'voice-o' : 'voices';

    return (
      <div className={styles[`${PrefixCls}-outer`]} onClick={this.handleDivClick.bind(this)}>
        <div className={styles[`${PrefixCls}-outer-inputbox`]}>
          <input type="text" ref={el => this.lv = el} onFocus={this.handleFocus.bind(this)} />
          <div>
            <Button type="primary"
              size="small"
              inline
              onClick={this.handleTextSubmit.bind(this)}
              style={{ height: '0.8rem', lineHeight: '0.8rem' }}
            >发送</Button>
          </div>
        </div>
        <div className={styles[`${PrefixCls}-outer-mediabox`]}>
          <span onClick={this.recording.bind(this)}>
            <Icon type={getLocalIcon(`/media/${voiceSvg}.svg`)} size="md" />
          </span>
          <span className={styles[`${PrefixCls}-outer-mediabox-photo`]}>
            <input
              id="file"
              type="file"
              accept="image/*"
              multiple="multiple"
              onChange={this.onImageFilesChange.bind(this)}
            />
            <Icon type={getLocalIcon('/media/photo.svg')} size="md" />
          </span>
          <span onClick={cnTakePhoto.bind(null, this.handleCameraSubmit.bind(this), 1)}>
            <Icon type={getLocalIcon('/media/camera.svg')} size="md" />
          </span>
        </div>
        <div className={styles[`${PrefixCls}-outer-recording`]} style={{ display }}>
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
                <Icon type={getLocalIcon('/media/voice-white.svg')} size="lg" />
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default InputBox;

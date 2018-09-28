import { Component } from 'react';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import Nav from 'components/nav';
import { routerRedux } from 'dva/router';
import VociePrev from 'components/voicePrev';
import classNames from 'classnames';
import {
  List,
  InputItem,
  Picker,
  TextareaItem,
  ImagePicker,
  Button,
  WhiteSpace,
  Toast,
  Switch,
  Icon,
  ActivityIndicator,
} from 'components';
import { getLocalIcon, postionsToString, replaceSystemEmoji } from 'utils';
import styles from './index.less';

let int,
  stop,
  diaryBaseIndex = 0;
const PrefixCls = 'diary';

class Diary extends Component {
  constructor (props) {
    super(props);
    this.state = {
      files: [],
      multiple: true,
      isVoice: false,
      unit: 0,
      bits: 0,
      minutes: 0,
      mediaFile: '',
      mediaFileUrl: '',
      mediaFileLength: '',
      mediaUploadFile: {},
    };
  }
  
  getVoiceText = (unit, bits, minutes) => {
    return (
      <div>
        <div>
          {`${minutes}:${bits}${unit}`}
        </div>
        <div>
          松开 结束
        </div>
      </div>
    );
  };
  
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
  
  onChange = (files, type, index) => {
    let reg = /image/,
      result = [];
    files.map((data, i) => {
      if (!reg.test(data.file.type)) {
        Toast.fail('这不是图片哟！！！', 2);
      } else {
        result.push(data);
      }
    });
    this.setState({
      files: result,
    });
  };
  getKey = (name) => `${name && `${name}` || 'diaryBaseIndex'}_${diaryBaseIndex++}`;
  getUploadFiles = () => {
    const uploadFiles = {},
      uploadKey = [];
    this.state.files.map((file, i) => {
      if (file.file) {
        let key = this.getKey(`file_${i}`);
        uploadKey.push(key);
        uploadFiles[key] = file.file;
      }
    });
    return {
      uploadFiles,
      uploadKey: uploadKey.join(','),
    };
  };
  onCancel = () => {
    this.props.dispatch(routerRedux.goBack());
  };
  changeValue = (obj) => {
    for (let i in obj) {
      if (typeof (obj[i]) === 'string') {
        obj[i] = replaceSystemEmoji(obj[i]);
      }
    }
    return obj;
  };
  onSubmit = () => {
    this.props.form.validateFields({
      force: true,
    }, (error) => {
      if (!error) {
        const data = {
            ...this.props.form.getFieldsValue(),
          },
          { uploadFiles, uploadKey } = this.getUploadFiles(),
          { mediaUploadFile } = this.state;
        this.props.dispatch({
          type: 'diary/sendDiary',
          payload: {
            ...this.changeValue(data),
            images: uploadFiles,
            fileKey: uploadKey,
            mediaFile: mediaUploadFile,
          },
        });
        this.props.dispatch({
          type: 'diary/updateState',
          payload: {
            animating: true,
          },
        });
      } else {
        Toast.fail('请确认信息是否正确。');
      }
    });
  };
  handleVoiceRecordingStart = () => {
    window.getSelection ? window.getSelection()
      .removeAllRanges() : document.selection.empty();
    this.setState({
      isVoice: true,
      onRecording: true,
    });
    stop = setTimeout(() => { // 延迟1s执行
      const { isVoice, onRecording } = this.state;
      if (isVoice === true && onRecording === true) {
        let mediaFile = cnStartRecord('', this.mediaFileOnSuccess.bind(this), this.mediaFileOnError.bind(this));
        
        this.setState({
          mediaFile,
        });
        this.startTimer();
      }
    }, 300);
  };
  handleVoiceRecordingEnd = () => {
    window.getSelection ? window.getSelection()
      .removeAllRanges() : document.selection.empty();
    let { unit, bits, minutes, mediaFile, mediaFileLength } = this.state,
      updates = {};
    
    if (mediaFile) {
      mediaFile.timers = mediaFileLength = (minutes * 60 + bits * 10 + unit);
      mediaFile = cnStopRecord(this.state.mediaFile);
      updates.mediaFile = mediaFile;
      updates.mediaFileLength = mediaFileLength;
    }
    this.setState({
      isVoice: false,
      onRecording: false,
      unit: 0,
      bits: 0,
      minutes: 0,
      mediaFile,
      ...updates,
    });
    clearInterval(int);
    clearTimeout(stop);
  };
  dataUrlToImageSrc = (dataUrl) => {
    let imageHeader = 'data:image/jpeg;base64,';
    if (dataUrl && !dataUrl.startsWith(imageHeader)) {
      return `${imageHeader}${dataUrl}`;
    }
    return dataUrl;
  };
  handleCameraClick = (blob, dataUrl) => {
    const { files } = this.state;
    files.push({ file: blob, url: this.dataUrlToImageSrc(dataUrl) });
    this.setState({
      files,
    });
  };
  
  mediaFileOnSuccess (blob, params) {
    const { name = '', nativeURL = '' } = params;
    let pos = name.lastIndexOf('.'),
      key = pos === -1 ? name : name.substr(0, pos);
    this.setState({
      mediaUploadFile: {
        voiceFile: blob,
      },
      mediaFileUrl: nativeURL,
    });
  }
  
  mediaFileOnError (error) {
    handleVoiceRecordingEnd();
  }
  
  handleDivClick () {
    let { isVoice, onRecording, unit, bits, minutes, mediaFile, mediaFileLength } = this.state,
      updates = {};
    if (isVoice && onRecording) {
      if (mediaFile) {
        mediaFile.timers = mediaFileLength = (minutes * 60 + bits * 10 + unit);
        mediaFile = cnStopRecord(this.state.mediaFile);
        updates.mediaFile = mediaFile;
        updates.mediaFileLength = mediaFileLength;
      }
      this.setState({
        isVoice: false,
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
  
  componentWillUnmount () {
    clearInterval(int);
    clearTimeout(stop);
  }
  
  render () {
    const { name = '' } = this.props.location.query,
      { diaryType, animating } = this.props.diary;
    const { getFieldProps, getFieldError } = this.props.form,
      { unit, bits, minutes, mediaFileUrl, mediaFile, mediaFileLength } = this.state;
    
    
    return (
      <div onClick={this.handleDivClick.bind(this)}>
        <Nav title={name} dispatch={this.props.dispatch} />
        <div className={styles[`${PrefixCls}-outer`]}>
          <form>
            <div className={styles[`${PrefixCls}-outer-type`]}>
              <InputItem
                {...getFieldProps('title', {
                  initialValue: '',
                  rules: [{ required: true, message: '标题必须输入' },
                    { max: 10, message: '标题最多能输入10个字' }
                  ],
                })}
                clear
                error={!!getFieldError('title') && Toast.fail(getFieldError('title'))}
                placeholder="输入标题、最多输入10个字符"
              >
               标题
              </InputItem>
            </div>
            <div className={styles[`${PrefixCls}-outer-type`]}>
              <Picker data={diaryType}
                cols={1}
                {...getFieldProps('bflx', {
                  rules: [{ required: true, message: '请选择帮扶类型' }],
                })}
                error={!!getFieldError('bflx') && Toast.fail(getFieldError('bflx'))}
              >
                <List.Item arrow="horizontal">帮扶类型</List.Item>
              </Picker>
            </div>
            <List.Item className={styles[`${PrefixCls}-outer-content`]}>
              <TextareaItem
                {...getFieldProps('content', {
                  initialValue: '',
                  rules: [{ required: true, message: '请输入帮扶日志' }],
                })}
                clear
                rows={9}
                error={!!getFieldError('content') && Toast.fail(getFieldError('content'))}
                count={1000}
                placeholder={'在此输入发表内容，注意时间、地点、涉及人物等要素'}
              />
            </List.Item>
            <div className={styles[`${PrefixCls}-outer-img`]}>
              <div>
                <p>添加图片</p>
                {this.state.files.length >= 4 ? '' : <span onClick={cnTakePhoto.bind(null, this.handleCameraClick, 1)}>
                  <Icon type={getLocalIcon('/media/camerawhite.svg')} />
                </span>}
              </div>
              <ImagePicker
                files={this.state.files}
                onChange={this.onChange}
                onImageClick={(index, fs) => console.log(index, fs)}
                selectable={this.state.files.length < 4}
                multiple={this.state.multiple}
                accept="image/*"
              />
            </div>
            <div className={styles[`${PrefixCls}-outer-voice`]}>
              <p className={styles[`${PrefixCls}-outer-voice-title`]}>发送语音</p>
              <div className={styles[`${PrefixCls}-outer-voice-container`]}>
                <div className={styles[`${PrefixCls}-outer-voice-container-files`]}>
                  {mediaFile != '' ? <VociePrev mediaFileUrl={mediaFileUrl} mediaFileTimer={mediaFileLength} /> : ''}
                </div>
                <div
                  className={classNames(styles[`${PrefixCls}-outer-voice-container-button`], { [styles.active]: this.state.isVoice })}
                  onTouchStart={this.handleVoiceRecordingStart}
                  onTouchEnd={this.handleVoiceRecordingEnd}
                >
                  按下录音
                </div>
              </div>
              <ActivityIndicator
                toast
                text={this.getVoiceText(unit, bits, minutes)}
                animating={this.state.isVoice}
              />
            </div>
            <Button type="primary" onClick={this.onSubmit}>提交日志</Button>
          </form>
        </div>
        <ActivityIndicator
          toast
          text="正在上传..."
          animating={animating}
        />
      </div>
    );
  }
}

export default connect(({ loading, diary }) => ({
  loading,
  diary,
}))(createForm()(Diary));


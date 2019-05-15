// import { Component } from 'react';
// import { createForm } from 'rc-form';
// import { connect } from 'dva';
// import Nav from 'components/nav';
// import { routerRedux } from 'dva/router';
// import {
//   List,
//   InputItem,
//   Picker,
//   TextareaItem,
//   ImagePicker,
//   Button,
//   WhiteSpace,
//   Toast,
//   Switch,
//   Icon,
//   Badge,
//   Tabs,
//   ActivityIndicator,
//   DatePicker,
// } from 'components';
// import { listRows } from 'components/row';
// import VociePrev from 'components/voicePrev';
// import classNames from 'classnames';
// import { getLocalIcon, postionsToString, replaceSystemEmoji, DateChange } from 'utils';
// import SelectMenu from 'components/selectMenu';
// import styles from './index.less';
//
// const PrefixCls = 'createtask',
//   tabs = [
//     { title: <Badge>反馈 </Badge> },
//     { title: <Badge>通知</Badge> },
//   ];
// let int,
//   stop,
//   warningBaseIndex = 0,
//   nowTimeStamp = Date.now(),
//   now = new Date(nowTimeStamp);
//
// class CreateTask extends Component {
//   constructor (props) {
//     super(props);
//     this.state = {
//       files: [],
//       multiple: true,
//       isVoice: false,
//       unit: 0,
//       bits: 0,
//       minutes: 0,
//       mediaFile: '',
//       mediaFileUrl: '',
//       mediaFileLength: '',
//       mediaUploadFile: {},
//       loadPostions: false,
//       date: now,
//     };
//   }
//
//   getVoiceText = (unit, bits, minutes) => {
//     return (
//       <div>
//         <div>
//           {`${minutes}:${bits}${unit}`}
//         </div>
//         <div>
//           松开 结束
//         </div>
//       </div>
//     );
//   };
//
//   addSeconds () { // 计时器
//     const { unit, bits, minutes } = this.state;
//     this.setState({
//       unit: unit + 1,
//     });
//     if (unit >= 9) {
//       this.setState({
//         unit: 0,
//         bits: bits + 1,
//       });
//     }
//     if (bits >= 6) {
//       this.setState({
//         bits: 0,
//         minutes: minutes + 1,
//       });
//     }
//   }
//
//   startTimer () { // 启动计时器
//     const that = this;
//     int = setInterval(() => {
//       that.addSeconds();
//     }, 1000);
//   }
//
//
//   onChange = (files, type, index) => {
//     let reg = /image/,
//       result = [];
//     files.map((data, i) => {
//       if (!reg.test(data.file.type)) {
//         Toast.fail('这不是图片哟！！！', 2);
//       } else {
//         result.push(data);
//       }
//     });
//     this.setState({
//       files: result,
//     });
//   };
//   getKey = (name) => `${name && `${name}` || 'warningBaseIndex'}_${warningBaseIndex++}`;
//   getUploadFiles = () => {
//     const uploadFiles = {},
//       uploadKey = [];
//     this.state.files.map((file, i) => {
//       if (file.file) {
//         let key = this.getKey(`file_${i}`);
//         uploadKey.push(key);
//         uploadFiles[key] = file.file;
//       }
//     });
//     return {
//       uploadFiles,
//       uploadKey: uploadKey.join(','),
//     };
//   };
//   onCancel = () => {
//     this.props.dispatch(routerRedux.goBack());
//   };
//   changeValue = (obj) => {
//     for (let i in obj) {
//       if (typeof (obj[i]) === 'string') {
//         obj[i] = replaceSystemEmoji(obj[i]);
//       }
//     }
//     return obj;
//   };
//   getUserValue = (arr) => {
//     let userValue = [];
//     arr && arr.map((data, i) => {
//       userValue.push(data.userId);
//     });
//     return userValue.join();
//   };
//
//   onSubmit = () => {
//     this.props.form.validateFields(
//       ['title', 'textinfo'],
//       { force: true },
//       (error) => {
//         if (!error) {
//           const data = {
//               ...this.props.form.getFieldsValue(['title', 'type', 'textinfo', 'positions']),
//             },
//             { uploadFiles, uploadKey } = this.getUploadFiles(),
//             { mediaUploadFile } = this.state;
//           this.props.dispatch({
//             type: 'createtask/sendAppealInfo',
//             payload: {
//               ...this.changeValue(data),
//               images: uploadFiles,
//               fileKey: uploadKey,
//               mediaFile: mediaUploadFile,
//             },
//           });
//           this.props.dispatch({
//             type: 'createtask/updateState',
//             payload: {
//               animating: true,
//             },
//           });
//         } else {
//           Toast.fail('请确认信息是否正确。');
//         }
//       });
//   };
//   onTaskSubmit = (selectedUsers) => {
//     this.props.form.validateFields(
//       ['taskTitle', 'taskInfo', 'taskUrgency', 'taskEndDate'],
//       { force: true },
//       (error) => {
//         if (!error) {
//           const date = this.state.date;
//
//           const data = {
//             ...this.props.form.getFieldsValue(['taskTitle', 'taskType', 'taskInfo', 'taskUrgency']),
//             cldw: this.getUserValue(selectedUsers),
//             taskEndDate: DateChange(date),
//           };
//           this.props.dispatch({
//             type: 'createtask/createNewTask',
//             payload: {
//               ...this.changeValue(data),
//             },
//           });
//           this.props.dispatch({
//             type: 'createtask/updateState',
//             payload: {
//               animating: true,
//             },
//           });
//         } else {
//           Toast.fail('请确认信息是否正确。');
//         }
//       });
//   };
//   handleVoiceRecordingStart = () => {
//     window.getSelection ? window.getSelection()
//       .removeAllRanges() : document.selection.empty();
//     this.setState({
//       isVoice: true,
//       onRecording: true,
//     });
//     stop = setTimeout(() => { // 延迟1s执行
//       const { isVoice, onRecording } = this.state;
//       if (isVoice === true && onRecording === true) {
//         let mediaFile = cnStartRecord('', this.mediaFileOnSuccess.bind(this), this.mediaFileOnError.bind(this));
//
//         this.setState({
//           mediaFile,
//         });
//         this.startTimer();
//       }
//     }, 300);
//   };
//   handleVoiceRecordingEnd = () => {
//     window.getSelection ? window.getSelection()
//       .removeAllRanges() : document.selection.empty();
//     let { unit, bits, minutes, mediaFile, mediaFileLength } = this.state,
//       updates = {};
//
//     if (mediaFile) {
//       mediaFile.timers = mediaFileLength = (minutes * 60 + bits * 10 + unit);
//       mediaFile = cnStopRecord(this.state.mediaFile);
//       updates.mediaFile = mediaFile;
//       updates.mediaFileLength = mediaFileLength;
//     }
//     this.setState({
//       isVoice: false,
//       onRecording: false,
//       unit: 0,
//       bits: 0,
//       minutes: 0,
//       mediaFile,
//       ...updates,
//     });
//     clearInterval(int);
//     clearTimeout(stop);
//   };
//   dataUrlToImageSrc = (dataUrl) => {
//     let imageHeader = 'data:image/jpeg;base64,';
//     if (dataUrl && !dataUrl.startsWith(imageHeader)) {
//       return `${imageHeader}${dataUrl}`;
//     }
//     return dataUrl;
//   };
//   handleCameraClick = (blob, dataUrl) => {
//     const { files } = this.state;
//     files.push({ file: blob, url: this.dataUrlToImageSrc(dataUrl) });
//     this.setState({
//       files,
//     });
//   };
//
//   mediaFileOnSuccess (blob, params) {
//     const { name = '', nativeURL = '' } = params;
//     let pos = name.lastIndexOf('.'),
//       key = pos === -1 ? name : name.substr(0, pos);
//     this.setState({
//       mediaUploadFile: {
//         voiceFile: blob,
//       },
//       mediaFileUrl: nativeURL,
//     });
//   }
//
//   mediaFileOnError (error) {
//     handleVoiceRecordingEnd();
//   }
//
//   getCurrentLocation () {
//     const { loadPostions } = this.state;
//     if (!loadPostions) {
//       this.setState({
//         loadPostions: true,
//       });
//       const onSuccess = (postions = {}) => {
//           this.setState({
//             loadPostions: false,
//           });
//           this.props.dispatch({
//             type: 'createtask/updateState',
//             payload: {
//               location: postionsToString(postions),
//             },
//           });
//         },
//         onError = ({ message = '', code = -999 }) => {
//           btnVisible(false);
//           let msg = code === -999 ? message : '请允许系统访问您的位置。';
//           Toast.offline(msg, 2);
//         };
//       cnGetCurrentPosition(onSuccess, onError);
//     }
//   }
//
//   handleDivClick () {
//     let { isVoice, onRecording, unit, bits, minutes, mediaFile, mediaFileLength } = this.state,
//       updates = {};
//     if (isVoice && onRecording) {
//       if (mediaFile) {
//         mediaFile.timers = mediaFileLength = (minutes * 60 + bits * 10 + unit);
//         mediaFile = cnStopRecord(this.state.mediaFile);
//         updates.mediaFile = mediaFile;
//         updates.mediaFileLength = mediaFileLength;
//       }
//       this.setState({
//         isVoice: false,
//         onRecording: false,
//         unit: 0,
//         bits: 0,
//         minutes: 0,
//         mediaFile,
//         ...updates,
//       });
//       clearInterval(int);
//       clearTimeout(stop);
//     }
//   }
//
//   handleOkClick (dispatch) {
//     dispatch({
//       type: 'createtask/updateState',
//       payload: {
//         isShowSelectMenu: false,
//       },
//     });
//   }
//
//   handleCancel (dispatch) {
//     dispatch({
//       type: 'createtask/updateState',
//       payload: {
//         isShowSelectMenu: false,
//         selectedUsers: [],
//       },
//     });
//   }
//
//   handleSelectClick (dispatch) {
//     // dispatch({
//     //   type: 'createtask/updateState',
//     //   payload: {
//     //     isShowSelectMenu: true,
//     //     selectedUsers: []
//     //   }
//     // });
//     dispatch(routerRedux.push({
//       pathname: '/workers',
//       query: {
//         currentRoute: `${PrefixCls}`,
//       },
//     }));
//   }
//
//   componentWillUnmount () {
//     clearInterval(int);
//     clearTimeout(stop);
//   }
//
//
//   render () {
//     const { name = '' } = this.props.location.query,
//       { appealType, animating, location, noticeType, isAdmin, isShowSelectMenu, userItems, selectedUsers, selectedIndex } = this.props.createtask;
//     let { address = {} } = JSON.parse(location),
//       currentPostions = address.street || address.district || address.city || '';
//     const { getFieldProps, getFieldError } = this.props.form,
//       { unit, bits, minutes, mediaFileUrl, mediaFile, mediaFileLength, loadPostions } = this.state,
//       addUsers = (value) => {
//         this.props.dispatch({
//           type: 'createtask/updateState',
//           payload: {
//             selectedUsers: value,
//           },
//         });
//       },
//       getValue = (value) => {
//         let arr = [];
//         value.map((data, i) => {
//           arr.push(data.name);
//         });
//         return arr.length ? arr.join() : '请选择用户';
//       },
//       menuProps = {
//         items: userItems,
//         onOk: this.handleOkClick.bind(this, this.props.dispatch),
//         targetRef: this.chooseUsers,
//         onCancel: this.handleCancel.bind(this, this.props.dispatch),
//         addUsers,
//       };
//     return (
//       <div className={styles[`${PrefixCls}-container`]}>
//         <Nav title={name} dispatch={this.props.dispatch}/>
//         {isAdmin ?
//           <Tabs
//             initialPage={selectedIndex}
//             tabs={tabs}
//             swipeable={false}
//             onChange={(tab, index) => {
//               this.props.dispatch({
//                 type: `${PrefixCls}/updateState`,
//                 payload: {
//                   selectedIndex: index,
//                 },
//               });
//             }}
//           >
//             <div>
//               <div className={styles[`${PrefixCls}-outer`]}>
//                 <form>
//                   <div className={styles[`${PrefixCls}-outer-title`]}>
//                     <InputItem
//                       {...getFieldProps('title', {
//                         initialValue: '',
//                         rules: [{ required: true, message: '标题必须输入' },
//                           { max: 10, message: '标题最多能输入10个字' },
//                         ],
//                       })}
//                       clear
//                       error={!!getFieldError('title') && Toast.fail(getFieldError('title'))}
//                       placeholder="输入标题、最多输入10个字符"
//                       ref={el => this.autoFocusInst = el}
//                     >
//                       标题
//                     </InputItem>
//                   </div>
//                   <div className={styles[`${PrefixCls}-outer-type`]}>
//                     <Picker data={appealType}
//                             cols={1}
//                             {...getFieldProps('type')}
//                     >
//                       <List.Item arrow="horizontal">反馈类型</List.Item>
//                     </Picker>
//                   </div>
//                   <List.Item className={styles[`${PrefixCls}-outer-content`]}>
//                     <TextareaItem
//                       {...getFieldProps('textinfo', {
//                         initialValue: '',
//                         rules: [{ required: true, message: '请输入诉求内容' }],
//                       })}
//                       clear
//                       rows={3}
//                       error={!!getFieldError('textinfo') && Toast.fail(getFieldError('textinfo'))}
//                       count={500}
//                       placeholder={'在此输入发表内容，注意时间、地点、涉及人物等要素'}
//                     />
//                   </List.Item>
//                   <div>
//                     <InputItem
//                       {...getFieldProps('positions', {
//                         initialValue: currentPostions,
//                       })}
//                       clear
//                       error={!!getFieldError('positions') && Toast.fail(getFieldError('positions'))}
//                       placeholder="请输入您的位置"
//                       extra={currentPostions === '' ? loadPostions ? <Icon type="loading"/> :
//                         <span onClick={this.getCurrentLocation.bind(this)}><Icon
//                           type={getLocalIcon('/others/location.svg')}
//                         /></span> : ''}
//                     >
//                       当前位置
//                     </InputItem>
//                   </div>
//                   <div className={styles[`${PrefixCls}-outer-img`]}>
//                     <div>
//                       <p>添加图片</p>
//                       {this.state.files.length >= 4 ? '' :
//                         <span onClick={cnTakePhoto.bind(null, this.handleCameraClick, 1)}>
//                         <Icon type={getLocalIcon('/media/camerawhite.svg')}/>
//                       </span>}
//                     </div>
//                     <ImagePicker
//                       files={this.state.files}
//                       onChange={this.onChange}
//                       onImageClick={(index, fs) => console.log(index, fs)}
//                       selectable={this.state.files.length < 4}
//                       multiple={this.state.multiple}
//                       accept="image/*"
//                     />
//                   </div>
//                   <div className={styles[`${PrefixCls}-outer-voice`]}>
//                     <p className={styles[`${PrefixCls}-outer-voice-title`]}>发送语音</p>
//                     <div className={styles[`${PrefixCls}-outer-voice-container`]}>
//                       <div className={styles[`${PrefixCls}-outer-voice-container-files`]}>
//                         {mediaFile !== '' ?
//                           <VociePrev mediaFileUrl={mediaFileUrl} mediaFileTimer={mediaFileLength}/> : ''}
//                       </div>
//                       <div
//                         className={classNames(styles[`${PrefixCls}-outer-voice-container-button`], { [styles.active]: this.state.isVoice })}
//                         onTouchStart={this.handleVoiceRecordingStart}
//                         onTouchEnd={this.handleVoiceRecordingEnd}
//                       >
//                         按下录音
//                       </div>
//                     </div>
//                     <ActivityIndicator
//                       toast
//                       text={this.getVoiceText(unit, bits, minutes)}
//                       animating={this.state.isVoice}
//                     />
//                   </div>
//                   <div className={styles[`${PrefixCls}-outer-button`]}>
//                     <Button type="ghost" inline size="small" onClick={this.onSubmit}>提交</Button>
//                   </div>
//                 </form>
//               </div>
//
//             </div>
//             <div>
//               <div>
//                 <div className={styles[`${PrefixCls}-outer`]}>
//                   <form>
//                     <div className={styles[`${PrefixCls}-outer-selectUser`]}>
//                       <List.Item
//                         extra={getValue(selectedUsers)}
//                         arrow="horizontal"
//                         ref={el => this.chooseUsers = el}
//                         onClick={this.handleSelectClick.bind(this, this.props.dispatch)}
//                         wrap
//                       >
//                         选择办理人
//                       </List.Item>
//                     </div>
//                     <div className={styles[`${PrefixCls}-outer-time`]}>
//                       <DatePicker
//                         ref={el => this.dateValue = el}
//                         mode="date"
//                         extra="请选择"
//                         value={this.state.date}
//                         onChange={date => this.setState({ date })}
//                         {...getFieldProps('taskEndDate', {
//                           rules: [{ required: true, message: '请选择截止时间' }],
//                         })}
//                       >
//                         <List.Item arrow="horizontal">任务截止时间</List.Item>
//                       </DatePicker>
//                     </div>
//                     <div className={styles[`${PrefixCls}-outer-type`]}>
//                       <Picker data={appealType}
//                               cols={1}
//                               {...getFieldProps('taskType', {
//                                 rules: [{ required: false, message: '请选择任务类型' }],
//                               })}
//                               error={!!getFieldError('taskType') && Toast.fail(getFieldError('taskType'))}
//                       >
//                         <List.Item arrow="horizontal">任务类型</List.Item>
//                       </Picker>
//                     </div>
//                     <div className={styles[`${PrefixCls}-outer-type`]}>
//                       <Picker data={noticeType}
//                               cols={1}
//                               {...getFieldProps('taskUrgency', {
//                                 rules: [{ required: true, message: '请选择紧急程度' }],
//                               })}
//                               error={!!getFieldError('taskUrgency') && Toast.fail(getFieldError('taskUrgency'))}
//                       >
//                         <List.Item arrow="horizontal">任务紧急程度</List.Item>
//                       </Picker>
//                     </div>
//                     <div className={styles[`${PrefixCls}-outer-title`]}>
//                       <InputItem
//                         {...getFieldProps('taskTitle', {
//                           initialValue: '',
//                           rules: [{ required: true, message: '标题必须输入' },
//                             { max: 10, message: '标题最多能输入10个字' },
//                           ],
//                         })}
//                         clear
//                         error={!!getFieldError('taskTitle') && Toast.fail(getFieldError('taskTitle'))}
//                         placeholder="输入标题、最多输入10个字符"
//                         ref={el => this.autoFocusInst = el}
//                       >
//                         任务标题
//                       </InputItem>
//                     </div>
//                     <List.Item className={styles[`${PrefixCls}-outer-content`]}>
//                       <TextareaItem
//                         {...getFieldProps('taskInfo', {
//                           initialValue: '',
//                           rules: [{ required: true, message: '请输入任务描述' }],
//                         })}
//                         clear
//                         rows={5}
//                         error={!!getFieldError('taskInfo') && Toast.fail(getFieldError('taskInfo'))}
//                         count={500}
//                         placeholder={'在此输入任务描述'}
//                       />
//                     </List.Item>
//                     <div className={styles[`${PrefixCls}-outer-button`]}>
//                       <Button type="ghost"
//                               inline
//                               size="small"
//                               onClick={this.onTaskSubmit.bind(this, selectedUsers)}
//                       >提交</Button>
//                     </div>
//                   </form>
//                 </div>
//
//               </div>
//             </div>
//           </Tabs>
//           :
//           <div>
//             <div className={styles[`${PrefixCls}-outer`]}>
//               <form>
//                 <div className={styles[`${PrefixCls}-outer-title`]}>
//                   <InputItem
//                     {...getFieldProps('title', {
//                       initialValue: '',
//                       rules: [{ required: true, message: '标题必须输入' },
//                         { max: 10, message: '标题最多能输入10个字' },
//                       ],
//                     })}
//                     clear
//                     error={!!getFieldError('title') && Toast.fail(getFieldError('title'))}
//                     placeholder="输入标题、最多输入10个字符"
//                     ref={el => this.autoFocusInst = el}
//                   >
//                     标题
//                   </InputItem>
//                 </div>
//                 <div className={styles[`${PrefixCls}-outer-type`]}>
//                   <Picker data={appealType}
//                           cols={1}
//                           {...getFieldProps('type')}
//                   >
//                     <List.Item arrow="horizontal">反馈类型</List.Item>
//                   </Picker>
//                 </div>
//                 <List.Item className={styles[`${PrefixCls}-outer-content`]}>
//                   <TextareaItem
//                     {...getFieldProps('textinfo', {
//                       initialValue: '',
//                       rules: [{ required: true, message: '请输入反馈内容' }],
//                     })}
//                     clear
//                     rows={3}
//                     error={!!getFieldError('textinfo') && Toast.fail(getFieldError('textinfo'))}
//                     count={500}
//                     placeholder={'在此输入发表内容，注意时间、地点、涉及人物等要素'}
//                   />
//                 </List.Item>
//                 <div style={{ borderBottom: '1px solid #ddd' }}>
//                   <InputItem
//                     {...getFieldProps('positions', {
//                       initialValue: currentPostions,
//                     })}
//                     clear
//                     error={!!getFieldError('positions') && Toast.fail(getFieldError('positions'))}
//                     placeholder="请输入您的位置"
//                     extra={currentPostions === '' ? loadPostions ? <Icon type="loading"/> :
//                       <span onClick={this.getCurrentLocation.bind(this)}><Icon
//                         type={getLocalIcon('/others/location.svg')}
//                       /></span> : ''}
//                   >
//                     当前位置
//                   </InputItem>
//                 </div>
//                 <div className={styles[`${PrefixCls}-outer-img`]}>
//                   <div>
//                     <p>添加图片</p>
//                     {this.state.files.length >= 4 ? '' :
//                       <span onClick={cnTakePhoto.bind(null, this.handleCameraClick, 1)}>
//                       <Icon type={getLocalIcon('/media/camerawhite.svg')}/>
//                     </span>}
//                   </div>
//                   <ImagePicker
//                     files={this.state.files}
//                     onChange={this.onChange}
//                     onImageClick={(index, fs) => console.log(index, fs)}
//                     selectable={this.state.files.length < 4}
//                     multiple={this.state.multiple}
//                     accept="image/*"
//                   />
//                 </div>
//                 <div className={styles[`${PrefixCls}-outer-voice`]}>
//                   <p className={styles[`${PrefixCls}-outer-voice-title`]}>发送语音</p>
//                   <div className={styles[`${PrefixCls}-outer-voice-container`]}>
//                     <div className={styles[`${PrefixCls}-outer-voice-container-files`]}>
//                       {mediaFile !== '' ?
//                         <VociePrev mediaFileUrl={mediaFileUrl} mediaFileTimer={mediaFileLength}/> : ''}
//                     </div>
//                     <div
//                       className={classNames(styles[`${PrefixCls}-outer-voice-container-button`], { [styles.active]: this.state.isVoice })}
//                       onTouchStart={this.handleVoiceRecordingStart}
//                       onTouchEnd={this.handleVoiceRecordingEnd}
//                     >
//                       按下录音
//                     </div>
//                   </div>
//                   <ActivityIndicator
//                     toast
//                     text={this.getVoiceText(unit, bits, minutes)}
//                     animating={this.state.isVoice}
//                   />
//                 </div>
//                 <div className={styles[`${PrefixCls}-outer-button`]}>
//                   <Button type="ghost" inline size="small" onClick={this.onSubmit}>提交</Button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         }
//
//         {isShowSelectMenu ? <SelectMenu {...menuProps} /> : ''}
//         <ActivityIndicator
//           toast
//           text="正在上传..."
//           animating={animating}
//         />
//       </div>
//     );
//   }
// }
//
// export default connect(({ loading, createtask }) => ({
//   loading,
//   createtask,
// }))(createForm()(CreateTask));
import { Component } from 'react'
import { createForm } from 'rc-form'
import { connect } from 'dva'
import Nav from 'components/nav'
import { routerRedux } from 'dva/router'
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
  Badge,
  Tabs,
  ActivityIndicator,
  DatePicker,
} from 'components'
import { listRows } from 'components/row'
import VociePrev from 'components/voicePrev'
import classNames from 'classnames'
import { getLocalIcon, postionsToString, replaceSystemEmoji, DateChange } from 'utils'
import SelectMenu from 'components/selectMenu'
import styles from './index.less'

const PrefixCls = 'createtask',
  tabs = [
    { title: <Badge>反馈 </Badge> },
    { title: <Badge>通知</Badge> },
  ]
let int,
  stop,
  warningBaseIndex = 0,
  nowTimeStamp = Date.now(),
  now = new Date(nowTimeStamp)

class CreateTask extends Component {
  constructor (props) {
    super(props)
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
      loadPostions: false,
      date: now,
    }
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
    )
  }

  addSeconds () { // 计时器
    const { unit, bits, minutes } = this.state
    this.setState({
      unit: unit + 1,
    })
    if (unit >= 9) {
      this.setState({
        unit: 0,
        bits: bits + 1,
      })
    }
    if (bits >= 6) {
      this.setState({
        bits: 0,
        minutes: minutes + 1,
      })
    }
  }

  startTimer () { // 启动计时器
    const that = this
    int = setInterval(() => {
      that.addSeconds()
    }, 1000)
  }


  onChange = (files, type, index) => {
    let reg = /image/,
      result = []
    files.map((data, i) => {
      if (!reg.test(data.file.type)) {
        Toast.fail('这不是图片哟！！！', 2)
      } else {
        result.push(data)
      }
    })
    this.setState({
      files: result,
    })
  }
  getKey = (name) => `${name && `${name}` || 'warningBaseIndex'}_${warningBaseIndex++}`
  getUploadFiles = () => {
    const uploadFiles = {},
      uploadKey = []
    this.state.files.map((file, i) => {
      if (file.file) {
        let key = this.getKey(`file_${i}`)
        uploadKey.push(key)
        uploadFiles[key] = file.file
      }
    })
    return {
      uploadFiles,
      uploadKey: uploadKey.join(','),
    }
  }
  onCancel = () => {
    this.props.dispatch(routerRedux.goBack())
  }
  changeValue = (obj) => {
    for (let i in obj) {
      if (typeof (obj[i]) === 'string') {
        obj[i] = replaceSystemEmoji(obj[i])
      }
      if (typeof (obj[i]) === 'undefined') {
        obj[i] = ''
      }
    }
    return obj
  }
  getUserValue = (arr) => {
    let userValue = []
    arr && arr.map((data, i) => {
      userValue.push(data.userId)
    })
    return userValue.join()
  }

  onSubmit = () => {
    this.props.form.validateFields(
      ['title', 'street', 'textinfo'],
      { force: true },
      (error) => {
        if (!error) {
          const data = {
              ...this.props.form.getFieldsValue(['title', 'type', 'street', 'textinfo', 'positions']),
            },
            { uploadFiles, uploadKey } = this.getUploadFiles(),
            { mediaUploadFile } = this.state
          this.props.dispatch({
            type: 'createtask/sendAppealInfo',
            payload: {
              ...this.changeValue(data),
              images: uploadFiles,
              fileKey: uploadKey,
              mediaFile: mediaUploadFile,
            },
          })
          this.props.dispatch({
            type: 'createtask/updateState',
            payload: {
              animating: true,
            },
          })
        } else {
          Toast.fail('请确认信息是否正确。')
        }
      })
  }
  onTaskSubmit = (selectedUsers) => {
    this.props.form.validateFields(
      ['taskTitle', 'taskInfo', 'taskUrgency', 'taskEndDate'],
      { force: true },
      (error) => {
        if (!error) {
          const date = this.state.date

          const data = {
            ...this.props.form.getFieldsValue(['taskTitle', 'taskType', 'taskInfo', 'taskUrgency']),
            cldw: this.getUserValue(selectedUsers),
            taskEndDate: DateChange(date),
          }
          this.props.dispatch({
            type: 'createtask/createNewTask',
            payload: {
              ...this.changeValue(data),
            },
          })
          this.props.dispatch({
            type: 'createtask/updateState',
            payload: {
              animating: true,
            },
          })
        } else {
          Toast.fail('请确认信息是否正确。')
        }
      })
  }
  handleVoiceRecordingStart = () => {
    window.getSelection ? window.getSelection()
      .removeAllRanges() : document.selection.empty()
    this.setState({
      isVoice: true,
      onRecording: true,
    })
    stop = setTimeout(() => { // 延迟1s执行
      const { isVoice, onRecording } = this.state
      if (isVoice === true && onRecording === true) {
        let mediaFile = cnStartRecord('', this.mediaFileOnSuccess.bind(this), this.mediaFileOnError.bind(this))

        this.setState({
          mediaFile,
        })
        this.startTimer()
      }
    }, 300)
  }
  handleVoiceRecordingEnd = () => {
    window.getSelection ? window.getSelection()
      .removeAllRanges() : document.selection.empty()
    let { unit, bits, minutes, mediaFile, mediaFileLength } = this.state,
      updates = {}

    if (mediaFile) {
      mediaFile.timers = mediaFileLength = (minutes * 60 + bits * 10 + unit)
      mediaFile = cnStopRecord(this.state.mediaFile)
      updates.mediaFile = mediaFile
      updates.mediaFileLength = mediaFileLength
    }
    this.setState({
      isVoice: false,
      onRecording: false,
      unit: 0,
      bits: 0,
      minutes: 0,
      mediaFile,
      ...updates,
    })
    clearInterval(int)
    clearTimeout(stop)
  }
  dataUrlToImageSrc = (dataUrl) => {
    let imageHeader = 'data:image/jpeg;base64,'
    if (dataUrl && !dataUrl.startsWith(imageHeader)) {
      return `${imageHeader}${dataUrl}`
    }
    return dataUrl
  }
  handleCameraClick = (blob, dataUrl) => {
    const { files } = this.state
    files.push({ file: blob, url: this.dataUrlToImageSrc(dataUrl) })
    this.setState({
      files,
    })
  }

  mediaFileOnSuccess (blob, params) {
    const { name = '', nativeURL = '' } = params
    let pos = name.lastIndexOf('.'),
      key = pos === -1 ? name : name.substr(0, pos)
    this.setState({
      mediaUploadFile: {
        voiceFile: blob,
      },
      mediaFileUrl: nativeURL,
    })
  }

  mediaFileOnError (error) {
    handleVoiceRecordingEnd()
  }

  getCurrentLocation () {
    const { loadPostions } = this.state
    if (!loadPostions) {
      this.setState({
        loadPostions: true,
      })
      const onSuccess = (postions = {}) => {
          this.setState({
            loadPostions: false,
          })
          this.props.dispatch({
            type: 'createtask/updateState',
            payload: {
              location: postionsToString(postions),
            },
          })
        },
        onError = ({ message = '', code = -999 }) => {
          btnVisible(false)
          let msg = code === -999 ? message : '请允许系统访问您的位置。'
          Toast.offline(msg, 2)
        }
      cnGetCurrentPosition(onSuccess, onError)
    }
  }

  handleDivClick () {
    let { isVoice, onRecording, unit, bits, minutes, mediaFile, mediaFileLength } = this.state,
      updates = {}
    if (isVoice && onRecording) {
      if (mediaFile) {
        mediaFile.timers = mediaFileLength = (minutes * 60 + bits * 10 + unit)
        mediaFile = cnStopRecord(this.state.mediaFile)
        updates.mediaFile = mediaFile
        updates.mediaFileLength = mediaFileLength
      }
      this.setState({
        isVoice: false,
        onRecording: false,
        unit: 0,
        bits: 0,
        minutes: 0,
        mediaFile,
        ...updates,
      })
      clearInterval(int)
      clearTimeout(stop)
    }
  }

  handleOkClick (dispatch) {
    dispatch({
      type: 'createtask/updateState',
      payload: {
        isShowSelectMenu: false,
      },
    })
  }

  handleCancel (dispatch) {
    dispatch({
      type: 'createtask/updateState',
      payload: {
        isShowSelectMenu: false,
        selectedUsers: [],
      },
    })
  }

  handleSelectClick (dispatch) {
    // dispatch({
    //   type: 'createtask/updateState',
    //   payload: {
    //     isShowSelectMenu: true,
    //     selectedUsers: []
    //   }
    // });
    dispatch(routerRedux.push({
      pathname: '/workers',
      query: {
        currentRoute: `${PrefixCls}`,
      },
    }))
  }

  componentWillUnmount () {
    clearInterval(int)
    clearTimeout(stop)
  }


  render () {
    const { name = '' } = this.props.location.query,
      { appealType, district, animating, location, noticeType, isAdmin, isShowSelectMenu, userItems, selectedUsers, selectedIndex } = this.props.createtask
    let { address = {} } = JSON.parse(location),
      currentPostions = address.street || address.district || address.city || ''
    const { getFieldProps, getFieldError } = this.props.form,
      { unit, bits, minutes, mediaFileUrl, mediaFile, mediaFileLength, loadPostions } = this.state,
      addUsers = (value) => {
        this.props.dispatch({
          type: 'createtask/updateState',
          payload: {
            selectedUsers: value,
          },
        })
      },
      getValue = (value) => {
        let arr = []
        value.map((data, i) => {
          arr.push(data.name)
        })
        return arr.length ? arr.join() : '请选择用户'
      },
      menuProps = {
        items: userItems,
        onOk: this.handleOkClick.bind(this, this.props.dispatch),
        targetRef: this.chooseUsers,
        onCancel: this.handleCancel.bind(this, this.props.dispatch),
        addUsers,
      }
    return (
      <div className={styles[`${PrefixCls}-container`]}>
        <Nav title={name} dispatch={this.props.dispatch}/>
        {isAdmin ?
          <Tabs
            initialPage={selectedIndex}
            tabs={tabs}
            swipeable={false}
            onChange={(tab, index) => {
              this.props.dispatch({
                type: `${PrefixCls}/updateState`,
                payload: {
                  selectedIndex: index,
                },
              })
            }}
          >
            <div>
              <div className={styles[`${PrefixCls}-outer`]}>
                <form>
                  <div className={styles[`${PrefixCls}-outer-title`]}>
                    <InputItem
                      {...getFieldProps('title', {
                        initialValue: '',
                        rules: [{ required: true, message: '标题必须输入' },
                          { max: 10, message: '标题最多能输入10个字' },
                        ],
                      })}
                      clear
                      error={!!getFieldError('title') && Toast.fail(getFieldError('title'))}
                      placeholder="输入标题、最多输入10个字符"
                      ref={el => this.autoFocusInst = el}
                    >
                      标题
                    </InputItem>
                  </div>
                  <div className={styles[`${PrefixCls}-outer-type`]}>
                    <Picker data={appealType}
                            cols={1}
                            {...getFieldProps('type')}
                    >
                      <List.Item arrow="horizontal">反馈类型</List.Item>
                    </Picker>
                  </div>
                  <List.Item className={styles[`${PrefixCls}-outer-content`]}>
                    <TextareaItem
                      {...getFieldProps('textinfo', {
                        initialValue: '',
                        rules: [{ required: true, message: '请输入诉求内容' }],
                      })}
                      clear
                      rows={3}
                      error={!!getFieldError('textinfo') && Toast.fail(getFieldError('textinfo'))}
                      count={500}
                      placeholder={'在此输入发表内容，注意时间、地点、涉及人物等要素'}
                    />
                  </List.Item>
                  <div style={{ display: 'none' }}>
                    <InputItem
                      {...getFieldProps('positions', {
                        initialValue: currentPostions,
                      })}
                      clear
                      error={!!getFieldError('positions') && Toast.fail(getFieldError('positions'))}
                      placeholder="请输入您的位置"
                      extra={currentPostions === '' ? loadPostions ? <Icon type="loading"/> :
                        <span onClick={this.getCurrentLocation.bind(this)}><Icon
                          type={getLocalIcon('/others/location.svg')}
                        /></span> : ''}
                    >
                      当前位置
                    </InputItem>
                  </div>
                  <div className={styles[`${PrefixCls}-outer-street`]}>
                    <Picker
                      data={district}
                      cols={2}
                      {...getFieldProps('street', {
                        rules: [{ required: true, message: '请选择地址' }],
                      })}
                      error={!!getFieldError('street') && Toast.fail(getFieldError('street'))}
                    >
                      <List.Item>
                        选择地址
                      </List.Item>
                    </Picker>
                  </div>
                  <div className={styles[`${PrefixCls}-outer-img`]}>
                    <div>
                      <p>添加图片</p>
                      {this.state.files.length >= 4 ? '' :
                        <span onClick={cnTakePhoto.bind(null, this.handleCameraClick, 1)}>
                        <Icon type={getLocalIcon('/media/camerawhite.svg')}/>
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
                        {mediaFile !== '' ?
                          <VociePrev mediaFileUrl={mediaFileUrl} mediaFileTimer={mediaFileLength}/> : ''}
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
                  <div className={styles[`${PrefixCls}-outer-button`]}>
                    <Button type="ghost" inline size="small" onClick={this.onSubmit}>提交</Button>
                  </div>
                </form>
              </div>

            </div>
            <div>
              <div>
                <div className={styles[`${PrefixCls}-outer`]}>
                  <form>
                    <div className={styles[`${PrefixCls}-outer-selectUser`]}>
                      <List.Item
                        extra={getValue(selectedUsers)}
                        arrow="horizontal"
                        ref={el => this.chooseUsers = el}
                        onClick={this.handleSelectClick.bind(this, this.props.dispatch)}
                        wrap
                      >
                        选择办理人
                      </List.Item>
                    </div>
                    <div className={styles[`${PrefixCls}-outer-time`]}>
                      <DatePicker
                        ref={el => this.dateValue = el}
                        mode="date"
                        extra="请选择"
                        value={this.state.date}
                        onChange={date => this.setState({ date })}
                        {...getFieldProps('taskEndDate', {
                          rules: [{ required: true, message: '请选择截止时间' }],
                        })}
                      >
                        <List.Item arrow="horizontal">任务截止时间</List.Item>
                      </DatePicker>
                    </div>
                    <div className={styles[`${PrefixCls}-outer-type`]}>
                      <Picker data={appealType}
                              cols={1}
                              {...getFieldProps('taskType', {
                                rules: [{ required: false, message: '请选择任务类型' }],
                              })}
                              error={!!getFieldError('taskType') && Toast.fail(getFieldError('taskType'))}
                      >
                        <List.Item arrow="horizontal">任务类型</List.Item>
                      </Picker>
                    </div>
                    <div className={styles[`${PrefixCls}-outer-type`]}>
                      <Picker data={noticeType}
                              cols={1}
                              {...getFieldProps('taskUrgency', {
                                rules: [{ required: true, message: '请选择紧急程度' }],
                              })}
                              error={!!getFieldError('taskUrgency') && Toast.fail(getFieldError('taskUrgency'))}
                      >
                        <List.Item arrow="horizontal">任务紧急程度</List.Item>
                      </Picker>
                    </div>
                    <div className={styles[`${PrefixCls}-outer-title`]}>
                      <InputItem
                        {...getFieldProps('taskTitle', {
                          initialValue: '',
                          rules: [{ required: true, message: '标题必须输入' },
                            { max: 10, message: '标题最多能输入10个字' },
                          ],
                        })}
                        clear
                        error={!!getFieldError('taskTitle') && Toast.fail(getFieldError('taskTitle'))}
                        placeholder="输入标题、最多输入10个字符"
                        ref={el => this.autoFocusInst = el}
                      >
                        任务标题
                      </InputItem>
                    </div>
                    <List.Item className={styles[`${PrefixCls}-outer-content`]}>
                      <TextareaItem
                        {...getFieldProps('taskInfo', {
                          initialValue: '',
                          rules: [{ required: true, message: '请输入任务描述' }],
                        })}
                        clear
                        rows={5}
                        error={!!getFieldError('taskInfo') && Toast.fail(getFieldError('taskInfo'))}
                        count={500}
                        placeholder={'在此输入任务描述'}
                      />
                    </List.Item>
                    <div className={styles[`${PrefixCls}-outer-button`]}>
                      <Button type="ghost"
                              inline
                              size="small"
                              onClick={this.onTaskSubmit.bind(this, selectedUsers)}
                      >提交</Button>
                    </div>
                  </form>
                </div>

              </div>
            </div>
          </Tabs>
          :
          <div>
            <div className={styles[`${PrefixCls}-outer`]}>
              <form>
                <div className={styles[`${PrefixCls}-outer-title`]}>
                  <InputItem
                    {...getFieldProps('title', {
                      initialValue: '',
                      rules: [{ required: true, message: '标题必须输入' },
                        { max: 10, message: '标题最多能输入10个字' },
                      ],
                    })}
                    clear
                    error={!!getFieldError('title') && Toast.fail(getFieldError('title'))}
                    placeholder="输入标题、最多输入10个字符"
                    ref={el => this.autoFocusInst = el}
                  >
                    标题
                  </InputItem>
                </div>
                <div className={styles[`${PrefixCls}-outer-type`]}>
                  <Picker data={appealType}
                          cols={1}
                          {...getFieldProps('type')}
                  >
                    <List.Item arrow="horizontal">反馈类型</List.Item>
                  </Picker>
                </div>
                <List.Item className={styles[`${PrefixCls}-outer-content`]}>
                  <TextareaItem
                    {...getFieldProps('textinfo', {
                      initialValue: '',
                      rules: [{ required: true, message: '请输入反馈内容' }],
                    })}
                    clear
                    rows={3}
                    error={!!getFieldError('textinfo') && Toast.fail(getFieldError('textinfo'))}
                    count={500}
                    placeholder={'在此输入发表内容，注意时间、地点、涉及人物等要素'}
                  />
                </List.Item>
                <div style={{ borderBottom: '1px solid #ddd', display: 'none' }}>
                  <InputItem
                    {...getFieldProps('positions', {
                      initialValue: currentPostions,
                    })}
                    clear
                    error={!!getFieldError('positions') && Toast.fail(getFieldError('positions'))}
                    placeholder="请输入您的位置"
                    extra={currentPostions === '' ? loadPostions ? <Icon type="loading"/> :
                      <span onClick={this.getCurrentLocation.bind(this)}><Icon
                        type={getLocalIcon('/others/location.svg')}
                      /></span> : ''}
                  >
                    当前位置
                  </InputItem>
                </div>
                <div className={styles[`${PrefixCls}-outer-street`]} style={{ borderBottom: '1px solid #ddd' }}>
                  <Picker
                    data={district}
                    cols={2}
                    {...getFieldProps('street', {
                      rules: [{ required: false, message: '请选择地址' }],
                    })}
                    error={!!getFieldError('street') && Toast.fail(getFieldError('street'))}
                  >
                    <List.Item>
                      选择地址
                    </List.Item>
                  </Picker>
                </div>
                <div className={styles[`${PrefixCls}-outer-img`]}>
                  <div>
                    <p>添加图片</p>
                    {this.state.files.length >= 4 ? '' :
                      <span onClick={cnTakePhoto.bind(null, this.handleCameraClick, 1)}>
                      <Icon type={getLocalIcon('/media/camerawhite.svg')}/>
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
                      {mediaFile !== '' ?
                        <VociePrev mediaFileUrl={mediaFileUrl} mediaFileTimer={mediaFileLength}/> : ''}
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
                <div className={styles[`${PrefixCls}-outer-button`]}>
                  <Button type="ghost" inline size="small" onClick={this.onSubmit}>提交</Button>
                </div>
              </form>
            </div>
          </div>
        }

        {isShowSelectMenu ? <SelectMenu {...menuProps} /> : ''}
        <ActivityIndicator
          toast
          text="正在上传..."
          animating={animating}
        />
      </div>
    )
  }
}

export default connect(({ loading, createtask }) => ({
  loading,
  createtask,
}))(createForm()(CreateTask))

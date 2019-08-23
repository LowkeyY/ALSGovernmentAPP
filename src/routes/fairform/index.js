/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import Nav from 'components/nav';
import {
  List,
  InputItem,
  TextareaItem,
  ImagePicker,
  Button,
  WhiteSpace,
  Toast,
  Icon,
  Picker,
  ActivityIndicator,
  WingBlank
} from 'components';
import { getLocalIcon, replaceSystemEmoji, getTitle, pattern } from 'utils';
import styles from './index.less';

const PrefixCls = 'fairform';
let fairIndex = 0;
const sex = [
    {
      label: '男',
      value: '男',
    },
    {
      label: '女',
      value: '女',
    },
  ],
  cardType = [
    {
      label: '居民身份证',
      value: '居民身份证',
    },
    {
      label: '户口簿',
      value: '户口簿',
    },
    {
      label: '军官证',
      value: '军官证',
    },
  ];

class FairForm extends Component {
  constructor (props) {
    super(props);
    this.state = {
      files: [],
      newFiles: [],
      multiple: true,
    };
  }

  onChangeBeforPic = (files) => {
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
  onChangeAfterPic = (files, type, index) => {
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
      newFiles: result,
    });
  };

  onSubmit = () => {
    const { id = '' } = this.props.location.query,
      { uploadFiles, uploadKey } = this.getUploadFiles();
    this.props.form.validateFields({
      force: true,
    }, (error) => {
      if (!error && uploadKey.length > 0) {
        const data = {
          ...this.props.form.getFieldsValue(),
          YUYUESHIXIANG: id,
        };
        this.props.dispatch({
          type: 'fairform/sendFairService',
          payload: {
            ...this.changeValue(data),
            images: uploadFiles,
            fileKey: uploadKey,
          },
        });
        this.props.dispatch({
          type: 'fairform/updateState',
          payload: {
            animating: true,
          },
        });
      } else if (uploadKey.length === 0) {
        Toast.fail('请上传身份证照片和其他相关附件。');
      } else {
        Toast.fail('请确认信息是否正确。');
      }
    });
  };

  getKey = (name) => `${name && `${name}` || 'fairKey'}_${fairIndex++}`;
  getUploadFiles = () => {
    const uploadFiles = {},
      uploadKey = [];
    const fileLists = [...this.state.files, ...this.state.newFiles];
    fileLists.map((file, i) => {
      if (file.file) {
        let key = this.getKey('fair');
        uploadKey.push(key);
        uploadFiles[key] = file.file;
      }
    });

    return {
      uploadFiles,
      uploadKey: uploadKey.join(','),
    };
  };

  changeValue = (obj) => {
    for (let i in obj) {
      if (typeof (obj[i]) === 'string') {
        obj[i] = replaceSystemEmoji(obj[i]);
      }
    }
    return obj;
  };

  dataUrlToImageSrc = (dataUrl) => {
    let imageHeader = 'data:image/jpeg;base64,';
    if (dataUrl && !dataUrl.startsWith(imageHeader)) {
      return `${imageHeader}${dataUrl}`;
    }
    return dataUrl;
  };


  render () {
    const { name = '提交申请', workId = '', flowId = '', taskId = '' } = this.props.location.query,
      { animating } = this.props.fairform;
    const { getFieldProps, getFieldError } = this.props.form,
      handlerBeforeCameraClick = (blob, dataUrl) => {
        const { files } = this.state;
        files.push({ file: blob, url: this.dataUrlToImageSrc(dataUrl) });
        this.setState({
          files,
        });
      },
      handlerAfterCameraClick = (blob, dataUrl) => {
        const { newFiles } = this.state;
        newFiles.push({ file: blob, url: this.dataUrlToImageSrc(dataUrl) });
        this.setState({
          newFiles,
        });
      };
    return (
      <div >
        <Nav title={getTitle(name)} dispatch={this.props.dispatch} />
        <div className={styles[`${PrefixCls}-outer`]} >
          <form >
            <InputItem
              {...getFieldProps('XINGMING', {
                initialValue: '',
                rules: [{ required: true, message: '姓名必须输入' },
                ],
              })}
              clear
              // error={!!getFieldError('XINGMING') && Toast.fail(getFieldError('XINGMING'))}
              error={!!getFieldError('XINGMING')}
              onErrorClick={() => {
                Toast.fail(getFieldError('XINGMING'));
              }}
            >
              <Icon type={getLocalIcon('/others/require.svg')} size="xxs" color="#ff5f5f" />
              姓名
            </InputItem >
            <List >
              <Picker
                data={sex}
                cols={1}
                {...getFieldProps('XINGBIE', {
                  rules: [{ required: true, message: '请选择性别' }],
                })}
                // error={!!getFieldError('XINGBIE') && Toast.fail(getFieldError('XINGBIE'))}
                error={!!getFieldError('XINGBIE')}
                onErrorClick={() => {
                  Toast.fail(getFieldError('XINGBIE'));
                }}
              >
                <List.Item arrow="horizontal" >
                  <Icon type={getLocalIcon('/others/require.svg')} size="xxs" color="#ff5f5f" />
                  性别
                </List.Item >
              </Picker >
            </List >
            <InputItem
              type="number"
              {...getFieldProps('SHOUJIHAOMA', {
                initialValue: '',
                rules: [
                  { required: true, message: '手机号码须输入' },
                  { pattern: pattern.phone.pattern, message: pattern.phone.message },
                ],
              })}
              error={!!getFieldError('SHOUJIHAOMA')}
              onErrorClick={() => {
                Toast.fail(getFieldError('SHOUJIHAOMA'));
              }}
              clear
            >
              <Icon type={getLocalIcon('/others/require.svg')} size="xxs" color="#ff5f5f" />
              手机号码
            </InputItem >
            <List >
              <Picker
                data={cardType}
                cols={1}
                {...getFieldProps('ZHENGJIANLEIXING', {
                  rules: [{ required: true, message: '请选择证件类型' }],
                })}
                // error={!!getFieldError('ZHENGJIANLEIXING') && Toast.fail(getFieldError('ZHENGJIANLEIXING'))}
                error={!!getFieldError('ZHENGJIANLEIXING')}
                onErrorClick={() => {
                  Toast.fail(getFieldError('ZHENGJIANLEIXING'));
                }}
              >
                <List.Item arrow="horizontal" >
                  <Icon type={getLocalIcon('/others/require.svg')} size="xxs" color="#ff5f5f" />
                  证件类型
                </List.Item >
              </Picker >
            </List >
            <InputItem
              {...getFieldProps('ZHENGJIANHAOMA', {
                rules: [{ required: true, message: '请输入证件号码' }],
              })}
              // error={!!getFieldError('ZHENGJIANHAOMA') && Toast.fail(getFieldError('ZHENGJIANHAOMA'))}
              error={!!getFieldError('ZHENGJIANHAOMA')}
              onErrorClick={() => {
                Toast.fail(getFieldError('ZHENGJIANHAOMA'));
              }}
              clear
            >
              <Icon type={getLocalIcon('/others/require.svg')} size="xxs" color="#ff5f5f" />
              证件号码
            </InputItem >
            <List >
              <InputItem
                type="text"
                {...getFieldProps('HUJIDIZHI', {
                  initialValue: '',
                  rules: [{ required: false, message: '请输入户籍地址' }],
                })}
                clear
              >
                {/*<Icon type={getLocalIcon('/others/require.svg')} size="xxs" color="#ff5f5f" />*/}
                户籍地址
              </InputItem >
            </List >
            <WhiteSpace size="lg" />
            <div className={styles[`${PrefixCls}-outer-img`]} >
              <div >
                <p >身份证照片</p >
                {this.state.files.length >= 2
                  ?
                  ''
                  :
                  <span onClick={cnTakePhoto.bind(null, this.handlerBeforeCameraClick, 1)} >
                    <Icon type={getLocalIcon('/media/camerawhite.svg')} />
                  </span >}
              </div >
              <ImagePicker
                files={this.state.files}
                onChange={this.onChangeBeforPic.bind(this)}
                onImageClick={(index, fs) => console.log(index, fs)}
                selectable={this.state.files.length < 2}
                multiple={this.state.multiple}
                accept="image/*"
              />
            </div >
            <div className={styles[`${PrefixCls}-outer-img`]} >
              <div >
                <p >其他材料</p >
                {
                  this.state.newFiles.length >= 4
                    ?
                    ''
                    :
                    <span onClick={cnTakePhoto.bind(null, this.handlerAfterCameraClick, 1)} >
                      <Icon type={getLocalIcon('/media/camerawhite.svg')} />
                    </span >
                }
              </div >
              <ImagePicker
                files={this.state.newFiles}
                onChange={this.onChangeAfterPic.bind(this)}
                onImageClick={(index, fs) => console.log(index, fs)}
                selectable={this.state.newFiles.length < 4}
                multiple={this.state.multiple}
                accept="image/*"
              />
            </div >
            <WingBlank >
              <Button type="primary" onClick={this.onSubmit} >提交</Button >
            </WingBlank >
            <WhiteSpace size="lg" />
            <WhiteSpace size="lg" />
          </form >
        </div >
        <ActivityIndicator
          toast
          text="正在上传..."
          animating={animating}
        />
      </div >
    );
  }
}

export default connect(({ loading, fairform }) => ({
  loading,
  fairform,
}))(createForm()(FairForm));


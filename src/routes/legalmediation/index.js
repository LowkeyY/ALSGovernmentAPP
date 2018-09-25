import { Component } from 'react';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import Nav from 'components/nav';
import { DatePicker } from 'antd-mobile';
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
import { getLocalIcon, replaceSystemEmoji, DateChange } from 'utils';
import styles from './index.less';


let legalmediationBaseIndex = 0;
const PrefixCls = 'legalmediation',
  nowTimeStamp = Date.now(),
  now = new Date(nowTimeStamp);
const sex = [
  {
    label: '男',
    value: '0'
  },
  {
    label: '女',
    value: '1'
  },
];


class Legalmediation extends Component {
  constructor (props) {
    super(props);
    this.state = {
      files: [],
      multiple: true,
      date: now
    };
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
  getKey = (name) => `${name && `${name}` || 'legalmediationBaseIndex'}_${legalmediationBaseIndex++}`;
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
        const date = this.state.date;
        const data = {
            ...this.props.form.getFieldsValue(),
            DISPUTE_DATE: DateChange(date)
          },
          { uploadFiles, uploadKey } = this.getUploadFiles(),
          { mediaUploadFile } = this.state;
        console.log(uploadKey);
        this.props.dispatch({
          type: 'legalmediation/sendLegalMediation',
          payload: {
            ...this.changeValue(data),
            images: uploadFiles,
            fileKey: uploadKey,
            mediaFile: mediaUploadFile,
          },
        });
        this.props.dispatch({
          type: 'legalmediation/updateState',
          payload: {
            animating: true,
          },
        });
      } else {
        Toast.fail('请确认信息是否正确。');
      }
    });
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
  getTitle = (title) => {
    return (<div className={styles[`${PrefixCls}-title`]}>
      <span><Icon type={getLocalIcon('/others/information.svg')} /></span>
      <div>{title}</div>
    </div>);
  };
  
  componentWillUnmount () {
  
  }
  
  render () {
    const { name = '' } = this.props.location.query,
      { disputeType, animating, educationType } = this.props.legalmediation;
    
    const { getFieldProps, getFieldError } = this.props.form;
    
    return (
      <div>
        <Nav title={name} dispatch={this.props.dispatch} />
        <div className={styles[`${PrefixCls}-outer`]}>
          <form>
            <div className={styles[`${PrefixCls}-applicant`]}>
              {this.getTitle('申请人信息')}
              <InputItem
                {...getFieldProps('SQ_NAME', {
                  initialValue: '',
                  rules: [{ required: true, message: '姓名必须输入' }
                  ],
                })}
                clear
                placeholder="请输入姓名"
                error={!!getFieldError('SQ_NAME') && Toast.fail(getFieldError('SQ_NAME'))}
              >
                姓名
              </InputItem>
              <List>
                <Picker data={sex}
                        cols={1}
                        {...getFieldProps('SQ_SEX', {
                          rules: [{ required: true, message: '请选择性别' }],
                        })}
                        error={!!getFieldError('SQ_SEX') && Toast.fail(getFieldError('SQ_SEX'))}
                >
                  <List.Item arrow="horizontal">性别</List.Item>
                </Picker>
              </List>
              <InputItem
                {...getFieldProps('SQ_AGE', {
                  initialValue: '',
                  rules: [{ required: true, message: '年龄必须输入' }
                  ],
                })}
                clear
                error={!!getFieldError('SQ_AGE') && Toast.fail(getFieldError('SQ_AGE'))}
                ref={el => this.autoFocusInst = el}
                placeholder="请输入年龄"
              >
                年龄
              </InputItem>
              <List>
                <Picker data={educationType}
                        cols={1}
                        {...getFieldProps('SQ_EDUCATION', {
                          rules: [{ required: true, message: '请选择文化程度' }],
                        })}
                        error={!!getFieldError('SQ_EDUCATION') && Toast.fail(getFieldError('SQ_EDUCATION'))}
                >
                  <List.Item arrow="horizontal">文化程度</List.Item>
                </Picker>
              </List>
              <InputItem
                type="number"
                {...getFieldProps('SQ_PHONE', {
                  initialValue: ''
                })}
                
                placeholder="请输入联系方式"
              >
                联系电话
              </InputItem>
              <List>
                <InputItem
                  type="text"
                  {...getFieldProps('SQ_ADDRESS', {
                    initialValue: ''
                  })}
                  
                  placeholder="请输入家庭住址"
                >
                  家庭住址
                </InputItem>
              </List>
            </div>
            <WhiteSpace />
            <div className={styles[`${PrefixCls}-applicant`]}>
              {this.getTitle('被申请人信息')}
              <InputItem
                {...getFieldProps('BSQ_NAME', {
                  initialValue: '',
                  rules: [{ required: true, message: '姓名必须输入' }
                  ],
                })}
                clear
                placeholder="请输入姓名"
                error={!!getFieldError('BSQ_NAME') && Toast.fail(getFieldError('BSQ_NAME'))}
              >
                姓名
              </InputItem>
              <List>
                <Picker data={sex}
                        cols={1}
                        {...getFieldProps('BSQ_SEX', {
                          rules: [{ required: true, message: '请选择性别' }],
                        })}
                        error={!!getFieldError('BSQ_SEX') && Toast.fail(getFieldError('BSQ_SEX'))}
                >
                  <List.Item arrow="horizontal">性别</List.Item>
                </Picker>
              </List>
              <InputItem
                {...getFieldProps('BSQ_AGE', {
                  initialValue: '',
                  rules: [{ required: true, message: '年龄必须输入' }
                  ],
                })}
                clear
                error={!!getFieldError('BSQ_AGE') && Toast.fail(getFieldError('BSQ_AGE'))}
                ref={el => this.autoFocusInst = el}
                placeholder="请输入年龄"
              >
                年龄
              </InputItem>
              <List>
                <Picker data={educationType}
                        cols={1}
                        {...getFieldProps('BSQ_EDUCATION', {
                          rules: [{ required: true, message: '请选择文化程度' }],
                        })}
                        error={!!getFieldError('BSQ_EDUCATION') && Toast.fail(getFieldError('BSQ_EDUCATION'))}
                >
                  <List.Item arrow="horizontal">文化程度</List.Item>
                </Picker>
              </List>
              <InputItem
                type="number"
                {...getFieldProps('BSQ_PHONE', {
                  initialValue: ''
                })}
                
                placeholder="请输入联系方式"
              >
                联系电话
              </InputItem>
              <List>
                <InputItem
                  type="text"
                  {...getFieldProps('BSQ_ADDRESS', {
                    initialValue: ''
                  })}
                  
                  placeholder="请输入家庭住址"
                >
                  家庭住址
                </InputItem>
              </List>
            </div>
            <WhiteSpace />
            <Picker data={disputeType}
                    cols={1}
                    {...getFieldProps('DISPUTE_TYPE', {
                      rules: [{ required: true, message: '请选择类别' }],
                    })}
                    error={!!getFieldError('disputeType') && Toast.fail(getFieldError('disputeType'))}
            >
              <List.Item arrow="horizontal">纠纷类型</List.Item>
            </Picker>
            <List>
              <InputItem
                type="text"
                {...getFieldProps('DISPUTE_ADDDRESS', {
                  initialValue: ''
                })}
                
                placeholder="请输入地址"
              >
                纠纷地点
              </InputItem>
            </List>
            <DatePicker
              mode="date"
              title="选择日期"
              extra="Optional"
              value={this.state.date}
              onChange={date => this.setState({ date })}
            >
              <List.Item arrow="horizontal">纠纷时间</List.Item>
            </DatePicker>
            <List>0
              <TextareaItem
                {...getFieldProps('DISPUTE_DESCRIBE', {
                  initialValue: '',
                  rules: [{ required: true, message: '请输入纠纷描述' }],
                })}
                clear
                rows={4}
                error={!!getFieldError('DISPUTE_DESCRIBE') && Toast.fail(getFieldError('DISPUTE_DESCRIBE'))}
                count={500}
                placeholder={'请在此描述纠纷'}
              />
            </List>
            <WhiteSpace />
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
            <WhiteSpace />
            <div className={styles[`${PrefixCls}-outer-button`]}>
              <Button type="primary" onClick={this.onSubmit}>提交</Button>
            </div>
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

export default connect(({ loading, legalmediation }) => ({
  loading,
  legalmediation,
}))(createForm()(Legalmediation));


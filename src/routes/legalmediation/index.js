import React, { Component } from 'react';
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
  WingBlank,
} from 'components';
import { getLocalIcon, replaceSystemEmoji, DateChange, pattern } from 'utils';
import styles from './index.less';


let legalmediationBaseIndex = 0;
const PrefixCls = 'legalmediation',
  nowTimeStamp = Date.now(),
  now = new Date(nowTimeStamp);
const sex = [
  {
    label: '男',
    value: '男',
  },
  {
    label: '女',
    value: '女',
  },
];


class Legalmediation extends Component {
  constructor (props) {
    super(props);
    this.state = {
      files: [],
      multiple: true,
      date: now,
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
        const { QI = '', SUMU = '', GACHA = '', DIZHI = '', SQ_QI = '', SQ_SUMU = '', SQ_GACHA = '', SQ_DIZHI = '' } = this.props.form.getFieldsValue();
        const data = {
            ...this.props.form.getFieldsValue(),
            DISPUTE_DATE: DateChange(date),
            SQ_ADDRESS: `${SQ_QI}${SQ_SUMU}${SQ_GACHA}${SQ_DIZHI}`,
            DISPUTE_ADDDRESS: `${QI}${SUMU}${GACHA}${DIZHI}`,
          },
          { uploadFiles, uploadKey } = this.getUploadFiles(),
          { mediaUploadFile } = this.state;
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
    return (
      <div className={styles[`${PrefixCls}-title`]} >
        <span ><Icon type={getLocalIcon('/others/information.svg')} /></span >
        <div >{title}</div >
      </div >
    );
  };


  render () {
    const { name = '' } = this.props.location.query,
      { disputeType, animating, educationType } = this.props.legalmediation;

    const { getFieldProps, getFieldError } = this.props.form;

    return (
      <div >
        <Nav title={name} dispatch={this.props.dispatch} />
        <div className={styles[`${PrefixCls}-outer`]} >
          <form >
            <div className={styles[`${PrefixCls}-applicant`]} >
              {this.getTitle('申请人信息')}
              <InputItem
                {...getFieldProps('SQ_NAME', {
                  initialValue: '',
                  rules: [{ required: true, message: '姓名必须输入' },
                  ],
                })}
                clear
                placeholder="请输入姓名"
                // error={!!getFieldError('SQ_NAME') && Toast.fail(getFieldError('SQ_NAME'))}
                error={!!getFieldError('SQ_NAME')}
                onErrorClick={() => {
                  Toast.fail(getFieldError('SQ_NAME'));
                }}
              >
                <Icon type={getLocalIcon('/others/require.svg')} size="xxs" color="#ff5f5f" />
                姓名
              </InputItem >
              <List >
                <Picker data={sex}
                        cols={1}
                        {...getFieldProps('SQ_SEX', {
                          rules: [{ required: true, message: '请选择性别' }],
                        })}
                  // error={!!getFieldError('SQ_SEX') && Toast.fail(getFieldError('SQ_SEX'))}
                        error={!!getFieldError('SQ_SEX')}
                        onErrorClick={() => {
                          Toast.fail(getFieldError('SQ_SEX'));
                        }}
                >
                  <List.Item arrow="horizontal" >
                    <Icon type={getLocalIcon('/others/require.svg')} size="xxs" color="#ff5f5f" />
                    性别
                  </List.Item >
                </Picker >
              </List >
              <InputItem
                {...getFieldProps('SQ_AGE', {
                  initialValue: '',
                  rules: [
                    { required: true, message: '年龄必须输入' },
                    { pattern: pattern.number.pattern, message: pattern.number.message },
                  ],
                })}
                clear
                error={!!getFieldError('SQ_AGE') && Toast.fail(getFieldError('SQ_AGE'))}
                ref={el => this.autoFocusInst = el}
                placeholder="请输入年龄"
              >
                <Icon type={getLocalIcon('/others/require.svg')} size="xxs" color="#ff5f5f" />
                年龄
              </InputItem >
              <List >
                <InputItem
                  {...getFieldProps('SQ_EDUCATION', {
                    rules: [
                      { required: true, message: '请输入身份证号' },
                      { pattern: pattern.idCard.pattern, message: pattern.idCard.message },
                    ],
                  })}
                  // error={!!getFieldError('SQ_EDUCATION') && Toast.fail(getFieldError('SQ_EDUCATION'))}
                  error={!!getFieldError('SQ_EDUCATION')}
                  onErrorClick={() => {
                    Toast.fail(getFieldError('SQ_EDUCATION'));
                  }}
                >
                  <Icon type={getLocalIcon('/others/require.svg')} size="xxs" color="#ff5f5f" />
                  身份证号
                </InputItem >
              </List >
              <InputItem
                type="number"
                {...getFieldProps('SQ_PHONE', {
                  initialValue: '',
                  rules: [
                    { required: true, message: '请输入联系方式' },
                    { pattern: pattern.phone.pattern, message: pattern.phone.message },
                  ],
                })}
                error={!!getFieldError('SQ_PHONE')}
                onErrorClick={() => {
                  Toast.fail(getFieldError('SQ_PHONE'));
                }}
                placeholder="请输入联系方式"
              >
                <Icon type={getLocalIcon('/others/require.svg')} size="xxs" color="#ff5f5f" />
                联系电话
              </InputItem >
              {/*SQ_ADDRESS*/}
              <List renderHeader={() => '家庭住址(必填)'} >
                <InputItem
                  type="text"
                  {...getFieldProps('SQ_QI', {
                    rules: [{ required: true, message: '请输入地址' }],
                  })}
                  error={!!getFieldError('SQ_QI')}
                  onErrorClick={() => {
                    Toast.fail(getFieldError('SQ_QI'));
                  }}
                >
                  <Icon type={getLocalIcon('/others/require.svg')} size="xxs" color="#ff5f5f" />
                  旗
                </InputItem >
                <InputItem
                  type="text"
                  {...getFieldProps('SQ_SUMU', {
                    rules: [{ required: true, message: '请输入地址' }],
                  })}
                  error={!!getFieldError('SQ_SUMU')}
                  onErrorClick={() => {
                    Toast.fail(getFieldError('SQ_SUMU'));
                  }}
                >
                  <Icon type={getLocalIcon('/others/require.svg')} size="xxs" color="#ff5f5f" />
                  苏木（街道）
                </InputItem >
                <InputItem
                  type="text"
                  {...getFieldProps('SQ_GACHA', {
                    rules: [{ required: true, message: '请输入地址' }],
                  })}
                  error={!!getFieldError('SQ_GACHA')}
                  onErrorClick={() => {
                    Toast.fail(getFieldError('SQ_GACHA'));
                  }}
                >
                  <Icon type={getLocalIcon('/others/require.svg')} size="xxs" color="#ff5f5f" />
                  嘎查（社区）
                </InputItem >
                <InputItem
                  type="text"
                  {...getFieldProps('SQ_DIZHI', {
                    rules: [{ required: true, message: '请输入地址' }],
                  })}
                  error={!!getFieldError('SQ_DIZHI')}
                  onErrorClick={() => {
                    Toast.fail(getFieldError('SQ_DIZHI'));
                  }}
                >
                  <Icon type={getLocalIcon('/others/require.svg')} size="xxs" color="#ff5f5f" />
                  详细地址
                </InputItem >
              </List >
            </div >
            <WhiteSpace />
            <div className={styles[`${PrefixCls}-applicant`]} >
              {this.getTitle('被申请人信息')}
              <InputItem
                {...getFieldProps('BSQ_NAME', {
                  initialValue: '',
                  rules: [{ required: true, message: '姓名必须输入' },
                  ],
                })}
                clear
                placeholder="请输入姓名"
                // error={!!getFieldError('BSQ_NAME') && Toast.fail(getFieldError('BSQ_NAME'))}
                error={!!getFieldError('BSQ_NAME')}
                onErrorClick={() => {
                  Toast.fail(getFieldError('BSQ_NAME'));
                }}
              >
                <Icon type={getLocalIcon('/others/require.svg')} size="xxs" color="#ff5f5f" />
                姓名
              </InputItem >
              <List >
                <Picker
                  data={sex}
                  cols={1}
                  {...getFieldProps('BSQ_SEX')}
                >
                  <List.Item arrow="horizontal" >性别</List.Item >
                </Picker >
              </List >
              <InputItem
                {...getFieldProps('BSQ_AGE')}
                clear
                ref={el => this.autoFocusInst = el}
                placeholder="请输入年龄"
              >
                年龄
              </InputItem >
              <List >
                <InputItem
                  {...getFieldProps('BSQ_EDUCATION')}
                >
                  身份证号
                </InputItem >
              </List >
              <InputItem
                type="number"
                {...getFieldProps('BSQ_PHONE')}
                placeholder="请输入联系方式"
              >
                联系电话
              </InputItem >
              {/*BSQ_ADDRESS*/}
              <List >
                <InputItem
                  type="text"
                  {...getFieldProps('BSQ_ADDRESS', {
                    initialValue: '',
                  })}
                  error={!!getFieldError('BSQ_ADDRESS')}
                  onErrorClick={() => {
                    Toast.fail(getFieldError('BSQ_ADDRESS'));
                  }}
                >
                  家庭住址
                </InputItem >
              </List >
            </div >
            <WhiteSpace />
            <Picker
              data={disputeType}
              cols={1}
              {...getFieldProps('DISPUTE_TYPE', {
                rules: [{ required: true, message: '请选择类别' }],
              })}
              error={!!getFieldError('disputeType') && Toast.fail(getFieldError('disputeType'))}
            >
              <List.Item arrow="horizontal" >
                <Icon type={getLocalIcon('/others/require.svg')} size="xxs" color="#ff5f5f" />
                纠纷类型
              </List.Item >
            </Picker >
            {/*DISPUTE_ADDDRESS*/}
            <List renderHeader={() => '纠纷地点(必填)'} >
              <InputItem
                type="text"
                {...getFieldProps('QI', {
                  rules: [{ required: true, message: '请输入地址' }],
                })}
                error={!!getFieldError('QI')}
                onErrorClick={() => {
                  Toast.fail(getFieldError('QI'));
                }}
              >
                <Icon type={getLocalIcon('/others/require.svg')} size="xxs" color="#ff5f5f" />
                旗
              </InputItem >
              <InputItem
                type="text"
                {...getFieldProps('SUMU', {
                  rules: [{ required: true, message: '请输入地址' }],
                })}
                error={!!getFieldError('SUMU')}
                onErrorClick={() => {
                  Toast.fail(getFieldError('SUMU'));
                }}
              >
                <Icon type={getLocalIcon('/others/require.svg')} size="xxs" color="#ff5f5f" />
                苏木（街道）
              </InputItem >
              <InputItem
                type="text"
                {...getFieldProps('GACHA', {
                  rules: [{ required: true, message: '请输入地址' }],
                })}
                error={!!getFieldError('GACHA')}
                onErrorClick={() => {
                  Toast.fail(getFieldError('GACHA'));
                }}
              >
                <Icon type={getLocalIcon('/others/require.svg')} size="xxs" color="#ff5f5f" />
                嘎查（社区）
              </InputItem >
              <InputItem
                type="text"
                {...getFieldProps('DIZHI', {
                  rules: [{ required: true, message: '请输入地址' }],
                })}
                error={!!getFieldError('DIZHI')}
                onErrorClick={() => {
                  Toast.fail(getFieldError('DIZHI'));
                }}
              >
                <Icon type={getLocalIcon('/others/require.svg')} size="xxs" color="#ff5f5f" />
                详细地址
              </InputItem >
            </List >
            <DatePicker
              mode="date"
              title="选择日期"
              extra="Optional"
              value={this.state.date}
              onChange={date => this.setState({ date })}
            >
              <List.Item arrow="horizontal" >
                <Icon type={getLocalIcon('/others/require.svg')} size="xxs" color="#ff5f5f" />
                纠纷时间
              </List.Item >
            </DatePicker >
            <List >
              <TextareaItem
                {...getFieldProps('DISPUTE_DESCRIBE', {
                  initialValue: '',
                  rules: [{ required: true, message: '请输入纠纷描述' }],
                })}
                clear
                rows={6}
                // error={!!getFieldError('DISPUTE_DESCRIBE') && Toast.fail(getFieldError('DISPUTE_DESCRIBE'))}
                error={!!getFieldError('DISPUTE_DESCRIBE')}
                onErrorClick={() => {
                  Toast.fail(getFieldError('DISPUTE_DESCRIBE'));
                }}
                count={500}
                placeholder={'请在此描述纠纷(必填)'}
              />
            </List >
            <WhiteSpace />
            <div className={styles[`${PrefixCls}-outer-img`]} >
              <div >
                <p >添加图片</p >
                {this.state.files.length >= 4 ? '' : <span onClick={cnTakePhoto.bind(null, this.handleCameraClick, 1)} >
                  <Icon type={getLocalIcon('/media/camerawhite.svg')} />
                </span >}
              </div >
              <ImagePicker
                files={this.state.files}
                onChange={this.onChange}
                onImageClick={(index, fs) => console.log(index, fs)}
                selectable={this.state.files.length < 4}
                multiple={this.state.multiple}
                accept="image/*"
              />
            </div >
            <WhiteSpace />
            <WingBlank >
              <Button type="primary" onClick={this.onSubmit} >提交</Button >
            </WingBlank >
          </form >
          <WhiteSpace size="lg" />
          <WhiteSpace size="lg" />
        </div >
        <ActivityIndicator
          toast
          text='正在上传...'
          animating={animating}
        />
      </div >
    )
  }
}

export default connect(({ loading, legalmediation }) => ({
  loading,
  legalmediation,
}))(createForm()(Legalmediation))


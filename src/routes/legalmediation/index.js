import { Component } from 'react'
import { createForm } from 'rc-form'
import { connect } from 'dva'
import Nav from 'components/nav'
import { routerRedux } from 'dva/router'
import { DatePicker } from 'antd-mobile';
import VociePrev from 'components/voicePrev'
import NotesModal from 'components/notesmodal'
import classNames from 'classnames'
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
} from 'components'
import { getLocalIcon ,replaceSystemEmoji,pattern} from 'utils'
import styles from './index.less'


let legalmediationBaseIndex = 0
const PrefixCls = 'legalmediation', nowTimeStamp = Date.now(),now = new Date(nowTimeStamp);
const sex = [
  {
    label:'男',
    value:'0'
  },
  {
    label:'女',
    value:'1'
  },
],
  education = [
    {
      label:'博士',
      value:'doctor'
    }
    ,{
      label:'研究生',
      value:'graduate'
    }
    ,{
      label:'大学本科',
      value:'undergraduate'
    }
    ,{
      label:'大学专科',
      value:'specialty'
    }
    ,{
      label:'中等专业学校',
      value:'graduate1'
    }
    ,{
      label:'技工学校',
      value:'gr2adu1ate'
    }
    ,{
      label:'高中',
      value:'grad11uate'
    }
    ,{
      label:'初中',
      value:'grad1uate'
    }
    ,{
      label:'小学',
      value:'gr1ad2uate'
    }
    ,{
      label:'其他',
      value:'grad2uate'
    }
  ]
class Legalmediation extends Component {

  constructor (props) {
    super(props)
    this.state = {
      files: [],
      multiple: true,
      date: now
    }
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
  getKey = (name) => (name && `${name}` || 'legalmediationBaseIndex') + `_${legalmediationBaseIndex++}`
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

  changeValue = (obj) => {
    for (let i in obj){
      if (typeof (obj[i])==='string'){
        obj[i]=replaceSystemEmoji(obj[i])
      }
    }
    return obj
  }
  onSubmit = () => {
    this.props.form.validateFields({
      force: true,
    }, (error) => {
      if (!error) {
        const data = {
            ...this.props.form.getFieldsValue(),
          }, { uploadFiles, uploadKey } = this.getUploadFiles(),
          { mediaUploadFile } = this.state
        this.props.dispatch({
          type: 'legalmediation/sendAppealInfo',
          payload: {
            ...this.changeValue(data),
            images: uploadFiles,
            fileKey: uploadKey,
            mediaFile: mediaUploadFile,
          },
        })
        this.props.dispatch({
          type: 'legalmediation/updateState',
          payload: {
            animating: true,
          },
        })
      } else {
        Toast.fail('请确认信息是否正确。')
      }
    })
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
  getTitle = (title) => {
    return <div className={styles[`${PrefixCls}-title`]}>
      <span><Icon type={getLocalIcon('/others/information.svg')}/></span>
      <div>{title}</div>
    </div>
  }
  componentWillUnmount () {

  }

  render () {
    const { name = '' } = this.props.location.query, { appealType, animating, location,content} = this.props.legalmediation

    const { getFieldProps, getFieldError } = this.props.form

    return (
      <div>
        <Nav title={name} dispatch={this.props.dispatch}/>
        <div className={styles[`${PrefixCls}-outer`]}>
          <form>
            <div className={styles[`${PrefixCls}-applicant`]}>
              {this.getTitle('申请人信息')}
                <InputItem
                  {...getFieldProps('applicantName', {
                    initialValue: '',
                    rules: [{ required: true, message: '姓名必须输入' }
                    ],
                  })}
                  clear
                  placeholder="请输入姓名"
                  error={!!getFieldError('applicantName') && Toast.fail(getFieldError('applicantName'))}
                  ref={el => this.autoFocusInst = el}
                >
                  姓名
                </InputItem>
              <List>
                <Picker data={sex} cols={1} {...getFieldProps('applicantSex', {
                  rules: [{ required: true,message: '请选择性别' }],
                })}
                  error={!!getFieldError('applicantSex') && Toast.fail(getFieldError('applicantSex'))}
                >
                  <List.Item arrow="horizontal">性别</List.Item>
                </Picker>
              </List>
                <InputItem
                  {...getFieldProps('applicantAge', {
                    initialValue: '',
                    rules: [{ required: true, message: '年龄必须输入' }
                    ],
                  })}
                  clear
                  error={!!getFieldError('applicantAge') && Toast.fail(getFieldError('applicantAge'))}
                  ref={el => this.autoFocusInst = el}
                  placeholder="请输入年龄"
                >
                  年龄
                </InputItem>
              <List>
              <Picker data={education} cols={1} {...getFieldProps('applicantducation', {
                rules: [{ required: true,message: '请选择性别' }],
              })}
                      error={!!getFieldError('E') && Toast.fail(getFieldError('applicantSex'))}
              >
                <List.Item arrow="horizontal">文化程度</List.Item>
              </Picker>
              </List>
                <InputItem
                  type='number'
                  {...getFieldProps('applicantPhone', {
                    initialValue: ''
                  })}

                  placeholder="请输入联系方式"
                >
                  联系电话
                </InputItem>
            <List>
              <InputItem
                type='number'
                {...getFieldProps('applicantPhone', {
                  initialValue: ''
                })}

                placeholder="请输入家庭住址"
              >
                家庭住址
              </InputItem>
            </List>
            </div>
            <WhiteSpace/>
            <div className={styles[`${PrefixCls}-applicant`]}>
              {this.getTitle('被申请人信息')}
              <InputItem
                {...getFieldProps('applicantName', {
                  initialValue: '',
                  rules: [{ required: true, message: '姓名必须输入' }
                  ],
                })}
                clear
                placeholder="请输入姓名"
                error={!!getFieldError('applicantName') && Toast.fail(getFieldError('applicantName'))}
                ref={el => this.autoFocusInst = el}
              >
                姓名
              </InputItem>
              <List>
                <Picker data={sex} cols={1} {...getFieldProps('applicantSex', {
                  rules: [{ required: true,message: '请选择性别' }],
                })}
                        error={!!getFieldError('applicantSex') && Toast.fail(getFieldError('applicantSex'))}
                >
                  <List.Item arrow="horizontal">性别</List.Item>
                </Picker>
              </List>
              <InputItem
                {...getFieldProps('applicantAge', {
                  initialValue: '',
                  rules: [{ required: true, message: '年龄必须输入' }
                  ],
                })}
                clear
                error={!!getFieldError('applicantAge') && Toast.fail(getFieldError('applicantAge'))}
                ref={el => this.autoFocusInst = el}
                placeholder="请输入年龄"
              >
                年龄
              </InputItem>
              <List>
                <Picker data={education} cols={1} {...getFieldProps('applicantducation', {
                  rules: [{ required: true,message: '请选择性别' }],
                })}
                        error={!!getFieldError('E') && Toast.fail(getFieldError('applicantSex'))}
                >
                  <List.Item arrow="horizontal">文化程度</List.Item>
                </Picker>
              </List>
              <InputItem
                type='number'
                {...getFieldProps('applicantPhone', {
                  initialValue: ''
                })}

                placeholder="请输入联系方式"
              >
                联系电话
              </InputItem>
              <List>
                <InputItem
                  type='number'
                  {...getFieldProps('applicantPhone', {
                    initialValue: ''
                  })}

                  placeholder="请输入家庭住址"
                >
                  家庭住址
                </InputItem>
              </List>
            </div>
            <WhiteSpace/>
            <Picker data={education} cols={1} {...getFieldProps('applicantducation', {
              rules: [{ required: true,message: '请选择性别' }],
            })}
                    error={!!getFieldError('E') && Toast.fail(getFieldError('applicantSex'))}
            >
              <List.Item arrow="horizontal">纠纷类型</List.Item>
            </Picker>
            <List>
              <Picker data={education} cols={1} {...getFieldProps('applicantducation', {
                rules: [{ required: true,message: '请选择性别' }],
              })}
                      error={!!getFieldError('E') && Toast.fail(getFieldError('applicantSex'))}
              >
                <List.Item arrow="horizontal">纠纷地点</List.Item>
              </Picker>
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
            <List>
              <TextareaItem
                {...getFieldProps('textinfo', {
                  initialValue: '',
                  rules: [{ required: true, message: '请输入纠纷描述' }],
                })}
                clear
                rows={4}
                error={!!getFieldError('textinfo') && Toast.fail(getFieldError('textinfo'))}
                count={500}
                placeholder={'请在此描述纠纷'}
              />
            </List>
            <WhiteSpace/>
            <div className={styles[`${PrefixCls}-outer-img`]}>
              <div>
                <p>添加图片</p>
                {this.state.files.length >= 4 ? '' : <span onClick={cnTakePhoto.bind(null, this.handleCameraClick, 1)}>
                  <Icon type={getLocalIcon('/media/camerawhite.svg')}/>
                </span>}
              </div>
              <ImagePicker
                files={this.state.files}
                onChange={this.onChange}
                onImageClick={(index, fs) => console.log(index, fs)}
                selectable={this.state.files.length < 4}
                multiple={this.state.multiple}
                accept='image/*'
              />
            </div>
            <WhiteSpace/>
            <div className={styles[`${PrefixCls}-outer-button`]}>
              <Button type="primary" onClick={this.onSubmit}>提交</Button>
            </div>
          </form>
        </div>
        <ActivityIndicator
          toast
          text='正在上传...'
          animating={animating}
        />
      </div>
    )
  }
}

export default connect(({ loading, legalmediation }) => ({
  loading,
  legalmediation,
}))(createForm()(Legalmediation))



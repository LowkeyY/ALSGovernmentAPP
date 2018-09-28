import { Component } from 'react';
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
  ActivityIndicator,
} from 'components';
import { getLocalIcon, replaceSystemEmoji } from 'utils';
import styles from './index.less';

const PrefixCls = 'tasktable';
let taskTableBaseIndex = 0;

class TaskTable extends Component {
  constructor (props) {
    super(props);
    this.state = {
      files: [],
      multiple: true,
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
  getKey = (name) => `${name && `${name}` || 'taskTableBaseIndex'}_${taskTableBaseIndex++}`;
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
  onSubmit = (workId, flowId, taskId) => {
    this.props.form.validateFields({
      force: true,
    }, (error) => {
      if (!error) {
        const data = {
            ...this.props.form.getFieldsValue(),
            workId,
            flowId,
            taskId
          },
          { uploadFiles, uploadKey } = this.getUploadFiles();
        console.log(data);
        this.props.dispatch({
          type: 'tasktable/sendTaskTable',
          payload: {
            ...this.changeValue(data),
            images: uploadFiles,
            fileKey: uploadKey,
          },
        });
        this.props.dispatch({
          type: 'tasktable/updateState',
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
  
  
  render () {
    const { name = '提交表单', workId = '', flowId = '', taskId = '' } = this.props.location.query,
      { animating } = this.props.tasktable;
    const { getFieldProps, getFieldError } = this.props.form,
      handleCameraClick = (blob, dataUrl) => {
        const { files } = this.state;
        files.push({ file: blob, url: this.dataUrlToImageSrc(dataUrl) });
        this.setState({
          files,
        });
      };
    return (
      <div>
        <Nav title={name} dispatch={this.props.dispatch} />
        <div className={styles[`${PrefixCls}-outer`]}>
          <form>
            <div className={styles[`${PrefixCls}-outer-type`]}>
              <InputItem
                {...getFieldProps('manager', {
                  initialValue: '',
                  rules: [{ required: true, message: '负责人必须输入' },
                  ],
                })}
                clear
                error={!!getFieldError('manager') && Toast.fail(getFieldError('manager'))}
                placeholder="负责人"
              >
                负责人
              </InputItem>
            </div>
            <List.Item className={styles[`${PrefixCls}-outer-content`]}>
              <TextareaItem
                {...getFieldProps('results', {
                  initialValue: '',
                  rules: [{ required: true, message: '请输入提交结果' }],
                })}
                clear
                rows={9}
                error={!!getFieldError('results') && Toast.fail(getFieldError('results'))}
                count={1000}
                placeholder={'在此输入提交结果'}
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
            <Button type="primary" onClick={this.onSubmit.bind(this, workId, flowId, taskId)}>提交</Button>
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

export default connect(({ loading, tasktable }) => ({
  loading,
  tasktable,
}))(createForm()(TaskTable));


import { Component } from 'react';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import Nav from 'components/nav';
import { routerRedux } from 'dva/router';
import classNames from 'classnames';
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

const PrefixCls = 'communityjoin';
let warringBaseIndex = 0;

class CommunityJoin extends Component {
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
      if (data.file && !reg.test(data.file.type)) {
        Toast.fail('这不是图片哟！！！', 2);
      } else {
        result.push(data);
      }
    });
    this.props.dispatch({
      type: `${PrefixCls}/updateState`,
      payload: {
        imgs: result,
      },
    });
  };
  getKey = (name) => `${name && `${name}` || 'warringBaseIndex'}_${warringBaseIndex++}`;
  getUploadFiles = (imgs) => {
    const uploadFiles = {},
      uploadKey = [];
    imgs.map((file, i) => {
      let key = this.getKey(`file_${i}`);
      if (file.file) {
        uploadKey.push(key);
        uploadFiles[key] = file.file;
      }
    });
    return {
      uploadFiles,
      uploadKey: uploadKey.join(','),
    };
  };
  getDefaultImgs = (imgs) => {
    let fileContents = [];
    imgs.map((file, i) => {
      if (!file.file) {
        fileContents.push(file.url);
      }
    });
    return fileContents.length > 0 ? fileContents.join(',') : '';
  };

  changeValue = (obj) => {
    for (let i in obj) {
      if (typeof (obj[i]) === 'string') {
        obj[i] = replaceSystemEmoji(obj[i]);
      }
    }
    return obj;
  };
  onSubmit = (imgs, bmid) => {
    this.props.form.validateFields({
      force: true,
    }, (error) => {
      if (!error) {
        const fileContents = this.getDefaultImgs(imgs);
        const data = {
            ...this.props.form.getFieldsValue(),
            bmid,
            fileContents,
          },
          { uploadFiles, uploadKey } = this.getUploadFiles(imgs);
        this.props.dispatch({
          type: 'communityjoin/sendJoinCommunity',
          payload: {
            ...this.changeValue(data),
            images: uploadFiles,
            fileKey: uploadKey,
          },
        });
        this.props.dispatch({
          type: 'communityjoin/updateState',
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
    const { name = '', bmid = '' } = this.props.location.query,
      { animating, wcqk, imgFile = [], szzzb, imgs = [] } = this.props.communityjoin;
    const { getFieldProps, getFieldError } = this.props.form,
      handleCameraClick = (blob, dataUrl) => {
        imgFile.push({ file: blob, url: dataUrlToImageSrc(dataUrl) });
        this.props.dispatch({
          type: `${PrefixCls}/updateState`,
          payload: {
            imgs,
          },
        });
      };
    return (
      <div>
        <Nav title={name} dispatch={this.props.dispatch}/>
        <div className={styles[`${PrefixCls}-outer`]}>
          <form>
            <div className={styles[`${PrefixCls}-outer-type`]}>
              <InputItem
                {...getFieldProps('szzzb', {
                  initialValue: szzzb,
                  rules: [{ required: true, message: '所在部门必须输入' },
                  ],
                })}
                clear
                error={!!getFieldError('szzzb') && Toast.fail(getFieldError('szzzb'))}
                placeholder="组织部门"
              >
                所在部门
              </InputItem>
            </div>
            <List.Item className={styles[`${PrefixCls}-outer-content`]}>
              <TextareaItem
                {...getFieldProps('wcqk', {
                  initialValue: wcqk,
                  rules: [{ required: true, message: '请输入完成情况' }],
                })}
                clear
                rows={9}
                error={!!getFieldError('wcqk') && Toast.fail(getFieldError('wcqk'))}
                count={1000}
                placeholder={'在此输入完成情况'}
              />
            </List.Item>
            <div className={styles[`${PrefixCls}-outer-img`]}>
              <div>
                <p>添加图片</p>
                <span onClick={cnTakePhoto.bind(null, handleCameraClick, 1)}>
                  <Icon type={getLocalIcon('/media/camerawhite.svg')}/>
                </span>
              </div>
              <ImagePicker
                files={imgs}
                onChange={this.onChange}
                onImageClick={(index, fs) => console.log(index, fs)}
                multiple={this.state.multiple}
                accept="image/*"
              />
            </div>
            <Button type="primary" onClick={this.onSubmit.bind(this, imgs, bmid)}>提交</Button>
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

export default connect(({ loading, communityjoin }) => ({
  loading,
  communityjoin,
}))(createForm()(CommunityJoin));


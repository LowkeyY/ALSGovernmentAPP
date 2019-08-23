/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'dva';
import Nav from 'components/nav';
import {
  List,
  ImagePicker,
  Button,
  WhiteSpace,
  Toast,
  Icon,
  Picker,
  ActivityIndicator,
  WingBlank,
} from 'components';
import { getLocalIcon, getTitle } from 'utils';
import { baseURL } from 'utils/config';
import WxImageViewer from 'react-wx-images-viewer';
import styles from './index.less';

const PrefixCls = 'fairdetails';
let fairIndex = 0;

class FairDetails extends Component {
  constructor (props) {
    super(props);
    this.state = {
      files: [],
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

  onSubmit = () => {
    const { YUYUEID = '', FUJIAN = '' } = this.getDetails(),
      { uploadFiles, uploadKey } = this.getUploadFiles();
    if (uploadKey.length > 0) {
      const data = {
        YUYUEID,
        FUJIAN,
      };
      this.props.dispatch({
        type: 'fairdetails/sendFairService',
        payload: {
          ...data,
          images: uploadFiles,
          fileKey: uploadKey,
        },
      });
      this.props.dispatch({
        type: 'fairdetails/updateState',
        payload: {
          animating: true,
        },
      });
    } else if (uploadKey.length === 0) {
      Toast.fail('请上传补充材料。');
    }
  };

  getKey = (name) => `${name && `${name}` || 'fairKey'}_${fairIndex++}`;
  getUploadFiles = () => {
    const uploadFiles = {},
      uploadKey = [];
    const fileLists = [...this.state.files];
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

  dataUrlToImageSrc = (dataUrl) => {
    let imageHeader = 'data:image/jpeg;base64,';
    if (dataUrl && !dataUrl.startsWith(imageHeader)) {
      return `${imageHeader}${dataUrl}`;
    }
    return dataUrl;
  };

  getDetails = () => {
    const { dataList } = this.props.fairlist;
    const { id = '' } = this.props.location.query;
    return (cnIsArray(dataList) && dataList.find(item => item.SHIXIANGID === id));
  };

  handleDivClick = (e) => {
    const { FUJIAN = '' } = this.getDetails();
    if (e.target.className === 'imgbox') {
      let src = e.target.dataset.src,
        curImageIndex = FUJIAN.split(',')
          .indexOf(src);
      if (src) {
        this.props.dispatch({
          type: `${PrefixCls}/updateState`,
          payload: {
            isOpen: true,
            viewImageIndex: curImageIndex < 0 ? 0 : curImageIndex,
          },
        });
      }
    }
  };

  onViemImageClose = () => {
    this.props.dispatch({
      type: `${PrefixCls}/updateState`,
      payload: {
        isOpen: false,
      },
    });
  };

  getShstate = (text) => {
    if (text === '未审核') {
      return <span style={{ color: '#cc2020' }}>{`●${text}`}</span>;
    } else if (text === '审核通过') {
      return <span style={{ color: '#00cf04' }}>{`●${text}`}</span>;
    } else if (text === '审核未通过') {
      return <span style={{ color: '#a2a699' }}>{`●${text}`}</span>;
    } else if (text === '补充材料') {
      return <span style={{ color: '#cfc603' }}>{`●${text}`}</span>;
    }
  };

  getImagesPage = (image) => {
    if (cnIsArray(image) && image.length) {
      return (
        <div className={styles[`${PrefixCls}-content-images`]} onClick={this.handleDivClick}>
          {image.map((src, i) => (
            <div
              key={i}
              data-src={src}
              className="imgbox"
              style={{ backgroundImage: `url(${baseURL}/${src})` }}
            />
          ))}
        </div>
      );
    }
    return '';
  };

  getUrls = (img) => {
    const imgs = img.split(','),
      result = [];
    if (imgs.length > 0) {
      imgs.map(items => {
        result.push(`${baseURL}/${items}`);
      });

      return result;
    }
    return [];
  };


  render () {
    const { name = '我的预约' } = this.props.location.query,
      { animating, isOpen, viewImageIndex } = this.props.fairdetails,
      { AUDIT_STATE = '', CRATE_DATE = '', HUJIDIZHI = '', FUJIAN = '', SHIXIANGMINGCHENG = '', SHOUJIHAOMA = '', ZHENGJIANHAOMA = '', ZHENGJIANLEIXING = '', AUDIT_INFO = '', XINGMING = '', XINGBIE = '' } = this.getDetails(),

      handlerBeforeCameraClick = (blob, dataUrl) => {
        const { files } = this.state;
        files.push({ file: blob, url: this.dataUrlToImageSrc(dataUrl) });
        this.setState({
          files,
        });
      };
    return (
      <div>
        <Nav title={getTitle(name)} dispatch={this.props.dispatch} />
        <div className={styles[`${PrefixCls}-outer`]}>
          <div className={styles[`${PrefixCls}-outer-content`]}>
            <div className={styles[`${PrefixCls}-outer-content-title`]}>{SHIXIANGMINGCHENG}</div>
            <div className={styles[`${PrefixCls}-outer-content-info`]}>
              <div>{this.getShstate(AUDIT_STATE)}</div>
              <div>{CRATE_DATE}</div>
            </div>
            <List className={styles.list}>
              <List.Item extra={XINGMING}>姓名</List.Item>
              <List.Item extra={XINGBIE}>性别</List.Item>
              <List.Item extra={SHOUJIHAOMA}>手机号码</List.Item>
              <List.Item extra={ZHENGJIANLEIXING}>证件类型</List.Item>
              <List.Item extra={ZHENGJIANHAOMA}>证件号码</List.Item>
              <div className={styles.address}>户籍地址：
                <div>{HUJIDIZHI === '' ? '未填写' : HUJIDIZHI}</div>
              </div>
            </List>
            {this.getImagesPage(FUJIAN.split(','))}
          </div>
          {
            AUDIT_STATE === '补充材料' ?
              <form>
                <WhiteSpace size="lg" />
                <div className={styles[`${PrefixCls}-outer-img`]}>
                  <div>
                    <p>补充材料</p>
                    {this.state.files.length >= 2
                      ?
                      ''
                      :
                      <span onClick={cnTakePhoto.bind(null, handlerBeforeCameraClick, 1)}>
                    <Icon type={getLocalIcon('/media/camerawhite.svg')} />
                  </span>}
                  </div>
                  {
                    AUDIT_INFO !== '' ?
                      <div className={styles[`${PrefixCls}-outer-img-info`]}>
                        <div>补充说明：</div>
                        <div>{AUDIT_INFO}</div>
                      </div>
                      :
                      null
                  }
                  <ImagePicker
                    files={this.state.files}
                    onChange={this.onChangeBeforPic.bind(this)}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={this.state.files.length < 2}
                    multiple={this.state.multiple}
                    accept="image/*"
                  />
                </div>
                <WingBlank>
                  <Button type="primary" onClick={this.onSubmit}>提交</Button>
                </WingBlank>
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
              </form>
              :
              null
          }
        </div>
        <ActivityIndicator
          toast
          text="正在上传..."
          animating={animating}
        />
        {
          isOpen && viewImageIndex !== -1 ?
            <WxImageViewer onClose={this.onViemImageClose} urls={this.getUrls(FUJIAN)} index={viewImageIndex} /> : ''
        }
      </div>
    );
  }
}

export default connect(({ loading, fairlist, fairdetails }) => ({
  loading,
  fairlist,
  fairdetails,
}))(FairDetails);


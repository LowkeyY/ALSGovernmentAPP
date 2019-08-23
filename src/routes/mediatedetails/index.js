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
  Card,
} from 'components';
import { getLocalIcon, getTitle, pattern } from 'utils';
import { baseURL } from 'utils/config';
import WxImageViewer from 'react-wx-images-viewer';
import styles from './index.less';

const PrefixCls = 'mediatedetails';
let legalmediationBaseIndex = 0;

class MediateDetails extends Component {
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
    const { ID = '', FILE_PATH = '' } = this.getDetails(),
      { uploadFiles, uploadKey } = this.getUploadFiles();
    if (uploadKey.length > 0) {
      const data = {
        ID,
        FILE_PATH,
      };
      this.props.dispatch({
        type: 'mediatedetails/sendMediateService',
        payload: {
          ...data,
          images: uploadFiles,
          fileKey: uploadKey,
        },
      });
      this.props.dispatch({
        type: 'mediatedetails/updateState',
        payload: {
          animating: true,
        },
      });
    } else if (uploadKey.length === 0) {
      Toast.fail('请上传补充材料。');
    }
  };

  getKey = (name) => `${name && `${name}` || 'legalmediationBaseIndex'}_${legalmediationBaseIndex++}`;
  getUploadFiles = () => {
    const uploadFiles = {},
      uploadKey = [];
    const fileLists = [...this.state.files];
    fileLists.map((file, i) => {
      if (file.file) {
        let key = this.getKey('file_');
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

  getDetails = () => {
    const { dataList } = this.props.mediatelist;
    const { id = '' } = this.props.location.query;
    return (cnIsArray(dataList) && dataList.find(item => item.ID === id));
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
        <Card>
          <Card.Header
            title='附件'
            thumb={<Icon type={getLocalIcon('/others/information.svg')} style={{ marginRight: '6px' }} />}
          />
          <Card.Body>
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
          </Card.Body>
        </Card>
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
    const { name = '我的调解' } = this.props.location.query,
      { animating, isOpen, viewImageIndex } = this.props.mediatedetails,
      {
        AUDIT_STATE = '', BSQ_ADDRESS = '', BSQ_AGE = '', BSQ_EDUCATION = '', BSQ_NAME = '', BSQ_PHONE = '', BSQ_SEX = '', DISPUTE_ADDDRESS = '', AUDIT_INFO = '', DISPUTE_DATE = '', DISPUTE_DESCRIBE = '', FILE_PATH = '', SQ_ADDRESS = '', SQ_AGE = '', SQ_EDUCATION = '', SQ_NAME = '', SQ_PHONE = '', SQ_SEX = '', TYPENAME = '',
      } = this.getDetails(),

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
          <WingBlank>
            <WhiteSpace size="lg" />
            <Card>
              <Card.Header
                title="申请人信息"
                thumb={<Icon type={getLocalIcon('/others/information.svg')} style={{ marginRight: '6px' }} />}
                extra={<span>{this.getShstate(AUDIT_STATE)}</span>}
              />
              <Card.Body>
                <List className={styles.list}>
                  <List.Item extra={SQ_NAME}>姓名</List.Item>
                  <List.Item extra={SQ_SEX === '0' ? '男' : '女'}>性别</List.Item>
                  <List.Item extra={SQ_AGE}>年龄</List.Item>
                  <List.Item extra={SQ_EDUCATION}>身份证号</List.Item>
                  <List.Item extra={SQ_PHONE}>联系电话</List.Item>
                  <div className={styles.address}>户籍地址：
                    <div>{SQ_ADDRESS === '' ? '未填写' : SQ_ADDRESS}</div>
                  </div>
                </List>
              </Card.Body>
            </Card>
            <WhiteSpace size="lg" />
            <Card>
              <Card.Header
                title="被申请人信息"
                thumb={<Icon type={getLocalIcon('/others/information.svg')} style={{ marginRight: '6px' }} />}
              />
              <Card.Body>
                <List className={styles.list}>
                  <List.Item extra={BSQ_NAME}>姓名</List.Item>
                  <List.Item extra={BSQ_SEX === '0' ? '男' : '女'}>性别</List.Item>
                  <List.Item extra={BSQ_AGE === 'undefined' ? '未填写' : BSQ_AGE}>年龄</List.Item>
                  <List.Item extra={BSQ_EDUCATION === 'undefined' ? '未填写' : BSQ_EDUCATION}>身份证号</List.Item>
                  <List.Item extra={BSQ_PHONE === 'undefined' ? '未填写' : BSQ_PHONE}>联系电话</List.Item>
                  <div className={styles.address}>户籍地址：
                    <div>{BSQ_ADDRESS === '' ? '未填写' : BSQ_ADDRESS}</div>
                  </div>
                </List>
              </Card.Body>
            </Card>
            <WhiteSpace size="lg" />
            <Card>
              <Card.Header
                title="纠纷概述"
                thumb={<Icon type={getLocalIcon('/others/information.svg')} style={{ marginRight: '6px' }} />}
              />
              <Card.Body>
                <List className={styles.list}>
                  <List.Item extra={TYPENAME}>纠纷类型</List.Item>
                  <div className={styles.address}>纠纷地点：
                    <div>{DISPUTE_ADDDRESS === '' ? '未填写' : DISPUTE_ADDDRESS}</div>
                  </div>
                  <List.Item extra={DISPUTE_DATE}>纠纷时间</List.Item>
                  <div className={styles.address}>纠纷概述：
                    <div>{DISPUTE_DESCRIBE === '' ? '未填写' : DISPUTE_DESCRIBE}</div>
                  </div>
                </List>
              </Card.Body>
            </Card>
          </WingBlank>
          <div className={styles[`${PrefixCls}-content`]}>
            <WhiteSpace size="lg" />
            {FILE_PATH !== '' ? this.getImagesPage(FILE_PATH.split(',')) : null}
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
            <WxImageViewer onClose={this.onViemImageClose} urls={this.getUrls(FILE_PATH)} index={viewImageIndex} /> : ''
        }
      </div>
    );
  }
}

export default connect(({ loading, mediatelist, mediatedetails }) => ({
  loading,
  mediatelist,
  mediatedetails,
}))(MediateDetails);


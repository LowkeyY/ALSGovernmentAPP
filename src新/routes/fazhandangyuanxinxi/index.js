import React from 'react';
import { connect } from 'dva';
import { createForm } from 'rc-form';
import { WhiteSpace, List, Toast, InputItem, ImagePicker, Button, Icon, WingBlank } from 'components';
import { getErrorImg, getImages, getLocalIcon } from 'utils';
import Nav from 'components/nav';
import { routerRedux } from 'dva/router';
import PartyMembersTitle from 'components/partymemberstitle';
import TitleBox from 'components/titlecontainer';
import WxImageViewer from 'react-wx-images-viewer';
import styles from './index.less';

const PrefixCls = 'fazhandangyuanxinxi',
  Item = List.Item,
  Brief = Item.Brief,
  dataUrlToImageSrc = (dataUrl) => {
    let imageHeader = 'data:image/jpeg;base64,';
    if (dataUrl && !dataUrl.startsWith(imageHeader)) {
      return `${imageHeader}${dataUrl}`;
    }
    return dataUrl;
  };

function Comp ({ location, dispatch, fazhandangyuanxinxi, form }) {
  const { name = '发展党员信息', shenhe_tag } = location.query,
    { title, items = [], sort_id, btnText = '', uploading = false, attachments = [], isOpen, viewImageIndex, images, subject, yijian = '' } = fazhandangyuanxinxi,
    { getFieldProps, getFieldError } = form;
  const handleSubmits = () => {
      if (uploading) {
        return;
      }
      form.validateFields({
        force: true,
      }, (error) => {
        if (!error) {
          dispatch({
            type: `${PrefixCls}/submits`,
            payload: {
              ...form.getFieldsValue(),
            },
          });
        } else {
          Toast.fail('请确认信息是否正确。');
        }
      });
    },
    handleCameraClick = (blob, dataUrl) => {
      attachments.push({ file: blob, url: dataUrlToImageSrc(dataUrl) });
      dispatch({
        type: `${PrefixCls}/updateState`,
        payload: {
          attachments,
        },
      });
    },
    
    handleDivClick = (e) => {
      if (e.target.className === 'img') {
        let src = e.target.dataset.src,
          curImageIndex = images.indexOf(src);
        if (src) {
          dispatch({
            type: `${PrefixCls}/updateState`,
            payload: {
              isOpen: true,
              viewImageIndex: curImageIndex < 0 ? 0 : curImageIndex,
            },
          });
        }
      }
    },
    onViemImageClose = () => {
      dispatch({
        type: `${PrefixCls}/updateState`,
        payload: {
          isOpen: false,
        },
      });
    },
    handleOnChange = (files, type, index) => {
      let reg = /image/,
        result = [];
      files.map((data, i) => {
        if (data.file !== '' && !reg.test(data.file.type)) {
          Toast.fail('这不是图片哟！！！', 2);
        } else {
          result.push(data);
        }
      });
      dispatch({
        type: `${PrefixCls}/updateState`,
        payload: {
          attachments: result,
        },
      });
    };
  
  const layoutItem = (item, onClick) => {
      const { type = 'text', lable = '', key = '', value = '' } = item,
        result = [];
      if (key != '') {
        switch (type) {
          case 'text':
            result.push(
              <Item extra={value}>{lable}</Item>);
            break;
          case 'fileUpload':
            if (attachments.length > 0) {
              attachments.map((val, index) => {
                const { file = '', url = '' } = val;
                if (url != '') {
                  result.push(
                    <div className={styles[`${PrefixCls}-imgbox`]}>
                      <div key={index} data-src={url} className="img" style={{ backgroundImage: `url(${url})` }} />
                    </div>);
                }
              });
            }
            break;
        }
      }
      return result;
    },
    layoutEditItem = (item) => {
      const { type = 'text', lable = '', key = '', value = '' } = item,
        result = [];
      if (key != '') {
        switch (type) {
          case 'text':
            result.push(
              <InputItem
                {...getFieldProps(key, {
                  initialValue: `${value}`,
                  rules: [{ required: true, message: `${lable}必须输入` }],
                })}
                clear
                error={!!getFieldError(key) && Toast.fail(getFieldError(key))}
                placeholder={`请输入${lable}`}
              >
                {lable}
              </InputItem>);
            break;
          case 'fileUpload':
            result.push(
              <div className={styles[`${PrefixCls}-outer-img`]}>
                <div>
                  <div className={styles[`${PrefixCls}-sendtitle`]}>{lable}</div>
                  {<span
                    className={styles[`${PrefixCls}-formbox`]}
                    onClick={cnTakePhoto.bind(null, handleCameraClick, 1)}
                  >
                    <Icon type={getLocalIcon('/media/camerawhite.svg')} />
                  </span>}
                </div>
                <ImagePicker
                  files={attachments}
                  onChange={handleOnChange}
                  multiple
                  accept="image/*"
                />
              </div>);
            break;
        }
      }
      return result;
    },
    layoutItems = () => {
      const result = [],
        isEdit = btnText !== '';
      if (!isEdit) {
        items.map(item => {
          result.push(layoutItem(item));
        });
      } else {
        items.map(item => {
          result.push(layoutEditItem(item));
        });
      }
      return !isEdit ? <div className={styles[`${PrefixCls}-imgcontainer`]}>{result}</div> : <form>{result}</form>;
    },
    layoutBtn = () => {
      const result = [];
      if (btnText.length > 0) {
        result.push(<div style={{ height: '100px' }} />);
        result.push(
          <div className={styles[`${PrefixCls}-button`]}>
            {<WingBlank><Button type="primary"
              loading={uploading}
              onClick={handleSubmits}
            >{btnText}</Button></WingBlank>}
          </div>);
      }
      return result;
    };
  
  return (
    <div className={styles[`${PrefixCls}-outer`]}>
      <Nav title={name} dispatch={dispatch} />
      <WhiteSpace size="md" />
      <PartyMembersTitle title={subject} />
      <WhiteSpace size="md" />
      <TitleBox title={`${sort_id / 10 + 1}.${title}`} />
      <WhiteSpace size="md" />
      {
        yijian === '' ? '' : <div className={styles[`${PrefixCls}-opinion`]}>
          <div className={styles[`${PrefixCls}-opinion-title`]}>审核意见</div>
          <div className={styles[`${PrefixCls}-opinion-content`]}>{yijian}</div>
        </div>
      }
      <div className={styles[`${PrefixCls}-container`]} onClick={handleDivClick}>
        {layoutItems()}
        {layoutBtn()}
      </div>
      {
        isOpen && viewImageIndex !== -1 ?
          <WxImageViewer onClose={onViemImageClose} urls={images} index={viewImageIndex} /> : ''
      }
    </div>
  );
}

export default connect(({ loading, fazhandangyuanxinxi }) => ({
  loading,
  fazhandangyuanxinxi,
}))(createForm()(Comp));

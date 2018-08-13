import React from 'react';
import { connect } from 'dva';
import { createForm } from 'rc-form';
import { WhiteSpace, WingBlank, List, Toast, InputItem, ImagePicker, Button, Icon, Badge } from 'components';
import { getErrorImg, getImages, getLocalIcon } from 'utils';
import { routerRedux } from 'dva/router';
import Nav from 'components/nav';
import TitleBox from 'components/titlecontainer';
import PartyMembersTitle from 'components/partymemberstitle';
import styles from './index.less';

const PrefixCls = 'fazhandangyuan',
  Item = List.Item,
  Brief = Item.Brief,
  dataUrlToImageSrc = (dataUrl) => {
    let imageHeader = 'data:image/jpeg;base64,';
    if (dataUrl && !dataUrl.startsWith(imageHeader)) {
      return `${imageHeader}${dataUrl}`;
    }
    return dataUrl;
  };

function Comp ({ location, dispatch, fazhandangyuan, form }) {
  const { name = '发展党员' } = location.query, { title, isShenhe = false, items = [], btnText = '', uploading = false, imageFiles = [], liuchengId, subject = '', sort_id = '' } = fazhandangyuan, { getFieldProps, getFieldError } = form;
  
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
      imageFiles.push({ file: blob, url: dataUrlToImageSrc(dataUrl) });
      dispatch({
        type: `${PrefixCls}/updateState`,
        payload: {
          imageFiles,
        },
      });
    },
    handleOnChange = (files, type, index) => {
      let reg = /image/,
        result = [];
      files.map((data, i) => {
        if (!reg.test(data.file.type)) {
          Toast.fail('这不是图片哟！！！', 2);
        } else {
          result.push(data);
        }
      });
      dispatch({
        type: `${PrefixCls}/updateState`,
        payload: {
          imageFiles: result,
        },
      });
    },
    handleOnClick = ({ sort_id = '', shenhe_tag = '' }) => {
      dispatch(routerRedux.push({
        pathname: `/fazhandangyuanxinxi`,
        query: {
          liuchengId,
          sort_id,
          shenhe_tag,
        },
      }));
    };
  const layoutItem = (item) => {
      const { type = 'text', lable = '', key = '' } = item,
        result = [];
      if (key != '') {
        switch (type) {
          case 'text':
            result.push(
              <InputItem
                {...getFieldProps(key, {
                  initialValue: '',
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
              <div>
                <div className={styles[`${PrefixCls}-sendtitle`]}>{lable}</div>
                <div>
                  {<span className={styles[`${PrefixCls}-formbox`]}
                         onClick={cnTakePhoto.bind(null, handleCameraClick, 1)}>
                  <Icon type={getLocalIcon('/media/camerawhite.svg')} />
                </span>}
                </div>
                <ImagePicker
                  files={imageFiles}
                  onChange={handleOnChange}
                  multiple={true}
                  accept='image/*'
                />
              </div>);
            break;
        }
      }
      return result;
    },
    getColors = (status) => {
      switch (status) {
        case 0:
          return '#f19736';
        case 10:
          return '#1ab73c';
        case 20:
          return '#dc1919';
      }
    },
    layoutShenheItem = (item, onClick) => {
      const { sort_id = '', title, status = '0', statusText = '', dates = '' } = item;
      return sort_id != '' ? (
        <Item className={styles[`${PrefixCls}-item`]}
              multipleLine wrap arrow='horizontal'
              onClick={handleOnClick.bind(null, item)}
        
        >
          <span>{`${sort_id / 10 + 1}.${title}`}</span>
          <Badge text={statusText}
                 style={{
                   marginLeft: 16,
                   padding: '0 4px',
                   backgroundColor: getColors(status * 1),
                   borderRadius: 2,
                   color: '#fff',
                 }}
          />
          <Brief>{dates}</Brief>
        
        </Item>
      ) : '';
    },
    layoutItems = () => {
      const result = [];
      if (isShenhe === true) {
        items.map(item => {
          result.push(layoutShenheItem(item));
        });
      } else {
        items.map(item => {
          result.push(layoutItem(item));
        });
      }
      return isShenhe === true ? <List>{result}</List> : <form>{result}</form>;
    };
  
  return (
    <div className={styles[`${PrefixCls}-outer`]}>
      <Nav title={name} dispatch={dispatch} />
      <WhiteSpace size="md" />
      {
        isShenhe ?
          <PartyMembersTitle title={title} />
          :
          <div>
            <PartyMembersTitle title={subject} />
            <WhiteSpace size="md" />
            <TitleBox title={`${sort_id / 10 + 1}.${title}`} />
          </div>
      }
      <WhiteSpace size="md" />
      <div className={styles[`${PrefixCls}-container`]}>{layoutItems()}</div>
      <div style={{ height: '100px' }}></div>
      <div className={styles[`${PrefixCls}-button`]}>
        {btnText.length > 0 ?
          <WingBlank><Button type="primary" loading={uploading}
                             onClick={handleSubmits}>{btnText}</Button></WingBlank> : ''}
      </div>
    </div>
  );
}

export default connect(({ loading, fazhandangyuan }) => ({
  loading,
  fazhandangyuan,
}))(createForm()(Comp));

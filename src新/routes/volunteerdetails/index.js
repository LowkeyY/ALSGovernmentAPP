import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, Icon, Checkbox, List, Button, Toast, Modal, Radio } from 'components';
import { getLocalIcon, doDecode } from 'utils';
import { routerRedux } from 'dva/router';
import TitleBox from 'components/titlecontainer';
import Nav from 'components/nav';
import styles from './index.less';

const newsList = [],
  CheckboxItem = Checkbox.CheckboxItem,
  PrefixCls = 'volunteerdetails',
  Item = List.Item,
  Brief = Item.Brief,
  alert = Modal.alert,
  RadioItem = Radio.RadioItem,
  getContents = (content) => {
    return {
      __html: content,
    };
  };

function VolunteerDetails ({ location, dispatch, volunteerdetails, app }) {
  const { name = '' } = location.query,
    { currentSelect = [], currentData = {}, userInfos = [], typeId = '', isShowModal } = volunteerdetails,
    { isLogin } = app,
    handleItemClick = ({ id, route = '' }) => {
      dispatch(routerRedux.push({
        pathname: `/${route}`,
        query: {
          dataId: id,
          name: currentData.check_tilte || '',
          noPraise: true
        }
      }));
    },
    layoutChildren = (items = [], onClick, currentSelect = []) => {
      const result = [];
      items.map((item, index) => {
        const { id = '', name = '', sex = '', hdlx = '1', ssjdb = '', znyy = '', sssq = '', info = '', image = '' } = item;
        try {
          var infoObj = doDecode(info);
        } catch (e) {
        
        }
        
        if (infoObj && infoObj.route != '') {
          result.push(
            <div key={id} className={styles[`${PrefixCls}-listitem`]}>
              <CheckboxItem key={id}
                checked={currentSelect.includes(id)}
                onClick={() => onClick(id, infoObj)}
              />
              <List style={{ width: '100%', overflow: 'hidden' }}>
                <Item
                  className={styles[`${PrefixCls}-volunteer-item`]}
                  arrow="horizontal"
                  multipleLine
                  thumb={image || ''}
                  onClick={handleItemClick.bind(this, infoObj)}
                >
                  <span style={{ marginRight: '10px' }}>{name}</span>
                  <span>{sex !== '' ?
                    (sex === '男' ? <Icon size="xxs" type={getLocalIcon('/others/male.svg')} />
                      :
                    <Icon size="xxs" type={getLocalIcon('/others/female.svg')} />) : ''}</span>
                  <span className={styles[`${PrefixCls}-userinfo-address`]}>{`${ssjdb}-${sssq}`}</span>
                  <Brief>{znyy}</Brief>
                </Item>
              </List>
            </div>
          );
        } else {
          result.push(
            <CheckboxItem key={id}
              className={styles[`${PrefixCls}-userinfo`]}
              checked={currentSelect.includes(id)}
              onClick={() => onClick(id, infoObj)}
            >
              <Item
                className={styles[`${PrefixCls}-volunteer-item`]}
                multipleLine
                thumb={image || ''}
              >
                <span style={{ marginRight: '10px' }}>{name}</span>
                <span>{sex !== '' ?
                  (sex === '男' ? <Icon size="xxs" type={getLocalIcon('/others/male.svg')} />
                    :
                  <Icon size="xxs" type={getLocalIcon('/others/female.svg')} />) : ''}</span>
                <span className={styles[`${PrefixCls}-userinfo-address`]}>{`${ssjdb}-${sssq}`}</span>
                <Item wrap>{znyy}</Item>
              </Item>
            </CheckboxItem>
          );
        }
      });
      return result;
    },
    handleClick = (key, infoObj) => {
      let newSelect = [],
        index = -1;
      if (infoObj && infoObj.route !== '') {
        if ((index = currentSelect.indexOf(key)) != -1) {
          newSelect = [...currentSelect.slice(0, index), ...currentSelect.slice(index + 1)];
        } else {
          newSelect = [...currentSelect, key];
        }
      } else if ((index = currentSelect.indexOf(key)) != -1) {
        newSelect = [...currentSelect.slice(0, index)];
      } else {
        newSelect = [key];
      }
      dispatch({
        type: `${PrefixCls}/updateState`,
        payload: {
          currentSelect: newSelect
        }
      });
    },
    handleChangeClick = (id) => {
      dispatch({
        type: `${PrefixCls}/updateState`,
        payload: {
          typeId: id
        }
      });
    },
    
    handleSubmits = (currentData) => {
      const { hdlx } = currentData;
      if (currentSelect.length > 0) {
        if (hdlx === '1') {
          dispatch({
            type: `${PrefixCls}/updateState`,
            payload: {
              isShowModal: true
            }
          });
        } else {
          dispatch({
            type: `${PrefixCls}/submit`
          });
        }
      } else {
        Toast.info('您未进行选择', 2);
      }
    },
    handleDonationClick = () => {
      dispatch(routerRedux.push({
        pathname: '/donationDetails',
        query: {
          name: '捐赠动态',
          id
        }
      }));
    },
    renderNav = () => {
      if (isLogin && check_tilte !== '' && hdlx === '1') {
        return (<div onClick={handleDonationClick}>捐赠动态</div>);
      }
      return '';
    },
    handleCancelClick = () => {
      dispatch({
        type: `${PrefixCls}/updateState`,
        payload: {
          isShowModal: false
        }
      });
      dispatch({
        type: `${PrefixCls}/updateState`,
        payload: {
          typeId: ''
        }
      });
    },
    handleConfirmClick = (typeid) => {
      if (typeid !== '') {
        dispatch({
          type: `${PrefixCls}/updateState`,
          payload: {
            isShowModal: false
          }
        });
        dispatch({
          type: `${PrefixCls}/submitActive`,
        });
      } else {
        Toast.fail('请至少选择一项');
      }
    },
    renderModal = (data) => {
      return (<div className={styles[`${PrefixCls}-mask`]}>
        <div className={styles[`${PrefixCls}-modalbox`]}>
          <div className={styles[`${PrefixCls}-modal`]}>
            <div className={styles[`${PrefixCls}-modal-title`]}>
              请选择捐赠物品
            </div>
            <List>
              {data.map(i => (
                <RadioItem checked={typeId === i.id} key={i.id} onChange={handleChangeClick.bind(this, i.id)}>
                  {i.name}
                </RadioItem>
              ))}
            </List>
            <div className={styles[`${PrefixCls}-modal-button`]}>
              <div style={{ color: '#000' }} onClick={handleCancelClick}>
                取消
              </div>
              <div onClick={handleConfirmClick.bind(this, typeId)}>
                确定
              </div>
            </div>
          </div>
        </div>
      </div>);
    };
  const { id = '', address = '', baomingS = '', baomingE = '', dept = '', startDate = '', endDate = '', image = '', info = '', hdlx = '1', bfxx = [], baomingrenshu = 0, check_tilte = '' } = currentData;
  return (
    <div>
      <Nav title={name} dispatch={dispatch} renderNavRight={renderNav()} />
      <div className={styles[`${PrefixCls}-container`]}>
        <img src={image || require('./1.png')} alt="" />
        <TitleBox title="发起单位" />
        {<div className={styles[`${PrefixCls}-container-company`]}>{dept}</div>}
        <div className={styles[`${PrefixCls}-container-content`]}>
          <div className={styles[`${PrefixCls}-container-content-item`]}>
            <Icon type={getLocalIcon('/others/position.svg')} size="xxs" />
            <span className={styles[`${PrefixCls}-container-content-item-before`]}>活动地点</span>
            <span className={styles[`${PrefixCls}-container-content-item-after`]}>{address}</span>
          </div>
          <div className={styles[`${PrefixCls}-container-content-item`]}>
            <Icon type={getLocalIcon('/others/time.svg')} size="xxs" />
            <span className={styles[`${PrefixCls}-container-content-item-before`]}>活动时间</span>
            <span className={styles[`${PrefixCls}-container-content-item-after`]}>{`${startDate}至${endDate}`}</span>
          </div>
          <div className={styles[`${PrefixCls}-container-content-item`]}>
            <Icon type={getLocalIcon('/others/time.svg')} size="xxs" />
            <span className={styles[`${PrefixCls}-container-content-item-before`]}>报名时间</span>
            <span className={styles[`${PrefixCls}-container-content-item-after`]}>{`${baomingS}至${baomingE}`}</span>
          </div>
          {baomingrenshu > 0 && <div className={styles[`${PrefixCls}-container-content-item`]}>
            <Icon type={getLocalIcon('/others/people.svg')} size="xxs" />
            <span className={styles[`${PrefixCls}-container-content-item-before`]}>报名人数</span>
            <span className={styles[`${PrefixCls}-container-content-item-after`]}>{baomingrenshu}</span>
          </div>
          }
        </div>
        <TitleBox title="活动详情" />
        <div className={styles[`${PrefixCls}-container-details`]}>
          {<div style={{ padding: '0 10px' }} dangerouslySetInnerHTML={getContents(info)} />}
        </div>
        {
          check_tilte != '' ?
            <div>
              <TitleBox title={check_tilte} />
              {layoutChildren(userInfos, handleClick, currentSelect)}
            </div>
            :
            ''
        }
        <div style={{ height: '100px' }} />
        <div style={{ position: 'fixed', bottom: 0, width: '100%' }}>
          {isLogin && check_tilte != '' ?
            <List>{<Button type="primary"
              onClick={handleSubmits.bind(this, currentData)}
            >{hdlx === '1' ? '我要参与' : '我要投票'}</Button>}</List> : ''}
        </div>
      </div>
      {isShowModal ? renderModal(bfxx) : ''}
    </div>
  );
}

export default connect(({ loading, volunteerdetails, app }) => ({
  loading,
  volunteerdetails,
  app
}))(VolunteerDetails);

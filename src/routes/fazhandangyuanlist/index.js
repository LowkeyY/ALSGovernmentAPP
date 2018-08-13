/* eslint-disable padded-blocks */
import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, List, Badge, Icon, Checkbox, Button, Modal } from 'components';
import { routerRedux } from 'dva/router';
import Nav from 'components/nav';
import styles from './index.less';

const PrefixCls = 'fazhandangyuanlist',
  Item = List.Item,
  Brief = Item.Brief,
  CheckboxItem = Checkbox.CheckboxItem;

function Comp ({ location, dispatch, fazhandangyuanlist }) {
  const { name = '' } = location.query,
    { items = [], showPopover = false, isEdit = false, currentSelect } = fazhandangyuanlist,
    handleItemClick = (data,shenhe_tag) => {
      dispatch(routerRedux.push({
        pathname: '/fazhandangyuan',
        query: {
          ...data,
          shenhe_tag
        },
      }));
    },
    
    getColors = (status) => {
      switch (status) {
        case 0:
          return '#f19736';
        case 10:
          return '#1ab73c';
        case 20:
          return '#dc1919';
        default:
          return 'red';
      }
    },
    handleAddClick = () => {
      dispatch(routerRedux.push({
        pathname: '/fazhandangyuan',
        query: {
          // id,
        },
      }));
    },
    handleEditClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      dispatch({
        type: 'fazhandangyuanlist/updateState',
        payload: {
          isEdit: true
        }
      });
    },
    handleCancelClick = () => {
      dispatch({
        type: 'fazhandangyuanlist/updateState',
        payload: {
          isEdit: false
        }
      });
    },
    handleDeleteClick = () => {
      Modal.alert('删除', '确定删除所选人员？', [
        { text: '取消', onPress: () => console.log('cancel') },
        { text: '确定', onPress: () => console.log('ok') },
      ]);
    },
    handleSelectClick = (key) => {
      let newSelect = [], index = -1;
      if ((index = currentSelect.indexOf(key)) != -1)
        newSelect = [...currentSelect.slice(0, index), ...currentSelect.slice(index + 1)];
      else
        newSelect = [...currentSelect, key];
      dispatch({
        type: `${PrefixCls}/updateState`,
        payload: {
          currentSelect: newSelect
        }
      });
    },
    renderNav = () => {
      return (
        <div onClick={handleEditClick}>删除</div>
      );
    },
    getCurrentList = (item) => {
      const { userName = '', userTag = '', statusText = '', status = '', shenhe_tag = '', ...others } = item;
      if (isEdit) {
        return (
          <CheckboxItem
            arrow="horizontal"
            checked={currentSelect.includes(shenhe_tag)}
            onClick={handleSelectClick.bind(null, shenhe_tag)}
            multipleLine
            extra={<Badge
              text={statusText}
              style={{
                padding: '0 4px',
                backgroundColor: getColors(status * 1),
                borderRadius: 2,
                color: '#fff',
              }}
            />}
          >
            <span>{userName}</span>
            <Brief>{userTag}</Brief>
          </CheckboxItem>
        );
      }
      
      return (
        <Item
          arrow="horizontal"
          multipleLine
          onClick={handleItemClick.bind(null, others, shenhe_tag)}
          extra={<Badge
            text={statusText}
            style={{
              padding: '0 4px',
              backgroundColor: getColors(status * 1),
              borderRadius: 2,
              color: '#fff',
            }}
          />}
        >
          <span>{userName}</span>
          <Brief>{userTag}</Brief>
        </Item>
      );
      
    };
  
  
  return (
    <div>
      <Nav title={name} dispatch={dispatch} renderNavRight={renderNav()} />
      {isEdit ?
        <div className={styles[`${PrefixCls}-editbutton`]}>
          <Button type="ghost" inline size="small" onClick={handleDeleteClick}
                  style={{ marginRight: '20px' }}>删除</Button>
          <Button type="ghost" inline size="small" onClick={handleCancelClick}>取消</Button>
        </div> :
        ''
      }
      <List>
        {items.length > 0 && items.map(item => {
          return (
            <div>{getCurrentList(item)}</div>
          );
        })}
      </List>
    </div>
  );
}

export default connect(({ loading, fazhandangyuanlist }) => ({
  loading,
  fazhandangyuanlist,
}))(Comp);

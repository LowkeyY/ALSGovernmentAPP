import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, Accordion, List, Checkbox, Modal, Toast, SearchBar } from 'components';
import Nav from 'components/nav';
import { routerRedux } from 'dva/router';
import styles from './index.less';


const PrefixCls = 'workers',
  alert = Modal.alert;
const CheckboxItem = Checkbox.CheckboxItem;

function Workers ({ location, dispatch, workers }) {
  const { name = '选择人员分配', currentRoute = '' } = location.query,
    { lists = [], currentSelect = [] } = workers,
    getItems = (arr) => {
      let newArr = [];
      arr && arr.map((data, i) => {
        newArr.push(data.name);
      });
      return newArr || [];
    },
    getSelectUsers = (currentSelect) => {
      return (<div>
        <div>已选择下发人员</div>
        {getItems(currentSelect)
          .map(data => (
            <div style={{ color: '#108ee9' }}>{data}</div>
          ))}
      </div>);
    },

    submit = (currentSelect) => {
      let newArr = [];
      currentSelect && currentSelect.map((data, i) => {
        newArr.push(data.userId);
      });
      dispatch({
        type: `${currentRoute}/updateUser`,
        payload: {
          selectedUsers: currentSelect,
        },
      });
      dispatch(routerRedux.goBack());
    },
    handleNavClick = (currentSelect) => {
      if (currentSelect.length > 0) {
        alert('确定选择？', <div>{getSelectUsers(currentSelect)}</div>, [
          { text: '再想想', onPress: () => console.log('ok') },
          { text: '确定', onPress: submit.bind(this, currentSelect) },
        ]);
      } else {
        Toast.fail('您还没有选择下发对象');
      }
    },
    // handleSearchClick = () => {
    //   dispatch(routerRedux.push({
    //     pathname: '/searchuser',
    //   }));
    // },
    renderNav = () => {
      return (
        <span onClick={handleNavClick.bind(null, currentSelect)}>确定</span>
      );
    },
    handleSearchClick = (val) => {

      dispatch({
        type: 'workers/selectUsers',
        payload: {
          searchText: val,
        },
      });
    },
    handleCancelClick = () => {
      dispatch({
        type: 'workers/queryUsers',
      });
    },
    handleSelectClick = (key) => {
      let newSelect = [],
        index = -1;
      if ((index = currentSelect.indexOf(key)) !== -1) {
        newSelect = [...currentSelect.slice(0, index), ...currentSelect.slice(index + 1)];
      } else {
        newSelect = [...currentSelect, key];
      }
      dispatch({
        type: `${PrefixCls}/updateState`,
        payload: {
          currentSelect: newSelect,
        },
      });
    };
  return (
    <div>
      <Nav title={name} dispatch={dispatch} renderNavRight={renderNav()}/>
      <div>
        <SearchBar placeholder="搜索" maxLength={8} onSubmit={handleSearchClick} onCancel={handleCancelClick}/>
      </div>
      <div>
        {
          lists && lists.map((data, i) => {
            return (
              <List className="my-list">
                {data.data.map((data, index) => {
                  return (
                    <CheckboxItem
                      checked={currentSelect.includes(data)}
                      key={index}
                      onClick={handleSelectClick.bind(this, data)}
                    >
                      <span>{data.name}</span>
                      {data.deptPath === '' ? '' :
                        <div className={styles[`${PrefixCls}-dept`]}>{`部门:${data.deptPath.substring(1)}`}</div>}
                    </CheckboxItem>
                  );
                })}
              </List>
            );
          })
        }
      </div>
    </div>
  );
}

export default connect(({ loading, workers, createtask }) => ({
  loading,
  workers,
  createtask,
}))(Workers);

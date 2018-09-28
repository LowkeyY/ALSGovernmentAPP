import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, Accordion, List, Checkbox, Modal, Toast, SearchBar } from 'components';
import Nav from 'components/nav';
import { routerRedux } from 'dva/router';
import TitleBox from 'components/titlecontainer';
import styles from './index.less';


const PrefixCls = 'selectmembers', 
  alert = Modal.alert;
const CheckboxItem = Checkbox.CheckboxItem;

function Selectmembers ({ location, dispatch, selectmembers }) {
  const { name = '发布任务' } = location.query,
    { lists = [], taskId = '', workId = '', isWork, flowLeve, currentSelect = [] } = selectmembers,
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
        {getItems(currentSelect).map(data => (
          <div style={{ color: '#108ee9' }}>{data}</div>
        ))}
      </div>);
    },
    
    submit = (currentSelect, isWork) => {
      const isBack = isWork === '2';
      let newArr = [];
      currentSelect && currentSelect.map((data, i) => {
        newArr.push(data.userId);
      });
      dispatch({
        type: `${PrefixCls}/submit`,
        payload: {
          pageType: 'creat',
          isBack,
          cldw: newArr.join(),
          taskId,
          workId,
          taskFlowLeve: flowLeve * 1 + 1
        }
      });
    },
    handleNavClick = (currentSelect) => {
      if (currentSelect.length > 0) {
        alert('确定发布？', <div>{getSelectUsers(currentSelect)}</div>, [
          { text: '再想想', onPress: () => console.log('ok') },
          { text: '确定发布', onPress: submit.bind(this, currentSelect, isWork) },
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
        <span onClick={handleNavClick.bind(null, currentSelect)}>发布</span>
      );
    },
    handleSearchClick = (val) => {
      dispatch({
        type: 'selectmembers/queryUsers',
        payload: {
          searchText: val
        }
      });
    },
    handleCancelClick = () => {
      dispatch({
        type: 'selectmembers/queryMembers',
      });
      console.log(currentSelect);
    },
    handleSelectClick = (key) => {
      let newSelect = [], 
        index = -1;
      if ((index = currentSelect.indexOf(key)) !==
        -1) { newSelect = [...currentSelect.slice(0, index), ...currentSelect.slice(index + 1)]; } else { newSelect = [...currentSelect, key]; }
      dispatch({
        type: `${PrefixCls}/updateState`,
        payload: {
          currentSelect: newSelect
        }
      });
    };
  return (
    <div>
      <Nav title={name} dispatch={dispatch} renderNavRight={renderNav()} />
      <div>
        <SearchBar placeholder="搜索" maxLength={8} onSubmit={handleSearchClick} onCancel={handleCancelClick} />
      </div>
      <div>
        {
          lists && lists.map((data, i) => {
            return (
              <Accordion key={i} defaultActiveKey="0" className="my-accordion">
                <Accordion.Panel header={data.name}>
                  <List className="my-list">
                    {data.data.map((data, index) => {
                      return (
                        <CheckboxItem
                          checked={currentSelect.includes(data)}
                          key={index}
                          onClick={handleSelectClick.bind(this, data)}
                        >
                          <span>{data.name}</span>
                          <span style={{ marginLeft: '20px' }}>{data.isMaster !== '' ? '管理员' : ''}</span>
                          <p className={styles[`${PrefixCls}-dept`]}>{data.deptPath.substring(1)}</p>
                        </CheckboxItem>
                      );
                    })}
                  </List>
                </Accordion.Panel>
              </Accordion>
            
            );
          })
        }
      </div>
    </div>
  );
}

export default connect(({ loading, selectmembers }) => ({
  loading,
  selectmembers,
}))(Selectmembers);

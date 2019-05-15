import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, Icon, List, Button, Toast, Modal } from 'components';
import { getLocalIcon, doDecode } from 'utils';
import { routerRedux } from 'dva/router';
import TitleBox from 'components/titlecontainer';
import Nav from 'components/nav';
import styles from './index.less';

const PrefixCls = 'communitydetails';
const getContents = (content) => {
  return {
    __html: content,
  };
};

function CommunityDetails ({ location, dispatch, communitydetails, app }) {
  const { name = '' } = location.query,
    { currentData = {} } = communitydetails,
    { isLogin } = app,
    getPeople = (arr) => {
      let newArr = [];
      arr.map((data, i) => {
        newArr.push(data.name);
      });
      return newArr.join();
    },
    handleSubmits = ({ id, state }) => {
      if (isLogin) {
        if (state === '0') {
          dispatch({
            type: 'communitydetails/joinCommunity',
            payload: {
              hdid: id,
            },
          });
        } else {
          Toast.offline('该活动已有人参与(#^.^#)');
        }
      } else {
        Modal.alert('您还没登陆', '请登陆后继续收藏', [
          { text: '稍后再说', onPress: () => console.log('cancel') },
          {
            text: '立刻登陆',
            onPress: () =>
              dispatch(routerRedux.push({
                pathname: '/login',
              })),
          },
        ]);
      }
    },
    handlerUpdateClick = ({ bmid = '' }) => {
      dispatch(routerRedux.push({
        pathname: '/communityjoin',
        query: {
          name,
          bmid,
        },
      }));
    };
  const { hddd = '', hdsj = '', hdnr = '', state = '0', title = '', id = '', bmNames = [] } = currentData;
  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <Nav title={name} dispatch={dispatch}/>
      <div className={styles[`${PrefixCls}-container`]}>
        <TitleBox title="活动信息"/>
        <div className={styles[`${PrefixCls}-container-content`]}>
          <div className={styles[`${PrefixCls}-container-content-title`]}>
            {title}
          </div>
          <div className={styles[`${PrefixCls}-container-content-item`]}>
            <Icon type={getLocalIcon('/others/position.svg')} size="xxs"/>
            <span className={styles[`${PrefixCls}-container-content-item-before`]}>活动地点</span>
            <span className={styles[`${PrefixCls}-container-content-item-after`]}>{hddd}</span>
          </div>
          <div className={styles[`${PrefixCls}-container-content-item`]}>
            <Icon type={getLocalIcon('/others/time.svg')} size="xxs"/>
            <span className={styles[`${PrefixCls}-container-content-item-before`]}>活动时间</span>
            <span className={styles[`${PrefixCls}-container-content-item-after`]}>{hdsj}</span>
          </div>
          <div className={styles[`${PrefixCls}-container-content-people`]}>
            {`${getPeople(bmNames)}等报名`}
          </div>
        </div>
        <TitleBox title="活动详情"/>
        <div className={styles[`${PrefixCls}-container-details`]}>
          {<div style={{ padding: '0 10px' }} dangerouslySetInnerHTML={getContents(hdnr)}/>}
        </div>
        <div style={{ height: '100px' }}/>
        <div style={{ position: 'fixed', bottom: 0, width: '100%' }}>
          {isLogin ?
            <List>{
              state === '0'
                ?
                <Button
                  type="primary"
                  onClick={handleSubmits.bind(this, currentData)}
                > 我要参与</Button>
                :
                <Button
                  type="primary"
                  onClick={handlerUpdateClick.bind(this, currentData)}
                > 更新信息</Button>
            }</List> : ''}
        </div>
      </div>
    </div>
  );
}

export default connect(({ loading, communitydetails, app }) => ({
  loading,
  communitydetails,
  app,
}))(CommunityDetails);

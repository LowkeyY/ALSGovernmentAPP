import React from 'react';
import { connect } from 'dva';
import { Button, Flex, WingBlank, WhiteSpace, List, Icon, Modal, Badge } from 'components';
import { getImages, getErrorImg, getLocalIcon } from 'utils';
import { routerRedux } from 'dva/router';
import { Grid, Layout } from 'components';
import { baseURL, api } from 'utils/config';
import styles from './index.less';
import bg from '../../themes/images/others/minebg.png';

const PrefixCls = 'mine',
  { helpApi } = api,
  Item = List.Item;

function Mine ({ location, dispatch, mine, app, login }) {
  const { users: { username, useravatar }, isLogin, noViewCount = 0 } = app;
  const handleLogin = () => {
      dispatch(routerRedux.push({
        pathname: '/login',
      }));
    },
    handleLoginout = () => {
      dispatch({
        type: 'app/logout',
      });
    },
    handleIntegralClick = () => {
      dispatch(routerRedux.push({
        pathname: '/integral',
      }));
    },
    // handlePayClick = () => {
    //   dispatch(routerRedux.push({
    //     pathname: '/payment',
    //   }));
    // },
    handleAppealClick = ({ showType = '2', name = '我的诉求' }) => {
      dispatch(routerRedux.push({
        pathname: '/myappeal',
        query: {
          showType,
          name,
        },
      }));
    },
    handleCollectionClick = ({ showType = '3', name = '我的收藏' }) => {
      dispatch(routerRedux.push({
        pathname: '/myappeal',
        query: {
          showType,
          name,
        },
      }));
    },
    handleHelpClick = ({ name = '帮助' }) => {
      dispatch(routerRedux.push({
        pathname: 'iframe',
        query: {
          name,
          externalUrl: baseURL + helpApi
        },
      }));
    },
    handleopinionClick = ({ name = '意见反馈' }) => {
      dispatch(routerRedux.push({
        pathname: 'opinion',
        query: {
          name,
        },
      }));
    },
    handleTaskClick = ({ name = '待办理任务' }) => {
      dispatch(routerRedux.push({
        pathname: 'tasklist',
        query: {
          name,
        },
      }));
    },
    handleSetupClick = ({ name = '个人设置' }) => {
      dispatch(routerRedux.push({
        pathname: '/setup',
        query: {
          name,
        },
      }));
    },
    showAlert = () => {
      Modal.alert('退出', '离开我的阿拉善', [
        {
          text: ' 确定退出',
          onPress: handleLoginout,
        },
        { text: '再看看', onPress: () => console.log('cancel') },
      
      ]);
    },
    handleAboutUsClick = ({ name = '关于我们' }) => {
      dispatch(routerRedux.push({
        pathname: '/aboutus',
        query: {
          name,
        },
      }));
    };
  return (
    <div>
      <div className={styles[`${PrefixCls}-outer`]} style={{ backgroundImage: `url(${bg})` }}>
        <div className={styles[`${PrefixCls}-outer-box`]}>
          <img src={getImages(useravatar, 'user')} alt="" />
          <div className={styles[`${PrefixCls}-outer-box-username`]}>{username}</div>
        </div>
      </div>
      <div className={styles[`${PrefixCls}-info`]}>
        {isLogin ? <div className={styles[`${PrefixCls}-info-head`]} onClick={handleIntegralClick}>
          <span className={styles[`${PrefixCls}-info-head-integral`]}><Icon
            type={getLocalIcon('/mine/integral.svg')}
          /><span>我的积分</span></span>
          <span className={styles[`${PrefixCls}-info-head-change`]}><Icon
            type={getLocalIcon('/mine/store.svg')}
          /><span>积分兑换</span></span>
        </div> : ''}
        <List>
          {
            isLogin ?
              <div>
                {/*<Item*/}
                {/*thumb={<Icon type={getLocalIcon('/mine/pay.svg')} />}*/}
                {/*arrow="horizontal"*/}
                {/*onClick={handlePayClick}*/}
                {/*>*/}
                {/*缴费记录*/}
                {/*</Item>*/}
                <Item
                  thumb={<Icon type={getLocalIcon('/mine/appeal.svg')} />}
                  arrow="horizontal"
                  onClick={handleAppealClick}
                >
                  我的诉求
                </Item>
                <Item
                  thumb={<Icon type={getLocalIcon('/mine/mytask.svg')} />}
                  arrow="horizontal"
                  onClick={handleTaskClick}
                >
                  我的任务
                  {noViewCount > 0 ? <Badge text={'new'} style={{ marginLeft: 12 }} /> : ''}
                </Item>
                <Item
                  thumb={<Icon type={getLocalIcon('/mine/collection.svg')} />}
                  arrow="horizontal"
                  onClick={handleCollectionClick}
                >
                  我的收藏
                </Item>
                <Item
                  thumb={<Icon type={getLocalIcon('/mine/setup.svg')} />}
                  arrow="horizontal"
                  onClick={handleSetupClick}
                >
                  个人设置
                </Item>
                <Item
                  thumb={<Icon type={getLocalIcon('/mine/aboutus.svg')} />}
                  arrow="horizontal"
                  onClick={handleAboutUsClick}
                >
                  关于我们
                </Item>
              </div>
              :
              ''
          }
          <Item
            thumb={<Icon type={getLocalIcon('/mine/opinion.svg')} />}
            arrow="horizontal"
            onClick={handleopinionClick}
          >
            意见反馈
          </Item>
          <Item
            thumb={<Icon type={getLocalIcon('/mine/help.svg')} />}
            arrow="horizontal"
            onClick={handleHelpClick}
          >
            使用帮助
          </Item>
          {
            !isLogin ?
              <Item
                thumb={<Icon type={getLocalIcon('/mine/aboutus.svg')} />}
                arrow="horizontal"
                onClick={handleAboutUsClick}
              >
                关于我们
              </Item>
              :
              ''
          }
        </List>
      </div>
      <WhiteSpace size="lg" />
      <div style={{ marginBottom: '50px' }}>
        {
          !isLogin ?
            
            <Button style={{ backgroundColor: '#108ee9' }}
                    type="primary"
                    onClick={handleLogin}
            >登录</Button>
            :
            <Button style={{ border: '1px solid #fff', color: '#fff', background: '#ff5353' }}
                    type="primary"
                    onClick={showAlert}
            >退出</Button>
        }
      </div>
    </div>
  );
}

export default connect(({ loading, mine, app, login }) => ({
  loading,
  mine,
  app,
  login,
}))(Mine);

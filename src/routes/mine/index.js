import React from 'react';
import { connect } from 'dva';
import { Button, Flex, WhiteSpace, List, Icon, Modal, Badge } from 'components';
import { getImages, getErrorImg, getLocalIcon, getDefaultBg } from 'utils';
import { routerRedux } from 'dva/router';
import { Grid, Layout } from 'components';
import { baseURL, api } from 'utils/config';
import styles from './index.less';

const PrefixCls = 'mine',
  { helpApi } = api,
  Item = List.Item;

function Mine ({ location, dispatch, mine, app }) {
  const { users: { username, useravatar }, isLogin, noViewCount = 0 } = app,


    handleIntegralClick = () => {
      dispatch(routerRedux.push({
        pathname: '/integralhome',
      }));
    },

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
          externalUrl: baseURL + helpApi,
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

    handleAboutUsClick = ({ name = '关于我们' }) => {
      dispatch(routerRedux.push({
        pathname: '/aboutus',
        query: {
          name,
        },
      }));
    },
    handleLogin = () => {
      dispatch(routerRedux.push({
        pathname: '/login',
      }));
    };
  return (
    <div>
      <div className={styles[`${PrefixCls}-top`]}>
        <div style={{ overflow: 'hidden' }}>
          <div
            className={styles[`${PrefixCls}-top-bg`]}
            style={useravatar ? { backgroundImage: `url(${getDefaultBg(useravatar)})` } : null}
          />
        </div>
        <div className={styles[`${PrefixCls}-top-avatar`]}>
          <img src={getImages(useravatar, 'user')} alt="" />
          <div className={styles[`${PrefixCls}-top-avatar-username`]}>
            <div>
              {isLogin ?
                <span>{username}</span>
                :
                <span onClick={handleLogin}>点击登录</span>
              }
            </div>
          </div>
        </div>

        {isLogin ? <div className={styles[`${PrefixCls}-top-set`]} onClick={handleSetupClick}>
          <Icon type={getLocalIcon('/mine/setup.svg')} color="#fff" />
        </div> : null}
      </div>
      <div className={styles[`${PrefixCls}-info`]}>
        {isLogin ? <div className={styles[`${PrefixCls}-info-head`]}>
          <span className={styles[`${PrefixCls}-info-head-integral`]} onClick={handleCollectionClick}>
            <Icon type={getLocalIcon('/mine/collection.svg')} />
            <span>我的收藏</span>
          </span>
          <span className={styles[`${PrefixCls}-info-head-change`]} onClick={handleIntegralClick}>
            <Icon type={getLocalIcon('/mine/integral.svg')} />
            <span>我的积分</span>
          </span>
        </div> : ''}
        <WhiteSpace size="lg" />
        <List>
          {
            isLogin ?
              <div>
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
                {/* <Item */}
                {/* thumb={<Icon type={getLocalIcon('/mine/collection.svg')}/>} */}
                {/* arrow="horizontal" */}
                {/* onClick={handleCollectionClick} */}
                {/* > */}
                {/* 我的收藏 */}
                {/* </Item> */}
                {/*<Item*/}
                {/*thumb={<Icon type={getLocalIcon('/mine/setup.svg')}/>}*/}
                {/*arrow="horizontal"*/}
                {/*onClick={handleSetupClick}*/}
                {/*>*/}
                {/*个人设置*/}
                {/*</Item>*/}
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
    </div>
  );
}

export default connect(({ loading, mine, app, login }) => ({
  loading,
  mine,
  app,
  login,
}))(Mine);

import React from 'react'
import { connect } from 'dva'
import { Button, Flex, WingBlank, WhiteSpace, List, Icon, Modal } from 'components'
import Nav from 'components/nav'
import { getImages, getErrorImg, getLocalIcon } from 'utils'
import { routerRedux } from 'dva/router'
import { Grid, Layout } from 'components'
import { baseURL,api} from 'utils/config'
import styles from './index.less'

const PrefixCls = 'mine', { BaseLine } = Layout,{helpApi} = api,
  Item = List.Item,
  Brief = Item.Brief

function Mine ({ location, dispatch, mine, app, login }) {
  const name = '我的'
  const { users: { username, useravatar }, isLogin } = app
  const handleLogin = () => {
      dispatch(routerRedux.push({
        pathname: '/login',
      }))
    },
    handleLoginout = () => {
      dispatch({
        type: 'app/logout',
      })
    },
    handleIntegralClick = () => {
      dispatch(routerRedux.push({
        pathname: '/integral',
      }))
    },
    handlePayClick = () => {
      dispatch(routerRedux.push({
        pathname: '/payment',
      }))
    },
    handleAppealClick = ({ showType = '2', name = '我的诉求' }) => {
      dispatch(routerRedux.push({
        pathname: '/myappeal',
        query: {
          showType,
          name,
        },
      }))
    },
    handleCollectionClick = ({ showType = '3', name = '我的收藏' }) => {
      dispatch(routerRedux.push({
        pathname: '/myappeal',
        query: {
          showType,
          name,
        },
      }))
    },
    handleHelpClick = ({name='帮助'}) => {
    const src =
      dispatch(routerRedux.push({
        pathname: 'iframe',
        query: {
          name,
          externalUrl:baseURL+helpApi
        },
      }))
    },
    handleSetupClick = ({ name = '个人设置' }) => {
      dispatch(routerRedux.push({
        pathname: '/setup',
        query: {
          name,
        },
      }))
    },
    showAlert = () => {
      Modal.alert('退出', '离开我的阿拉善', [
        {
          text: '残忍退出',
          onPress:handleLoginout ,
        },
        { text: '再看看', onPress: () => console.log('cancel') },

      ])
    }
  return (
    <div>
      <div className={styles[`${PrefixCls}-outer`]}>
        <div className={styles[`${PrefixCls}-outer-title`]}>{name}</div>
        <div className={styles[`${PrefixCls}-outer-box`]}>
          <img src={getImages(useravatar, 'user')} alt=""/>
          <div className={styles[`${PrefixCls}-outer-box-username`]}>{username}</div>
        </div>
      </div>
      <div className={styles[`${PrefixCls}-info`]}>
        <div className={styles[`${PrefixCls}-info-head`]} onClick={handleIntegralClick}>
          <span className={styles[`${PrefixCls}-info-head-integral`]}><Icon
            type={getLocalIcon('/mine/integral.svg')}/><span>我的积分</span></span>
          <span className={styles[`${PrefixCls}-info-head-change`]}><Icon
            type={getLocalIcon('/mine/store.svg')}/><span>积分兑换</span></span>
        </div>
        <List>
          <Item
            thumb={<Icon type={getLocalIcon('/mine/pay.svg')}/>}
            onClick={() => {
            }}
            arrow="horizontal"
            onClick={handlePayClick}
          >
            缴费记录
          </Item>
          <Item
            thumb={<Icon type={getLocalIcon('/mine/appeal.svg')}/>}
            onClick={() => {
            }}
            arrow="horizontal"
            onClick={handleAppealClick}
          >
            我的诉求
          </Item>
          <Item
            thumb={<Icon type={getLocalIcon('/mine/collection.svg')}/>}
            onClick={() => {
            }}
            arrow="horizontal"
            onClick={handleCollectionClick}
          >
            我的收藏
          </Item>
          <Item
            thumb={<Icon type={getLocalIcon('/mine/help.svg')}/>}
            onClick={() => {
            }}
            arrow="horizontal"
            onClick={handleHelpClick}
          >
            帮助与反馈
          </Item>
          {isLogin ? <Item
              thumb={<Icon type={getLocalIcon('/mine/setup.svg')}/>}
              onClick={() => {
              }}
              arrow="horizontal"
              onClick={handleSetupClick}
            >
              设置
            </Item> :
            ''
          }
        </List>
      </div>
      <div>
        <WhiteSpace size='lg'/>
        <WhiteSpace size='lg'/>
        {
          !isLogin ?

            <Button style={{ backgroundColor: '#108ee9' }} type="primary"
                    onClick={handleLogin}>登录</Button>
            :
            <Button style={{ border: '1px solid #fff', color: '#fff', background: '#ff5353' }} type="primary"
                    onClick={showAlert}>退出</Button>
        }
      </div>
    </div>
  )
}

export default connect(({ loading, mine, app, login }) => ({
  loading,
  mine,
  app,
  login,
}))(Mine)

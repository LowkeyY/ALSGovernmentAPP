
import React from 'react'
import {connect} from 'dva';
import { Button, Flex, WingBlank,WhiteSpace} from 'antd-mobile';
import Nav from 'components/nav';
import { getImages,getErrorImg } from 'utils'
import { Grid, Layout} from 'components';
import styles from './index.less'

const data = Array.from(new Array(4)).map((_val, i) => ({
  icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
  text: `办事信息`,
}));
const PrefixCls = 'mine',  {BaseLine} = Layout
function Mine({location,dispatch,mine}) {
  const name='我的'
  return (
    <div>
      <div className={styles[`${PrefixCls}-outer`]}>
        <div className={styles[`${PrefixCls}-outer-title`]}>{name}</div>
        <div className={styles[`${PrefixCls}-outer-box`]}>
          <img src={getImages('','user')} alt=""/>
           <div className={styles[`${PrefixCls}-outer-box-button`]}>
             <Button style={{backgroundColor:'#58b384'}} type="primary" inline size="small">登录</Button>
             <Button style={{border:'1px solid #fff',color:"#fff"}}  type="ghost" inline size="small">注册</Button>
           </div>
        </div>
      </div>
      <Grid data={data} columnNum={4} />
      <WhiteSpace size="sm"/>
      <div className={styles[`${PrefixCls}-outer-content`]}>
        <div className={styles[`${PrefixCls}-outer-content-title`]}>网上办事</div>
         <div className={styles[`${PrefixCls}-outer-content-items`]}>
           <span >办事项进度</span>
           <span>办事项收藏</span>
         </div>

      </div>
      <div className={styles[`${PrefixCls}-outer-content`]}>
        <div className={styles[`${PrefixCls}-outer-content-title`]}>我的应用</div>
        <div className={styles[`${PrefixCls}-outer-content-items`]}>
         <span>个人社保</span>
         <span>我的评价记录</span>
        </div>
        <div className={styles[`${PrefixCls}-outer-content-items`]}>
          <span>我的订单</span>
          <span>手机认证</span>
        </div>
      </div>
      <div className={styles[`${PrefixCls}-outer-content`]}>
        <div className={styles[`${PrefixCls}-outer-content-title`]}>政民互动</div>
        <div className={styles[`${PrefixCls}-outer-content-items`]}>
          <span >市长信箱</span>
          <span>连线政府</span>
        </div>
      </div>
     <BaseLine />
    </div>
  )
}

export default connect(({loading,mine}) => ({
  loading,
  mine
}))(Mine)

import React from 'react'
import {connect} from 'dva';
import Nav from 'components/nav'
import styles from './index.less'
import { Tabs,Badge,WhiteSpace,Grid,List,Icon} from 'components'
import {getLocalIcon} from 'utils'
const Item = List.Item,Brief = Item.Brief,
  tabs=[
    { title: <Badge >便民缴费</Badge>,key:'1'},
    { title: <Badge>家政服务</Badge>,key:'home' },
    { title: <Badge>汽车订票</Badge> ,key:'car'},
    { title: <Badge>预约挂号</Badge> ,key:'order'},
  ]
const payData=[
  {
    icon:require('themes/images/minsheng/1.png'),
    text:'自来水'
  }
  ,{
    icon:require('themes/images/minsheng/2.png'),
    text:'电'
  }
  ,{
    icon:require('themes/images/minsheng/3.png'),
    text:'天然气'
  }
  ,{
    icon:require('themes/images/minsheng/4.png'),
    text:'暖气'
  }
  ,{
    icon:require('themes/images/minsheng/12.png'),
    text:'有线电视'
  }
]
const homeData2=[
  {
    icon:require('themes/images/minsheng/5.png'),
    text:'开锁服务'
  }
]

const homeData1=[
  {
    icon:require('themes/images/minsheng/6.png'),
    text:'水电维修'
  },
  {
    icon:require('themes/images/minsheng/7.png'),
    text:'搬家送货'
  }
  ,{
    icon:require('themes/images/minsheng/9.png'),
    text:'母婴服务'
  }
  ,{
    icon:require('themes/images/minsheng/8.png'),
    text:'家电清洗'
  }
]

const orderData1 =[
  {
    icon:require('themes/images/minsheng/6.png'),
    text:'预约挂号'
  },
]
const PrefixCls = 'livelihood'
const TabPane = Tabs.TabPane;
function Livelihood({location,dispatch,books}) {
  const {name=''}=location.query,

  handleClick=(e)=>{
    console.log(e)
    let anchorElement = document.getElementById(e.key);
    if (anchorElement) {
      anchorElement.scrollIntoView();
    }
  }
  return (
    <div>
      <Nav title={name} dispatch={dispatch}/>
      <WhiteSpace size="md"/>
      <div className={styles[`${PrefixCls}-outer`]}>
        <div>
          <Tabs
            initialPage={0}
            tabs={tabs}
            onChange={handleClick}
            onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}>
          </Tabs>
          <div className={styles[`${PrefixCls}-outer-content`]}>
            <div className={styles[`${PrefixCls}-outer-content-pay`]}>
              <Grid data={payData} columnNum={5} />
            </div>

            <div id="home" className={styles[`${PrefixCls}-outer-content-home`]}>
              <List>
                <Item extra={'更多'} >家政服务</Item>
              </List>
              <div className={styles[`${PrefixCls}-outer-content-home-info`]}>
                    <div className={styles[`${PrefixCls}-outer-content-home-info-left`]}>
                      <img src={require('themes/images/minsheng/5.png')} alt=""/>
                      <span>开锁服务</span>
                      {/*<Grid data={homeData2} columnNum={1} />*/}
                    </div>
                <div className={styles[`${PrefixCls}-outer-content-home-info-right`]}>
                  <Grid data={homeData1} columnNum={2} />
                </div>
              </div>

            </div>

            <div id="car" className={styles[`${PrefixCls}-outer-content-car`]}>
              <List>
                <Item>汽车订票/招车</Item>
              </List>
              <div className={styles[`${PrefixCls}-outer-content-car-info`]}>
                  <div className={styles[`${PrefixCls}-outer-content-car-info-top`]}>
                     <div><span>汽车订票</span> <img src={require('themes/images/minsheng/10.png')} alt=""/></div>
                     <div><span>订票须知</span> <img src={require('themes/images/minsheng/11.png')} alt=""/></div>
                  </div>
                  <div className={styles[`${PrefixCls}-outer-content-car-info-bottom`]}>
                    <div><span>手机招车</span> <img src={require('themes/images/minsheng/13.png')} alt=""/></div>
                    <div><span>联系客服</span> <img src={require('themes/images/minsheng/14.png')} alt=""/></div>
                  </div>
              </div>

            </div>

            <div id="order" className={styles[`${PrefixCls}-outer-content-order`]}>
              <List>
                <Item>预约挂号</Item>
              </List>
              <div className={styles[`${PrefixCls}-outer-content-order-info`]}>
                <div className={styles[`${PrefixCls}-outer-content-order-info-left`]}>
                  <img src={require('themes/images/minsheng/15.png')} alt=""/>
                  <span>预约挂号</span>

                </div>
                <div className={styles[`${PrefixCls}-outer-content-order-info-right`]}>
                      <div><span>电话预约</span><img src={require('themes/images/minsheng/16.png')} alt=""/> </div>
                      <div><span>我的预约</span><img src={require('themes/images/minsheng/17.png')} alt=""/></div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect(({loading,livelihood}) => ({
  loading,
  livelihood
}))(Livelihood)

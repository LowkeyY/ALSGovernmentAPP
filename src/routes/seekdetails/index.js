import React from 'react'
import {connect} from 'dva';
import { WhiteSpace, Icon,List} from 'antd-mobile'
import Nav from 'components/nav'
import { getImages, getErrorImg ,getLocalIcon} from 'utils'
import styles from './index.less'
import SeekReply from  'components/seekreply'
const Item = List.Item;
const Brief = Item.Brief;
const message={
  username: '匿名',
  createDate: '2018-04-19 16:02',
  positions: '阿拉善左旗',
  title: '九九香生煎包（康馨雅苑小区商服楼下）卫生状况存在严重问题',
  status: '3',
  content: '前几天来了几个外地客户，去九九香生煎包（康馨雅苑小区商服楼下）吃早点，吃到一半外地朋友说是稀饭放点白糖，白糖罐盖子里全是烟头烫的印子，随即打开辣椒盖一看全是残渣，像是别人吃剩下的，朋友立马就没食欲了。其次收钱那女的服务也不好，一直拉的脸，让人看的很是不舒服，希望有关部门亲自去检查一下。',
  images: [require('themes/images/banner/banner2.jpg')]
}

const reply = [
  {
    contents:'正在受理中,请耐心等待。。。',
    date:'2018-5-20 18:18:00',
    position:'新华网'
  }
]
const PrefixCls = 'seekdetails'
function SeekDetails({location,dispatch,seekdetails}) {

  const {username,createDate,positions,title,content,images} = message
  const name = '求助详情'

 const getImagesPage = (images) => {
    if (cnIsArray(images) && images.length) {
      return (
        <div className={styles[`${PrefixCls}-content-images`]}>
          {images.map(src => <img src={src} alt=""/>)}
        </div>
      )
    }
    return ''
  }

  return (
    <div>
      <Nav title={name} dispatch={dispatch}/>
      <div className={styles[`${PrefixCls}-outer`]}>
         <div className={styles[`${PrefixCls}-header`]}>
            <span>提问</span>
             <div className={styles[`${PrefixCls}-header-info`]}>
                     <div className={styles[`${PrefixCls}-header-info-box`]}>
                       <div className={styles[`${PrefixCls}-header-info-box-name`]}>{username}</div>
                       <div className={styles[`${PrefixCls}-header-info-box-date`]}><span>{createDate}</span><span>{positions}</span></div>
                     </div>
                   <img src={getImages('', 'user')} alt=""/>
                 </div>
             </div>
          <div className={styles[`${PrefixCls}-content`]}>
             <div className={styles[`${PrefixCls}-content-title`]}>
               <span>{title}</span>
               <span><Icon type={getLocalIcon('/others/heart.svg')} /></span>
             </div>
             <div className={styles[`${PrefixCls}-content-details`]}><span>问题详情：{content}</span></div>
            {getImagesPage(images)}
          </div>
        <WhiteSpace/>
        <List >
          <Item extra={'已批转'} >回复</Item>
        </List>
        {
          reply&&reply.map((data)=>{
           return <SeekReply {...data}/>
          })
        }
         </div>
    </div>
  )
}

export default connect(({loading,seekdetails}) => ({
  loading,
  seekdetails
}))(SeekDetails)

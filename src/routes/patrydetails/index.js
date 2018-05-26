import React from 'react'
import { connect } from 'dva'
import { WhiteSpace } from 'antd-mobile'
import testDataObj from 'utils/datadangjian'
import Nav from 'components/nav'
import Layout from 'components'
import styles from './index.less'

const PrefixCls = 'patrydetails',{BaseLine} = Layout
  dangjianImages = [require('themes/images/patry/dxc.jpg'), require('themes/images/patry/ddy.jpg'), require('themes/images/patry/dls.jpg')]

const message = {
  url: require('themes/images/patry/dxc.jpg'),
  title: ' 学用结合、知行合一',
  content: '<p>--第一幼儿园践行“两学一做”,开展党团员义务劳动\n' +
  '  为进一步落实“两学一做”学习教育活动，充分发挥党团员的先锋模范作用，深化党团员的作风建设，提高党团组织的凝聚力和感召力，9月1日，阿左旗第一幼儿园党支部组织全体党团员开展了义务劳动。全体党团员及入党积极分子参加了劳动——为沙坑松土，用实际行动践行“两学一做”学习教育活动精神。\n' +
  '开展党团员义务劳动，是幼儿园党团支部的常态化活动之一，全体党团员用自己最朴素的方式和最诚挚的热情履行了党团员的职责和义务，树立了“一名党团员、一面旗帜”的良好形象，增强了党团员的宗旨意识、责任意识和奉献意识，也是党团支部坚持学用结合、知行合一，深入开展“两学一做”活动的具体体现。<img src="../../themes/images/patry/content1.png"  alt="" ><p>',
  date: '2018-5-20',
  sub: '【两学一做】',
}

function Patrydetails ({ location, dispatch, patrydetails }) {
  const { name = '', type = 0, index = 0 } = location.query,
/*    { url, title, content, date, sub } = message,*/
    getDatas = (i, j) => testDataObj[i][j] || testDataObj[0][0],
    getContents = (contents , images) => {
      let result = [],
        i = 0
      contents.map((content, index) => {
        (!!images[index]) && result.push(<img src={images[index]}/>)
        result.push(<p>{content}</p>)
        i++
      })
      for (; i < images.length; i++) {
        result.push(<img src={images[i]}/>)
      }
      return result
    },
    {contents = [] , images= [] , title ="" , createDate = ""} = getDatas(type, index)
  return (
    <div>
      <Nav title={name} dispatch={dispatch}/>
      <div className={styles[`${PrefixCls}-outer`]}>
{/*        <div className={styles[`${PrefixCls}-outer-pic`]}>
          <img src={url} alt=""/>
        </div>*/}
        <div className={styles[`${PrefixCls}-outer-title`]}>
          {title}
        </div>
        {/*<div className={styles[`${PrefixCls}-outer-sub`]}>{sub}</div>*/}
        <div className={styles[`${PrefixCls}-outer-date`]}>{createDate}</div>
        <WhiteSpace size="sm"/>
        <div className={styles[`${PrefixCls}-outer-content`]}>
          {/*<div dangerouslySetInnerHTML={ getContents() } />*/}
          {getContents(contents , images)}
        </div>
      </div>
      <Baseline/>
    </div>
  )
}

export default connect(({ loading, patrydetails }) => ({
  loading,
  patrydetails,
}))(Patrydetails)

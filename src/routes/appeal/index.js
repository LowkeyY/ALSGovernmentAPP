import React from 'react'
import { connect } from 'dva'
import Nav from 'components/nav'
import { WhiteSpace, Icon, List, Flex, Tabs, Badge, Tag, Layout } from 'components'
import SearchHeader from 'components/searchheader'
import PullToRefresh from 'components/pulltorefresh'
import { routerRedux } from 'dva/router'
import styles from './index.less'

const Item = List.Item,
  Brief = Item.Brief,
  { BaseLine } = Layout,
  tabs = [
    { title: <Badge>全部求助</Badge> },
    { title: <Badge>我的求助</Badge> },
    { title: <Badge>收藏求助</Badge> },
  ],
  PrefixCls = 'appeal'
import { getImages, getErrorImg, getLocalIcon } from 'utils'

const messages = [{
  username: '匿名',
  createDate: '2018-04-19 16:02',
  positions: '阿拉善左旗',
  title: '九九香生煎包（康馨雅苑小区商服楼下）卫生状况存在严重问题',
  status: '3',
  content: '前几天来了几个外地客户，去九九香生煎包（康馨雅苑小区商服楼下）吃早点，吃到一半外地朋友说是稀饭放点白糖，白糖罐盖子里全是烟头烫的印子，随即打开辣椒盖一看全是残渣，像是别人吃剩下的，朋友立马就没食欲了。其次收钱那女的服务也不好，一直拉的脸，让人看的很是不舒服，希望有关部门亲自去检查一下。',
  answers: [{
    content: '经过调查,九九香生煎包子店确实存在消费者反映的那样,部分白糖罐子盖子里有烟头烫过的痕迹。这是部分消费者在用餐时将其盖子作为烟灰缸所致,该店工作人员未及时清理,卫生上确实存在一定问题。我执法人员责令其进行整改,给消费者营造一个健康良好的消费环境。',
    createDate: '2018-05-02 15:30',
    dept: '阿左旗市场监督管理局新区市场监督管理所',
    user: '李映玉',
    phone: '0483-8332058',
    isCollect: 0,
  }],
}, {
  username: '李冬梅',
  createDate: '2018-05-19 16:02',
  positions: '阿拉善左旗',
  title: '关于银苑新村小区楼顶琉璃瓦脱落问题',
  status: '1',
  content: '2018年3月份银苑新村小区楼顶琉璃瓦脱落，致使我的轿车车顶破损，我发现该小区有很大的安全隐患，银苑新村小区建于2000年，18年了，楼顶的琉璃瓦年久失修，经常能听见楼顶的琉璃瓦噼里啪啦坠落的响声，小区里的好多老人在楼下打扑克，下棋，晒太阳，乘凉，我不希望楼顶的琉璃瓦坠落导致悲剧发生，希望有关部门加快速度处理此事，将安全隐患杜绝，将楼顶的琉璃瓦清理，望有关部门高度重视！！！',
  images: [require('themes/images/banner/banner2.jpg')],
  isCollect: 1,
}, {
  username: '王海',
  createDate: '2018-05-04 06:02',
  positions: '阿拉善左旗',
  title: '关于祥云豪宅每天早上垃圾清运车扰民的问题',
  status: '3',
  content: '祥云豪宅附近有个小区聚集（绿色之光、景苑小区、景开嘉园），垃圾清运车每天不到六点就开始开着那噪声巨大的垃圾车过来清运垃圾，一点不顾及周边群众是否还在休息。员工素质也是很差，一个劲的扯着喊，喇叭一个劲的按，好像我睡不了你们住户也别睡一样。对于这辆车小区很多人都很气愤，尤其周末我们上班族本想的能好好休息休息，结果这车仍然在惊扰着我们，对于此事也有很多人在民心网上投诉过无数次，但这些人依然我行我素。希望市政管理局能重视此事，加强对员工的教育。下次如果还是这样，本人将直接向公安机关和综合执法部门报案，如果他们管不了，我将直接上书纪检监察部门和民生在线好好给有关部门增点彩。',
  answers: [{
    content: '2018年5月10日第一次回复：您好！祥云豪宅附近有个小区聚集（绿色之光、景苑小区、景开嘉园），垃圾清运车每天不到六点就开始开着那噪声巨大的垃圾车过来清运垃圾，一点不顾及周边群众是否还在休息。员工素质也是很差，一个劲的扯着喊，喇叭一个劲的按，好像我睡不了你们住户也别睡一样。对于这辆车小区很多人都很气愤，尤其周末我们上班族本想的能好好休息休息，结果这车仍然在惊扰着我们，对于此事也有很多人在民心网上投诉过无数次，但这些人依然我行我素。希望市政管理局能重视此事，加强对员工的教育。下次如果还是这样，本人将直接向公安机关和综合执法部门报案，如果他们管不了，我将直接上书纪检监察部门和民生在线好好给有关部门增点彩。 的诉求我单位已收悉，现答复如下：由于环卫部门每日清理的垃圾点多、垃圾量大，所以环卫部门清运人员清运垃圾时间存在过早的现象。此前，根据居民反映的垃圾清运车扰民的问题，环卫局已调整了部分区域的作业时间，尽量将清运时间推迟。收到您反映的祥云豪宸附近的垃圾清运车扰民的问题后，环卫局立即组织相关负责人进行调查核实，暂未发现六点之前清运的情况。环卫局沿街收集车每日早7：30左右从民生花园街出发沿吉兰泰路向西沿街收集道路两侧餐饮店、其它商铺的生活垃圾，行至祥云豪宸附近的锡林南路路口后掉头，向东继续收集垃圾至欣欣家园附近的贺兰路路口结束。环卫局将加强作业人员管理，要求在收集垃圾时严格按照操作流程规范操作，尽量减少噪音。若再次发生您所反映的此类问题，请您及时拨打电话8226242或拍照反映，我们将对违反工作规定的作业人员作出严厉的处罚。感谢居民群众对环卫工作的监督，也请城区广大居民能够谅解和支持环卫部门工作，谢谢！。',
    createDate: '2018-05-14 15:30',
    dept:
      '阿左旗城管局',
    user:
      '唐恩泽',
    phone:
      '0483-8226242',

  }],
  isCollect: 0,
}]

const resultInfo = {
  'vioceappept': '120',
  'mediaappept': '10',
  'appept': '43',
  'reply': '36',
  'replyrate': '84',
  'handle': '26',
  'handlerate': '96',
  'satisfied': '76',
}


const messageStatus = {
    '1': '已受理',
    '2': '处理中',
    '3': '已办理',
  },
  colorStatus = {
    '1': 'blue',
    '2': 'green',
    '3': 'gray',
  },
  getMessageStatus = (i) => messageStatus[i] || messageStatus['2'],
  getColorStauts = (i) => colorStatus[i] || colorStatus['2'],
  getStatusPage = (i) => {
    return (
      <span style={{ color: getColorStauts(i) }}>
        {getMessageStatus(i)}
        </span>
    )
  },
  getImagesPage = (images, cls = '') => {
    if (cnIsArray(images) && images.length) {
      return (
        <div className={styles[`${cls}-attrs`]}>
          {images.map(src => <img src={src} alt=""/>)}
        </div>
      )
    }
    return ''
  },
  handleCollectClick = () => {
    e.stopPropagation()
    e.preventDefault()
  },
  handleCardClick = (dispatch) => {
    dispatch(routerRedux.push({
      pathname: '/seekdetails',

    }))
  },
  getAnswersPage = (answers, cls = '') => {
    if (cnIsArray(answers) && answers.length) {
      return (
        <div className={styles[`${cls}-answers`]}>
          {answers.map(({ content = '', createDate = '', dept = '', user = '', phone = '' }) => {
            return content != '' ? (
              <div>
                <div className={styles[`${cls}-answers-content`]}>
                  <span style={{ color: '#1ab99d' }}>回复内容 : </span>
                  {content}
                </div>
                {createDate != '' ? <div className={styles[`${cls}-answers-date`]}><span style={{ color: '#1ab99d' }}>回复时间 : </span>{createDate}
                </div> : ''}
                {dept != '' ?
                  <div className={styles[`${cls}-answers-dept`]}><span style={{ color: '#1ab99d' }}>单位 : </span>{dept}
                  </div> : ''}
                {user != '' ?
                  <div className={styles[`${cls}-answers-user`]}><span style={{ color: '#1ab99d' }}>执行人 : </span>{user}
                  </div> : ''}
                {phone != '' ? <div className={styles[`${cls}-answers-phone`]}><span
                  style={{ color: '#1ab99d' }}>联系电话 : </span>{phone}</div> : ''}
              </div>
            ) : ''
          })}
        </div>
      )
    }
    return ''
  },
  getCard = ({ username, createDate, positions, title, status, content, images, answers, isCollect }, dispatch) => {
    const cls = `${PrefixCls}-card`
    return (
        <div className={styles[cls]} onClick={handleCardClick.bind(null, dispatch)}>
          <div className={styles[`${cls}-info`]}>
            <img src={getImages('', 'user')} alt=""/>
            <div className={styles[`${cls}-info-details`]}>
              <div className={styles[`${cls}-info-details-name`]}>{username}</div>
              <div className={styles[`${cls}-info-details-others`]}>
                <div className={styles[`${cls}-info-details-others-date`]}>
                  <span>{createDate}</span>
                </div>
                <div className={styles[`${cls}-info-details-others-pos`]}>
                  <span>{positions}</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles[`${cls}-content-status`]}>
            <span style={{ color: '#1ab99d' }}>当前状态: {getStatusPage(status)}</span>
            <span><Tag selected={isCollect} onChange={handleCollectClick}>
                      <Icon type={getLocalIcon('/others/collection.svg')}/>
              {isCollect
                ?
                <span className={styles[`${cls}-content-status-collection`]}>已收藏</span>
                : <span className={styles[`${cls}-content-status-collection`]}>收藏</span>}
                    </Tag></span>
          </div>
          <div className={styles[`${cls}-content`]}>
            <div className={styles[`${cls}-content-title`]}>{title}</div>
            <div className={styles[`${cls}-content-content`]}>
              <span style={{ color: '#1ab99d' }}>问：</span>
              {content}
            </div>
          </div>
          {getImagesPage(images, cls)}
        </div>
    )
  }


function Appeal ({ location, dispatch, appeal }) {

  const name = '反应问题'
  const { vioceappept, mediaappept, appept, reply, replyrate, handle, handlerate, satisfied } = resultInfo

  const renderNavRight = () => {
    return (
      <div className={styles[`${PrefixCls}-nav`]}>
        <Icon type={getLocalIcon('/others/sendup.svg')}/>
        <span>我要发言</span>
      </div>
    )
  }


  return (
    <div>
      <Nav title={name} dispatch={dispatch} renderNavRight={renderNavRight()}/>
      <SearchHeader/>
      <div className={styles[`${PrefixCls}-infobox`]}>
        <List>
          <Item><span className={styles[`${PrefixCls}-infobox-title`]}>本周数据</span></Item>
        </List>
        <div className={styles[`${PrefixCls}-infobox-container`]}>
          {/*topstart*/}
          <Flex>
            <Flex.Item>
              <div className={styles[`${PrefixCls}-infobox-container-items`]}>
                <img src={require('themes/images/spirit/phone.jpg')} alt=""/>
                <span>语音受理件<span>&nbsp;{`${vioceappept}件`}</span></span>

              </div>
            </Flex.Item>
            <Flex.Item>
              <div className={styles[`${PrefixCls}-infobox-container-items`]}>
                <img src={require('themes/images/spirit/video.jpg')} alt=""/>
                <span>多媒体受理件<span>&nbsp;{`${mediaappept}件`}</span></span>
              </div>
            </Flex.Item>
          </Flex>
          {/*middleStart*/}
          <Flex>
            <Flex.Item>
              <div className={styles[`${PrefixCls}-infobox-container-items`]}>
                <span>受理件 <span>&nbsp;{`${appept}件`}</span></span>
              </div>
            </Flex.Item>
            <Flex.Item>
              <div className={styles[`${PrefixCls}-infobox-container-items`]}>
                <span>回复件 <span>&nbsp;{`${reply}件`}</span></span>
              </div>
            </Flex.Item>
            <Flex.Item>
              <div className={styles[`${PrefixCls}-infobox-container-items`]}>
                <span>回复率 <span>&nbsp;{`${replyrate}`}</span></span>
              </div>
            </Flex.Item>
          </Flex>
          {/*bottomStart*/}
          <Flex>
            <Flex.Item>
              <div className={styles[`${PrefixCls}-infobox-container-items`]}>
                <span>办结件 <span>&nbsp;{`${handle}件`}</span></span>
              </div>
            </Flex.Item>
            <Flex.Item>
              <div className={styles[`${PrefixCls}-infobox-container-items`]}>
                <span>办结率 <span>&nbsp;{`${handlerate}`}</span></span>
              </div>
            </Flex.Item>
            <Flex.Item>
              <div className={styles[`${PrefixCls}-infobox-container-items`]}>
                <span>满意率 <span>&nbsp;{`${satisfied}`}</span></span>
              </div>
            </Flex.Item>
          </Flex>
        </div>
      </div>
      <WhiteSpace/>
      <Tabs
        initialPage={0}
        tabs={tabs}
        onChange={(tab, index) => {
          console.log('onChange', index, tab)
        }}
        onTabClick={(tab, index) => {
          console.log('onTabClick', index, tab)
        }}
      >
        <div>
          <PullToRefresh children={
            <div>
              {messages.map(message => getCard(message, dispatch))}
              <BaseLine/>
            </div>
          }/>
        </div>
        <div>
          <p style={{ margin: '20px' }}>没有更多数据了</p>
        </div>
        <div>
          <p style={{ margin: '20px' }}>没有更多数据了</p>
        </div>
      </Tabs>
      <WhiteSpace/>
      {/*<div style={{ height: '150px' }}></div>*/}
    </div>
  )
}

export default connect(({ loading, appeal }) => ({
  loading,
  appeal,
}))(Appeal)

import React from 'react'
import { connect } from 'dva'
import Nav from 'components/nav'
import { WhiteSpace, Icon, List, Flex, Tabs, Badge, Tag, Layout, Toast, Accordion, SearchBar, Modal } from 'components'
import SearchHeader from 'components/searchheader'
import ListView from 'components/listview'
import { routerRedux } from 'dva/router'
import StatusBox from 'components/statusbox'
import { appealList } from 'components/row'
import { getImages, getErrorImg, getLocalIcon, postionsToString } from 'utils'
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

function Appeal ({ location, dispatch, appeal, app }) {
  const { paginations, scrollerTop } = appeal, { isLogin } = app
  const emptyFunc = () => {
    },
    // getShtate = () => {
    //   return <StatusBox bg='#9c9595' status='不在办理范围'/>
    // },
    // getStatus = (status) => {
    //   switch (status) {
    //     case '0' :
    //       return <StatusBox bg='#f5b90c' status='待审核'/>
    //     case '1' :
    //     case '2' :
    //     case '3' :
    //     case '4' :
    //       return <StatusBox bg='#29ad2e' status='处理中'/>
    //     case '5' :
    //       return <StatusBox bg='#d45b5b' status='已完成'/>
    //   }
    // },
    // getImagesPage = (images, cls = '') => {
    //   if (cnIsArray(images) && images.length) {
    //     let i = 0
    //     return (
    //       <div className={styles[`${cls}-attrs`]}>
    //         {images.map((src, i) => i < 2 ?
    //           <div key={i} className={styles[`${cls}-attrs-img`]}
    //                style={{ backgroundImage: 'url(' + src + ')' }}></div> : '')}
    //       </div>
    //     )
    //   }
    //   return ''
    // },
    handleCollectClick = (data) => {
      if (isLogin) {
        dispatch({
          type: `${PrefixCls}/collent`,
          payload: {
            ...data,
          },
        })
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
        ])
      }

    },

    handleCardClick = ({ id }) => {
      dispatch({
        type: 'seekdetails/updateState',
        payload: {
          isTask: false,
        },
      })
      dispatch(routerRedux.push({
        pathname: '/seekdetails',
        query: {
          id,
        },
      }))
    },
    getAnswersPage = (answers, cls = '') => {
      if (cnIsArray(answers) && answers.length) {
        return (
          <div className={styles[`${cls}-answers`]}>
            {answers.map(({ content = '', createDate = '', dept = '', user = '', phone = '', id }) => {
              return content != '' ? (
                <div key={id}>
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
                    <div className={styles[`${cls}-answers-user`]}><span
                      style={{ color: '#1ab99d' }}>执行人 : </span>{user}
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

    // layoutRow = (rowData, sectionID, rowID) => {
    //   const { username, createDate, positions, title, state, content, images, answers, isCollect, id, shState, userPhoto, situatton } = rowData,
    //     getShtate = () => {
    //       return <StatusBox bg='#9c9595' status='不在办理范围'/>
    //     },
    //     getStatus = (status) => {
    //       switch (status) {
    //         case '0' :
    //           return <StatusBox bg='#f5b90c' status='待审核'/>
    //         case '1' :
    //         case '2' :
    //         case '3' :
    //         case '4' :
    //           return <StatusBox bg='#29ad2e' status='处理中'/>
    //         case '5' :
    //           return <StatusBox bg='#d45b5b' status='已完成'/>
    //       }
    //     },
    //     getImagesPage = (images, cls = '') => {
    //       if (cnIsArray(images) && images.length) {
    //         let i = 0
    //         return (
    //           <div className={styles[`${cls}-attrs`]}>
    //             {images.map((src, i) => i < 2 ?
    //               <div key={i} className={styles[`${cls}-attrs-img`]}
    //                    style={{ backgroundImage: 'url(' + src + ')' }}></div> : '')}
    //           </div>
    //         )
    //       }
    //       return ''
    //     },
    //     cls = `${PrefixCls}-card`
    //   return (
    //     <div key={id} className={styles[cls]} onClick={handleCardClick.bind(null, rowData)}>
    //       <div className={styles[`${cls}-info`]}>
    //         <img src={getImages(userPhoto, 'user')} alt=""/>
    //         <div className={styles[`${cls}-info-details`]}>
    //           <div className={styles[`${cls}-info-details-name`]}><span>{username}</span><span
    //             className={styles[`${cls}-info-details-name-type`]}>诉求类型：{situatton}</span></div>
    //           <div className={styles[`${cls}-info-details-others`]}>
    //             <div className={styles[`${cls}-info-details-others-date`]}>
    //               <span>{createDate}</span>
    //             </div>
    //             <div className={styles[`${cls}-info-details-others-pos`]}>
    //               <span>{positions}</span>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       <div className={styles[`${cls}-content-status`]} onClick={stopPropagation}>
    //         <span
    //           style={{ color: '#1ab99d' }}>当前状态:<span>{shState == '2' ? getShtate() : getStatus(state)}</span></span>
    //         <span>
    //         <Tag className={isLogin ? '' : styles[`${cls}-content-status-tag`]} selected={isCollect}
    //              onChange={handleCollectClick.bind(null, rowData)}>
    //         <Icon type={getLocalIcon('/others/collectionblack.svg')}/>
    //           {isCollect ? <span className={styles[`${cls}-content-status-collection`]}>已收藏</span>
    //             : <span className={styles[`${cls}-content-status-collection`]}>收藏</span>}
    //             </Tag>
    //       </span>
    //       </div>
    //       <div className={styles[`${cls}-content`]}>
    //         <div className={styles[`${cls}-content-title`]}>{title}</div>
    //         <div className={styles[`${cls}-content-content`]}>
    //           <span style={{ color: '#1ab99d' }}>问：</span>
    //           {content}
    //         </div>
    //       </div>
    //       {getImagesPage(images, cls)}
    //     </div>
    //   )
    // },
    onRefresh = (callback) => {

      dispatch({
        type: `${PrefixCls}/queryListview`,
        payload: {
          callback,
          isRefresh: true,
        },
      })
    },
    onEndReached = (callback) => {
      dispatch({
        type: `${PrefixCls}/queryListview`,
        payload: {
          callback,
        },
      })
    },
    onScrollerTop = (top) => {
      if (top && !isNaN(top * 1)) {
        dispatch({
          type: `${PrefixCls}/updateState`,
          payload: {
            scrollerTop: top,
          },
        })
      }
    },
    getContents = (lists) => {
      const result = [], { current, total, size } = paginations,
        hasMore = (total > 0) && ((current > 1 ? current - 1 : 1) * size < total),
        layoutList = <ListView layoutHeader={''} dataSource={lists} layoutRow={(rowData, sectionID, rowID) => appealList(rowData, sectionID, rowID,isLogin, handleCardClick,handleCollectClick)}
                               onEndReached={onEndReached}
                               onRefresh={onRefresh} hasMore={hasMore}
                               onScrollerTop={onScrollerTop.bind(null)}
                               scrollerTop={scrollerTop}
        />
      for (let i = 0; i < tabs.length; i++) {
        if (i == selectedIndex) {
          result.push(<div>{layoutList}</div>)
        } else {
          result.push(<div></div>)
        }
      }
      return result
    },
    getPositions = ({ street = '', district = '', city = '', province = '' }) => {
      return street || district || city || province
    },
    getDataList = (datas = []) => {
      const result = []
      datas.map(data => {
        const { username, shState, createDate, address = {}, title, state = 1, content, images = [], shoucang = false, id = '', shoucangId = '', userPhoto, situatton } = data
        result.push({
          username,
          createDate,
          positions: getPositions(address),
          title,
          state,
          content,
          images,
          answers: [],
          isCollect: shoucang,
          id,
          shState,
          shoucangId,
          situatton,
          userPhoto,
        })
      })
      return result
    },

    { btnDisabled, dataList, btnTitle, name, selectedIndex, workCount } = appeal,

    getCountList = (data = {}) => {
      const { shouli = 0, huifu = 0, huifulv = 0, banjie = 0, banjielv = 0 } = data

      return (
        <div className={styles[`${PrefixCls}-infobox-container`]}>
          {/*middleStart*/}
          <Flex>
            <Flex.Item>
              <div className={styles[`${PrefixCls}-infobox-container-items`]}>
                <span>受理件 <span>&nbsp;{`${shouli}件`}</span></span>
              </div>
            </Flex.Item>
            <Flex.Item>
              <div className={styles[`${PrefixCls}-infobox-container-items`]}>
                <span>回复件 <span>&nbsp;{`${huifu}件`}</span></span>
              </div>
            </Flex.Item>
            <Flex.Item>
              <div className={styles[`${PrefixCls}-infobox-container-items`]}>
                <span>回复率 <span>&nbsp;{`${huifulv}%`}</span></span>
              </div>
            </Flex.Item>
          </Flex>
          {/*bottomStart*/}
          <Flex>
            <Flex.Item>
              <div className={styles[`${PrefixCls}-infobox-container-items`]}>
                <span>办结件 <span>&nbsp;{`${banjie}件`}</span></span>
              </div>
            </Flex.Item>
            <Flex.Item>
              <div className={styles[`${PrefixCls}-infobox-container-items`]}>
                <span>办结率 <span>&nbsp;{`${banjielv}`}</span></span>
              </div>
            </Flex.Item>
            <Flex.Item>
              <div className={styles[`${PrefixCls}-infobox-container-items`]}>
                <span>满意率 <span>&nbsp;{`${100}%`}</span></span>
              </div>
            </Flex.Item>
          </Flex>
        </div>
      )
    }

  const btnVisible = (visible = true) => {
      dispatch({
        type: `${PrefixCls}/updateState`,
        payload: {
          btnDisabled: visible,
        },
      })
    },
    handleWarningClick = (name = '') => {
      btnVisible()
      const onSuccess = (postions = {}) => {
          btnVisible(false)
          dispatch(routerRedux.push({
            pathname: '/warning',
            query: {
              name,
              location: postionsToString(postions),
            },
          }))
        },
        onError = ({ message = '', code = -999 }) => {
          btnVisible(false)
          let msg = code == -999 ? message : '请允许系统访问您的位置。'
          Toast.offline(msg, 2)
        }
      cnGetCurrentPosition(onSuccess, onError)
    },
    renderNavRight = (handleClick) => {
      return isLogin ? (
        btnDisabled ?
          <div className={styles[`${PrefixCls}-nav`]}>
            <Icon type='loading'/>
            <span>{btnTitle}</span>
          </div> :
          <div className={styles[`${PrefixCls}-nav`]} onClick={handleClick}>
            <Icon type={getLocalIcon('/others/sendup.svg')}/>
            <span>{btnTitle}</span>
          </div>
      ) : ''
    },
    currentDataList = getDataList(dataList)
    ,
    handleTabClick = (tab, index) => {
      dispatch({
        type: `${PrefixCls}/queryListview`,
        payload: {
          selected: index,
          isRefresh: true,
        },
      })
    },
    handleSearchClick = () => {
      dispatch(routerRedux.push({
        pathname: `/search`,
        query: {
          router: PrefixCls,
        },
      }))
    }

  return (
    <div>
      <Nav title={name} dispatch={dispatch}
           renderNavRight={renderNavRight(handleWarningClick.bind(null, btnTitle))}/>
      {/*<SearchHeader title='自助搜索 : ' text = {`在${name || '此页面'}中搜索`} onClick={handleSearchClick}/>*/}
      <SearchBar placeholder={`在${name || '此页面'}中搜索`}
                 maxLength={20}
                 onFocus={handleSearchClick}/>
      <Accordion defaultActiveKey="0" className="my-accordion">
        <Accordion.Panel header={<span>本周数据</span>} className="pad">
          <div className={styles[`${PrefixCls}-infobox`]}>
            {getCountList(workCount)}
          </div>
        </Accordion.Panel>
      </Accordion>
      <WhiteSpace/>
      <Tabs
        initialPage={0}
        page={selectedIndex}
        tabs={tabs}
        swipeable={false}
        onChange={(tab, index) => {
        }}
        onTabClick={handleTabClick}
      >
        {currentDataList.length > 0 && getContents(currentDataList)}
      </Tabs>
      <WhiteSpace/>
    </div>
  )
}

export default connect(({ loading, appeal, app }) => ({
  loading,
  appeal,
  app,
}))(Appeal)

// import styles from './index.less'
// import React from 'react'
// import { List, Badge, Icon, Tag, Card } from 'antd-mobile'
// import { getErrorImg, getImages, getLocalIcon } from 'utils'
// import StatusBox from 'components/statusbox'
// import Rate from 'rc-rate'
// import '../../../node_modules/rc-rate/assets/index.css'
//
// const PrefixCls = 'row',
//   Item = List.Item,
//   Brief = Item.Brief
//
// module.exports = {
//   layoutRow: (rowData, sectionID, rowID, onClick) => {
//     const { title = '', image = '', time = '' ,isNew=false} = rowData
//     let result = (
//       <Item className={styles[`${PrefixCls}-item`]}
//             key={`${PrefixCls}-${sectionID}-${rowID}`}
//             thumb={image || ''} multipleLine wrap arrow='horizontal'
//             onClick={onClick.bind(null, rowData)}
//       >
//         <span>{title}</span>
//         <Brief>{time}</Brief>
//       </Item>
//     )
//     return isNew ?
//       <div className={styles[`${PrefixCls}-newbox`]}><Badge key={`badge - ${sectionID} - ${rowID}`} text={'新'} corner>
//         {result}
//       </Badge></div>
//       :
//       result
//   },
//   message: (rowData, sectionID, rowID, onClick) => {
//     let isNew = rowData.flag === '0'
//     let result = (
//       <Item
//         className={'row'}
//         key={`${sectionID} - ${rowID}`}
//         arrow="horizontal"
//         multipleLine
//         onClick={onClick.bind(null, rowData.id)}
//         wrap
//       >
//         <div className={`${styles[`${PrefixCls}-message-title`]} ${isNew ? 'news' : ''}`}>
//           <h3>{rowData.title}</h3>
//         </div>
//         <div className={styles[`${PrefixCls}-message-content`]}>{rowData.content}</div>
//         <Brief>
//           {rowData.time}
//         </Brief>
//       </Item>
//     )
//
//     return !isNew ? result :
//       <Badge key={`badge - ${sectionID} - ${rowID}`} text={'新'} corner>
//         {result}
//       </Badge>
//   },
//
//   lawyerList: (rowData, handleOnclick = () => {
//   }) => {
//     return rowData && rowData.map((data, i) => {
//       const { _attributes = {}, title, image } = data, { tel = '', office, info = [], irate = '0' } = _attributes
//       return (
//         <div key={i} className={styles[`${PrefixCls}-lawyer-outer`]} onClick={handleOnclick.bind(null, data)}>
//           <div className={styles[`${PrefixCls}-lawyer-outer-left`]}>
//             <img src={getImages(image, 'user')} alt=""/>
//             <div className={styles[`${PrefixCls}-lawyer-outer-right`]}>
//               <div className={styles[`${PrefixCls}-lawyer-outer-right-title`]}>
//                 <span className={styles[`${PrefixCls}-lawyer-outer-right-title-name`]}>{title}</span>
//                 <Rate defaultValue={irate}/>
//                 {/*<span><Icon type={getLocalIcon('/others/king.svg')}/></span>*/}
//               </div>
//               <div className={styles[`${PrefixCls}-lawyer-outer-right-adress`]}>
//                 <span><Icon type={getLocalIcon('/login/phone.svg')} size='xxs'/></span>
//                 <div className={styles[`${PrefixCls}-lawyer-outer-right-adress-info`]}>{tel}</div>
//               </div>
//               <div className={styles[`${PrefixCls}-lawyer-outer-right-adress-info`]}>{office}</div>
//               <div className={styles[`${PrefixCls}-lawyer-outer-right-tag`]}>
//                 {
//                   data.info && data.info.map((data, i) => (
//                     <span key={i} className={styles[`${PrefixCls}-lawyer-outer-right-tag-info`]}>{info}</span>
//                   ))
//                 }
//               </div>
//             </div>
//           </div>
//           <div className={styles[`${PrefixCls}-lawyer-outer-phone`]} onClick={(e) => e.stopPropagation()}><a
//             href={`tel:${tel}`}><Icon type={getLocalIcon('/others/call.svg')} size='lg'/></a></div>
//         </div>
//       )
//     })
//
//   },
//
//   officeList: (rowData, handleOnclick = () => {
//   }) => {
//     return rowData && rowData.map((data, i) => {
//       const { _attributes = {}, title, image } = data, { type = [], year = 1, tel = '', rates = 0 } = _attributes
//       return (
//         <div key={i} className={styles[`${PrefixCls}-office-outer`]} onClick={handleOnclick.bind(null, data)}>
//           <div className={styles[`${PrefixCls}-office-outer-left`]}>
//             {image && <img src={getImages(image)} alt=""/>}
//           </div>
//           <div className={styles[`${PrefixCls}-office-outer-right`]}>
//             <div className={styles[`${PrefixCls}-office-outer-right-title`]}>
//               <div className={styles[`${PrefixCls}-office-outer-right-title-box`]}>
//                 <p className={styles[`${PrefixCls}-office-outer-right-title-box-name`]}>{title}</p>
//                 <p className={styles[`${PrefixCls}-office-outer-right-title-box-type`]}>
//                   {
//                     type && type.map((data, i) => (
//                       <span>{data}</span>
//                     ))
//                   }
//                 </p>
//               </div>
//               <div className={styles[`${PrefixCls}-office-outer-right-title-time`]}>{`${year}年`}</div>
//             </div>
//             <div className={styles[`${PrefixCls}-office-outer-right-info`]}>
//               <div className={styles[`${PrefixCls}-office-outer-right-info-left`]}>
//                 <div>{tel}</div>
//                 <Rate defaultValue={rates}/>
//               </div>
//               <div className={styles[`${PrefixCls}-office-outer-right-info-right`]}
//                    onClick={(e) => e.stopPropagation()}>
//                 <a href={`tel:${tel}`}>咨询</a>
//               </div>
//             </div>
//           </div>
//         </div>
//       )
//     })
//   },
//   integralList: ({ title = '', number = 0, info = '', index = 0, isCount = 0, userPhoto = '', isUser = false }) => {
//     return (
//       <div className={styles[`${PrefixCls}-integral-outer`]}>
//         <div className={styles[`${PrefixCls}-integral-outer-left`]}>
//           <span>{index}</span>
//           {
//             isUser ? <div className={styles[`${PrefixCls}-integral-outer-left-img`]}>
//                 <img src={getImages(userPhoto, 'user')} alt=""/>
//               </div>
//               :
//               ''
//           }
//           <span>{title}</span>
//         </div>
//         <div className={styles[`${PrefixCls}-integral-outer-right`]}>
//           <div className={styles[`${PrefixCls}-integral-outer-right-info`]}>
//             <span>{number}</span>
//             <span>{info}</span>
//           </div>
//           {
//             isCount > 0 ? <div className={styles[`${PrefixCls}-integral-outer-right-star`]}>
//                 <span>{isCount}</span>
//                 <span><Icon type={getLocalIcon('/others/star.svg')}/></span>
//               </div>
//               :
//               ''
//           }
//         </div>
//       </div>
//     )
//   },
//   companyList: ({ title = '', number = 0, info = '', index = 0, isCount = 0 }) => {
//     return (
//       <div className={styles[`${PrefixCls}-integral-outer`]}>
//         <div className={styles[`${PrefixCls}-integral-outer-left`]}>
//           <span>{index}</span>
//           <div className={styles[`${PrefixCls}-integral-outer-left-img`]}>
//             <img src={getImages('', 'user')} alt=""/>
//           </div>
//           <span>{title}</span>
//         </div>
//         <div className={styles[`${PrefixCls}-integral-outer-right`]}>
//           <div className={styles[`${PrefixCls}-integral-outer-right-info`]}>
//             <span>{number}</span>
//             <span>{info}</span>
//           </div>
//           {
//             isCount > 0 ? <div className={styles[`${PrefixCls}-integral-outer-right-star`]}>
//                 <span>{isCount}</span>
//                 <span><Icon type={getLocalIcon('/others/star.svg')}/></span>
//               </div>
//               :
//               ''
//           }
//         </div>
//       </div>
//     )
//   },
//   appealList: (rowData, sectionID, rowID, isLogin, handleCardClick, handleCollectClick) => {
//     const { username, createDate, positions, title, state, content, images, answers, shoucang, id, shState, userPhoto, situatton } = rowData,
//       stopPropagation = (e) => {
//         e.stopPropagation()
//       },
//       getShtate = () => {
//         return <StatusBox bg='#9c9595' status='不在办理范围'/>
//       },
//       getStatus = (status) => {
//         switch (status) {
//           case '0' :
//             return <StatusBox bg='#f5b90c' status='待审核'/>
//           case '1' :
//           case '2' :
//           case '3' :
//           case '4' :
//             return <StatusBox bg='#29ad2e' status='处理中'/>
//           case '5' :
//             return <StatusBox bg='#d45b5b' status='已完成'/>
//         }
//       },
//       getImagesPage = (images, cls = '') => {
//         if (cnIsArray(images) && images.length) {
//           let i = 0
//           return (
//             <div className={styles[`${cls}-attrs`]}>
//               {images.map((src, i) => i < 2 ?
//                 <div key={i} className={styles[`${cls}-attrs-img`]}
//                      style={{ backgroundImage: 'url(' + src + ')' }}></div> : '')}
//             </div>
//           )
//         }
//         return ''
//       },
//       cls = `${PrefixCls}-card`
//     return (
//       <div key={id} className={styles[cls]} onClick={handleCardClick.bind(null, rowData)}>
//         <div className={styles[`${cls}-info`]}>
//           <img src={getImages(userPhoto, 'user')} alt=""/>
//           <div className={styles[`${cls}-info-details`]}>
//             <div className={styles[`${cls}-info-details-name`]}><span>{username}</span><span
//               className={styles[`${cls}-info-details-name-type`]}>诉求类型：{situatton}</span></div>
//             <div className={styles[`${cls}-info-details-others`]}>
//               <div className={styles[`${cls}-info-details-others-date`]}>
//                 <span>{createDate}</span>
//               </div>
//               <div className={styles[`${cls}-info-details-others-pos`]}>
//                 <span>{positions}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className={styles[`${cls}-content-status`]} onClick={stopPropagation}>
//           <span>{shState == '2' ? getShtate() : getStatus(state)}</span>
//           <span>
//             <Tag className={isLogin ? '' : styles[`${cls}-content-status-tag`]} selected={shoucang}
//                  onChange={handleCollectClick.bind(null, rowData)}>
//             <Icon type={getLocalIcon('/others/collectionblack.svg')}/>
//               {shoucang ? <span className={styles[`${cls}-content-status-collection`]}>已收藏</span>
//                 : <span className={styles[`${cls}-content-status-collection`]}>收藏</span>}
//                 </Tag>
//           </span>
//         </div>
//         <div className={styles[`${cls}-content`]}>
//           <div className={styles[`${cls}-content-title`]}>{title}</div>
//           <div className={styles[`${cls}-content-content`]}>
//             <span style={{ color: '#1ab99d' }}>问：</span>
//             {content}
//           </div>
//         </div>
//         {getImagesPage(images, cls)}
//       </div>
//     )
//   },
//   twoStupidRow: (rowData, sectionID, rowID) => {
//
//     const { wentifenlei = '', neirong = '' } = rowData
//     return <div key={rowID} className={styles[`${PrefixCls}-towstupidouter`]}>
//       <Card>
//         <Card.Header
//           title="问题类型"
//           extra={<span>{wentifenlei}</span>}
//         />
//         <Card.Body>
//           <div>{neirong}</div>
//         </Card.Body>
//       </Card>
//     </div>
//   },
//   baseVoiceRow: (rowData, sectionID, rowID) => {
//     const { yijian, ...others } = rowData,
//       layoutInputItem = (others) => {
//         const { bumen, zeren, dingban, shixian, fangshi, xiaohao, sumu } = others
//         return <div className={styles[`${PrefixCls}-basevoice-items`]}>
//             <span>交办部门：</span>{bumen}<br/>
//             <span>责任人：</span>{zeren}<br/>
//             <span>盯办人:</span>{dingban}<br/>
//             <span>完成时限：</span>{shixian}<br/>
//             <span>解决方式：</span>{fangshi}<br/>
//             <span>销号情况：</span>{xiaohao}<br/>
//           </div>
//
//       }
//     if (yijian != '') {
//       return <div key={rowID} className={styles[`${PrefixCls}-basevoice`]} >
//         <Card full={true}>
//           <Card.Header title={<span className={styles[`${PrefixCls}-basevoice-title`]}>{yijian}</span>}/>
//           <Card.Body>
//             {layoutInputItem(others)}
//           </Card.Body>
//         </Card>
//       </div>
//     }
//
//   },
//
//   patryWorkRow:(rowData, sectionID, rowID) => {
//     const {zuzhi,wenti} = rowData
//     return (
//       <div key={rowID} className={styles[`${PrefixCls}-organization`]}>
//         <Card>
//           <Card.Header
//             title="党组织"
//             thumb={require('./dangjian.png')}
//             extra={<span className={styles[`${PrefixCls}-organization-item`]}>{zuzhi}</span>}
//           />
//           <Card.Body>
//             <div>{wenti}</div>
//           </Card.Body>
//         </Card>
//       </div>
//     )
// }
//
// }


import styles from './index.less'
import React from 'react'
import { List, Badge, Icon, Tag, Card } from 'antd-mobile'
import { getErrorImg, getImages, getLocalIcon } from 'utils'
import StatusBox from 'components/statusbox'
import Rate from 'rc-rate'
import '../../../node_modules/rc-rate/assets/index.css'

const PrefixCls = 'row',
  Item = List.Item,
  Brief = Item.Brief

module.exports = {
  layoutRow: (rowData, sectionID, rowID, onClick) => {
    const { title = '', image = '', time = '', isNew = false } = rowData
    let result = (
      <Item className={styles[`${PrefixCls}-item`]}
            key={`${PrefixCls}-${sectionID}-${rowID}`}
            thumb={image || ''} multipleLine wrap arrow='horizontal'
            onClick={onClick.bind(null, rowData)}
      >
        <span>{title}</span>
        <Brief>{time}</Brief>
      </Item>
    )
    return isNew ?
      <div className={styles[`${PrefixCls}-newbox`]}><Badge key={`badge - ${sectionID} - ${rowID}`} text={'新'} corner>
        {result}
      </Badge></div>
      :
      result
  },
  message: (rowData, sectionID, rowID, onClick) => {
    let isNew = rowData.flag === '0'
    let result = (
      <Item
        className={'row'}
        key={`${sectionID} - ${rowID}`}
        arrow="horizontal"
        multipleLine
        onClick={onClick.bind(null, rowData.id)}
        wrap
      >
        <div className={`${styles[`${PrefixCls}-message-title`]} ${isNew ? 'news' : ''}`}>
          <h3>{rowData.title}</h3>
        </div>
        <div className={styles[`${PrefixCls}-message-content`]}>{rowData.content}</div>
        <Brief>
          {rowData.time}
        </Brief>
      </Item>
    )

    return !isNew ? result :
      <Badge key={`badge - ${sectionID} - ${rowID}`} text={'新'} corner>
        {result}
      </Badge>
  },

  lawyerList: (rowData, handleOnclick = () => {
  }) => {
    return rowData && rowData.map((data, i) => {
      const { _attributes = {}, title, image } = data, { tel = '', office, info = [], irate = '0' } = _attributes
      return (
        <div key={i} className={styles[`${PrefixCls}-lawyer-outer`]} onClick={handleOnclick.bind(null, data)}>
          <div className={styles[`${PrefixCls}-lawyer-outer-left`]}>
            <img src={getImages(image, 'user')} alt=""/>
            <div className={styles[`${PrefixCls}-lawyer-outer-right`]}>
              <div className={styles[`${PrefixCls}-lawyer-outer-right-title`]}>
                <span className={styles[`${PrefixCls}-lawyer-outer-right-title-name`]}>{title}</span>
                <Rate style={{ fontSize: '16px' }} defaultValue={irate}/>
                {/*<span><Icon type={getLocalIcon('/others/king.svg')}/></span>*/}
              </div>
              <div className={styles[`${PrefixCls}-lawyer-outer-right-adress`]}>
                <span><Icon type={getLocalIcon('/login/phone.svg')} size='xxs'/></span>
                <div className={styles[`${PrefixCls}-lawyer-outer-right-adress-info`]}>{tel}</div>
              </div>
              <div className={styles[`${PrefixCls}-lawyer-outer-right-adress-info`]}>{office}</div>
              <div className={styles[`${PrefixCls}-lawyer-outer-right-tag`]}>
                {
                  info && info.map((data, i) => (
                    <Tag style={{ marginRight: '5px', color: '#108ee9', borderColor: '#108ee9' }} small>{data}</Tag>
                  ))
                }
              </div>
            </div>
          </div>
          <div className={styles[`${PrefixCls}-lawyer-outer-phone`]} onClick={(e) => e.stopPropagation()}><a
            href={`tel:${tel}`}><Icon type={getLocalIcon('/others/call.svg')} size='lg'/></a></div>
        </div>
      )
    })

  },

  officeList: (rowData, handleOnclick = () => {
  }) => {
    return rowData && rowData.map((data, i) => {
      const { _attributes = {}, title, image } = data, { type = [], year = 1, tel = '', rates = 0 } = _attributes
      return (
        <div key={i} className={styles[`${PrefixCls}-office-outer`]} onClick={handleOnclick.bind(null, data)}>
          <div className={styles[`${PrefixCls}-office-outer-left`]}>
            {image && <img src={getImages(image)} alt=""/>}
          </div>
          <div className={styles[`${PrefixCls}-office-outer-right`]}>
            <div className={styles[`${PrefixCls}-office-outer-right-title`]}>
              <div className={styles[`${PrefixCls}-office-outer-right-title-box`]}>
                <p className={styles[`${PrefixCls}-office-outer-right-title-box-name`]}>{title}</p>
                <p className={styles[`${PrefixCls}-office-outer-right-title-box-type`]}>
                  {
                    type && type.map((data, i) => (
                      <span>{data}</span>
                    ))
                  }
                </p>
              </div>
              <div className={styles[`${PrefixCls}-office-outer-right-title-time`]}>{`${year}年`}</div>
            </div>
            <div className={styles[`${PrefixCls}-office-outer-right-info`]}>
              <div className={styles[`${PrefixCls}-office-outer-right-info-left`]}>
                <div>{tel}</div>
                <Rate style={{ fontSize: '20px' }} defaultValue={rates}/>
              </div>
              <div className={styles[`${PrefixCls}-office-outer-right-info-right`]}
                   onClick={(e) => e.stopPropagation()}>
                <a href={`tel:${tel}`}>咨询</a>
              </div>
            </div>
          </div>
        </div>
      )
    })
  },
  integralList: ({ title = '', number = 0, info = '', index = 0, isCount = 0, userPhoto = '', isUser = false }) => {
    return (
      <div className={styles[`${PrefixCls}-integral-outer`]}>
        <div className={styles[`${PrefixCls}-integral-outer-left`]}>
          <span>{index}</span>
          {
            isUser ? <div className={styles[`${PrefixCls}-integral-outer-left-img`]}>
                <img src={getImages(userPhoto, 'user')} alt=""/>
              </div>
              :
              ''
          }
          <span>{title}</span>
        </div>
        <div className={styles[`${PrefixCls}-integral-outer-right`]}>
          <div className={styles[`${PrefixCls}-integral-outer-right-info`]}>
            <span>{number}</span>
            <span>{info}</span>
          </div>
          {
            isCount > 0 ? <div className={styles[`${PrefixCls}-integral-outer-right-star`]}>
                <span>{isCount}</span>
                <span><Icon type={getLocalIcon('/others/star.svg')}/></span>
              </div>
              :
              ''
          }
        </div>
      </div>
    )
  },
  companyList: ({ title = '', number = 0, info = '', index = 0, isCount = 0 }) => {
    return (
      <div className={styles[`${PrefixCls}-integral-outer`]}>
        <div className={styles[`${PrefixCls}-integral-outer-left`]}>
          <span>{index}</span>
          <div className={styles[`${PrefixCls}-integral-outer-left-img`]}>
            <img src={getImages('', 'user')} alt=""/>
          </div>
          <span>{title}</span>
        </div>
        <div className={styles[`${PrefixCls}-integral-outer-right`]}>
          <div className={styles[`${PrefixCls}-integral-outer-right-info`]}>
            <span>{number}</span>
            <span>{info}</span>
          </div>
          {
            isCount > 0 ? <div className={styles[`${PrefixCls}-integral-outer-right-star`]}>
                <span>{isCount}</span>
                <span><Icon type={getLocalIcon('/others/star.svg')}/></span>
              </div>
              :
              ''
          }
        </div>
      </div>
    )
  },
  appealList: (rowData, sectionID, rowID, isLogin, handleCardClick, handleCollectClick) => {
    const { username, createDate, positions, title, state, content, images, answers, shoucang, id, shState, userPhoto, situatton } = rowData,
      stopPropagation = (e) => {
        e.stopPropagation()
      },
      getShtate = () => {
        return <StatusBox bg='#9c9595' status='不在办理范围'/>
      },
      getStatus = (status) => {
        switch (status) {
          case '0' :
            return <StatusBox bg='#f5b90c' status='待审核'/>
          case '1' :
          case '2' :
          case '3' :
          case '4' :
          case '6' :
          case '7' :
            return <StatusBox bg='#29ad2e' status='处理中'/>
          case '5' :
            return <StatusBox bg='#d45b5b' status='已完成'/>
        }
      },
      getImagesPage = (images, cls = '') => {
        if (cnIsArray(images) && images.length) {
          let i = 0
          return (
            <div className={styles[`${cls}-attrs`]}>
              {images.map((src, i) => i < 2 ?
                <div key={i} className={styles[`${cls}-attrs-img`]}
                     style={{ backgroundImage: 'url(' + src + ')' }}></div> : '')}
            </div>
          )
        }
        return ''
      },
      cls = `${PrefixCls}-card`
    return (
      <div key={id} className={styles[cls]} onClick={handleCardClick.bind(null, rowData)}>
        <div className={styles[`${cls}-info`]}>
          <img src={getImages(userPhoto, 'user')} alt=""/>
          <div className={styles[`${cls}-info-details`]}>
            <div className={styles[`${cls}-info-details-name`]}><span>{username}</span><span
              className={styles[`${cls}-info-details-name-type`]}>诉求类型：{situatton}</span></div>
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
        <div className={styles[`${cls}-content-status`]} onClick={stopPropagation}>
          <span>{shState == '2' ? getShtate() : getStatus(state)}</span>
          <span>
            <Tag className={isLogin ? '' : styles[`${cls}-content-status-tag`]} selected={shoucang}
                 onChange={handleCollectClick.bind(null, rowData)}>
            <Icon type={getLocalIcon('/others/collectionblack.svg')}/>
              {shoucang ? <span className={styles[`${cls}-content-status-collection`]}>已收藏</span>
                : <span className={styles[`${cls}-content-status-collection`]}>收藏</span>}
                </Tag>
          </span>
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
  },
  twoStupidRow: (rowData, sectionID, rowID) => {

    const { wentifenlei = '', neirong = '' } = rowData
    return <div key={rowID} className={styles[`${PrefixCls}-towstupidouter`]}>
      <Card>
        <Card.Header
          title="问题类型"
          extra={<span>{wentifenlei}</span>}
        />
        <Card.Body>
          <div>{neirong}</div>
        </Card.Body>
      </Card>
    </div>
  },
  baseVoiceRow: (rowData, sectionID, rowID) => {
    const { yijian, ...others } = rowData,
      layoutInputItem = (others) => {
        const { bumen, zeren, dingban, shixian, fangshi, xiaohao, sumu } = others
        return <div className={styles[`${PrefixCls}-basevoice-items`]}>
          <span>交办部门：</span>{bumen}<br/>
          <span>责任人：</span>{zeren}<br/>
          <span>盯办人:</span>{dingban}<br/>
          <span>完成时限：</span>{shixian}<br/>
          <span>解决方式：</span>{fangshi}<br/>
          <span>销号情况：</span>{xiaohao}<br/>
        </div>

      }
    if (yijian != '') {
      return <div key={rowID} className={styles[`${PrefixCls}-basevoice`]}>
        <Card full={true}>
          <Card.Header title={<span className={styles[`${PrefixCls}-basevoice-title`]}>{yijian}</span>}/>
          <Card.Body>
            {layoutInputItem(others)}
          </Card.Body>
        </Card>
      </div>
    }

  },

  patryWorkRow: (rowData, sectionID, rowID) => {
    const { zuzhi, wenti } = rowData
    return (
      <div key={rowID} className={styles[`${PrefixCls}-organization`]}>
        <Card>
          <Card.Header
            title="党组织"
            thumb={require('./dangjian.png')}
            extra={<span className={styles[`${PrefixCls}-organization-item`]}>{zuzhi}</span>}
          />
          <Card.Body>
            <div>{wenti}</div>
          </Card.Body>
        </Card>
      </div>
    )
  },
  legalRow: (rowData, sectionID, rowID) => {
    const { uname, uavatar, createDate, positions, questions, types, replys, replyDate } = rowData
    return (
      <div className={styles[`${PrefixCls}-legalcards`]}>
        <div className={styles[`${PrefixCls}-legalinfo`]}>
          <img src={getImages(uavatar, 'user')} alt=""/>
          <div className={styles[`${PrefixCls}-legalinfo-details`]}>
            <div className={styles[`${PrefixCls}-legalinfo-details-name`]}><span>{uname}</span>
              <div className={styles[`${PrefixCls}-legalask-info`]}>
                <span className={styles[`${PrefixCls}-legalask-info-type`]}>{types}</span>
              </div>
            </div>
            <div className={styles[`${PrefixCls}-legalinfo-details-others`]}>
              <div className={styles[`${PrefixCls}-legalinfo-details-others-date`]}>
                <span>{createDate}</span>
              </div>
              <div className={styles[`${PrefixCls}-legalinfo-details-others-pos`]}>
                <span>{positions}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles[`${PrefixCls}-legalask`]}>
             <span>
              {questions}
             </span>
        </div>
        {replys != '' ?
          <div className={styles[`${PrefixCls}-legalreply`]}>
            <div className={styles[`${PrefixCls}-legalreply-title`]}><span>回复：</span></div>
            <div>{replys}</div>
            <div className={styles[`${PrefixCls}-legalreply-date`]}>{replyDate}</div>
          </div>
          :
          ''
        }
      </div>
    )
  },
  notaryRow: (rowData, sectionID, rowID) => {
    const { _attributes = {}, title, image } = rowData, { tel = '', number = '', office = '' } = _attributes
    return (
      <div key={rowID} className={styles[`${PrefixCls}-notary-outer`]}>
        <div className={styles[`${PrefixCls}-notary-outer-left`]}>
          <img src={getImages(image, 'user')} alt=""/>
          <div className={styles[`${PrefixCls}-notary-outer-right`]}>
            <div className={styles[`${PrefixCls}-notary-outer-right-title`]}>
              <span className={styles[`${PrefixCls}-notary-outer-right-title-name`]}>{title}</span>
            </div>
            <div className={styles[`${PrefixCls}-notary-outer-right-adress`]}>
              <span><Icon type={getLocalIcon('/login/phone.svg')} size='xxs'/></span>
              <div className={styles[`${PrefixCls}-notary-outer-right-adress-info`]}>{tel}</div>
            </div>
            <div className={styles[`${PrefixCls}-notary-outer-right-adress`]}>
              <span><Icon type={getLocalIcon('/others/NO.svg')} size='xxs'/></span>
              <div className={styles[`${PrefixCls}-notary-outer-right-adress-info`]}>{number}</div>
            </div>
            <div className={styles[`${PrefixCls}-notary-outer-right-adress-info`]}>{office}</div>
          </div>
        </div>
        <div className={styles[`${PrefixCls}-lawyer-outer-phone`]} onClick={(e) => e.stopPropagation()}><a
          href={`tel:${tel}`}><Icon type={getLocalIcon('/others/call.svg')} size='lg'/></a></div>
      </div>
    )
  },
  taskRow: (rowData, sectionID, rowID, onClick) => {
    const { noViewCount, taskTitle, content, taskInfo } = rowData
    return (
          <Item
            key={rowID}
            multipleLine
            onClick={onClick.bind(null, rowData)}
            wrap
            extra={<Badge text={noViewCount > 0 ? noViewCount : ''} overflowCount={99}/>}
            align="top"
          >
            <div className={`${styles[`${PrefixCls}-message-title`]}`}>
              <h3>{taskTitle}</h3>
            </div>
            <div className={styles[`${PrefixCls}-message-content`]}>{content}</div>
            <Brief>
              {taskInfo}
            </Brief>
          </Item>
    )
  },
  reactRow: (rowData, sectionID, rowID, onClick) => {
    const getShstate = (shtate, state) => {
        if (shtate == '0') {
          return <span style={{ color: '#ccb820' }}>●正在审核</span>
        } else if (shtate == '2') {
          return <span style={{ color: '#9c9595' }}>●不在办理范围</span>
        } else {
          return getStatus(state)
        }
      },
      getStatus = (status) => {
        switch (status) {
          case '0' :
            return <span style={{ color: '#f5b90c' }}>●待审核</span>
          case '1' :
          case '2' :
          case '3' :
          case '4' :
          case '6' :
          case '7' :
            return <span style={{ color: '#29ad2e' }}>●处理中</span>
          case '5' :
            return <span style={{ color: '#d45b5b' }}>●已完成</span>
        }
      }
      const {content,createDate,shState,state } = rowData
    return (
        <Item
          key={rowID}
          className={styles[`${PrefixCls}-item`]}
          multipleLine
          onClick={onClick.bind(this, rowData)}
        >
          {content}
          <div className={styles[`${PrefixCls}-item-status`]}>
            <span>{createDate}</span>
            <span>{getShstate(shState, state)}</span>
          </div>
        </Item>
    )
  },
}

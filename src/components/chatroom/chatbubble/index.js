import React from 'react'
import styles from './index.less'
import { Flex, WhiteSpace } from 'components'
import { getImages, getErrorImg } from 'utils'
import {Css3Loading,LoadingFail} from 'components/loading'
import Voice from '../voice'

const PrefixCls = 'bubble'

module.exports = {

  ReceiveBubble: () => {
    return (
      <div className={styles[`${PrefixCls}-left`]}>
    <span className={styles[`${PrefixCls}-left-iconbox`]}>
        <img src={getImages('', 'user')}/>
    </span>
        <div className={styles[`${PrefixCls}-left-contentbox`]}>
          及时跟踪处理
        </div>
      </div>
    )
  },
  ReceiveImgBubble: () => {
    return (
      <div className={styles[`${PrefixCls}-left`]}>
    <span className={styles[`${PrefixCls}-left-iconbox`]}>
        <img src={getImages('', 'user')}/>
    </span>
        <div className={styles[`${PrefixCls}-left-contentbox`]}>
          <img style={{ width: '98%' }} src={require('themes/images/shouhu/3.jpg')}/>
        </div>
      </div>
    )
  },
  ReplyBubble: (props) => {
    return (
      <div className={styles[`${PrefixCls}-right`]}>
    <span className={styles[`${PrefixCls}-right-iconbox`]}>
        <img src={getImages('', 'user')}/>
    </span>
        <div className={styles[`${PrefixCls}-right-contentbox`]}>
          {props.content}
        </div>
        <div className={styles[`${PrefixCls}-right-loading`]}><Css3Loading/></div>
      </div>
    )
  }

}

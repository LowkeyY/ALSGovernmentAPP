import styles from './index.less'
import { Flex, WhiteSpace } from 'antd-mobile';
import { getImages,getErrorImg } from 'utils'

const PrefixCls = 'bubble'

module.exports = {

  ReceiveBubble: () => {
    return (
      <div className={styles[`${PrefixCls}-left`]}>
    <span className={styles[`${PrefixCls}-left-iconbox`]}>
        <img src={getImages('','user')} />
    </span>
        <div className={styles[`${PrefixCls}-left-contentbox`]}>
          撒旦法师打发撒旦的师傅撒大法师的法撒旦法师的发第三方第三方
        </div>
      </div>
    )
  },
  ReplyBubble: () => {
    return (
      <div className={styles[`${PrefixCls}-right`]}>
    <span className={styles[`${PrefixCls}-right-iconbox`]}>
        <img src={getImages('','user')} />
    </span>
        <div className={styles[`${PrefixCls}-right-contentbox`]}>
         撒旦法撒旦法师的发撒地方
        </div>
      </div>
    )
  }
}

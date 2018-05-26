import styles from './index.less'
import { Flex, WhiteSpace } from 'antd-mobile'
import { getImages, getErrorImg } from 'utils'

const PrefixCls = 'bubble'

module.exports = {

  ReceiveBubble: () => {
    return (
      <div className={styles[`${PrefixCls}-left`]}>
    <span className={styles[`${PrefixCls}-left-iconbox`]}>
        <img src={getImages('', 'user')}/>
    </span>
        <div className={styles[`${PrefixCls}-left-contentbox`]}>
          及时跟踪处理情况
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
  ReplyBubble: () => {
    return (
      <div className={styles[`${PrefixCls}-right`]}>
    <span className={styles[`${PrefixCls}-right-iconbox`]}>
        <img src={getImages('', 'user')}/>
    </span>
        <div className={styles[`${PrefixCls}-right-contentbox`]}>
          马上就处理
        </div>
      </div>
    )
  },
}

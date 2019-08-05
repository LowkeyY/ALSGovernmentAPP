import React from 'react';
import { Flex, WhiteSpace } from 'components';
import { getImages, getErrorImg } from 'utils';
import { Css3Loading, LoadingFail } from 'components/loading';
import { handleListClick } from 'utils/commonevent';
import robotIcon from './robot.png';
import styles from './index.less';

const PrefixCls = 'bubble',
  showStatus = (status = 0) => {
    return status === 0 ? '' : status === 1 ? <Css3Loading/> : <LoadingFail/>;
  };
module.exports = {
  ReceiveBubble: (props) => {
    const { answers = [], header = '', dispatch } = props;
    return (
      <div className={styles[`${PrefixCls}-left`]}>
        <span className={styles[`${PrefixCls}-left-iconbox`]}>
          <img src={robotIcon}/>
        </span>
        <div className={styles[`${PrefixCls}-left-contentbox`]}>
          <div className={styles[`${PrefixCls}-left-contentbox-header`]}>{header}</div>
          <div className={styles[`${PrefixCls}-answer`]}>
            {
              answers.length > 0 && answers.map((item) => (
                <div key={item.id} onClick={handleListClick.bind(null, item, dispatch, item.title)}>
                  {item.title}
                </div>
              ))
            }
          </div>
        </div>
      </div>
    );
  },

  ReplyBubble: (props) => {
    // status : 0 发送成功 , 1 发送中 , 2 发送失败
    const { header = '', useravatar, _status = 0 } = props;
    return (
      <div className={styles[`${PrefixCls}-right`]}>
        {/* <div className={styles[`${PrefixCls}-right-user`]}>{cuName}</div> */}
        <span className={styles[`${PrefixCls}-right-iconbox`]}>
          <img src={getImages(useravatar, 'user')}/>
        </span>
        <div className={styles[`${PrefixCls}-right-contentbox`]}>
          {header}
        </div>
        <div className={styles[`${PrefixCls}-right-loading`]}>{showStatus(_status)}</div>
      </div>
    );
  },

};

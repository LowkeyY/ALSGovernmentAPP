import React from 'react';
import styles from './index.less';
import { Flex, WhiteSpace } from 'components';
import { getImages, getErrorImg } from 'utils';
import { Css3Loading, LoadingFail } from 'components/loading';
import Voice from '../voice';

const PrefixCls = 'bubble',
  showStatus = (status = 0) => {
    return status == 0 ? '' : status == 1 ? <Css3Loading /> : <LoadingFail />;
  };
module.exports = {
  ReceiveBubble: (props) => {
    const { cuName, msgInfo, msgcDate, userPhoto } = props;
    return (
      <div className={styles[`${PrefixCls}-left`]}>
        <div className={styles[`${PrefixCls}-left-user`]}>{cuName}</div>
        <span className={styles[`${PrefixCls}-left-iconbox`]}>
          <img src={getImages(userPhoto, 'user')} />
        </span>
        <div className={styles[`${PrefixCls}-left-contentbox`]}>
          {msgInfo}
        </div>
        <div>{msgcDate}</div>
      </div>
    );
  },
  ReceiveImgBubble: (props) => {
    const { cuName, msgInfo, userPhoto } = props;
    return (
      <div className={styles[`${PrefixCls}-left`]}>
        <div className={styles[`${PrefixCls}-left-user`]}>{cuName}</div>
        <span className={styles[`${PrefixCls}-left-iconbox`]}>
          <img src={getImages(userPhoto, 'user')} />
        </span>
        <div className={styles[`${PrefixCls}-left-contentbox`]}>
          <img style={{ width: '98%' }} src={getImages(msgInfo, 'user')} />
        </div>
      </div>
    );
  },
  ReplyImgBubble: (props) => {
    const { cuName, msgInfo, useravatar, _status = 0 } = props;
    return (
      <div className={styles[`${PrefixCls}-right`]}>
        {/* <div className={styles[`${PrefixCls}-right-user`]}>{cuName}</div> */}
        <span className={styles[`${PrefixCls}-right-iconbox`]}>
          <img src={getImages(useravatar, 'user')} />
        </span>
        <div className={styles[`${PrefixCls}-right-contentbox`]}>
          <img style={{ width: '98%' }} src={getImages(msgInfo, 'user')} />
        </div>
        <div className={styles[`${PrefixCls}-right-loading`]}>{showStatus(_status)}</div>
      </div>
    );
  },
  ReplyBubble: (props) => {
    // status : 0 发送成功 , 1 发送中 , 2 发送失败
    const { cuName, msgInfo, useravatar, _status = 0 } = props;
    return (
      <div className={styles[`${PrefixCls}-right`]}>
        {/* <div className={styles[`${PrefixCls}-right-user`]}>{cuName}</div> */}
        <span className={styles[`${PrefixCls}-right-iconbox`]}>
          <img src={getImages(useravatar, 'user')} />
        </span>
        <div className={styles[`${PrefixCls}-right-contentbox`]}>
          {msgInfo}
        </div>
        <div className={styles[`${PrefixCls}-right-loading`]}>{showStatus(_status)}</div>
      </div>
    );
  },

};

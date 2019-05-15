import React from 'react';
import { Carousel, WhiteSpace, WingBlank, Icon } from 'antd-mobile';
import { getLocalIcon } from 'utils';
import styles from './index.less';

const Css = 'notice';
const Notice = () => (
  <div>
    <div className={styles[`${Css}-box`]}>
      {/* <Icon style={{marginRight:'10px'}} type={getLocalIcon("/通知.svg")}/> */}
      <Carousel className="my-carousel"
        vertical
        dots={false}
        dragging={false}
        swiping={false}
        autoplay
        infinite
      >
        <div className="v-item">通知：感恩节正确的打开方式</div>
        <div className="v-item">通知：感恩节正确的打开方式</div>
      </Carousel>
      <div className={styles[`${Css}-box-more`]}>
        <a>更多</a>
        {/* <Icon type={getLocalIcon("/更多.svg")}/> */}
      </div>
    </div>
  </div>
);
export default Notice;

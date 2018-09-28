import React from 'react';
import { Carousel } from 'antd-mobile';
import ReactDOM from 'react-dom';
import styles from './index.less';

const PrefixCls = 'banner';
let content = '<p style="text-align: center;margin:0">\n' +
  '<span width="100%" autobuffer="" controls="" src="http://www.myals.gov.cn:8088/526fe308-cd22-4c89-9afa-144c5de56bbe/526fe308-cd22-4c89-9afa-144c5de56bbe1.mp4" poster="/526fe308-cd22-4c89-9afa-144c5de56bbe/526fe308-cd22-4c89-9afa-144c5de56bbe1.jpg">&nbsp;</span>\n' +
  '</p>';
class Banner extends React.Component {
  click = () => {
    console.log(document.getElementById('video'));
    const video = document.getElementById('video');

    document.getElementById('video').webkitRequestFullScreen();
  }
  componentWillMount () {

  }

  render () {
    const getContents = () => {
      let str = 'video';
      let newContent = content.replace('span', str);
      return {
        __html: newContent,
      };
    };

    return (
      <div className={styles[`${PrefixCls}-outer`]}>
        <div dangerouslySetInnerHTML={getContents()} />
      </div>
    );
  }
}

export default Banner;

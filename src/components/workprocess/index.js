/* eslint-disable no-undef */
/**
 * @author Lowkey
 * @date 2019/06/05 10:44:39
 * @Description:
 */

import React from 'react';
import { Icon } from 'components';
import { getLocalIcon } from 'utils';
import { baseURL } from 'utils/config';
import WxImageViewer from 'react-wx-images-viewer';
import styles from './index.less';

const getImages = (data) => {
  const arr = [];
  data.map(item => {
    if (item.AFTER_PIC_URL) {
      item.AFTER_PIC_URL.split(',')
        .map(src =>
          arr.push(baseURL + src),
        );
    }
  });
  return arr;
};

const getImagesPage = (str) => {
  const images = str.split(',');
  if (cnIsArray(images) && images.length) {
    return (
      <div className={styles.images}>
        {images.map((src, i) => (
          <div
            key={i}
            data-src={src}
            className="imgbox"
            style={{ backgroundImage: `url(${baseURL + src})` }}
          />))}
      </div>
    );
  }
  return '';
};
const WorkProcess = (props) => {
  const { data, isResultActive = false, resultViewImageIndex = -1, prefixCls = '' } = props;
  const handleDivClick = (e) => {
      const { dispatch } = props;
      if (e.target.className === 'imgbox') {
        let src = baseURL + e.target.dataset.src,
          curImageIndex = getImages(data)
            .indexOf(src);
        if (src) {
          dispatch({
            type: `${prefixCls}/updateState`,
            payload: {
              isResultActive: true,
              resultViewImageIndex: curImageIndex < 0 ? 0 : curImageIndex,
            },
          });
        }
      }
    },
    onViemImageClose = () => {
      const { dispatch } = props;
      dispatch({
        type: `${prefixCls}/updateState`,
        payload: {
          isResultActive: false,
        },
      });
    };
  return (
    <div className={styles.outer}>
      {
        cnIsArray(data) && data.map(item => {
          return (
            <div key={item.id} onClick={handleDivClick}>
              <div>负责人：{item.manager}</div>
              <div>提交时间：{item.s_date}</div>
              <div>处理结果：{item.results}</div>
              <div> 处理后图片：</div>
              {getImagesPage(item.AFTER_PIC_URL)}
            </div>
          );
        })
      }
      {
        isResultActive && resultViewImageIndex !== -1 ?
          <WxImageViewer onClose={onViemImageClose} urls={getImages(data)} index={resultViewImageIndex} /> : ''
      }
    </div>
  );
};

export default WorkProcess;

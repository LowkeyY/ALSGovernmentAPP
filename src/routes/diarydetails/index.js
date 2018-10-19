import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, Icon, List } from 'components';
import Nav from 'components/nav';
import { getImages, getErrorImg, getLocalIcon } from 'utils';
import { baseURL, api } from 'utils/config';
import styles from './index.less';
import TitleBox from 'components/titlecontainer';
import VociePrev from 'components/voicePrev';
import WxImageViewer from 'react-wx-images-viewer';

const Item = List.Item,
  PrefixCls = 'diarydetails';

function DiaryDetails ({ location, dispatch, diarydetails }) {
  const { name, currentData, isOpen, viewImageIndex } = diarydetails,
    { bflx, content, creatData, creatUser, id, imgFile, voiceFile } = currentData;
  const getImagesPage = (images) => {
      if (cnIsArray(images) && images.length) {
        return (
          <div className={styles[`${PrefixCls}-files-images`]}>
            {images.map((src, i) => (<div key={i}
              data-src={src}
              className="imgbox"
              style={{ backgroundImage: `url(${src})` }}
            />))}
          </div>
        );
      }
      return '';
    },
    handleDivClick = (e) => {
      if (e.target.className === 'imgbox') {
        let src = e.target.dataset.src,
          curImageIndex = imgFile.indexOf(src);
        if (src) {
          dispatch({
            type: `${PrefixCls}/updateState`,
            payload: {
              isOpen: true,
              viewImageIndex: curImageIndex < 0 ? 0 : curImageIndex,
            },
          });
        }
      }
    },
    onViemImageClose = () => {
      dispatch({
        type: `${PrefixCls}/updateState`,
        payload: {
          isOpen: false,
        },
      });
    };
  
  return (
    <div className={styles[`${PrefixCls}-container`]}>
      <Nav title={name} dispatch={dispatch} />
      <div className={styles[`${PrefixCls}-outer`]}>
        <div className={styles[`${PrefixCls}-header`]}>
          <div className={styles[`${PrefixCls}-header-name`]}><span>{creatUser}</span>的帮扶日志</div>
          <div className={styles[`${PrefixCls}-header-date`]}>
            {creatData}
          </div>
        </div>
        <TitleBox title="帮扶类型" />
        <div className={styles[`${PrefixCls}-type`]}>
          <span className={styles[`${PrefixCls}-type-item`]}>
            {bflx}
          </span>
        </div>
        <TitleBox title="帮扶日志" />
        <div className={styles[`${PrefixCls}-content`]}>
          <div>
            {voiceFile !== '' ? <VociePrev mediaFileUrl={voiceFile} mediaFileTimer={0} /> : ''}
          </div>
          <WhiteSpace />
          <div className={styles[`${PrefixCls}-content-details`]}>
            {content}
          </div>
          
        </div>
        <TitleBox title="附件" />
        <div className={styles[`${PrefixCls}-files`]} onClick={handleDivClick}>
          {getImagesPage(imgFile)}
        </div>
      </div>
      {
        isOpen && viewImageIndex !== -1 ?
          <WxImageViewer onClose={onViemImageClose} urls={imgFile} index={viewImageIndex} /> : ''
      }
    </div>
  );
}

export default connect(({ loading, diarydetails }) => ({
  loading,
  diarydetails,
}))(DiaryDetails);

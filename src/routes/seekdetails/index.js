/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, Icon, List, Tag, Button, WingBlank } from 'components';
import Nav from 'components/nav';
import { getImages, getErrorImg, getLocalIcon } from 'utils';
import { baseURL, api } from 'utils/config';
import { routerRedux } from 'dva/router';
import TitleBox from 'components/titlecontainer';
import SeekReply from 'components/seekreply';
import StatusBox from 'components/statusbox';
import VociePrev from 'components/voicePrev';
import WorkProcess from 'components/workprocess';
import WxImageViewer from 'react-wx-images-viewer';
import styles from './index.less';

const { positionApi } = api,
  PrefixCls = 'seekdetails';

function SeekDetails ({ location, dispatch, seekdetails }) {
  const { name, currentData, isOpen, viewImageIndex, isTask, resultData, isResultActive, resultViewImageIndex } = seekdetails,
    { id, taskId } = location.query,
    { username, situatton, createDate, positions, title, content, images, answers, voicePath, userPhoto, status, shState, isCollect } = currentData;
  const getImagesPage = (image) => {
      if (cnIsArray(image) && image.length) {
        return (
          <div className={styles[`${PrefixCls}-content-images`]}>
            {image.map((src, i) => (
              <div
                key={i}
                data-src={src}
                className="imgbox"
                style={{ backgroundImage: `url(${src})` }}
              />
            ))}
          </div>
        );
      }
      return '';
    },

    getShtate = () => {
      return <StatusBox bg="#9c9595" status="不在办理范围" />;
    },
    getStatus = (status) => {
      switch (status) {
        case '0' :
          return <StatusBox bg="#f5b90c" status="待审核" />;
        case '1' :
        case '2' :
        case '3' :
        case '4' :
        case '6' :
        case '7' :
          return <StatusBox bg="#29ad2e" status="处理中" />;
        case '5' :
          return <StatusBox bg="#d45b5b" status="已完成" />;
      }
    },
    handleDivClick = (e) => {
      if (e.target.className === 'imgbox') {
        let src = e.target.dataset.src,
          curImageIndex = images.indexOf(src);
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
    },
    handlePositionClick = ({ route = 'iframe', name = '定位' }) => {
      if (id && id !== '') {
        const src = `${baseURL}${positionApi}?workId${id}&taskId=${taskId}`;
        dispatch(routerRedux.push({
          pathname: `/${route}`,
          query: {
            name,
            externalUrl: src,
          },
        }));
      }
    },
    handleFlowClick = () => {
      dispatch(routerRedux.push({
        pathname: 'appealflow',
        query: {
          dataId: id,
        },
      }));
    };

  return (
    <div>
      <Nav title={name} dispatch={dispatch} />
      <div className={styles[`${PrefixCls}-outer`]}>
        <div className={styles[`${PrefixCls}-header`]}>
          <div className={styles[`${PrefixCls}-header-info`]}>
            <img src={getImages(userPhoto, 'user')} alt="" />
            <div className={styles[`${PrefixCls}-header-info-box`]}>
              <div className={styles[`${PrefixCls}-header-info-box-name`]}>{username}</div>
              <div className={styles[`${PrefixCls}-header-info-box-date`]}>
                <span>{createDate}</span></div>
            </div>
          </div>
        </div>
        <div className={styles[`${PrefixCls}-outer-type`]}>
          {situatton !== 'undefined' ? <span>诉求类型：{situatton}</span> : ''}
          <span>{positions}</span>
        </div>
        <div className={styles[`${PrefixCls}-content`]} onClick={handleDivClick}>
          <div className={styles[`${PrefixCls}-content-title`]}>
            <span>{title}</span>
            {isTask ? <span onClick={handlePositionClick}>
              <Icon type={getLocalIcon('/others/location.svg')} size="lg" />
            </span> : ''}
          </div>
          <div className={styles[`${PrefixCls}-content-status`]}>
            <span
              style={{ color: '#1ab99d' }}
            >当前状态:<span>{shState == '2' ? getShtate() : getStatus(status)}</span></span>
            {isCollect ?
              <div><Tag disabled><Icon type={getLocalIcon('/others/collectionblack.svg')} />已收藏</Tag></div> : ''}
          </div>
          <div>
            {voicePath !== '' ? <VociePrev mediaFileUrl={voicePath} mediaFileTimer={0} /> : ''}
          </div>
          <div className={styles[`${PrefixCls}-content-details`]}><span>{content}</span></div>
          {getImagesPage(images)}
        </div>
        <WhiteSpace />
        {answers && answers.length > 0 ? <TitleBox title={'回复'} /> : null}
        {
          answers && answers.map((data, i) => (
            <SeekReply key={i} {...data} />
          ))
        }
        {
          cnIsArray(resultData) && resultData.length > 0 ?
            <div>
              <TitleBox title="诉求处理结果" />
              <WorkProcess
                data={resultData}
                dispatch={dispatch}
                isResultActive={isResultActive}
                resultViewImageIndex={resultViewImageIndex}
                prefixCls={PrefixCls}
              />
            </div>
            :
            null
        }
        <WingBlank>
          <Button type="ghost" style={{ marginBottom: '10px' }} onClick={handleFlowClick}>查看处理流程</Button>
        </WingBlank>

      </div>
      {
        isOpen && viewImageIndex !== -1 ?
          <WxImageViewer onClose={onViemImageClose} urls={images} index={viewImageIndex} /> : ''
      }
    </div>
  );
}

export default connect(({ loading, seekdetails }) => ({
  loading,
  seekdetails,
}))(SeekDetails);

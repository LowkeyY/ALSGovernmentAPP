import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, Icon, List, Tag, Button } from 'components';
import Nav from 'components/nav';
import { getImages, getErrorImg, getLocalIcon } from 'utils';
import { baseURL } from 'utils/config';
import { routerRedux } from 'dva/router';
import TitleBox from 'components/titlecontainer';
import WorkProcess from 'components/workprocess';
import SeekReply from 'components/seekreply';
import VociePrev from 'components/voicePrev';
import WxImageViewer from 'react-wx-images-viewer';
import styles from './index.less';

const PrefixCls = 'centertaskdetails';

function CenterTaskDetails ({ location, dispatch, centertaskdetails }) {
  const { name, currentData, isActive, viewImageIndex, resultData, isResultActive, resultViewImageIndex } = centertaskdetails,
    { userName, situatton, cdate, positions, title, textInfo, images, answers, voicePath, id, isWgy, isRegist, isOpen, sswg, phone, tels, workType, state, shState } = currentData;
  const getImagesPage = (images) => {
      if (cnIsArray(images) && images.length) {
        return (
          <div className={styles[`${PrefixCls}-details-images`]}>
            {images.map((src, i) => (
              <div
                key={i}
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
          curImageIndex = images.indexOf(src);
        if (src) {
          dispatch({
            type: `${PrefixCls}/updateState`,
            payload: {
              isActive: true,
              viewImageIndex: curImageIndex < 0 ? 0 : curImageIndex,
            },
          });
        }
      }
    },
    handleOpenClick = () => {
      dispatch({
        type: `${PrefixCls}/openAppeal`,
        payload: {
          workId: id,
        },
      });
    },
    handleCloseClick = () => {
      dispatch({
        type: `${PrefixCls}/closeAppeal`,
        payload: {
          workId: id,
        },
      });
    },
    handleRefuseClick = () => {
      dispatch({
        type: `${PrefixCls}/refuseAppeal`,
        payload: {
          workId: id,
        },
      });
    },
    handleCompleteClick = () => {
      dispatch({
        type: `${PrefixCls}/completeAppeal`,
        payload: {
          workId: id,
        },
      });
    },
    handleReplyClick = () => {
      dispatch(routerRedux.push({
        pathname: 'centerreply',
        query: {
          workId: id,
        },
      }));
    },
    handleFlowClick = () => {
      dispatch(routerRedux.push({
        pathname: 'appealflow',
        query: {
          dataId: id,
        },
      }));
    },
    handleSendClick = () => {
      dispatch(routerRedux.push({
        pathname: '/centersendtask',
        query: {
          title,
          workId: id,
        },
      }));
    },
    onViemImageClose = () => {
      dispatch({
        type: `${PrefixCls}/updateState`,
        payload: {
          isActive: false,
        },
      });
    },
    getName = (isWgy, isRegist) => {
      if (isWgy === true || isWgy !== '') {
        return '网格员姓名';
      } else if (isRegist === true || isRegist !== '') {
        return '用户昵称';
      }
      return '姓名';
    },
    getOpenButton = (workType) => {
      if (workType === '2') {
        return <Button type="ghost" style={{ marginBottom: '10px' }} onClick={handleOpenClick}>公开反馈</Button>;
      } else if (workType === '3') {
        return <Button type="ghost" style={{ marginBottom: '10px' }} onClick={handleCloseClick}>撤销反馈</Button>;
      }
      return '';
    },
    getControlButton = (state, shState) => {
      if (state === '0' && shState !== '2') {
        return (<div>
          <Button type="ghost" style={{ marginBottom: '10px' }} onClick={handleSendClick}>发布任务</Button>
          <Button type="ghost" style={{ marginBottom: '10px' }} onClick={handleRefuseClick}>不接受诉求</Button>
        </div>);
      } else if (state === '7') {
        return (<div>
          <Button type="ghost" style={{ marginBottom: '10px' }} onClick={handleCompleteClick}>完成诉求 </Button>
        </div>);
      }
      return '';
    };
  return (
    <div>
      <Nav title={name} dispatch={dispatch} />
      <div className={styles[`${PrefixCls}-outer`]}>
        <div className={styles[`${PrefixCls}-title`]}>
          <div>{title}</div>
          <span>诉求编号：{id}</span>
          <p>{cdate}</p>
        </div>
        <TitleBox title="诉求信息" />
        <div className={styles[`${PrefixCls}-info`]}>
          <div className={styles[`${PrefixCls}-info-base`]}>
            {situatton !== 'undefined' ? <span>诉求类型：{situatton}</span> : ''}
            <span>是否公开信息：{isOpen ? '公开' : '不公开'}</span>
          </div>
          <div>
            {`${getName(isWgy, isRegist)}：${userName}`}
          </div>
          <div>
            {isWgy === true || isWgy !== '' ? <span>{`所属网格区：${sswg}`}</span> : ''}
          </div>
          <div>
            投诉人手机号：{phone !== '' ? phone : '未填写'}
          </div>
          <div>
            预留联系方式：{tels !== '' ? tels : '无'}
          </div>
          <div>发送时所在位置：{positions}</div>
        </div>
        <TitleBox title="诉求详情" />
        <div>
          {voicePath !== '' ? <VociePrev mediaFileUrl={baseURL + voicePath} mediaFileTimer={0} /> : ''}
        </div>
        <div className={styles[`${PrefixCls}-details`]} onClick={handleDivClick}>
          <div className={styles[`${PrefixCls}-details-content`]}>
            {textInfo}
          </div>
          {getImagesPage(images)}
        </div>
        {
          cnIsArray(resultData) && resultData.length > 0 ?
            <div>
              <TitleBox title="诉求处理过程" />
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
        <div>
          {answers && answers.length > 0 ?
            <div>
              <TitleBox title="回复" />
              {
                answers && answers.map((data, i) => {
                  return <SeekReply key={i} {...data} />;
                })
              }
            </div>
            :
            ''}
        </div>
        <TitleBox title="指挥中心" />
        <div className={styles[`${PrefixCls}-controls`]}>
          <div>
            <Button type="ghost" style={{ marginBottom: '10px' }} onClick={handleFlowClick}>查看流程</Button>
            <Button type="ghost" style={{ marginBottom: '10px' }} onClick={handleReplyClick}>回复诉求</Button>
            {getOpenButton(workType)}
            {getControlButton(state, shState)}
          </div>
        </div>
      </div>
      {
        isActive && viewImageIndex !== -1 ?
          <WxImageViewer onClose={onViemImageClose} urls={images} index={viewImageIndex} /> : ''
      }
    </div>
  );
}

export default connect(({ loading, centertaskdetails }) => ({
  loading,
  centertaskdetails,
}))(CenterTaskDetails);

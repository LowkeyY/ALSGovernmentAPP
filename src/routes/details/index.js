/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'dva';
import Nav from 'components/nav';
import { routerRedux } from 'dva/router';
import { WhiteSpace, Icon, Modal } from 'components';
import { getLocalIcon, getTitle } from 'utils';
import Praise from 'components/praise';
import WxImageViewer from 'react-wx-images-viewer';
import styles from './index.less';

const PrefixCls = 'details';

class Details extends React.Component {
  constructor (props) {
    super(props);
  }

  componentWillMount () {
    document.documentElement.scrollTop = document.body.scrollTop = 0;
  }

  componentWillUnmount () {
    const { currentData: { tongjiId } } = this.props.details;
    this.props.dispatch({
      type: 'details/getStudyTime',
      payload: {
        tongjiId,
      },
    });
  }

  render () {
    const { name = '', noPraise = false, dataId } = this.props.location.query,
      { currentData: { content, title, date, tongjiId, isClick, dzSum = 0 }, isOpen, viewImages, viewImageIndex, isPraise, num, uuid } = this.props.details,
      { isLogin } = this.props.app,
      getContents = () => {
        return {
          __html: content,
        };
      },
      handleDivClick = (e) => {
        if (e.target.tagName === 'IMG') {
          let src = e.target.src,
            curImageIndex = -1;
          if (src && (curImageIndex = viewImages.indexOf(src)) != -1) {
            this.props.dispatch({
              type: 'details/updateState',
              payload: {
                isOpen: true,
                viewImageIndex: curImageIndex,
              },
            });
          }
        }
      },
      handlePraiseClick = () => {
        this.props.dispatch({
          type: 'details/praise',
          payload: {
            dataId,
            isClick: isLogin ? isPraise : false,
            uuid,
          },
        });
      },
      onClose = () => {
        this.props.dispatch({
          type: 'details/updateState',
          payload: {
            isOpen: false,
          },
        });
      },
      praiseProps = {
        isPraise,
        isClick,
        dzSum,
        num,
        handlePraiseClick,
        praiseLoading: this.props.praiseLoading,
      };
    return (
      <div>
        <Nav title={getTitle(name)} dispatch={this.props.dispatch} />
        <div className={styles[`${PrefixCls}-outer`]}>
          <div className={styles[`${PrefixCls}-outer-title`]}>
            {title}
          </div>
          <div className={styles[`${PrefixCls}-outer-info`]}>
            <div className={styles[`${PrefixCls}-outer-info-date`]}>{date}</div>
            {noPraise ? null : <Praise {...praiseProps} />}
          </div>
          <WhiteSpace size="sm" />
          <div className={styles[`${PrefixCls}-outer-content`]}>
            <div dangerouslySetInnerHTML={getContents()} onClick={handleDivClick} />
          </div>
        </div>
        {
          isOpen && viewImageIndex !== -1 ?
            <WxImageViewer onClose={onClose} urls={viewImages} index={viewImageIndex} /> : ''
        }
      </div>
    );
  }
}

export default connect(({ loading, details, app }) => ({
  praiseLoading: loading.effects['details/praise'],
  details,
  app,
}))(Details);

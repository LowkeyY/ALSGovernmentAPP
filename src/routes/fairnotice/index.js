/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'dva';
import Nav from 'components/nav';
import { WhiteSpace, Icon, Button, WingBlank } from 'components';
import { getLocalIcon, getTitle } from 'utils';
import { routerRedux } from 'dva/router';
import WxImageViewer from 'react-wx-images-viewer';
import styles from './index.less';

const PrefixCls = 'fairnotice';

class FairNotice extends React.Component {
  constructor (props) {
    super(props);
  }

  componentWillMount () {
    document.documentElement.scrollTop = document.body.scrollTop = 0;
  }

  handlerNextClick = () => {
    this.props.dispatch(routerRedux.replace({
      pathname: '/fairtype',
    }));
  };


  render () {
    const { name = '申请指南', } = this.props.location.query,
      { currentData: { content, title, date }, isOpen, viewImages, viewImageIndex } = this.props.fairnotice,
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
              type: 'fairnotice/updateState',
              payload: {
                isOpen: true,
                viewImageIndex: curImageIndex,
              },
            });
          }
        }
      },

      onClose = () => {
        this.props.dispatch({
          type: 'fairnotice/updateState',
          payload: {
            isOpen: false,
          },
        });
      };
    return (
      <div>
        <Nav title={getTitle(name)} dispatch={this.props.dispatch}/>
        <div className={styles[`${PrefixCls}-outer`]}>
          <div className={styles[`${PrefixCls}-outer-title`]}>
            {title}
          </div>
          <div className={styles[`${PrefixCls}-outer-info`]}>
            <div className={styles[`${PrefixCls}-outer-info-date`]}>{date}</div>
          </div>
          <WhiteSpace size="sm"/>
          <div className={styles[`${PrefixCls}-outer-content`]}>
            <div dangerouslySetInnerHTML={getContents()} onClick={handleDivClick}/>
          </div>
          <WhiteSpace size="lg"/>
          <WingBlank>
            <Button type="primary" onClick={this.handlerNextClick}>下一步</Button>
          </WingBlank>
          <WhiteSpace size="lg"/>
          <WhiteSpace size="lg"/>
        </div>
        {
          isOpen && viewImageIndex !== -1 ?
            <WxImageViewer onClose={onClose} urls={viewImages} index={viewImageIndex}/> : ''
        }
      </div>
    );
  }
}

export default connect(({ loading, fairnotice }) => ({
  loading,
  fairnotice,
}))(FairNotice);

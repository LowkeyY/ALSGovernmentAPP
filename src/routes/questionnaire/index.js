/* eslint-disable react/prop-types */

import React from 'react';
import { connect } from 'dva';
import Nav from 'components/nav';
import { routerRedux } from 'dva/router';
import { WhiteSpace, Icon, Modal, Button, WingBlank } from 'components';
import { getLocalIcon, getTitle, doDecode } from 'utils';
import WxImageViewer from 'react-wx-images-viewer';
import styles from './index.less';

const getInfo = (info) => {
  if (info) {
    try {
      return doDecode(info);
    } catch (e) {

    }
  }
  return {};
};

class QuestionNaire extends React.Component {
  constructor (props) {
    super(props);
  }

  componentWillMount () {
    document.documentElement.scrollTop = document.body.scrollTop = 0;
  }

  componentWillUnmount () {

  }

  handlerBeginClick = () => {
    const { name = '垃圾分类大比拼',route = '', id = '', conditionId = '' } = this.props.location.query;
    this.props.dispatch(routerRedux.push({
      pathname: `/${route}`,
      query: {
        name,
        id,
        conditionId,
      },
    }));
  };

  render () {
    const { name = '垃圾分类大比拼', buttonText = '立即参与' } = this.props.location.query,
      { currentData: { content }, isOpen, viewImages, viewImageIndex } = this.props.questionnaire,
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
              type: 'questionnaire/updateState',
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
          type: 'questionnaire/updateState',
          payload: {
            isOpen: false,
          },
        });
      };
    return (
      <div>
        <Nav title={name} dispatch={this.props.dispatch} />
        <div className={styles.container}>
          <WhiteSpace size="sm" />
          <div className={styles.content}>
            <div dangerouslySetInnerHTML={getContents()} onClick={handleDivClick} />
          </div>
          <div className={styles.btn}>
            <WingBlank>
              <Button
                type="primary"
                onClick={this.handlerBeginClick}
              >
                {buttonText}
              </Button>
            </WingBlank>
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

export default connect(({ questionnaire }) => ({
  questionnaire,
}))(QuestionNaire);

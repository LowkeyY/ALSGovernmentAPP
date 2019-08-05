import React from 'react';
import { Modal, Button } from 'antd-mobile';
import PropTypes from 'prop-types';
import styles from './index.less';

const NotesModal = (props) => {
  const closest = (el, selector) => {
      const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
      while (el) {
        if (matchesSelector.call(el, selector)) {
          return el;
        }
        el = el.parentElement;
      }
      return null;
    },
    onWrapTouchStart = (e) => {
      // fix touch to scroll background page on iOS
      if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
        return;
      }
      const pNode = closest(e.target, '.am-modal-content');
      if (!pNode) {
        e.preventDefault();
      }
    },
    onClose = (e) => {

    },
    getContents = () => {
      return {
        __html: props.content,
      };
    };
  return (
    <div className={styles.outer}>
      <Modal
        className={styles.container}
        visible={props.visible}
        animationType={'slide-up'}
        transparent
        maskClosable={false}
        onClose={onClose}

        footer={[{
          text: '确定', onPress: () => {
            props.handleClick();
          },
        }]}
        wrapProps={{ onTouchStart: onWrapTouchStart }}
      >
        <div style={{ height: 400, overflow: 'scroll' }}>
          <div dangerouslySetInnerHTML={getContents()}/>
        </div>
      </Modal>
    </div>
  );
};
NotesModal.defaultProps = {
  visible: false,
  content: '',
};
export default NotesModal;

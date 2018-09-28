import React from 'react';
import { routerRedux } from 'dva/router';
import styles from './index.less';

function MpaDiv (props) {
  const { width, height, id, top, left } = props.datas;
  const css = {
    width,
    height,
    top,
    left
  };
  return (
    <div key={id} className={styles.box} style={css} onClick={props.handleClick.bind(this, props.datas)} />
  );
}

MpaDiv.defaultProps = {
  style: ''
};
export default MpaDiv;

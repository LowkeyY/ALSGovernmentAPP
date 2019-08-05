import React from 'react';
import PropTypes from 'prop-types';
import { getImages } from 'utils';
import styles from './index.less';

const CnMenu = (props) => {
  const { datas } = props;
  return (
    <div className={styles.outer}>
      {datas.map(item => (
        <div
          className={styles.item}
          key={item.id}
          onClick={() => {
            const param = {
              pathname: item.route,
              ...item,
            };
            props.handleGridClick(param, props.dispatch, props.isLogin);
          }
          }
        >
          <img src={getImages(item.icon, '')} alt=""/>
          <div className={styles.title}>{item.title}</div>
        </div>
      ))}
    </div>
  );
};

CnMenu.propTypes = {
  handleGridClick: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  datas: PropTypes.array,
};
CnMenu.defaultProps = {
  datas: [],
  isLogin: false,
};
export default CnMenu;

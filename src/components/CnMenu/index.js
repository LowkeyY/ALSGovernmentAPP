import React from 'react';
import PropTypes from 'prop-types';
import { getImages } from 'utils';
import patryImg from './patry.png';
import patryBg from './patryBg.jpg';
import styles from './index.less';

const defaultPosition = [
  { top: '30%', left: '10%' },
  { top: '6%', left: '30%' },
  { top: '6%', left: '60%' },
  { top: '30%', left: '80%' },
  { top: '60%', left: '80%' },
  { top: '72%', left: '60%' },
  { top: '72%', left: '30%' },
  { top: '60%', left: '10%' },
];

const CnMenu = (props) => {
  const { datas } = props;
  return (
    <div className={styles.outer} style={{ backgroundImage: `url(${patryBg})` }}>
      {datas.map((item, i) => (
        <div
          className={styles.item}
          style={defaultPosition[i]}
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
          <img src={getImages(item.icon, '')} alt="" />
          <div className={styles.title}>{item.title}</div>
        </div>
      ))}
      <div className={styles.patry}>
        <img src={patryImg} alt="" />
      </div>
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

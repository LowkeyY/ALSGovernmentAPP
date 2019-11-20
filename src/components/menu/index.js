import React from 'react';
import { Grid } from 'antd-mobile';
import { Layout } from 'components';
import PropTypes from 'prop-types';
import defaultIcon from 'themes/images/nmenus/lvyou.png';
import styles from './index.less';

const PrefixCls = 'menu',
  getDatas = (menus = []) => {
    const result = [];
    menus.map((menu, index) => {
      let { icon = defaultIcon, text = '', name = '', title = '' } = menu;
      if (text === '') {
        text = name || title;
      }
      result.push({ ...menu, icon, text });
    });
    return result;
  };

const Menu = (props) => {
  return (
    <div className={styles[`${PrefixCls}-outer`]}>
      <Grid
        data={getDatas(props.datas || [])}
        columnNum={props.columnNum || 3}
        hasLine={false}
        isCarousel={props.isCarousel || false}
        renderItem={props.renderItem ? (el) => props.renderItem(el) : null}
        onClick={
          (data) => {
            const param = {
              pathname: data.route,
              ...data,
            };
            props.handleGridClick(param, props.dispatch, props.isLogin, props.usertype);
          }
        }
      />
    </div>
  );
};
Menu.propTypes = {
  handleGridClick: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  datas: PropTypes.array,
  columnNum: PropTypes.number,
  renderItem: PropTypes.func,
};
Menu.defaultProps = {
  datas: [],
  renderItem: null,
  isLogin: false,
};
export default Menu;

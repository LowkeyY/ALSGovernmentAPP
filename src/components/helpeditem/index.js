import React from 'react';
import styles from './index.less';
import defaultIcon from 'themes/images/nmenus/lvyou.png';

const PrefixCls = 'menu';


class HelpItem extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <div className={styles[`${PrefixCls}-outer`]}>
        <div className={styles[`${PrefixCls}-outer-names`]} />
        <div className={styles[`${PrefixCls}-outer-checkboxes`]} />
      </div>
    );
  }
}
export default HelpItem;

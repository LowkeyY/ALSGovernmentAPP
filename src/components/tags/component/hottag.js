
import React from 'react';
import { Link } from 'dva/router';
import { connect } from 'dva';
import styles from '../index.less'
const PrefixCls = 'tags';

class Hottag extends React.Component {
  render() {
    return (
      <div style={ { display: "inline-block" } }>
        <div className={ styles[`${PrefixCls}-hot-tag`] }>
          { this.props.title }
        </div>
      </div>
    );
  }
/*    render() {
        return (
            <div style={ { display: "inline-block" } } onClick={ this.props.handleOnClick }>
              <Link className={ styles[`${PrefixCls}-hot-tag`] } to={ `/typequery?moduleId=${this.props.hotWordModuleId}&lists=${this.props.id}` }>
                { this.props.title }
              </Link>
            </div>
            );
    }*/
}
export default Hottag

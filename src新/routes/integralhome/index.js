import { Component } from 'react';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import Nav from 'components/nav';
import {
  List,
  WhiteSpace,
} from 'components';
import { integralRow } from 'components/row';
import ListView from 'components/listview';
import { routerRedux } from 'dva/router';
import styles from './index.less';
import bg from 'themes/images/others/integralBg.png';

const PrefixCls = 'integralhome';

class IntegralHome extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    const { name = '' } = this.props.location.query;
    const { intergation, paginations, scrollerTop, lists } = this.props.integralhome,
      onEndReached = (callback) => {
        this.props.dispatch({
          type: `${PrefixCls}/getIntegralList`,
          payload: {
            callback,
          },
        });
      },
      onScrollerTop = (top) => {
        if (typeof top !== 'undefined' && !isNaN(top * 1)) {
          this.props.dispatch({
            type: `${PrefixCls}/updateState`,
            payload: {
              scrollerTop: top,
            },
          });
        }
      },
      handleListClick = ({ relationId, type }) => {
        if (type == '2') {
          this.props.dispatch(routerRedux.push(
            {
              pathname: 'seekdetails',
              query: {
                id: relationId,
              },
            },
          ));
        }
      },
      handlerShopClick = () => {
        this.props.dispatch(routerRedux.push(
          {
            pathname: 'integral',
          },
        ));
      },
      handlerRightClick = () => {
        this.props.dispatch(routerRedux.push(
          {
            pathname: 'integralrule',
          },
        ));
      },
      getCurrentView = () => {
        const { current, total, size } = paginations,
          hasMore = (total > 0) && ((current > 1 ? current - 1 : 1) * size < total);
        return (

          <ListView
            layoutHeader={''}
            dataSource={lists}
            layoutRow={(rowData, sectionID, rowID) => integralRow(rowData, sectionID, rowID, handleListClick)}
            onEndReached={onEndReached}
            onRefresh={null}
            hasMore={hasMore}
            onScrollerTop={onScrollerTop.bind(null)}
            scrollerTop={scrollerTop}
          />
        );
      },

      rightContent = () => {
        return <div onClick={handlerRightClick}>积分规则</div>;
      }

    return (
      <div className={styles[`${PrefixCls}-outer`]} style={{ backgroundImage: `url(${bg})` }}>
        <Nav title={name} color='transparent' dispatch={this.props.dispatch} renderNavRight={rightContent()}/>
        <div className={styles[`${PrefixCls}-outer-container`]} onClick={handlerShopClick}>
          <div className={styles[`${PrefixCls}-outer-container-integral`]}>
            <div className={styles[`${PrefixCls}-outer-container-integral-text`]}>我的积分</div>
            <div className={styles[`${PrefixCls}-outer-container-integral-num`]}>{intergation}</div>
          </div>
        </div>
        <div className={styles[`${PrefixCls}-outer-list`]}>
          <div className={styles[`${PrefixCls}-outer-list-container`]}>
            <div className={styles[`${PrefixCls}-outer-list-container-title`]}>
              积分记录
            </div>
            {
              lists.length > 0 ? getCurrentView() :
                <div
                  style={{ fontSize: '18px', color: '#fd7514', textAlign: 'center', marginTop: '110px' }}>您还没有积分</div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default connect(({ loading, integralhome }) => ({ loading, integralhome }))(createForm()(IntegralHome));

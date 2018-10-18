import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, Icon } from 'components';
import Nav from 'components/nav';
import { getLocalIcon } from 'utils';
import { routerRedux } from 'dva/router';
import IntegralCard from 'components/integralcard';
import styles from './index.less';


const PrefixCls = 'integral';

function Integral ({ location, dispatch, integral }) {
  const { name = '积分商城' } = location.query,
    { intergation, currentGoods } = integral;
  const handleItmeClick = ({ goodsId = '', goodsName = '' }) => {
      dispatch(routerRedux.push({
        pathname: '/integraldetails',
        query: {
          goodsId,
          name: goodsName,
        },
      }));
    },
    handleChangedClick = () => {
      dispatch(routerRedux.push({
        pathname: '/integralgoods',
      }));
    };
  return (
    <div>
      <Nav title={name} dispatch={dispatch}/>
      <div className={styles[`${PrefixCls}-outer`]}>
        <div className={styles[`${PrefixCls}-outer-head`]}>
          <div className={styles[`${PrefixCls}-outer-head-item`]}>
            <span><Icon type={getLocalIcon('/others/coin.svg')}/></span>
            <span>{`积分(${intergation || 0})`}</span>
          </div>
          <div className={styles[`${PrefixCls}-outer-head-item`]} onClick={handleChangedClick}>
            <span><Icon type={getLocalIcon('/others/exchange.svg')}/></span>
            <span>兑换记录</span>
          </div>
          <div className={styles[`${PrefixCls}-outer-head-item`]}>
            <span><Icon type={getLocalIcon('/others/rule.svg')}/></span>
            <span>积分规则</span>
          </div>
        </div>
        <WhiteSpace/>
        <div className={styles[`${PrefixCls}-outer-title`]}>
          <span>积分兑换</span>
        </div>
        <div className={styles[`${PrefixCls}-outer-container`]}>
          {currentGoods && currentGoods.map((data, i) => {
            const { goodsId, goodsJiFen, goodsKuCun, goodsName, goodsPhoto } = data,
              props = {
                goodsId,
                goodsJiFen,
                goodsKuCun,
                goodsName,
                goodsPhoto: `${goodsPhoto}`,
              };
            return <IntegralCard {...props} onClick={handleItmeClick}/>;
          })}
        </div>
      </div>
    </div>
  );
}

export default connect(({ loading, integral }) => ({
  loading,
  integral,
}))(Integral);

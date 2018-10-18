import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, List, Icon } from 'components';
import { getLocalIcon } from 'utils';
import Nav from 'components/nav';
import styles from './index.less';
import NoMessage from 'components/nomessage';

const PrefixCls = 'integralgoods',
  Item = List.Item,
  Brief = Item.Brief;

function IntegralGoods ({ location, dispatch, integralgoods }) {
  const { name = '兑换记录' } = location.query,
    { list = [] } = integralgoods;
  return (
    <div>
      <Nav title={name} dispatch={dispatch}/>
      <List className={styles[`${PrefixCls}-list`]}>
        {
          list.length > 0 ?
            list.map((data) => {
              const { goodsName, goodsId, goodsPhoto, operData, operInteration } = data;
              return (<Item
                className={styles[`${PrefixCls}-item`]}
                key={goodsId}
                extra={<div className={styles[`${PrefixCls}-icon`]}>
                  <span><Icon type={getLocalIcon('/others/coin.svg')}/></span><span>{operInteration}</span>
                </div>}
                thumb={goodsPhoto || ''}
                multipleLine
              >
                {goodsName}
                <Brief>{operData}</Brief>
              </Item>);
            })
            :
            <NoMessage/>
        }
      </List>
    </div>
  );
}

export default connect(({ loading, integralgoods }) => ({
  loading,
  integralgoods,
}))(IntegralGoods);

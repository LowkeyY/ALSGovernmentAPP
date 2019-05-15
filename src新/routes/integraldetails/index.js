import React from 'react';
import { connect } from 'dva';
import Nav from 'components/nav';
import { Icon } from 'components';
import classNames from 'classnames';
import { getTitle, getImages, getLocalIcon } from 'utils';
import styles from './index.less';

const PrefixCls = 'integraldetails';

class IntegralDetails extends React.Component {
  constructor (props) {
    super(props);
  }

  componentWillMount () {
    document.documentElement.scrollTop = document.body.scrollTop = 0;
  }

  handleIntegralClick (dispatch, goodsId) {
    dispatch({
      type: 'integraldetails/changeGoods',
      payload: {
        goodsId,
      },
    });
  }

  render () {
    const { name = '' } = this.props.location.query,
      { goodsDetails, goodsId, goodsJiFen, goodsKuCun, goodsName, goodsPhoto } = this.props.integraldetails,
      getContents = () => {
        return {
          __html: goodsDetails,
        };
      };
    return (
      <div>
        <Nav title={getTitle(name)} dispatch={this.props.dispatch} color='#ff632b '/>
        <div className={styles[`${PrefixCls}-outer`]}>
          <div className={styles[`${PrefixCls}-outer-photo`]}>
            <img src={getImages(goodsPhoto)} alt="" />
          </div>
          <div className={styles[`${PrefixCls}-outer-title`]}>
            {goodsName}
          </div>
          <div className={styles[`${PrefixCls}-outer-content`]}>
            <div dangerouslySetInnerHTML={getContents()}/>
          </div>
        </div>
        <div className={styles[`${PrefixCls}-footer`]}>
          <div className={styles[`${PrefixCls}-item`]}>
            <div className={styles[`${PrefixCls}-footer-integral`]}>
              <span><Icon type={getLocalIcon('/others/coin.svg')}/></span>
              <span>{`积分：${goodsJiFen}`}</span>
            </div>
            <div>{`库存：${goodsKuCun}`}</div>
          </div>
          <div className={classNames(styles[`${PrefixCls}-footer-button`], { [styles.disabled]: goodsKuCun <= 0 })}
               onClick={this.handleIntegralClick.bind(this, this.props.dispatch, goodsId)}
          >
            立即兑换
          </div>
        </div>
      </div>
    );
  }
}

export default connect(({ loading, integraldetails }) => ({
  loading,
  integraldetails,
}))(IntegralDetails);

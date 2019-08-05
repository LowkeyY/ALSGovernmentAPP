/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'dva';
import Nav from 'components/nav';
import { WhiteSpace, Icon, Button, WingBlank } from 'components';
import { routerRedux } from 'dva/router';
import styles from './index.less';

const PrefixCls = 'fairinfo';
const getContent = (data, id) => cnIsArray(data) && data.find(item => item.id === id) || {};

class FairInfo extends React.Component {
  constructor (props) {
    super(props);
  }

  componentWillMount () {
    document.documentElement.scrollTop = document.body.scrollTop = 0;
  }

  handlerNextClick = () => {
    const { title = '', id = '' } = this.props.location.query;
    this.props.dispatch(routerRedux.replace({
      pathname: 'fairform',
      query: {
        name: title,
        id
      },
    }));
  };

  render () {
    const { name = '公正事项说明', id = '' } = this.props.location.query,
      { data } = this.props.fairtype,
      { shuoming = '' } = getContent(data, id),
      getContents = () => {
        return {
          __html: shuoming,
        };
      };
    return (
      <div>
        <Nav title={name} dispatch={this.props.dispatch}/>
        <div className={styles[`${PrefixCls}-outer`]}>
          <WhiteSpace size="sm"/>
          <div className={styles[`${PrefixCls}-outer-content`]}>
            <div dangerouslySetInnerHTML={getContents()}/>
          </div>
          <WhiteSpace size="lg"/>
          <WingBlank>
            <Button type="primary" onClick={this.handlerNextClick}>下一步</Button>
          </WingBlank>
          <WhiteSpace size="lg"/>
          <WhiteSpace size="lg"/>
        </div>
      </div>
    );
  }
}

export default connect(({ loading, fairtype }) => ({
  loading,
  fairtype,
}))(FairInfo);

import React, { Component } from 'react';
import { connect } from 'dva';
import Nav from 'components/nav';
import { routerRedux } from 'dva/router';
import {
  List,
  Button,
  WhiteSpace,
  Toast,
  Radio,
  WingBlank,
} from 'components';

const RadioItem = Radio.RadioItem;

class FairType extends Component {
  constructor (props) {
    super(props);
    this.state = {
      value: '',
      mingcheng: '',
    };
  }

  componentWillMount () {
    document.documentElement.scrollTop = document.body.scrollTop = 0;
  }


  onSubmit = () => {
    const { value = '', mingcheng } = this.state;
    if (value !== '') {
      this.props.dispatch(routerRedux.replace({
        pathname: '/fairinfo',
        query: {
          id: value,
          title: mingcheng,
        },
      }));
    }
  };

  onChange = (values) => {
    const { id = '', mingcheng = '' } = values;
    this.setState({
      value: id,
      mingcheng,
    });
  };

  render () {
    const { data } = this.props.fairtype;
    const { value } = this.state;
    return (
      <div >
        <Nav title="公正预约事项" dispatch={this.props.dispatch} />
        <List >
          {data.map(i => (
            <RadioItem key={i.id} checked={value === i.id} onChange={() => this.onChange(i)} >
              {i.mingcheng}
            </RadioItem >
          ))}
        </List >
        <WhiteSpace size="lg" />
        <WingBlank >
          <Button disabled={value === ''} type="primary" onClick={this.onSubmit} >确定</Button >
        </WingBlank >
        <WhiteSpace size="lg" />
        <WhiteSpace size="lg" />
      </div >
    );
  }
}

export default connect(({ loading, fairtype }) => ({
  loading,
  fairtype,
}))(FairType);


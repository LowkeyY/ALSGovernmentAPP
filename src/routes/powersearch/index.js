import React from 'react';
import { List, InputItem, Button, WhiteSpace, WingBlank, Toast } from 'components';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import Nav from 'components/nav';
import { createForm } from 'rc-form';

class PowerSearch extends React.Component {
  state = {
    type: 'money',
  };

  handerSearchClick = () => {
    const data = this.props.form.getFieldsValue();
    const { quanlileibie, shixiangmingcheng, zerenzhuti } = this.props.form.getFieldsValue();
    if (quanlileibie || shixiangmingcheng || zerenzhuti) {
      console.log(this.props.form.getFieldsValue());
      this.props.dispatch(routerRedux.replace(
        {
          pathname: 'powerlist',
          query: data,
        },
      ));
    } else {
      Toast.fail('请至少输入一个查询条件');
    }
  };

  render () {
    const { getFieldProps } = this.props.form;
    return (
      <div>
        <Nav title="查询" dispatch={this.props.dispatch} />
        <List>
          <InputItem
            {...getFieldProps('quanlileibie')}
            clear
          >权利类别</InputItem>
          <InputItem
            {...getFieldProps('shixiangmingcheng')}
            clear
          >事项名称</InputItem>
          <InputItem
            {...getFieldProps('zerenzhuti')}
            clear
          > 责任主体</InputItem>
        </List>
        <WhiteSpace size="lg" />
        <WingBlank size="lg">
          <Button type="primary" onClick={this.handerSearchClick}>查询</Button>
        </WingBlank>
      </div>
    );
  }
}

export default connect(({ loading }) => ({
  loading,
}))(createForm()(PowerSearch));

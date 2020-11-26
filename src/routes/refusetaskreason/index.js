import { Component } from 'react';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import Nav from 'components/nav';
import {
  List,
  InputItem,
  TextareaItem,
  Button,
  Toast,
  WhiteSpace,
  WingBlank,
} from 'components';
import styles from './index.less';


const PrefixCls = 'refusetaskreason';

class RefuseTaskReason extends Component {
  changeValue = (obj) => {
    for (let i in obj) {
      if (typeof (obj[i]) === 'string') {
        obj[i] = replaceSystemEmoji(obj[i]);
      }
    }
    return obj;
  };

  onSubmit = () => {
    const { taskId = '', flowId = '' } = this.props.location.query;
    this.props.form.validateFields({
      force: true,
    }, (error) => {
      if (!error) {
        const data = {
          ...this.props.form.getFieldsValue(),
          taskId,
          flowId,
          pageType: 'back',
        };
        this.props.dispatch({
          type: 'taskdetails/backTask',
          payload: data,
        });
      } else {
        Toast.fail('退回原因必须输入');
      }
    });
  };

  render () {
    const { name = '填项退回原因' } = this.props.location.query,
      { getFieldProps, getFieldError } = this.props.form;

    return (
      <div>
        <Nav title={name} dispatch={this.props.dispatch} />
        <div className={styles[`${PrefixCls}-outer`]}>
          <form>
            <List.Item className={styles[`${PrefixCls}-outer-content`]}>
              <TextareaItem
                {...getFieldProps('reason', {
                  initialValue: '',
                  rules: [{ required: true, message: '请输入退回原因' }],
                })}
                rows={10}
              />
            </List.Item>
            <div className={styles[`${PrefixCls}-outer-button`]}>
              <WhiteSpace />
              <WingBlank>
                <Button type="ghost" onClick={this.onSubmit.bind(this)}>提交</Button>
              </WingBlank>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(({ loading, refusetaskreason }) => ({
  loading,
  refusetaskreason,
}))(createForm()(RefuseTaskReason));

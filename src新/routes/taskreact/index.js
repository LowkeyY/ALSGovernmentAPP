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
} from 'components';
import TitleBox from 'components/titlecontainer';
import styles from './index.less';


const PrefixCls = 'taskreact';

class TaskReact extends Component {
  changeValue = (obj) => {
    for (let i in obj) {
      if (typeof (obj[i]) === 'string') {
        obj[i] = replaceSystemEmoji(obj[i]);
      }
    }
    return obj;
  };
  
  onSubmit = (workId, flowId) => {
    this.props.form.validateFields({
      force: true,
    }, (error) => {
      if (!error) {
        const data = {
          ...this.props.form.getFieldsValue(),
          flowId,
          workId
        };
        this.props.dispatch({
          type: 'taskreact/sendTaskReact',
          payload: {
            ...data
          },
        });
      } else {
        Toast.fail('意见必须输入');
      }
    });
  };
  
  render () {
    const { name = '请示反馈', workId = '' } = this.props.location.query,
      { createUser, createDate, content, taskId, flowId } = this.props.taskreact,
      { getFieldProps, getFieldError } = this.props.form;
    
    return (
      <div>
        <Nav title={name} dispatch={this.props.dispatch} />
        <div className={styles[`${PrefixCls}-outer`]}>
          <div className={styles[`${PrefixCls}-outer-title`]}>
            <div className={styles[`${PrefixCls}-outer-title-user`]}> 创建人：{createUser}</div>
            <div className={styles[`${PrefixCls}-outer-title-time`]}>创建时间：{createDate}</div>
          </div>
          <TitleBox title="描述" />
          <div className={styles[`${PrefixCls}-outer-content`]}>
            {content}
          </div>
          <TitleBox title="提交反馈" />
          <form>
            <div className={styles[`${PrefixCls}-outer-form`]}>
              <TextareaItem
                {...getFieldProps('huifu', {
                  initialValue: '',
                  rules: [{ required: true, message: '请输入提交内容' }],
                })}
                error={!!getFieldError('huifu') && Toast.fail(getFieldError('huifu'))}
                rows={10}
                placeholder={'请输入内容！'}
              />
            </div>
            <div className={styles[`${PrefixCls}-outer-button`]}>
              <Button type="ghost" onClick={this.onSubmit.bind(this, workId, flowId)}>提交</Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(({ loading, taskreact }) => ({
  loading,
  taskreact,
}))(createForm()(TaskReact));

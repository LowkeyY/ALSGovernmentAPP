import { Component } from 'react';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import Nav from 'components/nav';
import { getLocalIcon, replaceSystemEmoji, DateChange } from 'utils';
import {
  List,
  InputItem,
  TextareaItem,
  Button,
  Toast,
  WhiteSpace,
  Picker,
  DatePicker,
  ActivityIndicator
} from 'components';
import styles from './index.less';


const PrefixCls = 'mobilepartys',
  dataType = [
    {
      label: '旗内转接',
      value: '旗内转接',
    },
    {
      label: '旗内转出',
      value: '旗内转出',
    },
    {
      label: '旗外转入',
      value: '旗外转入',
    },
  ];

let nowTimeStamp = Date.now(),
  now = new Date(nowTimeStamp);

class MobilePartys extends Component {
  constructor () {
    super();
    this.state = {
      date: now,
    };
  }
  
  onSubmit = () => {
    this.props.form.validateFields({
      force: true,
    }, (error) => {
      if (!error) {
        const date = this.state.date;
        const data = {
          ...this.props.form.getFieldsValue(['username', 'idcard', 'type', 'currentorganization', 'transferorganization', 'phone', 'hkaddress', 'address', 'content']),
          date: DateChange(date)
        };
        this.props.dispatch({
          type: 'mobilepartys/submit',
          payload: {
            ...this.changeValue(data),
          },
        });
        this.props.dispatch({
          type: 'mobilepartys/updateState',
          payload: {
            animating: true,
          },
        });
      } else {
        Toast.fail('意见必须输入');
      }
    });
  };
  changeValue = (obj) => {
    for (let i in obj) {
      if (typeof (obj[i]) === 'string') {
        obj[i] = replaceSystemEmoji(obj[i]);
      }
    }
    return obj;
  };
  
  render () {
    const { name = '' } = this.props.location.query,
      { type, animating } = this.props.mobilepartys,
      { getFieldProps, getFieldError } = this.props.form;
    
    return (
      <div>
        <Nav title={name} dispatch={this.props.dispatch} />
        <div className={styles[`${PrefixCls}-outer`]}>
          <form>
            <div className={styles[`${PrefixCls}-outer-box`]}>
              <InputItem
                {...getFieldProps('username', {
                  initialValue: '',
                  rules: [{ required: true, message: '姓名必须输入' }
                  ],
                })}
                clear
                error={!!getFieldError('username') && Toast.fail(getFieldError('username'))}
                placeholder="输入姓名"
              >
                姓名
              </InputItem>
            </div>
            <div className={styles[`${PrefixCls}-outer-box`]}>
              <div className={styles[`${PrefixCls}-outer-boxtitle`]}>申请人身份证号码：</div>
              <InputItem
                {...getFieldProps('idcard', {
                  initialValue: '',
                  rules: [{ required: true, message: '身份证号必须输入' }
                  ],
                })}
                clear
                error={!!getFieldError('idcard') && Toast.fail(getFieldError('idcard'))}
                placeholder="身份证号"
              >
              </InputItem>
            </div>
            <Picker data={dataType}
                    cols={1}
                    {...getFieldProps('type', {
                      rules: [{ required: true, message: '请选择转接类型' }],
                    })}
                    error={!!getFieldError('type') && Toast.fail(getFieldError('type'))}
            >
              <List.Item arrow="horizontal">转接类型</List.Item>
            </Picker>
            <WhiteSpace />
            <div className={styles[`${PrefixCls}-outer-box`]}>
              <div className={styles[`${PrefixCls}-outer-boxtitle`]}>目前的组织部：</div>
              <InputItem
                {...getFieldProps('currentorganization', {
                  initialValue: '',
                  rules: [{ required: true, message: '请输入输入目前的组织部' }
                  ],
                })}
                clear
                error={!!getFieldError('currentorganization') && Toast.fail(getFieldError('currentorganization'))}
                placeholder="组织部名称"
              >
              </InputItem>
            </div>
            <div className={styles[`${PrefixCls}-outer-box`]}>
              <div className={styles[`${PrefixCls}-outer-boxtitle`]}>要转移的目标组织部：</div>
              <InputItem
                {...getFieldProps('transferorganization', {
                  initialValue: '',
                  rules: [{ required: true, message: '请输入输入要转移的目标组织部' }
                  ],
                })}
                clear
                error={!!getFieldError('transferorganization') && Toast.fail(getFieldError('transferorganization'))}
                placeholder="组织部名称"
              >
              </InputItem>
            </div>
            <div className={styles[`${PrefixCls}-outer-box`]}>
              <InputItem
                type="number"
                {...getFieldProps('phone', {
                  initialValue: ''
                })}
                placeholder="非必填"
              >
                联系电话
              </InputItem>
            </div>
            <div className={styles[`${PrefixCls}-outer-box`]}>
              <InputItem
                {...getFieldProps('hkaddress', {
                  initialValue: '',
                  rules: [{ required: true, message: '请输入户口所在地' }
                  ],
                })}
                clear
                error={!!getFieldError('hkaddress') && Toast.fail(getFieldError('hkaddress'))}
                placeholder=""
              >
                户口所在地
              </InputItem>
            </div>
            <div className={styles[`${PrefixCls}-outer-box`]}>
              <InputItem
                {...getFieldProps('address', {
                  initialValue: '',
                  rules: [{ required: true, message: '请输入地址' }
                  ],
                })}
                clear
                error={!!getFieldError('address') && Toast.fail(getFieldError('address'))}
                placeholder="地址"
              >
                住址
              </InputItem>
            </div>
            <DatePicker
              ref={el => this.dateValue = el}
              mode="date"
              extra="请选择"
              value={this.state.date}
              onChange={date => this.setState({ date })}
              {...getFieldProps('date', {
                rules: [{ required: true, message: '请选择截止时间' }],
              })}
            >
              <List.Item arrow="horizontal">党费缴纳至时间</List.Item>
            </DatePicker>
            <WhiteSpace />
            <List.Item className={styles[`${PrefixCls}-outer-content`]}>
              <TextareaItem
                {...getFieldProps('content', {
                  initialValue: '',
                  rules: [{ required: true, message: '请输入申请原因' }],
                })}
                rows={5}
                placeholder={'申请原因'}
              />
            </List.Item>
            <div className={styles[`${PrefixCls}-outer-button`]}>
              <Button type="ghost" onClick={this.onSubmit}>提交</Button>
            </div>
          </form>
        </div>
        <ActivityIndicator
          toast
          text="正在上传..."
          animating={animating}
        />
      </div>
    );
  }
}

export default connect(({ loading, mobilepartys }) => ({
  loading,
  mobilepartys,
}))(createForm()(MobilePartys));

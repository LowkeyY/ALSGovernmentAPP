import { Component } from 'react';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import Nav from 'components/nav';
import { DatePicker } from 'antd-mobile';
import {
  List,
  InputItem,
  Picker,
  TextareaItem,
  Button,
  WhiteSpace,
  Toast,
  Icon,
  ActivityIndicator,
} from 'components';
import { getLocalIcon, replaceSystemEmoji, DateChange } from 'utils';
import styles from './index.less';


const PrefixCls = 'editortask',
  nowTimeStamp = Date.now(),
  now = new Date(nowTimeStamp);


class EditorTask extends Component {
  constructor (props) {
    super(props);
    this.state = {
      date: now,
      eventValue: [],
    };
  }

  upDateEndTime = (date) => {
    this.props.dispatch({
      type: 'editortask/updateState',
      payload: {
        dateValue: date,
      },
    });
  };
  upDateType = (val) => {
    this.props.dispatch({
      type: 'editortask/updateState',
      payload: {
        taskTypeId: val,
      },
    });
  };
  upDateNoticeType = (val) => {
    this.props.dispatch({
      type: 'editortask/updateState',
      payload: {
        taskUrgencyId: val,
      },
    });
  };
  upDateEvent = (val) => {
    console.log(val);
    this.props.dispatch({
      type: 'editortask/updateState',
      payload: {
        eventValue: val,
      },
    });
  };
  changeValue = (obj) => {
    for (let i in obj) {
      if (typeof (obj[i]) === 'string') {
        obj[i] = replaceSystemEmoji(obj[i]);
      }
      if (typeof (obj[i]) === 'undefined') {
        obj[i] = '';
      }
    }
    return obj;
  };
  onSubmit = (eventValue, taskId) => {
    console.log(eventValue);
    this.props.form.validateFields(
      ['taskTitle', 'taskInfo', 'taskUrgency', 'taskEndDate'],
      { force: true },
      (error) => {
        if (!error) {
          const date = this.state.date;

          const data = {
            ...this.props.form.getFieldsValue(['taskTitle', 'taskType', 'taskInfo', 'taskUrgency']),
            taskEndDate: DateChange(date),
            integralLargeClass: eventValue[0] || '',
            integralClass: eventValue[1] || '',
            taskId,
          };
          this.props.dispatch({
            type: 'editortask/sendEventType',
            payload: {
              ...this.changeValue(data),
            },
          });
          this.props.dispatch({
            type: 'editortask/updateState',
            payload: {
              animating: true,
            },
          });
        } else {
          Toast.fail('请确认信息是否正确。');
        }
      });
  };

  getTitle = (title) => {
    return (<div className={styles[`${PrefixCls}-title`]}>
      <span><Icon type={getLocalIcon('/others/information.svg')} /></span>
      <div>{title}</div>
    </div>);
  };

  componentDidUnmount () {

  }

  render () {
    const { name = '完善任务信息' } = this.props.location.query,
      { appealType, animating, eventType, noticeType, taskId, taskInfo, taskTitle, taskUrgencyId, taskTypeId, dateValue, eventValue } = this.props.editortask;
    const { getFieldProps, getFieldError } = this.props.form;

    return (
      <div>
        <Nav title={name} dispatch={this.props.dispatch} />
        <div className={styles[`${PrefixCls}-outer`]}>
          <form>
            <div className={styles[`${PrefixCls}-outer-title`]}>
              <InputItem
                {...getFieldProps('taskTitle', {
                  initialValue: taskTitle,
                  rules: [{ required: true, message: '标题必须输入' },
                    { max: 10, message: '标题最多能输入10个字' },
                  ],
                })}
                clear
                error={!!getFieldError('taskTitle') && Toast.fail(getFieldError('taskTitle'))}
                placeholder="输入标题、最多输入10个字符"
                ref={el => this.autoFocusInst = el}
              >
                标题
              </InputItem>
            </div>
            <WhiteSpace />
            <List.Item className={styles[`${PrefixCls}-outer-content`]}>
              <TextareaItem
                {...getFieldProps('taskInfo', {
                  initialValue: taskInfo,
                  rules: [{ required: true, message: '请输入内容' }],
                })}
                clear
                rows={5}
                error={!!getFieldError('taskInfo') && Toast.fail(getFieldError('taskInfo'))}
                count={500}
                placeholder={'在此输入发表内容，注意时间、地点、涉及人物等要素'}
              />
            </List.Item>
            <WhiteSpace />
            <div className={styles[`${PrefixCls}-outer-type`]}>
              <Picker data={appealType}
                      cols={1}
                      {...getFieldProps('taskType', {
                        initialValue: taskTypeId,
                        rules: [{ required: false, message: '请选择任务类型' }],
                      })}
                      error={!!getFieldError('taskType') && Toast.fail(getFieldError('taskType'))}
                      onOk={taskTypeId => this.upDateType(taskTypeId)}
              >
                <List.Item arrow="horizontal">任务类型</List.Item>
              </Picker>
            </div>
            <div className={styles[`${PrefixCls}-outer-urgency`]}>
              <Picker data={noticeType}
                      cols={1}
                      {...getFieldProps('taskUrgency', {
                        initialValue: taskUrgencyId,
                        rules: [{ required: true, message: '请选择紧急程度' }],
                      })}
                      onOk={taskUrgencyId => this.upDateNoticeType(taskUrgencyId)}
                      error={!!getFieldError('taskUrgency') && Toast.fail(getFieldError('taskUrgency'))}
              >
                <List.Item arrow="horizontal">任务紧急程度</List.Item>
              </Picker>
            </div>
            <div className={styles[`${PrefixCls}-outer-event`]}>
              <Picker
                data={eventType}
                cols={2}
                onOk={eventValue => this.upDateEvent(eventValue)}
                {...getFieldProps('eventType', {
                  initialValue: eventValue,
                  rules: [{ required: true, message: '请选择事件' }],
                })}
                error={!!getFieldError('eventType') && Toast.fail(getFieldError('eventType'))}
              >
                <List.Item>
                  选择事件类型
                </List.Item>
              </Picker>
            </div>
            <div>
              <DatePicker
                title="选择日期"
                extra="Optional"
                value={dateValue}
                onChange={date => this.upDateEndTime(date)}
              >
                <List.Item arrow="horizontal">纠纷时间</List.Item>
              </DatePicker>
            </div>
            <WhiteSpace />
            <div className={styles[`${PrefixCls}-outer-button`]}>
              <Button type="primary" onClick={this.onSubmit.bind(this, eventValue, taskId)}>提交</Button>
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

export default connect(({ loading, editortask }) => ({
  loading,
  editortask,
}))(createForm()(EditorTask));


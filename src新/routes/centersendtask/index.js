import { Component } from 'react';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import Nav from 'components/nav';
import {
  List,
  InputItem,
  Picker,
  TextareaItem,
  ImagePicker,
  Button,
  WhiteSpace,
  Toast,
  Switch,
  Icon,
  Badge,
  Tabs,
  ActivityIndicator,
  DatePicker,
} from 'components';
import classNames from 'classnames';
import { getLocalIcon, postionsToString, replaceSystemEmoji, DateChange } from 'utils';
import SelectMenu from 'components/selectMenu';
import styles from './index.less';

const PrefixCls = 'centersendtask';
let nowTimeStamp = Date.now(),
  now = new Date(nowTimeStamp);

class CenterSendTask extends Component {
  constructor (props) {
    super(props);
    this.state = {
      date: now,
    };
  }

  onCancel = () => {
    this.props.dispatch(routerRedux.goBack());
  };
  changeValue = (obj) => {
    for (let i in obj) {
      if (typeof (obj[i]) === 'string') {
        obj[i] = replaceSystemEmoji(obj[i]);
      }
    }
    return obj;
  };
  getUserValue = (arr) => {
    let userValue = [];
    arr && arr.map((data, i) => {
      userValue.push(data.userId);
    });
    return userValue.join();
  };
  onTaskSubmit = (selectedUsers, workId) => {
    this.props.form.validateFields(
      ['taskTitle', 'taskInfo', 'taskUrgency', 'taskEndDate'],
      { force: true },
      (error) => {
        if (!error) {
          const date = this.state.date;

          const data = {
            ...this.props.form.getFieldsValue(['taskTitle', 'taskType', 'taskInfo', 'taskUrgency']),
            cldw: this.getUserValue(selectedUsers),
            taskEndDate: DateChange(date),
            workId,
          };
          this.props.dispatch({
            type: 'centersendtask/centerSendTask',
            payload: {
              ...this.changeValue(data),
            },
          });
          this.props.dispatch({
            type: 'centersendtask/updateState',
            payload: {
              animating: true,
            },
          });
        } else {
          Toast.fail('请确认信息是否正确。');
        }
      });
  };

  handleOkClick (dispatch) {
    dispatch({
      type: 'centersendtask/updateState',
      payload: {
        isShowSelectMenu: false,
      },
    });
  }

  handleCancel (dispatch) {
    dispatch({
      type: 'centersendtask/updateState',
      payload: {
        isShowSelectMenu: false,
        selectedUsers: [],
      },
    });
  }

  handleSelectClick (dispatch) {
    // dispatch({一个页面选人无搜索
    //   type: 'centersendtask/updateState',
    //   payload: {
    //     isShowSelectMenu: true,
    //     selectedUsers: [],
    //   },
    // });
    dispatch(routerRedux.push({
      pathname: '/workers',
      query: {
        currentRoute: `${PrefixCls}`,
      },
    }));
  }

  render () {
    const { name = '下发任务', title = '', workId = '' } = this.props.location.query,
      { appealType, animating, noticeType, isShowSelectMenu, userItems, selectedUsers } = this.props.centersendtask;
    const { getFieldProps, getFieldError } = this.props.form,
      addUsers = (value) => {
        this.props.dispatch({
          type: 'centersendtask/updateState',
          payload: {
            selectedUsers: value,
          },
        });
      },
      getValue = (value) => {
        let arr = [];
        value.map((data, i) => {
          arr.push(data.name);
        });
        return arr.length ? arr.join() : '请选择用户';
      },
      menuProps = {
        items: userItems,
        onOk: this.handleOkClick.bind(this, this.props.dispatch),
        targetRef: this.chooseUsers,
        onCancel: this.handleCancel.bind(this, this.props.dispatch),
        addUsers,
      };
    return (
      <div>
        <Nav title={name} dispatch={this.props.dispatch}/>
        <div>
          <div>
            <div className={styles[`${PrefixCls}-outer`]}>
              <form>
                <div className={styles[`${PrefixCls}-outer-type`]}>
                  <List.Item
                    extra={getValue(selectedUsers)}
                    arrow="horizontal"
                    ref={el => this.chooseUsers = el}
                    onClick={this.handleSelectClick.bind(this, this.props.dispatch)}
                    wrap
                  >
                    选择办理人
                  </List.Item>
                  <DatePicker
                    ref={el => this.dateValue = el}
                    mode="date"
                    extra="请选择"
                    value={this.state.date}
                    onChange={date => this.setState({ date })}
                    {...getFieldProps('taskEndDate', {
                      rules: [{ required: true, message: '请选择截止时间' }],
                    })}
                  >
                    <List.Item arrow="horizontal">任务截止时间</List.Item>
                  </DatePicker>
                </div>
                <div className={styles[`${PrefixCls}-outer-type`]}>
                  <Picker
                    data={appealType}
                    cols={1}
                    {...getFieldProps('taskType', {
                      rules: [{ required: true, message: '请选择任务类型' }],
                    })}
                    error={!!getFieldError('taskType') && Toast.fail(getFieldError('taskType'))}
                  >
                    <List.Item arrow="horizontal">任务类型</List.Item>
                  </Picker>
                </div>
                <div className={styles[`${PrefixCls}-outer-type`]}>
                  <Picker data={noticeType}
                          cols={1}
                          {...getFieldProps('taskUrgency', {
                            rules: [{ required: true, message: '请选择紧急程度' }],
                          })}
                          error={!!getFieldError('taskUrgency') && Toast.fail(getFieldError('taskUrgency'))}
                  >
                    <List.Item arrow="horizontal">任务紧急程度</List.Item>
                  </Picker>
                </div>
                <div className={styles[`${PrefixCls}-outer-title`]}>
                  <InputItem
                    {...getFieldProps('taskTitle', {
                      initialValue: title,
                      rules: [{ required: true, message: '标题必须输入' },
                        { max: 10, message: '标题最多能输入10个字' },
                      ],
                    })}
                    clear
                    error={!!getFieldError('taskTitle') && Toast.fail(getFieldError('taskTitle'))}
                    placeholder="输入标题、最多输入10个字符"
                    ref={el => this.autoFocusInst = el}
                  >
                    任务标题
                  </InputItem>
                </div>
                <List.Item className={styles[`${PrefixCls}-outer-content`]}>
                  <TextareaItem
                    {...getFieldProps('taskInfo', {
                      initialValue: '',
                      rules: [{ required: true, message: '请输入任务描述' }],
                    })}
                    clear
                    rows={5}
                    error={!!getFieldError('taskInfo') && Toast.fail(getFieldError('taskInfo'))}
                    count={500}
                    placeholder={'在此输入任务描述'}
                  />
                </List.Item>
                <div className={styles[`${PrefixCls}-outer-button`]}>
                  <Button type="ghost"
                          inline
                          size="small"
                          onClick={this.onTaskSubmit.bind(this, selectedUsers, workId)}
                  >提交</Button>
                </div>
              </form>
            </div>

          </div>
        </div>
        {isShowSelectMenu ? <SelectMenu {...menuProps} /> : ''}
        <ActivityIndicator
          toast
          text="正在上传..."
          animating={animating}
        />
      </div>
    );
  }
}

export default connect(({ loading, centersendtask }) => ({
  loading,
  centersendtask,
}))(createForm()(CenterSendTask));

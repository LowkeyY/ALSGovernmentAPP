import { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Icon, WhiteSpace, Accordion, Button, Eventlisten, Toast, List } from 'components';
import ChartRoom from 'components/chatroom';
import Nav from 'components/nav';
import { getLocalIcon, getImages, replaceSystemEmoji } from 'utils';
import styles from './index.less';

let globalIndex = 0;
const Item = List.Item,
  Brief = Item.Brief;
const PrefixCls = 'taskdetails',
  appendItems = (lists, id) => {
    const result = [];
    lists.map(list => {
      let isMySelf = list.hasOwnProperty('isMySelf') ? list.isMySelf : list.msgcUser == id;
      result.push({ ...list, isMySelf });
    });
    return result;
  };

function TaskDetails ({ location, dispatch, taskdetails, app }) {
  const { chartArr, isDisabled, taskInfo, taskTitle, workId, flowState, flowLeve, flowId, taskId, isShowButton, isOpen, viewImageIndex, taskType, taskUrgency, creatDate, endDate, complete, isWork, isUpTable, qingshi, integralLargeClassName, integralClassName, integralClass, integralLargeClass } = taskdetails,
    { isSuccess } = chartArr,
    { users: { userid, useravatar } } = app;
  const onSubmit = ({ msgType = 0, content = '' }) => {
      let _Key = `${taskId}${globalIndex++}`,
        params = { msgType, taskId, _Key },
        appendLoacl = { ...params, isMySelf: true },
        images = [],
        files = {},
        errorMessages = '';
      switch (msgType) {
        case 0: {
          if (content !== '') {
            content = replaceSystemEmoji(content);
            if (content === '') {
              errorMessages = '不能发送系统自带表情。';
              break;
            }
            params.msgInfo = content;
            appendLoacl.msgInfo = content;
          } else {
            errorMessages = '不能发送空消息。';
          }
          break;
        }
        case 1: {
          if (content !== '') {
            images = {
              msgFile: content,
            };
            appendLoacl.msgInfo = URL.createObjectURL(content);
          } else {
            errorMessages = '图片无法获取。';
          }
          break;
        }
        case 2: {
          const { file = '', url = '', timers = 5 } = content;
          if (file !== '' && url !== '') {
            files = {
              msgFile: file,
            };
            appendLoacl.msgInfo = url;
            appendLoacl.timers = timers;
          } else {
            errorMessages = '文件无法获取。';
          }
          break;
        }
      }
      if (errorMessages === '') {
        dispatch({
          type: 'taskdetails/appendMessage',
          payload: {
            appends: { ...appendLoacl, _status: 1 },
          },
        });
        dispatch({
          type: 'taskdetails/sendMsgFiles',
          payload: {
            params,
            images,
            files,
          },
        });
      } else {
        Toast.offline(errorMessages);
      }
    },
    readMessage = (taskId) => {
      dispatch({
        type: 'taskdetails/readMessage',
        payload: {
          taskId,
        },
      });
    },
    onCnevent = (appendMessage) => {
      const { taskId: _id = '', msgId, ...others } = appendMessage;
      if (_id !== '' && _id === taskId) {
        dispatch({
          type: 'taskdetails/appendMessage',
          payload: {
            appends: others,
          },
        });
      }
    },
    handleTaskClick = (type) => {
      dispatch({
        type: 'taskdetails/taskStatus',
        payload: {
          pageType: type,
          workId,
          taskId,
          flowId,
          type,
        },
      });
    },
    handleCompleteClick = (completeTask) => {
      dispatch({
        type: 'taskdetails/completeTask',
        payload: {
          workId,
          taskId,
          flowId,
        },
      });
    },
    handleCompleteButtonClick = () => {
      dispatch({
        type: 'taskdetails/completeButtonTask',
        payload: {
          workId,
          taskId,
          flowId,
        },
      });
    },
    handleZhihuiClick = () => {
      dispatch({
        type: 'taskdetails/zhiHuiConformTask',
        payload: {
          hztaskId: taskId,
          workId,
        },
      });
    },
    handleBackClick = () => {
      dispatch({
        type: 'taskdetails/backTask',
        payload: {
          taskId,
          flowId,
          pageType: 'back',
        },
      });
    },
    handleTableClick = () => {
      if (integralClass === '' && integralLargeClass === '') {
        Toast.offline('请完善任务信息');
      } else {
        dispatch(routerRedux.push({
          pathname: '/tasktable',
          query: {
            taskId,
            flowId,
            workId,
          },
        }));
      }

    },
    handleReactClick = () => {
      dispatch(routerRedux.push({
        pathname: '/taskreact',
        query: {
          workId,
        },
      }));
    },
    handlerEditorTaskClick = () => {
      dispatch(routerRedux.push({
        pathname: '/editortask',
        query: {
          taskId,
        },
      }));
    },
    getCompleteButtons = (complete) => {
      if (complete !== '0') {
        return (<div>
          <Button type="primary"
                  inline
                  size="small"
                  style={{ marginRight: '4px' }}
                  onClick={handleCompleteButtonClick}
          >完成</Button>
        </div>);
      }
      return '';
    },
    getTaskButtons = (flowLeve, flowState, complete, isWork) => {
      if (flowLeve === '3' && flowState === '0') {
        return (<div>
          <Button type="primary"
                  inline
                  size="small"
                  style={{ marginRight: '40px', background: '#35aa47', borderColor: '#35aa47' }}
                  onClick={handleTaskClick.bind(null, 'conform')}
          >接受</Button>
          <Button type="primary"
                  inline
                  size="small"
                  style={{ marginRight: '4px', background: '#f3565d', borderColor: '#f3565d' }}
                  onClick={handleTaskClick.bind(null, 'back')}
          >退回</Button>
        </div>);
      } else if (flowLeve === '3' && flowState === '3') {
        return (<div>
          <Button type="primary"
                  inline
                  size="small"
                  style={{ marginRight: '4px' }}
                  onClick={handleCompleteClick}
          >完成</Button>
        </div>);
      } else if (complete !== '0') {
        return (<div>
          <Button type="primary"
                  inline
                  size="small"
                  style={{ marginRight: '4px' }}
                  onClick={handleCompleteButtonClick}
          >完成</Button>
        </div>);
      } else if (isWork === '7') {
        return (<div>
          <Button type="primary"
                  inline
                  size="small"
                  style={{ marginRight: '4px' }}
                  onClick={handleZhihuiClick}
          >完成</Button>
        </div>);
      }
    },
    getBackTaskButtons = () => {
      if (isWork !== '1' && isWork !== '6' && isWork !== '7' && flowLeve !== '0') {
        return (<div>
          <Button
            type="primary"
            inline
            size="small"
            style={{ marginRight: '4px' }}
            onClick={handleBackClick}
          >退回任务</Button></div>);
      }
      return '';
    },
    getUpTableButtons = () => {
      if (isUpTable !== '0') {
        return (<div>
          <Button
            type="primary"
            inline
            size="small"
            style={{ marginRight: '4px' }}
            onClick={handleTableClick}
          >提交表单</Button></div>);
      }
      return '';
    },
    getReactButtons = () => {
      if (flowLeve === '-1' && qingshi === '1') {
        return (<div>
          <Button
            type="primary"
            inline
            size="small"
            style={{ marginRight: '4px' }}
            onClick={handleReactClick}
          >请示反馈</Button></div>);
      }
      return '';
    },
    getEditorTaskButtons = () => {
      if ((flowLeve === '1' || flowLeve === '0') && (isWork === '0' || isWork === '2')) {
        return (<div>
          <Button
            type="primary"
            inline
            size="small"
            style={{ marginRight: '4px' }}
            onClick={handlerEditorTaskClick}
          >完善任务信息</Button></div>);
      }
      return '';
    },
    handleListClick = ({ workId, isTask = true, taskId }) => {
      if (workId !== '') {
        dispatch(routerRedux.push({
          pathname: '/seekdetails',
          query: {
            id: workId,
            isTask: true,
            taskId,
          },
        }));
      }
    },
    renderNav = (taskId) => {
      if (isWork === '0' || isWork === '2') {
        return <span onClick={handleSendClick.bind(null, taskId)}>发布任务</span>;
      }
      return '';
    },
    handleSendClick = () => {
      dispatch(routerRedux.push({
        pathname: '/selectmembers',
        query: {
          taskId,
          workId,
          isWork,
          flowLeve,
        },
      }));
    },
    props = {
      handlerSubmit: onSubmit,
      dispatch,
      isDisabled,
      isOpen,
      viewImageIndex,
      isSuccess,
    };
  return (
    <div>
      <Nav title="任务详情"
           dispatch={dispatch}
           navEvent={readMessage.bind(null, taskId)}
           renderNavRight={renderNav(taskId, isWork)}
      />
      <div className={styles[`${PrefixCls}-outer`]}>
        <div className={styles[`${PrefixCls}-outer-title`]}>
          {taskTitle}
        </div>
        <Accordion className={styles[`${PrefixCls}-outer-taskdetails`]}>
          <Accordion.Panel header={
            <div className={styles[`${PrefixCls}-outer-taskdetails-title`]}>
              <Icon type={getLocalIcon('/others/task.svg')} size="md"/>
              <span>【任务详情】</span>
            </div>
          }
          >
            <span className={styles[`${PrefixCls}-outer-taskdetails-content`]}>
              <div className={styles[`${PrefixCls}-outer-taskdetails-content-info`]}>
                <div className={styles[`${PrefixCls}-outer-taskdetails-content-info-type`]}>
                  {taskType !== 'undefined' ? <span>警务类型：{taskType}</span> : ''}
                  <span>紧急程度：{taskUrgency}</span>
                </div>
                <div className={styles[`${PrefixCls}-outer-taskdetails-content-info-date`]}>
                  <div>开始时间：{creatDate}</div>
                  <div>结束时间：{endDate}</div>
                </div>
                <div className={styles[`${PrefixCls}-outer-taskdetails-content-info-event`]}>
                  <div>事件类型：</div>
                  {
                    integralLargeClassName === '' && integralClassName === '' ?
                      <div style={{ marginTop: '5px' }}>未知</div> :
                      <div>{`${integralLargeClassName}-${integralClassName}`}</div>
                  }
                </div>
              </div>
              <List>
                <Item
                  arrow="horizontal"
                  multipleLine
                  wrap
                  onClick={handleListClick.bind(this, taskdetails)}
                >
                  {taskInfo}
                </Item>
              </List>
            </span>
          </Accordion.Panel>
        </Accordion>
        {
          isShowButton
            ?
            <div className={styles[`${PrefixCls}-outer-control`]}>
              {getReactButtons()}
              {getTaskButtons(flowLeve, flowState, complete, isWork)}
              {getUpTableButtons()}
              {getBackTaskButtons(isWork)}
              {getEditorTaskButtons(flowLeve, isWork)}
            </div> :
            ''
        }
        <div className={styles[`${PrefixCls}-outer-chat`]}>
          <Icon type={getLocalIcon('/others/chat.svg')} size="md"/>
          <span className={styles[`${PrefixCls}-outer-details-title`]}>【任务汇报】</span>
        </div>
      </div>
      <ChartRoom {...props} localArr={appendItems(chartArr, userid)} useravatar={useravatar}/>
      <Eventlisten willCallback={onCnevent}/>
    </div>
  );
}

export default connect(({ loading, taskdetails, app }) => ({
  loading,
  taskdetails,
  app,
}))(TaskDetails);

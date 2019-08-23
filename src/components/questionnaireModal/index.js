/* eslint-disable react/prop-types */
import React from 'react';
import { Modal } from 'antd-mobile';
import { routerRedux } from 'dva/router';
import { createForm } from 'rc-form';
import {
  List,
  InputItem,
  Picker,
  WhiteSpace,
  Toast,
  Icon,
  ActivityIndicator,
} from 'components';
import { pattern } from 'utils';
import styles from './index.less';

const closest = (el, selector) => {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
};

const getPickerData = (data = []) => {
  const result = [];
  data.map(items => {
    result.push({
      label: items.optionTitle,
      value: items.optionId,
    });
  });
  return result;
};

const getSubmitData = (data) => {
  const condtionData = [];
  Object.keys(data)
    .map(item => {
      condtionData.push({
        subjectId: item,
        choose: !cnIsArray(data[item]) ? [data[item]] : data[item],
      });
    });
  return condtionData;
};

class QuestionNaireModal extends React.Component {
  constructor (props) {
    const { condition } = props;
    console.log(condition);
    super(props);
    this.state = {
      visible: JSON.stringify(condition) !== '{}' && localStorage.getItem(condition.conditionId) === null,
    };
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.condition !== this.state.condition) {
      this.setState({
        visible: JSON.stringify(nextProps.condition) !== '{}' && localStorage.getItem(nextProps.condition.conditionId) === null,
      });
    }

  }

  onSubmit = (subjectData, conditionId) => {
    const rankId = subjectData.find(item => item.isRankingTitle === 'Y').subjectId;
    this.props.form.validateFields({
      force: true,
    }, (error) => {
      if (!error) {
        this.props.dispatch({
          type: 'survey/submitSurveyInfo',
          payload: {
            dataId: conditionId,
            condtionData: JSON.stringify(getSubmitData(this.props.form.getFieldsValue())),
            sessionData: this.props.form.getFieldsValue(),
            isRankingTitle: this.props.form.getFieldsValue()[rankId],
          },
          callback: this.setState({ visible: false }),
        });
      } else {
        Toast.fail('请确认信息是否正确。');
      }
    });
  };

  onWrapTouchStart = (e) => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, '.am-modal-content');
    if (!pNode) {
      e.preventDefault();
    }
  };
  onClose = (e) => {
    this.setState({
      visible: false,
    });
    this.props.dispatch(
      routerRedux.goBack(),
    );
  };

  getContent = (datas) => {
    const { getFieldProps, getFieldError } = this.props.form;
    const result = [];
    cnIsArray(datas) && datas.map((item, i) => {
      const { subjectId = '', subjectMust = '', subjectSpecial = '', subjectTitle = '', subjectType = '' } = item;
      if (subjectSpecial === 'location') {
        result.push(
          <Picker
            data={this.props.district}
            cols={2}
            {...getFieldProps(subjectId, {
              rules: [{ required: subjectMust, message: `${subjectTitle}必须输入` }],
            })}
            error={!!getFieldError(subjectId)}
            onErrorClick={() => {
              Toast.fail(getFieldError(subjectId));
            }}
            onVisibleChange={this.handlerGetAddress}
          >
            <List.Item arrow="horizontal">{subjectTitle}</List.Item>
          </Picker>,
        );
      } else {
        if (subjectType === 'description') {
          result.push(
            <InputItem
              key={i}
              {...getFieldProps(subjectId, {
                rules: [{ required: subjectMust, message: `${subjectTitle}必须输入` },
                  { max: 100, message: '标题最多能输入100个字' },
                ],
              })}
              error={!!getFieldError(subjectId)}
              onErrorClick={() => {
                Toast.fail(getFieldError(subjectId));
              }}
            >
              {subjectTitle}
            </InputItem>,
          );
        }
        if (subjectType === 'number') {
          result.push(
            <InputItem
              key={i}
              {...getFieldProps(subjectId, {
                rules: [{ required: subjectMust, message: `${subjectTitle}必须输入` },
                  { max: 100, message: '标题最多能输入100个字' },
                  { pattern: pattern.number.pattern, message: pattern.number.message },
                ],
              })}
              error={!!getFieldError(subjectId)}
              onErrorClick={() => {
                Toast.fail(getFieldError(subjectId));
              }}
            >
              {subjectTitle}
            </InputItem>,
          );
        }
        if (subjectType === 'singleoption') {
          result.push(
            <Picker
              data={getPickerData(item.optionData)}
              cols={1}
              {...getFieldProps(subjectId, {
                rules: [{ required: subjectMust, message: `${subjectTitle}必须输入` }],
              })}
              error={!!getFieldError(subjectId)}
              onErrorClick={() => {
                Toast.fail(getFieldError(subjectId));
              }}
            >
              <List.Item arrow="horizontal">{subjectTitle}</List.Item>
            </Picker>,
          );
        }
        if (subjectType === 'multiplechoise') {

        }
      }
    });
    return result;
  };

  handlerGetAddress = (visible) => {
    if (visible) {
      this.props.dispatch({
        type: 'survey/queryStreet',
      });
    }
  };

  render () {
    const { visible } = this.state;
    const { condition = {} } = this.props,
      { conditionTitle = '请填写信息', conditionId = '', conditionDescribe = '', subjectData = [], buttonData = {} } = condition;

    return (
      <Modal
        className={styles.container}
        visible={visible}
        animationType={'slide-up'}
        transparent
        maskClosable={false}
        title={conditionTitle}
        footer={[
          {
            text: buttonData.backBtn,
            onPress: () => this.onClose(),
          },
          {
            text: buttonData.submitBtn,
            onPress: () => this.onSubmit(subjectData, conditionId),
          },
        ]}
        wrapProps={{ onTouchStart: this.onWrapTouchStart }}
      >
        <div className={styles.modalView} style={{ overflow: 'scroll' }}>
          {conditionDescribe !== '' ? conditionDescribe : null}
          {this.getContent(subjectData)}
        </div>
      </Modal>
    );
  }
}

QuestionNaireModal.defaultProps = {
  visible: false,
  content: '',
  district: [],
};
export default createForm()(QuestionNaireModal);

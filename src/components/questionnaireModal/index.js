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
    super(props);
    this.state = {
      visible: JSON.stringify(condition) !== '{}' && localStorage.getItem(condition.conditionId) === null,
      descriptionError: false,
      descriptingVal: {},
      hasError: {},
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
    const must = subjectData.filter(item => item.subjectMust === 'Y' && item.subjectType === 'description' && item.subjectSpecial !== 'location');
    this.props.form.validateFields({
      force: true,
    }, (error) => {
      if (!error) {
        const res = {
          ...this.state.descriptingVal,
          ...this.props.form.getFieldsValue(),
        };
        console.log(this.props.form.getFieldsValue());

        if (this.validate(this.state.descriptingVal, must) === false) {
          Toast.fail('请确认信息是否正确');
        } else {
          this.props.dispatch({
            type: 'survey/submitSurveyInfo',
            payload: {
              dataId: conditionId,
              condtionData: JSON.stringify(getSubmitData(res)),
              sessionData: res,
              isRankingTitle: res[rankId],
            },
            callback: this.setState({ visible: false }),
          });
        }
      } else {
        Toast.fail('请确认信息是否正确');
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

  handlerChange = ({ subjectId, subjectMust, subjectTitle }, val) => {
    if (val.length > 100) {
      this.setState({
        hasError: {
          [subjectId]: `${subjectTitle}最多只能输入100个字符`,
        },
      });
    } else if (val === '' && subjectMust === 'Y') {
      this.setState({
        hasError: {
          [subjectId]: `${subjectTitle}不能为空`,
        },
      });
    } else {
      this.setState({
        hasError: {},
      });
    }

    this.setState({
      descriptingVal: {
        ...this.state.descriptingVal,
        [subjectId]: val,
      },
    });
  };

  getError = (id) => {
    return this.state.hasError[id];
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
              onChange={(val) => this.handlerChange(item, val)}
              error={this.getError(subjectId)}
              onErrorClick={() => {
                Toast.fail(this.getError(subjectId));
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

  validate = (data, must) => {
    if (JSON.stringify(data) !== '{}') {
      for (let i in data) {
        const index = must.findIndex(item => item.subjectId === i);
        must.splice(index, 1);
      }
      must.map(item => {
        this.setState((state) => ({ // 同步更新state
          hasError: {
            ...state.hasError,
            [item.subjectId]: `${item.subjectTitle}不能为空`,
          },
        }));
      });
      if (must.length > 0) {
        return false;
      }
      return true;
    }
    must.map(item => {
      this.setState((state) => ({ // 同步更新state
        hasError: {
          ...state.hasError,
          [item.subjectId]: `${item.subjectTitle}不能为空`,
        },
      }));
    });
    return false;
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

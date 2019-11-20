import React, { Component } from 'react';
import { createForm } from 'rc-form';
import { connect } from 'dva';
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
  ActivityIndicator,
  WingBlank,
  Checkbox,
  Card,
} from 'components';
import { getLocalIcon, replaceSystemEmoji, pattern } from 'utils';
import styles from './index.less';

const CheckboxItem = Checkbox.CheckboxItem;
const PrefixCls = 'lawapply';
const sex = [
    {
      label: '男',
      value: '男',
    },
    {
      label: '女',
      value: '女',
    },
  ],
  educationType = [
    {
      label: '文盲',
      value: '文盲',
    },
    {
      label: '小学',
      value: '小学',
    },
    {
      label: '中学',
      value: '中学',
    },
    {
      label: '大专以上',
      value: '大专以上',
    },
  ],
  disputeType = [
    {
      label: '有',
      value: '有',
    },
    {
      label: '无',
      value: '无',
    },
  ],
  caseType = [
    {
      label: '刑事',
      value: '刑事',
    },
    {
      label: '民事',
      value: '民事',
    },
    {
      label: '行政',
      value: '行政',
    },
  ],
  manType = [
    {
      label: '老年人',
      value: '老年人',
    },
    {
      label: '女性',
      value: '女性',
    },
    {
      label: '未成年人',
      value: '未成年人',
    },
    {
      label: '军人军属',
      value: '军人军属',
    },
    {
      label: '一般贫困者',
      value: '一般贫困者',
    },
    {
      label: '低保户',
      value: '低保户',
    },
    {
      label: '盲聋哑',
      value: '盲聋哑',
    },
    {
      label: '残疾人',
      value: '残疾人',
    },
    {
      label: '精神病',
      value: '精神病',
    },
    {
      label: '农民',
      value: '农民',
    },
    {
      label: '农民工',
      value: '农民工',
    },
    {
      label: '留守儿童',
      value: '留守儿童',
    },
    {
      label: '其他',
      value: '其他',
    },
  ];


class LawApply extends Component {
  constructor (props) {
    super(props);
    this.state = {
      currentSelect: [],
    };
  }

  componentWillMount () {
    document.documentElement.scrollTop = document.body.scrollTop = 0;
  }


  onSubmit = () => {
    this.props.form.validateFields({
      force: true,
    }, (error) => {
      if (!error) {
        const data = {
          ...this.props.form.getFieldsValue(),
          RECEIVE_TYPE: this.state.currentSelect.join(','),
        };
        this.props.dispatch({
          type: 'lawapply/sendApply',
          payload: data,
        });
        this.props.dispatch({
          type: 'lawapply/updateState',
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
      <Icon type={getLocalIcon('/others/information.svg')} style={{ marginRight: '6px' }} />
      <div>{title}</div>
    </div>);
  };

  changeValue = (obj) => {
    for (let i in obj) {
      if (typeof (obj[i]) === 'string') {
        obj[i] = replaceSystemEmoji(obj[i]);
      }
    }
    return obj;
  };

  handleOnChange = (key) => {
    const { currentSelect } = this.state;
    let newSelect = [],
      index = -1;
    if ((index = currentSelect.indexOf(key)) != -1) {
      newSelect = [...currentSelect.slice(0, index), ...currentSelect.slice(index + 1)];
    } else {
      newSelect = [...currentSelect, key];
    }
    this.setState({
      currentSelect: newSelect,
    });
  };

  renderCheckBox = () => {
    return (
      <div>
        <div className={styles.listTitle}>受援人类别：（可交叉填写）</div>
        {manType.map(item => {
          const { value = '', label = '' } = item;
          return label && value ?
            <CheckboxItem
              key={value}
              onChange={() => this.handleOnChange(value)}
            > {label}
            </CheckboxItem> : '';
        })}
      </div>
    );
  };

  render () {
    const { animating } = this.props.lawapply;
    const { getFieldProps, getFieldError } = this.props.form;
    return (
      <div>
        <Nav title="申请" dispatch={this.props.dispatch} />
        <div className={styles[`${PrefixCls}-outer`]}>
          <form>
            <WhiteSpace size="lg" />
            <div className={styles[`${PrefixCls}-applicant`]}>
              {this.getTitle('申请人基本情况')}
              <InputItem
                {...getFieldProps('FULL_NAME', {
                  initialValue: '',
                  rules: [{ required: true, message: '姓名必须输入' },
                  ],
                })}
                clear
                // error={!!getFieldError('FULL_NAME') && Toast.fail(getFieldError('FULL_NAME'))}
                error={!!getFieldError('FULL_NAME')}
                onErrorClick={() => {
                  Toast.fail(getFieldError('FULL_NAME'));
                }}
              >
                <Icon type={getLocalIcon('/others/require.svg')} size="xxs" color="#ff5f5f" />
                姓名
              </InputItem>
              <List>
                <Picker
                  data={sex}
                  cols={1}
                  {...getFieldProps('SEX', {
                    rules: [{ required: true, message: '请选择性别' }],
                  })}
                  // error={!!getFieldError('SEX') && Toast.fail(getFieldError('SEX'))}
                  error={!!getFieldError('SEX')}
                  onErrorClick={() => {
                    Toast.fail(getFieldError('SEX'));
                  }}
                >
                  <List.Item arrow="horizontal">
                    <Icon type={getLocalIcon('/others/require.svg')} size="xxs" color="#ff5f5f" />
                    性别
                  </List.Item>
                </Picker>
              </List>
              <InputItem
                {...getFieldProps('NATION', {
                  initialValue: '',
                  rules: [{ required: true, message: '民族必须输入' },
                  ],
                })}
                clear
                // error={!!getFieldError('NATION') && Toast.fail(getFieldError('NATION'))}
                error={!!getFieldError('NATION')}
                onErrorClick={() => {
                  Toast.fail(getFieldError('NATION'));
                }}
              >
                <Icon type={getLocalIcon('/others/require.svg')} size="xxs" color="#ff5f5f" />
                民族
              </InputItem>
              <List>
                <InputItem
                  {...getFieldProps('ID_NUMBER', {
                    rules: [
                      { required: true, message: '请输入身份证号' },
                      { pattern: pattern.idCard.pattern, message: pattern.idCard.message },
                    ],
                  })}
                  // error={!!getFieldError('ID_NUMBER') && Toast.fail(getFieldError('ID_NUMBER'))}
                  error={!!getFieldError('ID_NUMBER')}
                  onErrorClick={() => {
                    Toast.fail(getFieldError('ID_NUMBER'));
                  }}
                >
                  <Icon type={getLocalIcon('/others/require.svg')} size="xxs" color="#ff5f5f" />
                  身份证号
                </InputItem>
              </List>
              <Picker
                data={educationType}
                cols={1}
                {...getFieldProps('EDUCATION', {
                  rules: [{ required: true, message: '请选择文化程度' }],
                })}
                // error={!!getFieldError('EDUCATION') && Toast.fail(getFieldError('EDUCATION'))}
                error={!!getFieldError('EDUCATION')}
                onErrorClick={() => {
                  Toast.fail(getFieldError('EDUCATION'));
                }}
              >
                <List.Item arrow="horizontal">
                  <Icon type={getLocalIcon('/others/require.svg')} size="xxs" color="#ff5f5f" />
                  文化程度
                </List.Item>
              </Picker>
              <List>
                <InputItem
                  type="number"
                  {...getFieldProps('PHONE', {
                    initialValue: '',
                    rules: [
                      { required: true, message: '请输入联系方式' },
                      { pattern: pattern.phone.pattern, message: pattern.phone.message },
                    ],
                  })}
                  error={!!getFieldError('PHONE')}
                  onErrorClick={() => {
                    Toast.fail(getFieldError('PHONE'));
                  }}
                >
                  <Icon type={getLocalIcon('/others/require.svg')} size="xxs" color="#ff5f5f" />
                  联系电话
                </InputItem>
              </List>
              <list>
                <InputItem
                  type="text"
                  {...getFieldProps('ADDR', {
                    initialValue: '',
                    rules: [
                      { required: true, message: '请输入联系方式' },
                    ],
                  })}
                  error={!!getFieldError('ADDR')}
                  onErrorClick={() => {
                    Toast.fail(getFieldError('ADDR'));
                  }}
                >
                  <Icon type={getLocalIcon('/others/require.svg')} size="xxs" color="#ff5f5f" />
                  住所地
                </InputItem>
              </list>
              <List>
                <InputItem
                  type="text"
                  {...getFieldProps('REGIST_ADDR', {
                    initialValue: '',
                  })}
                >
                  户籍地址
                </InputItem>
              </List>
              <InputItem
                type="number"
                {...getFieldProps('POSTAL_CODE', {
                  initialValue: '',
                })}
              >
                邮政编码
              </InputItem>
              <List>
                <InputItem
                  type="text"
                  {...getFieldProps('WORK_UNIT', {
                    initialValue: '',
                  })}
                >
                  工作单位
                </InputItem>
              </List>
              <div>
                {this.renderCheckBox()}
              </div>
            </div>
            <WhiteSpace size="lg" />
            <div className={styles[`${PrefixCls}-applicant`]}>
              {this.getTitle('家庭经济状况')}
              <List>
                <TextareaItem
                  {...getFieldProps('FAMILY_POPULATION', {
                    initialValue: '',
                    rules: [{ required: true, message: '请输入申请人家庭人口状况' }],
                  })}
                  clear
                  rows={4}
                  error={!!getFieldError('FAMILY_POPULATION') && Toast.fail(getFieldError('FAMILY_POPULATION'))}
                  count={500}
                  placeholder={'请在此描述家庭人口状况（必填）'}
                />
              </List>
              <WhiteSpace />
              <List>
                <TextareaItem
                  {...getFieldProps('JIUYEZHUANGKUANG', {
                    initialValue: '',
                    rules: [{ required: true, message: '请输入申请人就业状况' }],
                  })}
                  clear
                  rows={4}
                  error={!!getFieldError('JIUYEZHUANGKUANG') && Toast.fail(getFieldError('JIUYEZHUANGKUANG'))}
                  count={500}
                  placeholder={'请在此描就业状况（必填）'}
                />
              </List>
              <InputItem
                type="number"
                {...getFieldProps('RENJUNSHOURU', {
                  initialValue: '',
                  rules: [{ required: true, message: 'RENJUNSHOURU' }],
                })}
                error={!!getFieldError('RENJUNSHOURU')}
                onErrorClick={() => {
                  Toast.fail(getFieldError('RENJUNSHOURU'));
                }}
              >
                <Icon type={getLocalIcon('/others/require.svg')} size="xxs" color="#ff5f5f" />
                家庭人均收入
              </InputItem>
              <List>
                <div className={styles.listTitle}>
                  <Icon type={getLocalIcon('/others/require.svg')} size="xxs" color="#ff5f5f" />
                  家庭成员中有无低保户、残疾证等相关证明
                </div>
                <Picker
                  data={disputeType}
                  cols={1}
                  {...getFieldProps('DIBAOCANJI', {
                    rules: [{ required: true, message: '请选择有无证明' }],
                  })}
                  error={!!getFieldError('DIBAOCANJI') && Toast.fail(getFieldError('DIBAOCANJI'))}
                >
                  <List.Item arrow="horizontal">选择</List.Item>
                </Picker>
              </List>
            </div>
            <div className={styles[`${PrefixCls}-applicant`]}>
              {this.getTitle('申请事项')}
              <List>
                <Picker
                  data={caseType}
                  cols={1}
                  {...getFieldProps('SHENQINGANJIANLEIXING', {
                    rules: [{ required: true, message: '请选择案件类型' }],
                  })}
                  // error={!!getFieldError('SHENQINGANJIANLEIXING') && Toast.fail(getFieldError('SHENQINGANJIANLEIXING'))}
                  error={!!getFieldError('SHENQINGANJIANLEIXING')}
                  onErrorClick={() => {
                    Toast.fail(getFieldError('SHENQINGANJIANLEIXING'));
                  }}
                >
                  <List.Item arrow="horizontal">
                    <Icon type={getLocalIcon('/others/require.svg')} size="xxs" color="#ff5f5f" />
                    案件类型
                  </List.Item>
                </Picker>
              </List>
              <InputItem
                type="text"
                {...getFieldProps('ANYOU', {
                  initialValue: '',
                  rules: [{ required: true, message: '请输入案由' }],
                })}
                error={!!getFieldError('ANYOU')}
                onErrorClick={() => {
                  Toast.fail(getFieldError('ANYOU'));
                }}
                placeholder="如离婚纠纷、追索劳动报酬等"
              >
                <Icon type={getLocalIcon('/others/require.svg')} size="xxs" color="#ff5f5f" />
                案由
              </InputItem>
              <List>
                <TextareaItem
                  {...getFieldProps('ANQINGMIAOSHU', {
                    initialValue: '',
                    rules: [{ required: true, message: '请输入案情概述' }],
                  })}
                  clear
                  rows={6}
                  error={!!getFieldError('ANQINGMIAOSHU') && Toast.fail(getFieldError('ANQINGMIAOSHU'))}
                  placeholder={'案情概述（必填）：'}
                />
              </List>
            </div>
            <WhiteSpace />
            <WingBlank>
              <Button type="primary" onClick={this.onSubmit}>提交</Button>
            </WingBlank>
          </form>
          <WhiteSpace size="lg" />
          <WhiteSpace size="lg" />
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

export default connect(({ loading, lawapply }) => ({
  loading,
  lawapply,
}))(createForm()(LawApply));


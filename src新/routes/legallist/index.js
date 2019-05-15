import React from 'react';
import { connect } from 'dva';
import { Component } from 'react';
import {
  WhiteSpace,
  Tabs,
  Badge,
  Picker,
  List,
  TextareaItem,
  Icon,
  Switch,
  Button,
  WingBlank,
  InputItem,
  Toast,
  ActivityIndicator,
  Layout,
} from 'components';
import { getLocalIcon, getImages, replaceSystemEmoji } from 'utils';
import Nav from 'components/nav';
import { createForm } from 'rc-form';
import TitleBox from 'components/titlecontainer';
import { legalRow } from 'components/row';
import ListView from 'components/listview';
import { routerRedux } from 'dva/router';
import styles from './index.less';

const PrefixCls = 'legallist',
  tabs = [
    { title: <Badge>法律咨询</Badge> },
    { title: <Badge>找律师</Badge> },
  ],
  type = [
    {
      label: '合同纠纷',
      value: '1',
    },
    {
      label: '家庭婚姻',
      value: '2',
    },
    {
      label: '财产侵占',
      value: '3',
    },
    {
      label: '交通事故',
      value: '4',
    },
  ];


class Comp extends Component {
  constructor (props) {
    super(props);
  }

  handleItemOnclick = ({ externalUrl = '', id, pathname = 'details' }) => {
    if (externalUrl != '' && externalUrl.startsWith('http')) {
      this.props.dispatch(routerRedux.push({
        pathname: 'iframe',
        query: {
          name,
          externalUrl,
        },
      }));
    } else {
      this.props.dispatch(routerRedux.push({
        pathname: `/${pathname}`,
        query: {
          name,
          dataId: id,
        },
      }));
    }
  }
  handleTabClick = (data, index) => {
    this.props.dispatch({
      type: 'legallist/querySelect',
      payload: {
        ...data,
        selected: index,
      },
    });
  }
  changeValue = (obj) => {
    for (let i in obj) {
      if (typeof (obj[i]) === 'string') {
        obj[i] = replaceSystemEmoji(obj[i]);
      }
    }
    return obj;
  }
  onSubmit = () => {
    this.props.form.validateFields({
      force: true,
    }, (error) => {
      if (!error) {
        const data = this.changeValue(this.props.form.getFieldsValue());
        this.props.dispatch({
          type: 'legallist/sendLegallistInfo',
          payload: {
            ...data,
          },
        });
        this.props.form.resetFields();
        this.props.dispatch({
          type: 'legallist/updateState',
          payload: {
            animating: true,
          },
        });
      }
    });
  }

  render () {
    const { getFieldProps, getFieldError } = this.props.form,
      { name = '', lists, animating, paginations, scrollerTop, legalType, resetValue } = this.props.legallist,
      { id } = this.props.location.query, 
      { BaseLine } = Layout, 
      { contents = '', tels = '', positions = '', isNiming = true } = resetValue,
      handleNavClick = (id, { title = '找律师' }) => {
        this.props.dispatch(routerRedux.push({
          pathname: '/lawyerlist',
          query: {
            name: title,
            id,
          },
        }));
      },
      renderNav = (id) => {
        return (
          <span onClick={handleNavClick.bind(this, id)}>找律师</span>
        );
      },
      onRefresh = (callback) => {
        this.props.dispatch({
          type: `${PrefixCls}/queryListview`,
          payload: {
            callback,
            isRefresh: true,
          },
        });
      },
      onEndReached = (callback) => {
        this.props.dispatch({
          type: `${PrefixCls}/queryListview`,
          payload: {
            callback,
          },
        });
      },
      onScrollerTop = (top) => {
        if (typeof top !== 'undefined' && !isNaN(top * 1)) {
          this.props.dispatch({
            type: `${PrefixCls}/updateState`,
            payload: {
              scrollerTop: top,
            },
          });
        }
      },
      getContents = (lists) => {
        const { current, total, size } = paginations,
          hasMore = (total > 0) && ((current > 1 ? current - 1 : 1) * size < total),
          result = [];
        result.push(
          <ListView layoutHeader={''}
            dataSource={lists}
            layoutRow={legalRow}
            onEndReached={onEndReached}
            onRefresh={onRefresh}
            hasMore={hasMore}
            onScrollerTop={onScrollerTop.bind(null)}
            scrollerTop={scrollerTop}
          />,
        );

        return result;
      };
    return (
      <div className={styles[`${PrefixCls}-outer`]}>
        <Nav title={name} dispatch={this.props.dispatch} renderNavRight={renderNav(id)} />
        <WhiteSpace size="sm" />
        <div>
          <div>
            <Picker data={legalType}
              cols={1}
              {...getFieldProps('types', {
                rules: [{ required: true, message: '请选择咨询类型' }],
              })}
              error={!!getFieldError('types') && Toast.fail(getFieldError('types'))}
            >
              <List.Item arrow="horizontal">咨询类型</List.Item>
            </Picker>
          </div>
          <List.Item className={styles[`${PrefixCls}-outer-content`]}>
            <TextareaItem
              {...getFieldProps('content', {
                initialValue: contents,
                rules: [{ required: true, message: '请输入咨询内容' }],
              })}
              clear
              rows={4}
              error={!!getFieldError('content') && Toast.fail(getFieldError('content'))}
              count={500}
              placeholder={'请输入您需要咨询的问题、如案件经过、证据情况、以便为您更好的解答'}
            />
          </List.Item>
          <div>
            <InputItem
              type="number"
              {...getFieldProps('tels', {
                initialValue: tels,
              })}
              placeholder="非必填"
            >
              联系电话
            </InputItem>
            <InputItem
              {...getFieldProps('address', {
                initialValue: positions,
              })}
              clear
              error={!!getFieldError('address') && Toast.fail(getFieldError('address'))}
            >
              地址
            </InputItem>
          </div>

          <div>
            <List>
              <List.Item
                extra={<Switch
                  {...getFieldProps('isNiming', {
                    initialValue: isNiming,
                    valuePropName: 'checked',
                  })}
                  platform="android"
                />}
              >是否隐私发布</List.Item>
            </List>
            <WhiteSpace />
            <WingBlank>
              <Button onClick={this.onSubmit} type="primary">确认发布</Button>
            </WingBlank>
            <WhiteSpace />
          </div>
          <TitleBox title="咨询列表" />
          <div>
            {lists.length > 0 ? getContents(lists) : <BaseLine />}
          </div>
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

export default connect(({ loading, legallist }) => ({
  loading,
  legallist,
}))(createForm()(Comp));

/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import Nav from 'components/nav';
import {
  List,
  WhiteSpace,
  Icon,
  WingBlank,
  Card,
  Tag,
} from 'components';
import { getLocalIcon, getTitle } from 'utils';
import styles from './index.less';

const PrefixCls = 'lawyerdetails';

class LawyerDetails extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  getDetails = () => {
    const { dataList } = this.props.lawyerassistance;
    const { id = '' } = this.props.location.query;
    return (cnIsArray(dataList) && dataList.find(item => item.LEGALAID_ID === id));
  };

  getShstate = (text) => {
    if (text === '未审核') {
      return <span style={{ color: '#cc2020' }}>{`●${text}`}</span>;
    } else if (text === '审核通过') {
      return <span style={{ color: '#00cf04' }}>{`●${text}`}</span>;
    } else if (text === '审核未通过') {
      return <span style={{ color: '#a2a699' }}>{`●${text}`}</span>;
    }
  };

  render () {
    const { name = '我的调解' } = this.props.location.query,
      { ADDR = '', ANQINGMIAOSHU = '', ANYOU = '', AUDIT_STATE = '', DIBAOCANJI = '', EDUCATION = '', FAMILY_POPULATION = '', FULL_NAME = '', ID_NUMBER = '', JIUYEZHUANGKUANG = '', NATION = '', PHONE = '', POSTAL_CODE = '', RECEIVE_TYPE = '', REGIST_ADDR = '', RENJUNSHOURU = '', SEX = '', SHENQINGANJIANLEIXING = '', WORK_UNIT = '', crate_date = '' } = this.getDetails();
    return (
      <div>
        <Nav title={getTitle(name)} dispatch={this.props.dispatch} />
        <div className={styles[`${PrefixCls}-outer`]}>
          <WingBlank>
            <WhiteSpace size="lg" />
            <Card>
              <Card.Header
                title="申请人基本情况"
                thumb={<Icon type={getLocalIcon('/others/information.svg')} style={{ marginRight: '6px' }} />}
                extra={<span>{crate_date}</span>}
              />
              <Card.Body>
                <List className={styles.list}>
                  <List.Item extra={FULL_NAME}>姓名</List.Item>
                  <List.Item extra={SEX === '0' ? '男' : '女'}>性别</List.Item>
                  <List.Item extra={NATION}>民族</List.Item>
                  <List.Item extra={ID_NUMBER}>身份证号</List.Item>
                  <List.Item extra={EDUCATION}>文化程度</List.Item>
                  <div className={styles.address}>户籍地址：
                    <div>{REGIST_ADDR === '' ? '未填写' : REGIST_ADDR}</div>
                  </div>
                  <div className={styles.address}>住所地：
                    <div>{ADDR === '' ? '未填写' : REGIST_ADDR}</div>
                  </div>
                  <List.Item extra={POSTAL_CODE}>邮政编码</List.Item>
                  <List.Item extra={WORK_UNIT}>工作单位</List.Item>
                  <List.Item extra={PHONE}>联系电话</List.Item>
                  <div className={styles.receiveType}>
                    受援人类别：
                    <div>
                      {
                        RECEIVE_TYPE.split(',')
                          .map(items =>
                            (<Tag
                              style={{ marginRight: '5px', color: '#108ee9', borderColor: '#108ee9' }}
                              small
                            >{items === '' ? '未选择' : items}</Tag>))
                      }
                    </div>
                  </div>
                </List>
              </Card.Body>
            </Card>
            <WhiteSpace size="lg" />
            <Card>
              <Card.Header
                title="家庭经济状况"
                thumb={<Icon type={getLocalIcon('/others/information.svg')} style={{ marginRight: '6px' }} />}
              />
              <Card.Body>
                <List className={styles.list}>
                  <div className={styles.address}>家庭人口状况：
                    <div>{FAMILY_POPULATION === '' ? '未填写' : FAMILY_POPULATION}</div>
                  </div>
                  <div className={styles.address}>就业状况：
                    <div>{JIUYEZHUANGKUANG === '' ? '未填写' : JIUYEZHUANGKUANG}</div>
                  </div>
                  <List.Item extra={RENJUNSHOURU}>家庭收入</List.Item>
                  <div className={styles.address}>家庭成员中有无低保户、残疾证等相关证明：
                    <div>{DIBAOCANJI}</div>
                  </div>
                </List>
              </Card.Body>
            </Card>
            <WhiteSpace size="lg" />
            <Card>
              <Card.Header
                title="申请事项"
                thumb={<Icon type={getLocalIcon('/others/information.svg')} style={{ marginRight: '6px' }} />}
              />
              <Card.Body>
                <List className={styles.list}>
                  <List.Item extra={SHENQINGANJIANLEIXING}>案件类型</List.Item>
                  <List.Item extra={ANYOU}>案由</List.Item>
                  <div className={styles.address}>案情概述：
                    <div>{ANQINGMIAOSHU === '' ? '未填写' : ANQINGMIAOSHU}</div>
                  </div>
                </List>
              </Card.Body>
            </Card>
          </WingBlank>

        </div>
      </div>
    );
  }
}

export default connect(({ loading, lawyerassistance }) => ({
  loading,
  lawyerassistance,
}))(createForm()(LawyerDetails));


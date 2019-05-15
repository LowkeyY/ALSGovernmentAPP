import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Flex, Radio, WhiteSpace, Button, Icon, NavBar, DatePicker, List } from 'components';
import { getLocalIcon } from 'utils';
import styles from './index.less';

const PrefixCls = 'search';
const RadioItem = Radio.RadioItem, 
  flexItemLength = 3;

module.exports = {
  layoutFilters: (filters = [], filterValues = {}, handleOnclick = () => {
  }) => {
    const result = [];
    filters.map(filter => {
      let { key = '', cntype = '', items = [], title = '' } = filter, 
        values = filterValues[key] || [];
      if (key != '' && cntype != '') {
        switch (cntype) {
          case 'radio': {
            if (items.length > 0) {
              let children = [];
              items.map((item, index) => {
                const { text = '', value = '' } = item, 
                  checked = values.includes(value);
                if (index != 0 && index % flexItemLength == 0) {
                  result.push(<Flex>{children}</Flex>);
                  children = [];
                }
                children.push(
                  <Flex.Item className={`${checked ? 'active' : ''}`} onClick={handleOnclick.bind(null, key, value)}>
                    <RadioItem key={value} checked={checked}>
                      <span className={styles[`${PrefixCls}-searchtext`]}>{text}</span>
                    </RadioItem>
                  </Flex.Item>
                );
              });
              result.push(<Flex>{children}</Flex>);
            }
          }
          case 'date': {
            if (title != '') {
              let handleIconClick = (e) => {
                  e.stopPropagation();
                  handleOnclick(key, null);
                }, 
                extar = values.length > 0 ?
                  (<span>
                    {values[0]} <Icon type={'cross'} onClick={handleIconClick} />
                  </span>) : `选择${title}`;
              result.push(
                <DatePicker mode="date"
                  title={title}
                  extra={<span className={styles[`${PrefixCls}-searchtext`]}>{extar}</span>}
                  onChange={(date) => {
                    handleOnclick(key, date.toLocaleDateString());
                  }}
                >
                  <List.Item arrow="horizontal"><span className={styles[`${PrefixCls}-searchtext`]}>{title}</span></List.Item>
                </DatePicker>
              );
            }
          }
          default: {
          }
        }
      }
      result.push(<WhiteSpace size="sm" />);
    });
    return result;
  }
};

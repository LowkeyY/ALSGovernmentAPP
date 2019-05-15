import React from 'react';
import { connect } from 'dva';
import { List, InputItem, Switch, Checkbox, Range, Button, Card, WingBlank, WhiteSpace, Toast } from 'components';
import Nav from 'components/nav';
import { routerRedux } from 'dva/router';
import styles from './index.less';

const PrefixCls = 'survey',
  Item = List.Item,
  CheckboxItem = Checkbox.CheckboxItem;

function Comp ({ location, dispatch, survey, form }) {
  const { name = '', title = '', lists = [], values = {}, issues = {}, isSubmit } = survey,
    getFieldErrors = () => {
      const result = [];
      Object.keys(issues)
        .map(key => {
          if (!values.hasOwnProperty(key) || !values[key].length) {
            result.push(`"${issues[key]}"必须填写。`);
          }
        });
      return result;
    },
    handleSubmits = () => {
      const errors = getFieldErrors();
      if (errors.length == 0) {
        dispatch({
          type: 'survey/sumbit',
          payload: {
            values,
          },
        });
      } else {
        Toast.fail(errors[0]);
      }
    },
    handleOnChange = (item, value) => {
      const { multiple, id } = item;
      if (multiple) {
        let currentValue = values[id];
        if (currentValue.includes(value)) {
          currentValue.remove(value);
        } else {
          currentValue.push(value);
        }
        values[id] = currentValue;
      } else {
        values[id] = [value];
      }
      dispatch({
        type: 'survey/updateState',
        payload: {
          values,
        },
      });
    },
    layoutInputItem = (list) => {
      const { title = '', items = [], isRequired = false, id } = list;
      return (<List renderHeader={() => <span className={styles[`${PrefixCls}-list-title`]}>{title}</span>}>
        {items.map(item => {
          const { value = '', label = '' } = item;
          return label && value ?
            <CheckboxItem key={value}
              checked={values[id] && values[id].includes(value)}
              onChange={handleOnChange.bind(null, list, value)}
            > {label}
            </CheckboxItem> : '';
        })}
      </List>
      );
    };
  return (
    <div className={styles[`${PrefixCls}-outer`]}>
      <Nav title={name} dispatch={dispatch} />
      <div className={styles[`${PrefixCls}-content`]}>
        <WingBlank size="sm">
          <Card>
            <Card.Header
              title={<span className={styles[`${PrefixCls}-card-title`]}>{title}</span>}
            />
            <Card.Body>
              {lists.map(list => layoutInputItem(list))}
            </Card.Body>
            <Card.Footer
              content={<Button type="primary" loading={isSubmit} onClick={isSubmit ? '' : handleSubmits}>提交</Button>}
            />
          </Card>
        </WingBlank>
      </div>
    </div>
  );
}

export default connect(({ loading, survey }) => ({
  loading,
  survey,
}))(Comp);

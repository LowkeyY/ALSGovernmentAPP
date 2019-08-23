import React from 'react';
import { connect } from 'dva';
import {
  List,
  InputItem,
  Switch,
  Checkbox,
  Range,
  Button,
  Card,
  WingBlank,
  WhiteSpace,
  Toast,
} from 'components';
import Nav from 'components/nav';
import QuestionNaireModal from 'components/questionnaireModal';
import styles from './index.less';

const PrefixCls = 'survey',
  CheckboxItem = Checkbox.CheckboxItem;


function Comp ({ location, dispatch, survey }) {
  const { name = '', title = '', lists, condition = {}, values = {}, issues = {}, isSubmit, district } = survey,
    { conditionId = '' } = location.query,
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

    getRankingTitle = () => {
      if (localStorage.getItem(conditionId)) {
        const session = localStorage.getItem(conditionId);
        return JSON.parse(session).isRankingTitle || '';
      }
      return undefined;
    },

    getSubmitId = () => {
      if (localStorage.getItem(conditionId)) {
        const session = localStorage.getItem(conditionId);
        return JSON.parse(session).submitId || '';
      }
      return undefined;
    },

    getScore = () => {
      if (localStorage.getItem(conditionId)) {
        let sum = 0;
        const { lists } = survey;
        Object.keys(values)
          .map(item => {
            if (values[item].length > 0) {
              values[item].map(data => {
                const currnet = lists.find(list => list.id === item).items;
                const num = currnet.find(currnetItems => currnetItems.value === data).score;
                sum += parseInt(num, 10);
              });
            }
          });
        return sum;
      }
      return undefined;
    },

    handleSubmits = () => {
      const errors = getFieldErrors();
      if (errors.length === 0) {
        dispatch({
          type: 'survey/sumbit',
          payload: {
            values,
            condtionId: conditionId ?conditionId
              : undefined,
            submitId: getSubmitId(),
            rankingTitle: getRankingTitle(),
            score: getScore(),
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
      const { title = '', items = [], id } = list;
      return (<List key={id} renderHeader={() => <span className={styles[`${PrefixCls}-list-title`]}>{title}</span>}>
          {
            items.map(item => {
              const { value = '', label = '' } = item;
              return label && value ?
                <CheckboxItem
                  key={value}
                  wrap
                  checked={values[id] && values[id].includes(value)}
                  onChange={handleOnChange.bind(null, list, value)}
                > {label}
                </CheckboxItem> : '';
            })
          }
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
              content={
                <Button type="primary" loading={isSubmit} onClick={isSubmit ? '' : handleSubmits}>提交</Button>
              }
            />
          </Card>
        </WingBlank>
      </div>
      <WhiteSpace size="lg" />
      <WhiteSpace size="lg" />
      <QuestionNaireModal condition={condition} dispatch={dispatch} district={district} />
    </div>
  );
}

export default connect(({ loading, survey }) => ({
  loading,
  survey,
}))(Comp);

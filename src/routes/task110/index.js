import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, List } from 'components';
import { routerRedux } from 'dva/router';
import Nav from 'components/nav';
import NoMessage from 'components/nomessage';
import styles from './index.less';

const PrefixCls = 'task110',
  Item = List.Item,
  Brief = Item.Brief;

function Task110 ({ location, dispatch, task110 }) {
  const { name = '' } = location.query,
    { dataList = [] } = task110,
    handleItemClick = ({ id }) => {
      dispatch(routerRedux.push({
        pathname: '/task110Details',
        query: {
          id,
          name: '任务详情'
        },
      }));
    };
  return (
    <div>
      <Nav title={name} dispatch={dispatch} />
      <WhiteSpace size="md" />
      <List>
        {
          dataList.length > 0 ?
            dataList.map((data) => {
              const { title, creatDate } = data;
              return (<Item
                className={styles[`${PrefixCls}-item`]}
                multipleLine
                arrow="horizontal"
                onClick={handleItemClick.bind(this, data)}
              >
                {title}
                <Brief>{creatDate}</Brief>
              </Item>);
            })
            :
            <NoMessage />
        }
      </List>
    </div>
  );
}

export default connect(({ loading, task110 }) => ({
  loading,
  task110,
}))(Task110);

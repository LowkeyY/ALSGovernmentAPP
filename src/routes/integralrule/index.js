import React from 'react';
import { connect } from 'dva';
import Nav from 'components/nav';
import { Accordion, List } from 'components';
import styles from './index.less';

function IntegralRule ({ location, dispatch, integralrule }) {
  const { name = '积分规则' } = location.query,
    { lists } = integralrule;
  return (
    <div className={styles.outer}>
      <Nav title={name} dispatch={dispatch}/>
      <Accordion defaultActiveKey="0" className={styles['my-accordion']}>
        {
          cnIsArray(lists) && lists.map((data, i) => {
            return (
              <Accordion.Panel header={data.name} key={data.id}>
                <List className={styles['my-list']}>
                  {
                    data.items.map((item, i) => {
                      return (
                        <List.Item
                          wrap={true}
                          extra={<span className={styles.integral}>{`${item.integral}分`}</span>}
                          key={item.id}>
                          {item.name}
                        </List.Item>
                      );
                    })
                  }
                </List>
              </Accordion.Panel>
            );
          })
        }
      </Accordion>
    </div>
  );
}

export default connect(({ loading, integralrule }) => ({
  loading,
  integralrule,
}))(IntegralRule);

import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, Tabs } from 'components';
import Nav from 'components/nav';
import { lawyerList, officeList } from 'components/row';
import Layout from 'components';
import { routerRedux } from 'dva/router';
import styles from './index.less';


const PrefixCls = 'lawyerlist', 
  { BaseLine } = Layout;

function Lawyerlist ({ location, dispatch, lawyerlist }) {
  const { name = '', index = 0 } = location.query,
    { grids, selectedIndex, lists } = lawyerlist,
    handleItemOnclick = ({ externalUrl = '', id, pathname = 'details' }) => {
      if (externalUrl != '' && externalUrl.startsWith('http')) {
        dispatch(routerRedux.push({
          pathname: 'iframe',
          query: {
            name,
            externalUrl,
          },
        }));
      } else {
        dispatch(routerRedux.push({
          pathname: `/${pathname}`,
          query: {
            name,
            dataId: id,
          },
        }));
      }
    },
    getContent = () => {
      const result = [];
      if (selectedIndex == 0) {
        result.push(lawyerList(lists, handleItemOnclick));
      } else {
        result.push(officeList(lists, handleItemOnclick));
      }
      return <div>{result}</div>;
    },
    getTabs = () => {
      const result = [];
      grids.map((grid, i) => {
        const { title = '' } = grid;
        if (title != '') {
          result.push({ ...grid });
        }
      });
      return result;
    },
    handleTabClick = (data, index) => {
      dispatch({
        type: 'lawyerlist/querySelect',
        payload: {
          ...data,
          selected: index,
        },
      });
    };
  return (
    <div>
      <Nav title={name} dispatch={dispatch} />
      <Tabs
        initialPage={0}
        page={selectedIndex}
        tabs={getTabs()}
        swipeable={false}
        onTabClick={handleTabClick}
      >
        {getContent()}
      </Tabs>
    </div>
  );
}

export default connect(({ loading, lawyerlist }) => ({
  loading,
  lawyerlist,
}))(Lawyerlist);

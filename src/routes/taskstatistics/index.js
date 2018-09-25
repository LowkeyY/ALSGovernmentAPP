import { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import PropTypes from 'prop-types';
import { reactRow } from 'components/row';
import TitleBox from 'components/titlecontainer';
import NoMessage from 'components/nomessage';
import Charts from 'components/chart';
import Nav from 'components/nav';
import {
  List,
  WhiteSpace,
} from 'components';
import styles from './index.less';

const PrefixCls = 'taskstatistics';


class TaskStatistics extends Component {
  
  
  getMap = (data) => {
    let map = {};
    data && data.map((item, i) => {
      map[item.name] = item.amount;
    });
    return map;
  };
  getDate = (data) => {
    let newData = [];
    data && data.map((item, i) => {
      newData.push({
        name: item.name,
        percent: item.percent,
        a: '1'
      });
    });
    return newData.length > 0 ? newData : [];
  };
  
  render () {
    const { name = '' } = this.props.location.query, { chartData, reactList } = this.props.taskstatistics,
      { dispatch } = this.props,
      handleItemClick = ({ id }) => {
        dispatch(routerRedux.push({
          pathname: '/seekdetails',
          query: {
            id,
            name: '反馈详情'
          },
        }));
      },
      getCurrentView = (dataList) => {
        return dataList.map((data, i) => {
          return reactRow(data, handleItemClick);
        });
      };
    return (
      <div>
        <Nav title={name} dispatch={this.props.dispatch} />
        <TitleBox title="任务统计" />
        <div className={styles[`${PrefixCls}-chart-wrapper`]}>
          {chartData.length > 0 ?
            <Charts data={this.getDate(chartData)} map={this.getMap(chartData)} /> : ''}
        </div>
        <TitleBox title="我的反馈" />
        {reactList.length > 0 ? getCurrentView(reactList) : <NoMessage />}
      </div>
    );
  }
}


TaskStatistics.propTypes = {
  dispatch: PropTypes.func.isRequired
};
TaskStatistics.defaultProps = {};
export default connect(({ loading, taskstatistics }) => ({
  loading,
  taskstatistics,
}))(TaskStatistics);

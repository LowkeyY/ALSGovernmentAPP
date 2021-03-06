/* eslint-disable react/prop-types */
import React from 'react';
import { PullToRefresh, ListView } from 'antd-mobile';
import ReactDOM from 'react-dom';
import { getOffsetTopByBody } from 'utils';
import TitleBox from 'components/titlecontainer';
import { Layout } from 'components';
import NoContent from 'components/nocontent';
import RefreshLoading from 'components/refreshloading';
import styles from './index.less';

let PrefixCls = 'cn-listview',
  globalIndex = 0,
  getId = (name = '', last = false) => {
    return `${name || PrefixCls}-${last ? globalIndex : ++globalIndex}`;
  },
  { BaseLine } = Layout;

class Comp extends React.Component {
  constructor (props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource,
      refreshing: true,
      isLoading: true,
      height: document.documentElement.clientHeight,
    };
  }

  componentDidMount () {
    let hei = this.state.height,
      el;
    if (el = ReactDOM.findDOMNode(this.lv)) {
      hei = cnhtmlHeight - getOffsetTopByBody(el) - cnhtmlSize;
    }
    setTimeout(() => {
      let { dataSource } = this.state;
      if (this.props.dataSource.length) {
        dataSource = dataSource.cloneWithRows(this.props.dataSource);
      }
      this.setState({
        dataSource,
        height: hei,
        refreshing: false,
        isLoading: false,
      });
    }, 10);
    setTimeout(() => {
      if (this.lv && this.props.scrollerTop > 0) {
        this.lv.scrollTo(0, this.props.scrollerTop);
      }
    }, 100);
  }

  componentWillReceiveProps (nextProps) {

    if (nextProps.dataSource !== this.props.dataSource) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource),
      });
    }
  }

  componentDidUpdate () {
    if (this.props.useBodyScroll) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }

  componentWillUnmount () {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop >= 0 && this.props.onScrollerTop) {
      this.props.onScrollerTop(scrollTop);
    }
  }

  onRefresh = () => {
    this.setState({ refreshing: true, isLoading: true });
    if (this.props.onRefresh) {
      const cb = () => {
        this.setState({
          refreshing: false,
          isLoading: false,
        });
      };
      this.props.onRefresh(cb.bind(this));
    } else {
      setTimeout(() => {
        this.setState({
          refreshing: false,
          isLoading: false,
        });
      }, 600);
    }
  };

  onEndReached = (event) => {
    if (this.state.isLoading || !this.props.hasMore) {
      return;
    }
    this.setState({ isLoading: true });
    if (this.props.onEndReached) {
      const cb = () => {
        this.setState({
          isLoading: false,
        });
      };
      this.props.onEndReached(cb.bind(this));
    } else {
      setTimeout(() => {
        this.setState({
          isLoading: false,
        });
      }, 600);
    }
  };

  layoutSeparator (sectionID, rowID) {
    if (this.props.layoutSeparator) {
      return this.props.layoutSeparator(sectionID, rowID);
    }
    return;
    <div
      key={`${sectionID}-${rowID}`}
      style={{
        backgroundColor: '#F5F5F9',
        height: 8,
        borderTop: '1px solid #ECECED',
        borderBottom: '1px solid #ECECED',
      }}
    />;
  }

  layoutRow (rowData, sectionID, rowID) {
    if (this.props.layoutRow) {
      return this.props.layoutRow(rowData, sectionID, rowID);
    }
    return '';
  }

  layoutHeader () {
    if (this.props.layoutHeader) {
      return <TitleBox title={this.props.layoutHeader()} icon={this.props.titleIcon} />;
    }
    return '';
  }

  layoutFooter () {
    if (this.props.layoutFooter) {
      return this.props.layoutFooter(this.state.isLoading);
    }
    return (
      <div style={{ textAlign: 'center' }}>
        {
          this.props.hasMore
            ?
            <RefreshLoading svg={'/others/refreshloading.svg'} />
            :
            <BaseLine />
        }
      </div>
    );
  }

  render () {
    const { dataSource = [] } = this.props;
    return (
      dataSource.length > 0 ?
        <div className={styles[`${PrefixCls}-outer`]}>
          <ListView
            ref={el => this.lv = el}
            initialListSize={this.props.dataSource.length || 10}
            dataSource={this.state.dataSource}
            renderHeader={this.layoutHeader.bind(this)}
            renderFooter={this.layoutFooter.bind(this)}
            renderRow={this.layoutRow.bind(this)}
            renderSeparator={this.layoutSeparator.bind(this)}
            useBodyScroll={this.props.useBodyScroll}
            style={this.props.useBodyScroll ? {} : {
              height: this.state.height,
              border: '1px solid #ddd',
              margin: '5px 0',
            }}
            pullToRefresh={
              <PullToRefresh
                distanceToRefresh={60}
                damping={200}
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
              />}
            onEndReached={this.onEndReached.bind(this)}
            onEndReachedThreshold={100}
            pageSize={this.props.pageSize}
          />
        </div>
        :
        <NoContent />
    );
  }
}

Comp.propTypes = {};
Comp.defaultProps = {
  dataSource: [],
  useBodyScroll: true,
  hasMore: false,
  pageSize: 10,
  onRefresh: '',
  layoutHeader: '',
  layoutFooter: '',
  layoutRow: '',
  layoutSeparator: '',
  scrollerTop: 0,
  onScrollerTop: '',
  titleIcon: null,
};

export default Comp;

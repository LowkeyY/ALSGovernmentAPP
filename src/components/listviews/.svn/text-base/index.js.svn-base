import { PullToRefresh, ListView } from 'antd-mobile';
import ReactDOM from 'react-dom';
import './index.less';

const ListViewPageSize = 10;

class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      height: this.props.defalutHeight || document.documentElement.clientHeight,
      currentPagination: 0,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      if (ReactDOM.findDOMNode(this.lv)) {
        const hei = (this.props.defalutHeight || document.documentElement.clientHeight) - ReactDOM.findDOMNode(this.lv).offsetTop;
        this.setState({
          height: hei,
          currentPagination: 0,
        })
      }
    },150);

    this.lv.getInnerViewNode().addEventListener('touchstart', this.ts = (e) => {
      this.tsPageY = e.touches[0].pageY;
    });
    this.lv.getInnerViewNode().addEventListener('touchmove', this.tm = (e) => {
      this.tmPageY = e.touches[0].pageY;
      if (this.tmPageY > this.tsPageY && this.st <= 0 && document.body.scrollTop > 0) {
        this.domScroller.options.preventDefaultOnTouchMove = false;
      } else {
        this.domScroller.options.preventDefaultOnTouchMove = undefined;
      }
    });
    if (this.props.scrollerTop > 0)
      this.lv.scrollTo(0, this.props.scrollerTop);
  }

  componentWillUnmount() {
    this.lv.getInnerViewNode().removeEventListener('touchstart', this.ts);
    this.lv.getInnerViewNode().removeEventListener('touchmove', this.tm);
    if (this.st && this.st != 0 && this.props.updateScrollerTop)
      this.props.updateScrollerTop(this.st);
  }

  onScroll = (e) => {
    this.st = e.scroller.getValues().top;
    this.domScroller = e;
    const curPagination = this.updatePaginationBySt(Math.ceil(this.st));
    if (curPagination != this.state.currentPagination) {
      this.setState({
        currentPagination: curPagination
      }) //向上滑动 更新当前页码
    }
  };

  updatePaginationBySt = (st) => {
    let result = this.state.currentPagination,
      isFind = false;
    const {pagination} = this.props;
    pagination && Object.keys(pagination).map(_ => {
      if (!isFind && st <= +_) {
        result = pagination[_];
        isFind = true;
      }
    })
    return result;
  };

  onEndReached = (e) => {
    const currentSt = Math.floor(this.st);
    this.setState({
      currentPagination: this.props.pageIndex
    }) //向下滑动记录当前页码
    this.props.onEndReached(e, currentSt);
  };

  getCurrentPagination = () => {
    let result = 0,
      hasValue = false;
    const {pagination = "", totalCount = 0, pageIndex} = this.props;
    if (totalCount > 0) {
      pagination && Object.keys(pagination).map(_ => {
        if (!hasValue && !isNaN(_) && this.st <= _) {
          result = pagination[_];
          hasValue = true;
        }
      });
    }
    return result;
  }

  render() {
    const separator = (sectionID, rowID) => (
      <div key={ `${sectionID}-${rowID}` } id={ `${sectionID}-${rowID}` } style={ { backgroundColor: '#F5F5F9', height: 2, borderTop: '1px solid #ECECED', borderBottom: '1px solid #ECECED', } } />
    );

    const footer = () => {
      const isLoad = this.props.isLoading || this.props.refreshing;
      return (
        <div style={ { padding: isLoad ? '20px' : '30px', textAlign: 'center' } }>
          { isLoad ? '加载中...' : '没有更多内容了。' }
        </div>
      )
    }

    const paginationer = () => {
      const {totalCount = 0} = this.props,
        {currentPagination} = this.state;
      if (currentPagination > 0 && totalCount > ListViewPageSize) {
        return (
          <div className="comp-view-pagination">
            <span>{ `${ currentPagination }/${ Math.ceil(totalCount / ListViewPageSize) }` }</span>
          </div>
        );
      }
      return "";
    }

    return (
      <div>
        <ListView
          ref={ el => this.lv = el }
          dataSource={ this.props.dataSource }
          renderFooter={ footer }
          renderRow={ this.props.renderRow }
          renderSeparator={ separator }
          initialListSize={ this.props.initialListSize || 10 }
          pageSize={ ListViewPageSize }
          style={ { height: this.state.height, border: '1px solid #ddd' } }
          className="comp-view-lists"
          scrollerOptions={ { scrollbars: true } }
          /*refreshControl={ <RefreshControl refreshing={ this.props.refreshing } onRefresh={ this.props.onRefresh } /> }*/
          onScroll={ this.onScroll }
          scrollRenderAheadDistance={ 200 }
          scrollEventThrottle={ 20 }
          onEndReached={ this.onEndReached }
          onEndReachedThreshold={ 10 } />
        { paginationer() }
      </div>
    );
  }
}

export default Results;

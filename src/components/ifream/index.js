import ReactDOM from 'react-dom';
import React from 'react';
import { routerRedux } from 'dva/router';
import PropTypes from 'prop-types';
import { Loader, Eventlisten, Modal } from 'components';
import styles from './index.less';

const alert = Modal.alert, PrefixCls = 'ifream';

class Iframes extends React.Component {
  constructor (props) {
    super(props);
    
    this.state = {
      height: document.documentElement.clientHeight - 45,
      isLoading: false
    };
  }
  
  componentWillMount () {
    this.setState({
      isLoading: true
    });
  }
  
  componentDidMount () {
    const ifream = ReactDOM.findDOMNode(this.lv);
    setTimeout((jh) => {
      if (ifream) {
        const hei = document.documentElement.clientHeight - ifream.offsetTop;
        this.setState({
          height: hei,
        });
      }
    }, 0);
    
    ifream.onload = () => {
      ifream;
      this.setState({
        isLoading: false
      });
    };
  }
  
  onPatry = (data) => {
    const { id, name, type } = data;
    if (type === 'dangjian') {
      this.props.dispatch(routerRedux.push({
        pathname: `/lanmusub`,
        query: {
          id,
          name
        },
      }));
    } else if (type === 'shouhu') {
      const { userId = '' } = data;
      this.props.dispatch(routerRedux.push({
        pathname: `/routemap`,
        query: {
          userId,
          name: '轨迹查询'
        },
      }));
    } else if (type === 'rcdt') {
      const { name = '', content = '', id = '', isJump = 'true' } = data;
      if (isJump === 'true') {
        alert(this.getTitle(name), this.getContent(content), [
          { text: '取消', onPress: () => console.log('cancel') },
          { text: '查看详情', onPress: this.handleOkClick.bind(this, data) },
        ]);
      } else {
        alert(this.getTitle(name), this.getContent(content), [
          { text: '关闭', onPress: () => console.log('cancel') },
        ]);
      }
    }
  };
  getContent = (content) => {
    return (
      <div className={styles[`${PrefixCls}-content`]} dangerouslySetInnerHTML={{ __html: content }} />
    );
  };
  getTitle = (name) => {
    return (
      <div className={styles[`${PrefixCls}-title`]}>
        {name}
      </div>
    );
  };
  handleOkClick = ({ id = '', name = '', route = 'personnellist' }) => {
    this.props.dispatch(routerRedux.push({
      pathname: `/${route}`,
      query: {
        id,
        name
      },
    }));
  };
  
  render () {
    return (
      <div>
        <iframe id="cnComponentIfream"
                ref={el => this.lv = el}
                src={this.props.src}
                style={{ width: '100%', height: this.props.height || this.state.height, border: 0 }}
        />
        <Loader spinning={this.state.isLoading} />
        <Eventlisten willCallback={this.onPatry.bind(this)} />
      </div>
    );
  }
}

Iframes.propTypes = {
  dispatch: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired
};
Iframes.defaultProps = {
  height: false,
  src: '',
};
export default Iframes;

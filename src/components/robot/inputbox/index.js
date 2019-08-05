import { Component } from 'react';
import { Button, Icon } from 'antd-mobile';
import { getLocalIcon } from 'utils';
import ReactDOM from 'react-dom';
import styles from './index.less';

const PrefixCls = 'inputbox';

class InputBox extends Component {
  constructor (props) {
    super(props);
    this.state = {

    };
  }

  handleTextSubmit () {
    const input = ReactDOM.findDOMNode(this.lv);
    if (input.value !== '') {
      this.props.handlerSubmit({
        searchText: input.value,
      });
      input.value = '';
    }
    return false;
  }


  render () {
    return (
      <div className={styles[`${PrefixCls}-outer`]} >
        <div className={styles[`${PrefixCls}-outer-inputbox`]}>
          <input type="text" ref={el => this.lv = el} />
          <div>
            <Button type="primary"
              size="small"
              inline
              onClick={this.handleTextSubmit.bind(this)}
              style={{ height: '0.8rem', lineHeight: '0.8rem' }}
            >发送</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default InputBox;

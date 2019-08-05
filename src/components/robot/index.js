import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { getOffsetTopByBody } from 'utils';
import { ReceiveBubble, ReplyBubble } from './chatbubble/index';
import InputBox from './inputbox';
import styles from './index.less';

const PrefixCls = 'robot';

class Robot extends Component {
  constructor (props) {
    super(props);
    this.state = {
      height: cnhtmlHeight,
    };
  }

  componentDidMount () {
    setTimeout(() => {
      if (ReactDOM.findDOMNode(this.lv)) {
        const currentHeight = cnhtmlHeight - getOffsetTopByBody(ReactDOM.findDOMNode(this.lv));
        this.setState({
          height: currentHeight,
        });
        this.scrollToBottom(ReactDOM.findDOMNode(this.lv));
      }
    }, 300);
  }

  scrollToBottom (el) {
    setTimeout(() => {
      if (el) {
        el.scrollTop = el.scrollHeight;
      }
    }, 200);
  }

  componentDidUpdate () {
    this.scrollToBottom(ReactDOM.findDOMNode(this.lv));
  }

  render () {
    const props = {
      onSubmit: this.props.onSubmit,
    };
    return (
      <div>
        <div className={styles[`${PrefixCls}-outer`]}
             ref={el => this.lv = el}
             style={{ height: this.state.height }}
        >
          <div className={styles[`${PrefixCls}-outer-content`]}>
            {this.props.lists && this.props.lists.map((data, i) => {
              const { isMySelf = false, ...others } = data,
                robotProps = {
                  ...others,
                  dispatch: this.props.dispatch,
                },
                result = [];
              result.push(isMySelf ? <ReplyBubble {...robotProps} /> : <ReceiveBubble {...robotProps} />);
              return result;
            })}
          </div>
          <div style={{ clear: 'both' }}/>
          <InputBox {...props} handlerSubmit={this.props.handlerSubmit}/>
        </div>
      </div>
    );
  }
}

export default Robot;

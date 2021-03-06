import React from 'react';
import styles from './index.less';
import { getImages, getErrorImg } from 'utils';
import { Css3Loading, LoadingFail } from 'components/loading';
import ReactDOM from 'react-dom';
import Voice from '../voice';

const PrefixCls = 'bubble';

class ReceiveVoiceBubble extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      listening: false,
    };
  }

  handleVoiceClick = (e) => {
    this.setState({
      listening: !this.state.listening,
    });
    const audio = ReactDOM.findDOMNode(this.audio);
    this.state.listening ? audio.pause() : audio.play();
  }

  componentDidMount () {
    const that = this;
    const audio = ReactDOM.findDOMNode(this.audio);
    audio.addEventListener('ended', () => {
      that.setState({
        listening: false,
      });
    }, false);
  }

  render () {
    const { cuName, msgInfo, userPhoto } = this.props;
    return (
      <div className={styles[`${PrefixCls}-left`]}>
        <div className={styles[`${PrefixCls}-left-user`]}>{cuName}</div>
        <span className={styles[`${PrefixCls}-left-iconbox`]}>
          <img src={getImages(userPhoto, 'user')} />
        </span>
        <div className={styles[`${PrefixCls}-left-contentbox`]}
          style={{ paddingLeft: '15px' }}
          onClick={this.handleVoiceClick}
        >
          <Voice wave={this.state.listening} isLeft />
        </div>
        <div className={styles[`${PrefixCls}-left-loading`]} />
        <audio ref={el => this.audio = el}
          preload="auto"
          src={msgInfo}
        />
      </div>
    );
  }
}

export default ReceiveVoiceBubble;

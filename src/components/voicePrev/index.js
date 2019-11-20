import React from 'react';
import { getImages, getErrorImg } from 'utils';
import Voice from 'components/chatroom/voice';
import styles from './index.less';

const PrefixCls = 'voiceprev';

class VociePrev extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      listening: false,
      localAudio: null,
    };
  }

  handleVoiceClick = (e) => {
    const changeState = () => {
      this.setState({
        listening: false,
        localAudio: null,
      });
    };
    const { mediaFileUrl = '' } = this.props
    let media = cnPlayAudio(mediaFileUrl, this.state.listening, changeState);
    this.setState((state) => ({
      listening: !state.listening,
      localAudio: media,
    }));
  };

  handlerStopClick = () => {
    const { localAudio } = this.state;
    cnStopPlay(localAudio);
  };

  render () {
    const { mediaFileTimer = 0 } = this.props,
      voiceLength = Math.min(15 + (mediaFileTimer * 4), 100);
    return (
      <div className={styles[`${PrefixCls}-outer`]}>
        <div className={styles[`${PrefixCls}-box`]}>
          <div
            className={styles[`${PrefixCls}-box-contentbox`]}
            style={{ paddingRight: `${voiceLength}px` }}
            onClick={this.state.listening ? this.handlerStopClick : this.handleVoiceClick}
          >
            <Voice wave={this.state.listening} isLeft />
          </div>
        </div>
        {mediaFileTimer && mediaFileTimer > 0 ?
          <div className={styles[`${PrefixCls}-timer`]}>{`${mediaFileTimer}s`}</div> : ''}
      </div>
    );
  }
}

export default VociePrev;

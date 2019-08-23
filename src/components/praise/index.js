import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icon, ActivityIndicator } from 'components';
import { getLocalIcon } from 'utils';
import styles from './index.less';


class Praise extends React.Component {
  constructor (props) {
    super(props);
  }

  state = {
    action: this.props.praiseLoading,
  };

  render () {
    const { noPraise, num, handlePraiseClick, isPraise, praiseLoading } = this.props;
    return (
      <div className={styles.outer} onClick={handlePraiseClick}>
        {noPraise
          ?
          ''
          :
          <span className={classNames(styles.container, { [styles.praise]: isPraise })}>
            {
              isPraise ? `已赞 ${num}` : `点赞 ${num}`
            }
          </span>
        }
        <div className={classNames(styles.animation, { [styles.praiseActive]: isPraise })}>
          <Icon type={getLocalIcon('/others/sign.svg')} />
        </div>
      </div>
    );
  }
}

Praise.propTypes = {
  handlePraiseClick: PropTypes.func.isRequired,
  noPraise: PropTypes.bool,
  num: PropTypes.number,
  isPraise: PropTypes.bool,
  praiseLoading: PropTypes.bool,
};
Praise.defaultProps = {
  noPraise: false,
  num: 0,
  isPraise: false,
};
export default Praise;

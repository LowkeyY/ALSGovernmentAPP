import { Icon } from 'components';
import { getLocalIcon } from 'utils';
import styles from './index.less';


function Voice (props) {
  return (
    <div className={styles.outer}>
      {
        props.wave
          ?
          props.isLeft ? <Icon type={getLocalIcon('/others/lplay.svg')} size="xxs" /> :
            <Icon type={getLocalIcon('/others/rplay.svg')} size="xxs" />
          :
          props.isLeft ? <Icon type={getLocalIcon('/others/leftwave.svg')} size="xxs" /> :
            <Icon type={getLocalIcon('/others/rightwave.svg')} size="xxs" />
      }
    </div>
  );
}

export default Voice;

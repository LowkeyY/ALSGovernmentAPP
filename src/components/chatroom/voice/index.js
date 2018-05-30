import styles from './index.less'
import {Icon} from 'components'
import {getLocalIcon} from 'utils'
import classnames from 'classnames'

function Voice (props) {
  return(
    <div className={styles.outer}>
      {
        props.wave
          ?
          <div className={styles.wave}>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
          </div>
          :
            props.isLeft?<Icon type={getLocalIcon('/others/leftwave.svg')} size='xxs'/>:<Icon type={getLocalIcon('/others/rightwave.svg')} size='xxs'/>
      }
    </div>
  )
}

export default Voice

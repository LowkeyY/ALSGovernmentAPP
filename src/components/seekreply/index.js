import styles from './index.less'
const PrefixCls = 'seekreply'
function SeekReply(props) {
  return (
    <div className={styles[`${PrefixCls}-outer`]}>
       <div className={styles[`${PrefixCls}-outer-title`]}>
         转办意见：
       </div>
      <p>{props.contents}</p>
      <div className={styles[`${PrefixCls}-outer-date`]}><span>{props.date}</span><span>{props.positon}</span></div>
    </div>
  )
}
export default SeekReply

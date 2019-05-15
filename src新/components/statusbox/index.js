import styles from './index.less';

function StatusBox (props) {
  return (
    <span className={styles.container} style={{ background: props.bg }}>{props.status}</span>
  );
}

export default StatusBox;

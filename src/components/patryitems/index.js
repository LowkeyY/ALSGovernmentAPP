import styles from './index.less';
import { Icon } from 'antd-mobile';
import { getLocalIcon } from 'utils';

const PrefixCls = 'patryitems';
function PatryItems (props) {
  return (
    <div className={styles[`${PrefixCls}-container`]} onClick={props.handle}>
      <img src={props.url} alt="" />
      <div className={styles[`${PrefixCls}-container-info`]}>
        <span className={styles[`${PrefixCls}-container-info-title`]}>{props.name}</span>
        <span className={styles[`${PrefixCls}-container-info-sub`]}>
          {props.isArticle ? <span>文章</span> : <Icon type={getLocalIcon('/others/video.svg')} />}
        </span>
      </div>
    </div>
  );
}
export default PatryItems;

import { SearchBar ,Icon} from 'antd-mobile';
import styles from './index.less'
import {getLocalIcon} from 'utils';
import {routerRedux} from 'dva/router';
const PrefixCls = 'searchheader'
function SearchHeader(props) {

  return(
    <div className={styles[`${PrefixCls}-outer`]}>
       <div className={styles[`${PrefixCls}-outer-text`]} >
        自助咨询
       </div>
      <SearchBar
        placeholder="输入关键字搜索"
      />
    </div>
  )
}

export default SearchHeader

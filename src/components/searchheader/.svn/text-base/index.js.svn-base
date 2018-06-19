import { SearchBar ,Icon} from 'antd-mobile';
import styles from './index.less'
import {getLocalIcon} from 'utils';
import {routerRedux} from 'dva/router';
const PrefixCls = 'searchheader'

function SearchHeader(props) {

  return(
    <div className={styles[`${PrefixCls}-outer`]}>
       <div className={styles[`${PrefixCls}-outer-text`]} >
         {props.children}
       </div>
      <SearchBar
        placeholder={props.placeholder}
        onFocus={props.onFocu}
      />
    </div>
  )
}

export default SearchHeader

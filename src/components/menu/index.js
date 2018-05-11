import React from 'react'
import {Grid} from 'antd-mobile';
import menus from 'utils/menus'
import styles from './index.less'
const PrefixCls='menu'
const Menu = (props) => {

  return(
    <div className={styles[`${PrefixCls}-outer`]}>
      <Grid data={menus}
            columnNum={3}
            onClick={
              (data,index)=>{
                props.handleGridClick(data.route,data.name)
              }
            }
            renderItem={dataItem => (
              <div style={{ padding: '0.25rem' }}>
                <img src={dataItem.icon} style={{ width: '1.2rem', height: '1.2rem' }} alt="icon" />
                <div style={{ color: '#888', fontSize: '0.28rem', marginTop: '0.14rem' }}>
                  <span>{dataItem.name}</span>
                </div>
              </div>
            )}
      />
  </div>
  )
}
export default Menu

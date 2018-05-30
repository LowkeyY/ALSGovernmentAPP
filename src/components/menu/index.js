import React from 'react'
import { Grid } from 'antd-mobile'
import { menus } from 'utils/menus'
import styles from './index.less'
import {Layout} from 'components'

const PrefixCls = 'menu',{BaseLine} = Layout
const Menu = (props) => {
  return (
    <div>
    <div className={styles[`${PrefixCls}-outer`]}>
      <Grid data={menus}
            columnNum={3}
            hasLine={true}
            onClick={
              (data, index) => {
                props.handleGridClick(data.route, data.name)
              }
            }
            renderItem={dataItem => (
              <div>
                <img src={dataItem.icon} style={{ width: '1.2rem', height: '1.2rem' }} alt="icon"/>
                <div style={{ color: '#888', fontSize: '0.32rem', marginTop: '0.14rem' }}>
                  <span>{dataItem.name}</span>
                </div>
              </div>
            )}
      />
    </div>
  <BaseLine/>
    </div>
  )
}
export default Menu

import React from 'react'
import {Grid} from 'antd-mobile'
import styles from './index.less'
import {Layout} from 'components'

const PrefixCls = 'menu', {BaseLine} = Layout, getDatas = (menus = []) => {
  const result = [];
  menus.map((menu , index) => {
    let {icon = require(`themes/images/dashboard/default_${index}.png`) , text = "" , name = "" , title = ""} = menu;
    if(text == "")
      text = name || title;
    result.push({...menu , icon , text})
  })
  return result;
}

const Menu = (props) => {
  return (
    <div>
      <div className={styles[`${PrefixCls}-outer`]}>
        <Grid data={getDatas(props.datas || [])}
              columnNum={3}
              hasLine={true}
              onClick={
                (data, index) => {
                  props.handleGridClick(data.route, data.name)
                }
              }
          /*            renderItem={dataItem => (
                        <div>
                          <img src={dataItem.icon} style={{ width: '0.9rem', height: '0.9rem' }} alt="icon"/>
                          <div style={{ color: '#888', fontSize: '0.32rem', marginTop: '0.14rem' }}>
                            <span>{dataItem.name}</span>
                          </div>
                        </div>
                      )}*/
        />
      </div>
    </div>
  )
}
export default Menu

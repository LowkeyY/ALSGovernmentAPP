import React from 'react'
import { Icon } from 'antd-mobile'
import { getLocalIcon } from 'utils'

function RefreshLoading (props) {

  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',padding:'5px 0'}}>
      <Icon style={{width:'100%'}} type={getLocalIcon(props.svg)} />
    </div>
  )

}

export default RefreshLoading

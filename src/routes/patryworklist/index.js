import React from 'react'
import { connect } from 'dva'
import { WhiteSpace ,Card } from 'components'
import Nav from 'components/nav'
import Layout from 'components'
import styles from './index.less'


  const PrefixCls = 'patryworklist', { BaseLine } = Layout

function Patryworklist ({ location, dispatch, patryworklist }) {
  const { name = '', index = 0 } = location.query,
    {dataList} = patryworklist

  return (
    <div>
      <Nav title={name} dispatch={dispatch}/>
      <WhiteSpace size="md"/>
      {
       dataList&&dataList.map((data,i)=>{
         return (
           <div key={i} className={styles[`${PrefixCls}-outer`]}>
             <Card>
               <Card.Header
                 title="党组织"
                 thumb={require('./dangjian.png')}
                 extra={<span>{data.organization}</span>}
               />
               <Card.Body>
                 <div>{data.problem}</div>
               </Card.Body>
             </Card>
           </div>
         )
       })
      }
    </div>
  )
}

export default connect(({ loading, patryworklist }) => ({
  loading,
  patryworklist,
}))(Patryworklist)

import React from 'react'
import { connect } from 'dva'
import { WhiteSpace, Accordion, List  } from 'components'
import Nav from 'components/nav'
import styles from './index.less'


const PrefixCls = 'selectmembers'

function Selectmembers ({ location, dispatch, selectmembers }) {
  const { name = '发布任务'} = location.query,{lists=[],itemLists=[],taskId=''} = selectmembers,
    handleGetMembers= (id) => {
    console.log(lists)
      dispatch({
        type:'selectmembers/queryItems',
        payload:{
          id,
          taskId
        }
      })
    },
    getAccrodion2 = (lists) => {

      return lists&&lists.map((data,index)=>{
        const {text='',id=''} = data
        return (
          <div onClick={handleGetMembers.bind(this,id)}>
            <Accordion  defaultActiveKey="0" >
              <Accordion.Panel header={text} >

              </Accordion.Panel>
            </Accordion>
          </div>
        )
      })
    },
    getAccrodion = (lists,itemLists) => {

     return lists&&lists.map((data,index)=>{
       const {text='',id='',children=true} = data
       return (
         <div onClick={handleGetMembers.bind(this,id)}>
           <Accordion  defaultActiveKey="0" >
             <Accordion.Panel header={text} >
               {children? getAccrodion(itemLists):'111'}
             </Accordion.Panel>
           </Accordion>
         </div>
       )
     })
    }
  return (
    <div >
      <Nav title={name} dispatch={dispatch}/>
      <WhiteSpace size="md"/>
      {getAccrodion(lists,itemLists)}
    </div>
  )
}

export default connect(({ loading, selectmembers }) => ({
  loading,
  selectmembers,
}))(Selectmembers)

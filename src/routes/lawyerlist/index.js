import React from 'react'
import { connect } from 'dva'
import { WhiteSpace } from 'antd-mobile'
import Nav from 'components/nav'
import { lawyerList, officeList } from 'components/row'
import Layout from 'components'
import { routerRedux } from 'dva/router'
import styles from './index.less'


 const PrefixCls = 'lawyerlist', { BaseLine } = Layout

function Lawyerlist ({ location, dispatch, lawyerlist }) {
  const { name = '', index = 0 } = location.query,
    {dataList} = lawyerlist,
  handleItemOnclick = ({ externalUrl = '', id, pathname = 'details' }) => {
    if (externalUrl != '' && externalUrl.startsWith('http')) {
     dispatch(routerRedux.push({
        pathname: 'iframe',
        query: {
          name,
          externalUrl: externalUrl,
        },
      }))
    } else {
    dispatch(routerRedux.push({
        pathname: `/${pathname}`,
        query: {
          name,
          dataId: id,
        },
      }))
    }
  }
  return (
    <div>
      <Nav title={name} dispatch={dispatch}/>
      <WhiteSpace size="md"/>
      {lawyerList(dataList , handleItemOnclick)}
    </div>
  )
}

export default connect(({ loading, lawyerlist }) => ({
  loading,
  lawyerlist,
}))(Lawyerlist)

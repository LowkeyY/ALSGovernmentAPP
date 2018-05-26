import React from 'react'
import { connect } from 'dva'
import { WhiteSpace } from 'antd-mobile'
import Nav from 'components/nav'
import Layout from 'components'
import styles from './index.less'
import newsList from 'utils/datalvyou'

const PrefixCls = 'test',{BaseLine} = Layout

function Test ({ location, dispatch, details }) {
  const { name = '', index = 0 } = location.query,
    { title, contents = [], images = [] , createDate = ""} = newsList[index],
    getContents = () => {
      let result = [] , i = 0;
      contents.map((content,index) => {
        (!!images[index]) && result.push(<img src={images[index]}/>)
        result.push(<p>{content}</p>);
        i++;
      })
      for(;i<images.length;i++){
        result.push(<img src={images[i]}/>)
      }
      return result
    }
  return (
    <div>
      <Nav title={name} dispatch={dispatch}/>
      <WhiteSpace size="md"/>
      <div className={styles[`${PrefixCls}-outer`]}>
        <div className={styles[`${PrefixCls}-outer-title`]}>
          {title}
        </div>
        <div className={styles[`${PrefixCls}-outer-date`]}>{createDate}</div>
        <WhiteSpace size="sm"/>
        <div className={styles[`${PrefixCls}-outer-content`]}>
          {getContents()}
        </div>
      </div>
    </div>
  )
}

export default connect(({ loading, test }) => ({
  loading,
  test,
}))(Test)

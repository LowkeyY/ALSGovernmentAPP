import React from 'react'
import { connect } from 'dva'
import Nav from 'components/nav'
import Tags from 'components/tags'
import { List, WhiteSpace, SearchBar } from 'antd-mobile'
import newsList from 'utils/datarongmeiti'
import styles from './index.less'

let isPlay = false
function Newsdetails ({ location, dispatch, newsdetails }) {
  const { name = '新闻详情', index = 0 } = location.query,
    { title = '', content = '', vSrc = '', iSrc = '' } = newsList[index],
    PrefixCls = 'newsdetails',
    Item = List.Item,
    handleClick = () => {
      var vs = document.getElementById('testVideo2')
      if (vs && vs.play) {
        isPlay ? vs.pause() : vs.play()
        isPlay = !isPlay
      }
    }

  return (
    <div>
      <Nav title={name} dispatch={dispatch}/>
      <div className={styles[`${PrefixCls}-outer-content`]}>
        <video id="testVideo2" width='100%' loop poster={iSrc} src={vSrc} onClick={handleClick}
               controls="controls"></video>
        <WhiteSpace size="md"/>
        <List>
          <Item><span className={styles[`${PrefixCls}-title`]}>{title}</span></Item>
          <div className={styles[`${PrefixCls}-outer-content-info`]}>
            {content}
          </div>
        </List>
        <WhiteSpace size="md"/>
      </div>
    </div>
  )
}

export default connect(({ loading, newsdetails }) => ({
  loading,
  newsdetails,
}))(Newsdetails)

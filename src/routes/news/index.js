import React from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import Nav from 'components/nav'
import Tags from 'components/tags'
import { List, WhiteSpace, SearchBar } from 'antd-mobile'
import newsList from 'utils/datarongmeiti'
import Ifreams from 'components/ifream'
import styles from './index.less'

let isPlay = false

function News ({ location, dispatch, news }) {
  const { name = '' } = location.query,
    handleClick = () => {
      var vs = document.getElementById('testVideo1')
      if (vs && vs.play) {
        isPlay ? vs.pause() : vs.play()
        isPlay = !isPlay
      }
    }
  const PrefixCls = 'voice'
  const Item = List.Item
  const Brief = Item.Brief
  const topMenus = [{ title: '新闻' }, { title: '财经' }, { title: '体育' }, { title: '娱乐' }, { title: '军事' }, { title: '图库' }, { title: '汽车' }, { title: '房产' }, { title: '时尚' }, { title: '小说' }, { title: '历史' }, { title: '科技' }, { title: '教育' }, { title: '健康' }, { title: '母婴' }, { title: '文化' }, { title: '社会' }, { title: '警法' }],
    homeVedioSrc = require('themes/MP4/1.mp4'),
    homePicSrc = require('themes/MP4/1.png'),
    handleItemOnclick = (index) => {
      dispatch(routerRedux.push({
        pathname: '/newsdetails',
        query: {
          index,
        },
      }))
    }
  return (
    <div>
      <Nav title={name} dispatch={dispatch}/>
      <WhiteSpace size="md"/>
      <SearchBar
        placeholder="输入需要搜索的内容"
        onSubmit={value => console.log(value, 'onSubmit')}
        onClear={value => console.log(value, 'onClear')}
        onFocus={() => console.log('onFocus')}
        onBlur={() => console.log('onBlur')}
        onCancel={() => console.log('onCancel')}
        showCancelButton
        onChange={() => console.log('onChange')}
      />
      <WhiteSpace size="md"/>
      <Tags hotwords={topMenus}/>
      <div className={styles[`${PrefixCls}-outer-content`]}>
        {/*<div onClick={handleClick}>*/}
        {/*<video id = "testVideo1">*/}
        {/*<source src={require('themes/MP4/1.mp4')} type="video/mp4"/>*/}
        {/*</video>*/}
        {/*</div>*/}
        <video id="testVideo1" width='100%' loop poster={homePicSrc} src={homeVedioSrc} onClick={handleClick}
               controls="controls"></video>
        <WhiteSpace size="md"/>
        <List renderHeader={() => '新闻'}>
          {newsList.map((
            _,
            index,
          ) =>
            <Item onClick={handleItemOnclick.bind(null, index)}>
              <span className={styles[`${PrefixCls}-title`]}>{_.title}</span>
            </Item>)}
        </List>
        <WhiteSpace size="md"/>
      </div>
    </div>
  )
}

export default connect(({ loading, news }) => ({
  loading,
  news,
}))(News)

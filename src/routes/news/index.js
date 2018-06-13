import React from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import Nav from 'components/nav'
import Tags from 'components/tags'
import { List, WhiteSpace, SearchBar, Tabs, Layout } from 'components'
import Ifreams from 'components/ifream'
import styles from './index.less'

let isPlay = false
const Item = List.Item, { BaseLine } = Layout

function News ({ location, dispatch, news }) {
  const { name = '' } = location.query,
    { banners, tuijian, tabs, selectedIndex, lists } = news,

    getvideo = (data) => {
      return data&&data.map(data=>{
     return (
       <video key={data.id} width='100%' loop poster={data.videoView} src={data.videoSrc} controls="controls"></video>
     )
   })

  }

  const PrefixCls = 'news',
    Item = List.Item,
    Brief = Item.Brief,
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
    },
    handleTabClick = (data, index) => {
      dispatch({
        type: 'news/querySelect',
        payload: {
          ...data,
          selected: index,
        },
      })
    },

    getContents = (lists) => {
      const result = []
      lists.map((list, i) => {
        const { id = '' } = list
        if (id != '') {
          result.push(
            <Item key={id} className={styles[`${PrefixCls}-item`]}
                  thumb={list.image || ''} multipleLine wrap arrow='horizontal'
                  onClick={handleItemOnclick.bind(null, list)}>
              <span>{list.title}</span><Brief>{list.time}</Brief>
            </Item>,
          )
        }
      })
      return <List>{result}</List>
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
      <Tabs
        initialPage={0}
        page={selectedIndex}
        tabs={tabs}
        swipeable={false}
        onTabClick={handleTabClick}
      >
        <div>
         <div>
           {getvideo(banners)}
         </div>
          <List>
            <Item>{tuijian[0] && tuijian[0].title}</Item>
          </List>
          <div>{getContents(lists)}</div>
        </div>
      </Tabs>
      <BaseLine/>
    </div>
  )
}

export default connect(({ loading, news }) => ({
  loading,
  news,
}))(News)

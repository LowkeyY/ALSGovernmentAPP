import React from 'react'
import { connect } from 'dva'
import Nav from 'components/nav'
import Banner from 'components/banner/index'
import { WingBlank, WhiteSpace, Tabs, List, Layout } from 'components'
import { routerRedux } from 'dva/router'
import styles from './index.less'

let banners = []
const PrefixCls = 'patrylist', { BaseLine } = Layout,
  Item = List.Item,
  Brief = Item.Brief

function Patrylist ({ location, dispatch, patrylist }) {
  const { name = '', theIndex = 0 } = location.query,
    { patryListData } = patrylist
  const handlerPatrylistClick = (id) => {
      dispatch(routerRedux.push({
        pathname: 'details',
        query: {
          dataId: id,
          name,
        },
      }))
    },
    handleBannerClick = (id) => {
      dispatch(routerRedux.push({
        pathname: 'details',
        query: {
          dataId: id,
          name,
        },
      }))
    },
    getBannerDatas = () => {
      let banners = []

      for (let i = 0; i < patryListData.length; i++) {
        let obj = {}
        if (patryListData[i].image != '') {
          obj.url = patryListData[i].image,
            obj.id = patryListData[i].id
          banners.push(obj)
        }
      }
      return banners.slice(0, 4)
    },
    getLists = (patryListData) => {
      let isNew = false
      return (
        <div>
          <List>
            {patryListData.map((_, i) =>
                <Item key={i} className={styles[`${PrefixCls}-item`]}
                      thumb={_.image || ''} multipleLine wrap arrow='horizontal'
                      onClick={handlerPatrylistClick.bind(null, _.id)}>
                  <span className={styles[`${PrefixCls}-title`]}>{_.title}</span> <Brief>{_.time}</Brief>
                </Item>)
            }
          </List>
          <BaseLine/>
        </div>
      )

    }

  return (
    <div>
      <Nav title={name} dispatch={dispatch}/>
      <div style={{ textAlign: 'center' }}>
        {getBannerDatas().length > 0 ? <Banner datas={getBannerDatas()} handleClick={handleBannerClick}/> : <div></div>}
      </div>
      {getLists(patryListData)}
    </div>
  )
}

export default connect(({ loading, patrylist }) => ({
  loading,
  patrylist,
}))(Patrylist)

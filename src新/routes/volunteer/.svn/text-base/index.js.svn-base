import React from 'react'
import {connect} from 'dva'
import {WhiteSpace, Tabs, Badge, List, Icon} from 'components'
import {getLocalIcon} from 'utils'
import Nav from 'components/nav'
import NoMessage from 'components/nomessage'
import {officeList, integralList} from 'components/row'
import {routerRedux} from 'dva/router'
import styles from './index.less'

let tabDefaultIndex = 0
const PrefixCls = 'volunteer',
  Item = List.Item,
  Brief = Item.Brief,
  nowDate = {
    0: [
      {
        title: '小山',
        number: '10',
        info: '公益老腊肉',
        status: 0,
      }
      ,
      {
        title: '小李',
        number: '5',
        info: '公益小鲜肉',
        status: 1,
      }, {
        title: '小王',
        number: '1',
        info: '围观小能手',
        status: 1,
      },
    ],
    1: [{
      title: '阿左旗政法委信息中心',
      number: '10',
      info: '300人参与',
      status: 1,
    }, {
      title: '阿左旗司法局',
      number: '5',
      info: '200人参与',
      status: 1,
    }, {
      title: '阿左旗额鲁特街道办',
      number: '2',
      info: '100人参与',
      status: 1,
    }]
  }


function Volunteer({location, dispatch, volunteer}) {

  const {name = '', selectedIndex = 0, grids, lists, gridsitem = [],volunteers=[]} = volunteer

  const handleItemOnclick = ({id, title, name = '公益活动', pathname = 'volunteerdetails'}) => {
      dispatch(routerRedux.push({
        pathname: `/${pathname}`,
        query: {
          name,
          id
        },
      }))
    },
    activeList = (lists, handleItemOnclick) => {
      const result = []
      lists && lists.map((list, i) => {
        result.push(
          <Item className={styles[`${PrefixCls}-box`]} thumb={list.image || ''} multipleLine wrap
                onClick={handleItemOnclick.bind(null, list)}>
            <span>{list.title}</span>
            <Brief>
              <p className={styles[`${PrefixCls}-item`]}>
                <span><Icon type={getLocalIcon('/others/number.svg')} size='xxs'/></span>
                <span>{`${list.baomingrenshu || 0}人`}</span>
              </p>
              <p className={styles[`${PrefixCls}-item`]}>
                <span><Icon type={getLocalIcon('/others/position.svg')} size='xxs'/></span>
                <span>{list.address}</span>
              </p>
            </Brief>
          </Item>,
        )
      })
      return <List>{result}</List>
    },

    handleTabClick = (data, index) => {
      dispatch({
        type: 'volunteer/querySelect',
        payload: {
          ...data,
          selected: index,
        },
      })
    },
    handleTabClickItem = (data, index) => {
      if(index==0){
        dispatch({
          type: 'volunteer/queryVolunteers',
          payload: {
            ...data,
            selected: index,
          },
        })
      }else {
        dispatch({
          type: 'volunteer/querytongjibumen',
          payload: {
            ...data,
            selected: index,
          },
        })
      }

    },

    getContent = () => {
      if (selectedIndex == 0) {
        return <List>{activeList(lists, handleItemOnclick)}</List>
      } else {
        return (
          <Tabs tabs={gridsitem}
            // initialPage={selectedIndex}
                swipeable={false}
                onTabClick={(tab, index) => {
                  handleTabClickItem(tab, index)
                }}
          >
            {/*<NoMessage/>*/}
            <div>
              {volunteers&&volunteers.map((data,i)=>{
                return integralList({...data,index:i+1})
              })}
            </div>
          </Tabs>
        )
      }
    }

  return (
    <div className={styles[`${PrefixCls}-outer`]}>
      <Nav title={name} dispatch={dispatch}/>
      <Tabs tabs={grids}
            initialPage={selectedIndex}
            swipeable={false}
            onChange={(tab, index) => {
              handleTabClick(tab, index)
            }}
            onTabClick={(tab, index) => {
              handleTabClick(tab, index)
            }}
      >
        {getContent()}
      </Tabs>
    </div>
  )
}

export default connect(({loading, volunteer}) => ({
  loading,
  volunteer,
}))(Volunteer)

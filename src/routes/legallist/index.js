import React from 'react'
import { connect } from 'dva'
import { Component } from 'react'
import { WhiteSpace, Tabs, Badge,Picker,List ,TextareaItem,Icon,Switch,Button,WingBlank} from 'components'
import { getLocalIcon,getImages } from 'utils'
import Nav from 'components/nav'
import { createForm } from 'rc-form'
import { lawyerList, officeList } from 'components/row'
import TitleBox from 'components/titlecontainer'
import { routerRedux } from 'dva/router'
import styles from './index.less'

const PrefixCls = 'legallist',
  tabs = [
    { title: <Badge>法律咨询</Badge> },
    { title: <Badge>找律师</Badge> },
  ],
 type = [
    {
      label: '合同纠纷',
      value: '1',
    },
    {
      label: '家庭婚姻',
      value: '2',
    },
   {
     label: '财产侵占',
     value: '3',
   },
   {
     label: '交通事故',
     value: '4',
   },

  ]


class Comp extends Component {
constructor (props){
  super(props)
}
    handleItemOnclick = ({ externalUrl = '', id, pathname = 'details' }) => {
      if (externalUrl != '' && externalUrl.startsWith('http')) {
        this.props.dispatch(routerRedux.push({
          pathname: 'iframe',
          query: {
            name,
            externalUrl: externalUrl,
          },
        }))
      } else {
        this.props.dispatch(routerRedux.push({
          pathname: `/${pathname}`,
          query: {
            name,
            dataId: id,
          },
        }))
      }
    }
    handleTabClick = (data, index) => {
      this.props.dispatch({
        type: 'legallist/querySelect',
        payload: {
          ...data,
          selected: index,
        },
      })
    }

  render() {
    const { getFieldProps, getFieldError } = this.props.form,
    { name = '', selectedIndex = 0, grids, lists } = this.props.legallist,
    getContent = () => {
      const result = []
      if (selectedIndex == 0) {
        result.push(lawyerList(lists , this.handleItemOnclick))
        // return lawyerList(lists , this.handleItemOnclick)
      } else {
        result.push(officeList(lists , this.handleItemOnclick))
        // return officeList(lists , this.handleItemOnclick)
      }
      return <div>{result}</div>
    },
     getCards = () => {
       return(
         <div className={styles[`${PrefixCls}-cards`]}>
           <div className={styles[`${PrefixCls}-info`]}>
             <img src={getImages('', 'user')} alt=""/>
             <div className={styles[`${PrefixCls}-info-details`]}>
               <div className={styles[`${PrefixCls}-info-details-name`]}>匿名</div>
               <div className={styles[`${PrefixCls}-info-details-others`]}>
                 <div className={styles[`${PrefixCls}-info-details-others-date`]}>
                   <span>2018-06-09 09:48</span>
                 </div>
                 <div className={styles[`${PrefixCls}-info-details-others-pos`]}>
                   <span>乌兰布和路</span>
                 </div>
               </div>
             </div>
           </div>
           <div className={styles[`${PrefixCls}-ask`]}>
             <span>
               我想问一下，我老公在外面搞婚外恋，已经2年了。我一直没有说，直到最近我忍不住提出离婚，
             可是我老公不同意，请问怎么办
             </span>
             <div className={styles[`${PrefixCls}-ask-info`]}>
               <span className={styles[`${PrefixCls}-ask-info-type`]}>合同纠纷</span>
               <span className={styles[`${PrefixCls}-ask-info-answer`]}>0人回答</span>
             </div>
           </div>
         </div>
       )
     },
      handleNavClick = (grids) => {
        const {id='',title='', route='lawyerlist'} =grids[1]
        this.props.dispatch(routerRedux.push({
          pathname: `/${route}`,
          query: {
            name:title,
            id
          },
        }))
      },
      renderNav = (grids) => {
      if(Array.isArray(grids)&&grids.length>0){
        const {title=''} = grids[1]
        return (
          <span onClick={handleNavClick.bind(this,grids)}>{title}</span>
        )
      }

      }
  return (
    <div className={styles[`${PrefixCls}-outer`]}>
      <Nav title={name} dispatch={this.props.dispatch} renderNavRight={renderNav(grids)} />
      <WhiteSpace size="sm"/>
      <div>
        <div>
          <Picker data={type} cols={1} {...getFieldProps('type', {
            rules: [{ required: true }],
          })}
          >
            <List.Item arrow="horizontal">案件类型</List.Item>
          </Picker>
        </div>
        <List.Item className={styles[`${PrefixCls}-outer-content`]}>
          <TextareaItem
            {...getFieldProps('textinfo', {
              initialValue: '',
              rules: [{ required: true, message: '请输入诉求内容' }],
            })}
            clear
            rows={3}
            error={!!getFieldError('textinfo') && Toast.fail(getFieldError('textinfo'))}
            count={500}
            placeholder={'请输入您需要咨询的问题、如案件经过、证据情况、以便为您更好的解答'}
          />
        </List.Item>
        <div className={styles[`${PrefixCls}-position`]}><Icon type={getLocalIcon('/others/position.svg')} size='xs'/><span>内蒙古自治区 阿拉善盟</span></div>
        <div>
          <List>
            <List.Item
              extra={<Switch
                {...getFieldProps('isOpen', {
                  initialValue: true,
                  valuePropName: 'checked',
                })}
                platform="android"
              />}
            >是否隐私发布</List.Item>
          </List>
          <WhiteSpace />
          <WingBlank>
            <Button type="primary">确认发布</Button>
          </WingBlank>
          <WhiteSpace />
        </div>
        <TitleBox title='咨询列表'/>
        <div>
          {getCards()}
        </div>
      </div>
    </div>
  )
}
}

export default connect(({ loading, legallist }) => ({
  loading,
  legallist,
}))(createForm()(Comp))

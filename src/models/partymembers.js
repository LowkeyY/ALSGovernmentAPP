import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { model } from 'models/common'
import { Toast } from 'components'
import { postionsToString } from 'utils'
import { routerRedux } from 'dva/router'
import { queryAppealType, sendAppealInfo } from 'services/queryappeal'
import { GetAboutInfo } from 'services/querycontent'

const getType = (datas = []) => {
  const currentDatas = JSON.parse(datas)
  currentDatas.map(items => {
    items.label = items.name
  })
  return currentDatas
},
  defaultTitles = [
    '01入党申请书','02党组织派人谈话','03推荐和确定入党积极分子','04上级党委备案','05指定培养联系人','06培养教育考察','07确定发展对象','08报上级党委备案',
    '09确定入党介绍人','10进行政治审查','11开展集中培训'
  ]

export default modelExtend(model, {
  namespace: 'partymembers',
  state: {
    name: '',
    title:defaultTitles
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, action, query }) => {
        if (pathname === '/partymembers') {
          const { name = '' } = query
          dispatch({
            type: 'updateState',
            payload: {
              name,
            },
          })
        }
      })
    },
  },
  effects: {


  },
})
